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
	var $divColors = $('#divColors');
	var arr = [$red,$yellow,$blue,$green];
	//*jquery variables
	var maxLevel = 50; //level at which the sequence is pre-generated
	var sequenceOfColors = []; //array that will hold the things in order
	var count = 0; //counts the number of rounds and controls the array depending on round level
	var round = 1; //initial round


	//-----------------//end variables//--------------------------
	//animation 'bounce' played at the beginning of the game
	function startAnimation() {
		for(var i=0; i < arr.length; i++){
			arr[i].animate({
				bottom: '80px'
			}, 430).animate({
				bottom:'0px'
			}, 430).animate({
				bottom:'40px'
			}, 520).animate({
				bottom:'0px'
			}, 520);
		}
	}
	//lose animation when the game ends
	function loseAnimation() {
		var delay = 700;
		var localCount = 2; //will run twice the animation
		var localInterval = setInterval(function() {
			var audio = new Audio('Sounds/lose.mp3'); //lose audio
			lightColor('#red', delay);
			lightColor('#blue', delay);
			lightColor('#yellow', delay);
			lightColor('#green', delay);
			//changing the message and show the last round
			$message.text('You Lose :(');
			$round.text('In round' + round);
			localCount--;
			if (localCount == 0) { //after two times clear interval 
				audio.play();//playing the lose audio
				clearInterval(localInterval);
				//text and show button again to restart the game
				$btn.text('restart');
				$btn.fadeIn();
				$btn.click(function(){
					location.reload();
				});
			}
		}, 1000);

	}
	//function that lights the divs on and off
	function lightColor(color, delay) {
		$(color).animate({
			opacity: .25
		}, delay).animate({
			opacity: 1
		}, delay);
	}
	//function that checks the user input
	function checkClicked() {
		$colors.click(function(e) {
			//variables that get the current value of the div that is clicked
			var currentValue = $(this).attr('value');
			//variable that gets the id of the div that needs to be turned on
			var lightThisOne = "#" + $(this).attr('id');
			//variable holds the audio
			var audio = new Audio('Sounds/' + currentValue + '.mp3');
			//light and play audio
			lightColor(lightThisOne, 300);
			audio.play();

			if (currentValue == sequenceOfColors[count]) { //if the value selected  matches color displayed
				if (count < round - 1) {
					count++;
				} else {
					count = 0; //reseting the count
					round++; //advance round
					gameStart(); //keep playing
				}
			} else {
				loseAnimation(); //animation that will be played when the user loses
				$colors.off('click');
			}
		});
	}
	//function that light the sequence that is randomly generated
	function lightSequence() {
		setTimeout(function() {
			//variable that hold the correspondent sound for each color
			var audio = new Audio('Sounds/' + sequenceOfColors[count] + '.mp3');
			switch (sequenceOfColors[count]) {
				//for each case change the color and play the sound
				case 1:
					lightColor('#red', 300);
					audio.play();
					break;
				case 2:
					lightColor('#blue', 300);
					audio.play();
					break;
				case 3:
					lightColor('#green', 300);
					audio.play();
					break;
				case 4:
					lightColor('#yellow', 300);
					audio.play();
					break;
				default:
					console.log("dang it default on the swtich");
					break;
			}
			count++; //count controls the flow of the game when compared to the round number.

			if (count < round) { //when the count is less than round
				gameStart(); //we go back and execute the game again for the next color
			} else {
				gameContinue(); //we are ready for user input
			}

		}, 1000);

	}
	//function that creates the random sequence adding 100 random levels
	function createSequence() {
		for (var i = 0; i < maxLevel; i++) {
			var random = Math.floor(Math.random() * 4) + 1; //create a random number from 1 to 4
			sequenceOfColors.push(random); //save the random value in the array.
		}
		console.log(sequenceOfColors);

	}
	//function that the program uses for creating the random order of color
	function gameStart() {
		$colors.off('click'); //condition that takes care of the user not clicking buttons when the game is running
		$message.text('Watch the sequence.');
		$round.text('Current round: ' + round);
		lightSequence(); //light the sequence just generated

	}
	//function that takes the user input and compares it with the sequence to see if its right. 
	function gameContinue() {
		$message.text('Repeat what you just saw.');
		$round.text('Current round: ' + round);
		checkClicked();
		count = 0; //restarting to 0 to keep following the sequence
	}
	//click for the button
	$btn.click(function() {
		startAnimation();
		$btn.hide();
		createSequence(); //call function to create the sequence just once
		gameStart();

	});
});