import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import './main.html';

var session_stats = {
	lesson_text : "",
	typed_text : "",
	chars_typed : 0,
	chars_in_lesson :0,
	percent_complete: 0,
	next_char: "",
	last_char: "",
	last_letter_typed: "",
	last_keycode_typed : 0,
	correct_chars: 0,
	incorrect_chars:0,
	percent_correct:0
}

$("body").keypress(function(event){
	//a _letter_ key was pressed.  Add it to the typed characters and update.
	session_stats.last_letter_typed = event.key;
	session_stats.typed_text = session_stats.typed_text + session_stats.last_letter_typed;
	update();
	//console.log(event);
});

$("body").keydown(function(event){
	session_stats.last_keycode_typed = event.which;
	if(event.which == 35 && event.altKey == true){ //show-hide debug
		$("#debug").toggle();
	}
});

$(document).ready(function(){ 
	document.firstElementChild.style.zoom = "reset"; // prevent zooming
	// load lesson
	$.get("/lessons.txt", "", function(results){
		//do this when lesson text is loaded
		//$(".lesson-text").html(results);
		
		session_stats.lesson_text = results;
		for (var i = 0; i < results.length; i++){
			var this_letter_span = $("<span />").html(results[i]);
			
			$(".lesson-text").append(this_letter_span);
		}
		 
		update();
		
	});

});

function update(){
	//update some vars
	session_stats.chars_in_lesson = session_stats.lesson_text.length; 
	session_stats.chars_typed = session_stats.typed_text.length;
	session_stats.next_char = session_stats.lesson_text[session_stats.chars_typed];
	session_stats.last_char = session_stats.lesson_text[session_stats.chars_typed - 1];
	session_stats.percent_complete = Math.round((session_stats.chars_typed / session_stats.chars_in_lesson) * 100);
	
	
	//check the correctness of the typed text
	session_stats.correct_chars = 0;
	session_stats.incorrect_chars = 0;
	for(var i = 0 ; i < session_stats.chars_typed; i++){
		if(session_stats.typed_text[i] == session_stats.lesson_text[i]){
			correctness = true;
			 session_stats.correct_chars ++;
		}
		else{
			correctness = false;
			session_stats.incorrect_chars ++;
		}
		display_correctness(i, correctness);
	}
	session_stats.percent_correct = Math.round((session_stats.correct_chars / session_stats.chars_typed) * 100);
	//update the debug display
	updateDebug();
	
}

//display a certain letter as either correct or incorrect
function display_correctness(index, correctness){
	var this_span = $(".lesson-text").find("span")[index];
	if(correctness){
		$(this_span).removeClass("incorrect").addClass("correct");
	}
	else{
		$(this_span).addClass("incorrect").removeClass("correct");
	}
}


function updateDebug(){
	$("#debug").html("<h3>Debug Info</h3>");
	for(key in session_stats){
		$("#debug").append("<b>" + key + ":</b> " + session_stats[key] + "<br />");
	}
}
