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

	//test variables
	var index = round-1;
	var times = 0;
	//-----------------//end variables//--------------------------


	//function that will run something an x number of times incrementing by one
	function runXtimes(){
		times++;
		return times;//returns 0 first time its called then it will be 1 and so on.
	}
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
			index = round-1;
			
			if(currentValue == sequenceOfColors[index]){//if the value selected  matches color displayed
				index++;//index incrementing moved here.
				console.log("you clicked right");
				//***********Condition that I need to fix so the program runs 1 time then 2 times and so on
				//may be add a settimeout to give the user some time to enter
				//and use the time out.
				//setTimeout()

				if(count < round-1){//runxTimes will be 1 so we dont run this the first time..  next time once, and so on.
					//setTimeout(function(){//time out here didnt work try outside the click function.
						//we just need to fix the waiting time between the user clicks 
					checkClicked();//run again
					
					//},3000);
					console.log("inside condition repeat");
					count++;
				}
				else{
					round++;//advance//leave this one increment round at the end.
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
			
			console.log(index+" index");
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
			index++; //we need the index to keep changing so the next rounds the array is traversed
			count++;
			console.log("round is: "+round+" count is : "+count);
			if(count<round){
				gameStart();
				console.log("this needs to run "+ round +" times. running gameStart again");
			}
			else{
				console.log("continuing game for user input");
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
		count=0; //restarting to 0 to keep following the sequence

	}
	//click for the button
	$btn.click(function() {
		$btn.hide();
		createSequence(); //call function to create the sequence just once
		gameStart();

	});
});