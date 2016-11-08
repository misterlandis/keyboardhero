import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';

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