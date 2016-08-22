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
	function loseAnimation(){
		var delay = 700;
		var localCount = 2;//will run twice the animation
		var localInterval = setInterval(function(){
			lightColor('#red', delay);
			lightColor('#blue', delay);
			lightColor('#yellow', delay);
			lightColor('#green', delay);
			localCount--;
			if(localCount==0){//after two times 
				var audio = new Audio('Sounds/lose.mp3');//lose audio
				$message.text('You Lose :(');
				$round.text('In round'+round);
				audio.play();	
				clearInterval(localInterval);
			}
		}, 1000);
		
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
		var countDown=round;
		$colors.click(function(e){
		// console.log($(this).attr('value'));
		var currentValue = $(this).attr('value');
		var lightThisOne = "#" + $(this).attr('id');
		var audio = new Audio('Sounds/'+currentValue+'.mp3');
		lightColor(lightThisOne, 300);
		audio.play();

		console.log("round is "+round);
		console.log("coutn is "+count);
		var i = 0;
		//coutndown will take care of knowing how many times this has to go through
		if(currentValue == sequenceOfColors[index-1]){//if the value selected  matches color displayed
			if(count < round-1){
				checkClicked();//run again
				console.log("inside condition repeat");
				count++;
			}
			else{
				clearInterval(intervalGame);
				gameStart();//keep playing
				round++;//advance//leave this one increment round at the end.
				return;
			}
		}
		else{
			console.log("the sequence"+ sequenceOfColors);
			console.log("you clicked "+ currentValue+ " color in the sequence is: "+ sequenceOfColors[index]);
			console.log("end game");
			loseAnimation();
			$colors.off('click');
			}
		});			
	}
	//function that light the sequence that is randomly generated
	function lightSequence() {
		setTimeout(function(){ 
			var audio = new Audio('Sounds/'+sequenceOfColors[index]+'.mp3');
			
			console.log(index+" index");
			switch (sequenceOfColors[index]) {
				//probably need to add a pause between each pressed to give the user time.
				case 1:
					lightColor('#red', 300);
					audio.play();
					console.log("red");
					break;
				case 2:
					lightColor('#blue', 300);
					audio.play();
					console.log("blue");					
					break;
				case 3:
					lightColor('#green', 300);
					audio.play();
					console.log("green");
					break;
				case 4:
					lightColor('#yellow', 300);
					audio.play();
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
		$colors.off('click');//condition that takes care of the user not clicking buttons when the game is running
		$message.text('Watch the sequence.');
		$round.text('Current round: ' + round);
		lightSequence(); //light the sequence just generated
		
		//count=0;//???
	}
	//function that takes the user input and compares it with the sequence to see if its right. 
	function gameContinue() {
		$message.text('Repeat what you just saw.');
		$round.text('Current round: ' + round);
		checkClicked();
		count=0; //restarting to 0 to keep following the sequence

	}
	//click for the button
	$btn.click(function() {
		$btn.hide();
		createSequence(); //call function to create the sequence just once
		gameStart();

	});
});