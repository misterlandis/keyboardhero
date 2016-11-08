import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import './main.html';

var session_stats = {
	lesson_text : "",
	typed_text : ""
}

$("body").keypress(function(event){
	var lesson_text = $(".lesson-text").text();
	var typed_text = $(".typed-text").text();
	var letter_index = typed_text.length +1; 
	var typed_letter = event.key;
	var correct_letter = lesson_text[letter_index];
	var correctness
	if(correct_letter == typed_letter){
		correctness = "correct"
	}
	else{
	correctness = "incorrect"
	}
	
	$(".typed-text").append("<span class = '" + correctness + "'>" + event.key + "</span>");
	//console.log(event);
});

$(document).ready(function(){ // load lesson
	$.get("/lessons.txt", "", function(results){
		//do this when lesson text is loaded
		//$(".lesson-text").html(results);
		
		session_stats.lesson_text = results;
		for (var i = 0; i < results.length; i++){
			var this_letter_span = $("<span />").html(results[i]);
			
			$(".lesson-text").append(this_letter_span);
		}
		updateDebug();
		
	});

});


//Debug display
function showDebug(){
	$("#debug").show();
}

function hideDebug(){
	$("#debug").hide()
}

function updateDebug(){
	$("#debug").html("<h3>Debug Info</h3>");
	for(key in session_stats){
		$("#debug").append("<b>" + key + ":</b> " + session_stats[key] + "<br />");
	}
}
