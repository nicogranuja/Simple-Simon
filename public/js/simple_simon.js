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
	//*jquery variables
	var maxLevel = 50; //level at which the sequence is pre-generated
	var sequenceOfColors = []; //array that will hold the things in order
	var count = 0; //counts the number of rounds and controls the array depending on round level
	var round = 1;
	var endGame = false; //variable shouold test whether or not the user loses
	var timeBetweenColors = 1000; //1 second between colors selected by the game.(interval)
	var lightingColor = 1000; //1 second between seeing a color light up and go off(timeout)
	var intervalGame; //interval that takes care of the timming between color selection from the game.
	var timeOutBetweenDisplayColors; //timeOutvariable for the time between colors picked
	var timeOutvalUser = 1000; //timeout variable for the user to input the order is gonna be calculated depending on the round *count
	var timeOutUser;
	//-----------------//end variables//--------------------------
	//function that clears the buttons
	function lightColor(color, delay) {
		$(color).animate({
			opacity: .25
		}, delay).animate({
			opacity: 1
		}, delay);
	}
	//function that checks the user input
	function checkClicked() {
		$colors.click(function(e){
			// console.log($(this).attr('value'));
			var currentValue = $(this).attr('value');
			var lightThisOne = "#" + $(this).attr('id');
			lightColor(lightThisOne, 300);

			console.log("round is "+round);
			console.log("coutn is "+count);
			if(currentValue == sequenceOfColors[round-1]){//if the value selected  matches color displayed
				console.log("inside first if");
				console.log("you clicked right");
				if(count<round-1){//increment the number of times run by 1, first time should be run just once count =0 round=1
					console.log("inside condition repeat");
					count++;
					checkClicked();//run again
				}
				else{
					console.log("");
					//round++;//advance
					gameStart();//keep playing
				}
			}
			else{
				console.log("end game");
				//end the game
			}
		});
	}
	//function that light the sequence that is randomly generated
	function lightSequence() {
		setTimeout(function(){ 
			console.log(round-1);
			var index = round-1;
			switch (sequenceOfColors[index]) {
				//probably need to add a pause between each pressed to give the user time.
				case 1:
					lightColor('#red', 300);
					console.log("red");
					break;
				case 2:
					lightColor('#blue', 300);
					console.log("blue");					
					break;
				case 3:
					lightColor('#green', 300);
					console.log("green");
					break;
				case 4:
					lightColor('#yellow', 300);
					console.log("yellow");
					break;
				default:
					console.log("dang it default on the swtich");
					break;
			}
			//change index count*********///
			index++;
			count++;
			//console.log("round is: "+round+" count is : "+count);
			if(count<round){
				gameStart();
			}
			else{
				gameContinue();

			}
			
		}, 1000);
			
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
		$round.text('Current round: ' + round);
		lightSequence(); //light the sequence just generated
		
		//count=0;//???
	}
	//function that takes the user input and compares it with the sequence to see if its right. 
	function gameContinue() {
		$message.text('Repeat what you just saw.');
		$round.text('Current round: ' + round);
		checkClicked();//checks the user click
		
		//console.log(round-1+" we might want this value to be index");
		count=0;

	}
	//click for the button
	$btn.click(function() {
		$btn.hide();
		createSequence(); //call function to create the sequence just once
		gameStart();

	});
});