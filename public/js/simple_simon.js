//button  clicked start with 1 random light display round number change text of the html
//save the values randomized in order, make sure the user inputs them in order
//make something that stops the game when user misses?

$(document).ready(function() {
	"use strict";
	//variables for the game
	//*jquery variables
	var $red = $('#red');
	var $blue = $('#blue');
	var $green = $('#green');
	var $yellow = $('#yellow');
	var $btn = $('#startGame');
	var $message = $('#message');
	var $round = $('#currentRound');
	var $colors = $('.color');
	var $divColors = $('.divColors');
	//*jquery variables
	var maxLevel = 50;//level at which the sequence is pre-generated
	var sequenceOfColors = []; //array that will hold the things in order
	var count = 1; //counts the number of rounds and controls the array depending on round level
	var endGame = false; //variable shouold test whether or not the user loses
	var timeBetweenColors = 1000; //1 second between colors selected by the game.(interval)
	var lightingColor = 1000; //1 second between seeing a color light up and go off(timeout)
	var intervalGame; //interval that takes care of the timming between color selection from the game.
	var timeOutBetweenDisplayColors; //timeOutvariable for the time between colors picked
	var timeOutvalUser = 1000; //timeout variable for the user to input the order is gonna be calculated depending on the round *count
	var timeOutUser;
	//-----------------//end variables//--------------------------
	//function that clears the buttons
	function clearClicked(color,delay) {
		//console.log("clearing right away clicked");
		// $colors.css('opacity', '1');
		$(color).animate({
			opacity : 1
		}, delay).animate({
			opacity: 0.25
		}, delay);
	}
	//function that checks the user input
	function checkClicked() {
		//it should probably have a timer between divs pressed
		//function local that waits one second and then gives the turn to the user to input
		var localTimeOutWait1Second = setTimeout(function() {
			//change the text so the user knows is his turn
			$message.text('Repeat the sequence as you just saw.');
			$round.text('Current round' + count);
			
			
			$divColors.on('click', function(e){
				console.log("clicked");
			});
			$divColors.off('click');
			//if user misses 
			//clearInterval(intervalGame);
			//clearClicked();

			/************////implement later max time out for a round********// 
			//this function will be the end of the game if the user takes too long to press the colors
			// timeOutUser = setTimeout(function() {
			// 		alert('time is UP!');
			// 		$message.text('GAME OVER!');
			// 		endGame = true;//end the game condition
			// 		clearTimeout(timeOutUser);
			// 	},
			// 	timeOutvalUser * count); //times count to increase the time depending on the round Ex round 5 = 5 seconds
		}, 1000);

		//it has to check that the order matches too.
	}
	//function that light the sequence that is randomly generated
	function lightSequence() {
		for (var i = 0; i < count; i++) {
			timeOutBetweenDisplayColors = setTimeout(function() {
				//takes whatever color was randomed in the sequence
				switch (sequenceOfColors[i]) {
					/*
					case 1:red
					case 2: blue
					case 3: green
					case 4: yellow
					*/
					//probably need to add a pause between each pressed to give the user time.
					case 1:
						//$red.css('opacity', '0.4');
						clearClicked('#red', 500);
						break;
					case 2:
						// $blue.css('opacity', '0.4');
						clearClicked('#blue', 500);
						break;
					case 3:
						// $green.css('opacity', '0.4');
						clearClicked('#green', 500);
						break;
					case 4:
						// $yellow.css('opacity', '0.4');
						clearClicked('#yellow', 500);
						break;
					default:
						console.log(sequenceOfColors[i]);
						console.log("dang it default on the swtich");
						break;
				}
			}, lightingColor);
			// clearClicked();
		}
	}
	//function that creates the random sequence adding 100 random levels
	function createSequence() {
		for (var i = 0; i < maxLevel; i++) {
			var random = Math.floor(Math.random() * 4) + 1; //create a random number from 1 to 4
			sequenceOfColors.push(random); //save the random value in the array.
		}
	}
	//function that the program uses for creating the random order of color
	function gameStart() {	
		$message.text('Watch the sequence.');
		$round.text('Current round' + count);
		lightSequence(); //light the sequence just generated

		//gameContinue();
	}
	//function that takes the user input and compares it with the sequence to see if its right. 
	function gameContinue() {
		clearClicked(); //function that brings the opacity so square is not clicked
		//change the text here
		checkClicked(); //function that checks the user input 
		//if user misses //this probably has to go inside check clicked
		// endGame = true; //when the user misses a color in the order
	}
	//click for the button
	$btn.click(function() {
		$btn.hide();
		createSequence();//call function to create the sequence just once
		intervalGame = setInterval(gameStart, timeBetweenColors); //interval that controls the game start and the machine part of the game
		//timeOutUser = setTimeout(gameContinue, timeUserInput);//time out that will give th
	});
});