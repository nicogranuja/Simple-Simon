//button  clicked start with 1 random light display round number change text of the html
//save the values randomized in order, make sure the user inputs them in order
//make something that stops the game when user misses?

$( document ).ready(function() {
	"use strict";
	//variables for the game
	var $red = $('#red');
	var $blue = $('#blue');
	var $green = $('#green');
	var $yellow = $('#yellow');
	var $btn = $('#startGame');
	var $message = $('#message');
	var $round = $('#currentRound');
	var $colors = $('.color');
	var sequenceOfColors = {};
	var count = 1;
	var endGame = false;
	//-----------------//end variables//--------------------------
	//function that clears the buttons
	function clearClicked() {
		console.log("clear clicked");
		//use a each function to clear all the divs to opacity = 1;
	}
	//function that checks the user input
	function checkClicked(){
		//it should probably have a timer between divs pressed
		//it has to check that the order matches too.
	}
	//function that light the sequence that is randomly generated
	function lightSequence(){
		for(var i=0; i < count; i++){
			//we need a pause so the user has time to see, should it be here???
			//maybe create a function that takes some time and also allows me to cotrol the time
			//later on with the count that counts the rounds when is high and minimize the time for the user
			//to see

			//takes whatever color was randomed in the sequence
			switch(sequenceOfColors[i]){
				/*
				case 1:red
				case 2: blue
				case 3: green
				case 4: yellow
				*/

				//probably need to add a pause between each pressed to give the user time.
				case 1:
					$red.css('opacity', '0.4');
					break;
				case 2:
					$blue.css('opacity', '0.4');
					break;
				case 3:
					$green.css('opacity', '0.4');
					break;
				case 4:
					$yellow.css('opacity', '0.4');
					break;
				default:
					console.log("dang it default on the swtich");
			}
		}
	}
	//function that creates the random sequence adding one at the time
	function createSequence(){
		for(var i=0; i < count; i++){
			var random = Math.floor(Math.random() * 4) + 1;//create a random number from 1 to 4
			sequenceOfColors[i] = random; //save the random value in the array.
		}
		lightSequence();//light the sequence just generated


		//needs to be at the bottom
		count++;//count will have 1 plus every time craeteSequence method is called.
	}
	//function that the program uses for creating the random order of color
	function gameStart(){
		$btn.hide();
		$message.text('Watch the sequence.');
		$round.text('Current round'+count);
		createSequence();
	}
	//function that takes the user input and compares it with the sequence to see if its right. 
	function gameContinue(){
		clearClicked();//function that brings the opacity so square is not clicked
		//change the text here
		checkClicked();//function that checks the user input 
		//if user misses //this probably has to go inside check clicked
		endGame = true;//when the user misses a color in the order
	}
	//click for the button
	$btn.click(function(){
		//while end game = false keep playing
		gameStart();
		gameContinue();
	});
});