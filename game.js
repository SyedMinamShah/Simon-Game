var userClickedPattern = [];
var buttonColors = ["red", "blue", "green", "yellow"];
var started = false;
var gamePattern =[];

var level=0;

$(document).keydown(function()
{
   if(!started)
   {
      nextSequence();
      started=true;
   }
})

function nextSequence(){
   $("#level-title").text("Level "+level);
   level++;
   var randomNumber = Math.floor(Math.random()*4);
   var randomColor = buttonColors[randomNumber];
   gamePattern.push(randomColor);
   $("."+randomColor).fadeOut(100).fadeIn(100);
   playAudio(randomColor);
   animatePress(randomColor);
}




$(".btn").click(function(){
   var userChosenColor = $(this).attr("id");
   userClickedPattern.push(userChosenColor);
   animatePress(userChosenColor);
   playAudio(userChosenColor);
   checkAnswer(userClickedPattern.length-1);
});


function animatePress(value){
   $("#"+value).addClass("pressed");
   setTimeout(function(){
      $("#"+value).removeClass("pressed");
   },100);
}

function checkAnswer(currentLevel){
 if(userClickedPattern[currentLevel]==gamePattern[currentLevel])
 {
   if(userClickedPattern.length==gamePattern.length){
   setTimeout(function (){nextSequence();},1000);
   userClickedPattern=[];
   }
 }
 else{
   $("body").addClass("game-over");
   setTimeout(function(){
      $("body").removeClass("game-over");
   },200);
   $("h1").text("Game Over, Press Any Key to Restart");
   startOver();
 }
}

function playAudio(sound)
{
   var audio =new Audio("sounds/"+sound+".mp3");
   audio.play();
}

function startOver(){
   level=0;
   gamePattern=[];
   started=false;
   userClickedPattern=[];
}

