window.onload = function(){

    buildCanvasSize(16);

};

var newBoard;
var newGame;
var testSTR;

function engineOn(){

   delete newSystem;
   delete newGame;

   var numberOfBlocks = $("#rows").html();
   buildCanvasSize(numberOfBlocks);
   var divCanvas = document.getElementById('gameCanvas');

   var newSystem = new createNumberSystem(numberOfBlocks, divCanvas);
   newSystem.run();
   
   newGame = new startGame(numberOfBlocks, newSystem.getFinalSet());
   newGame.engineStart();

}

  //---------------------//
 //---INPUT BAR CHANGE--//
//---------------------//

$("#points").on("input change", function(){ 
    delete newSystem;
    delete newGame;    
    buildCanvasSize(this.value); 
});


function buildCanvasSize(sizeOfCanvas){
    $("#rows").text(sizeOfCanvas);
    var levelDifficulty = $("#rows").text(); 
    switch(levelDifficulty){
        case "16":
            $("#difficulty").html("<font color='#2D882D'>Easy</font>");
            break;
        case "20":
            $("#difficulty").html("<font color='#669999'>Medium</font>");        
            break;    
        case "24":
            $("#difficulty").html("<font color='#980800'>Hard</font>");
            break;
        case "28":
            $("#difficulty").html("<font color='#660033'>Super Hard</font>");            
            break;
    }
    $(".gameBoard").empty();    
    var divCanvas = document.getElementById('gameCanvas');

    //instantiate 
    newBoard = new buildCanvas(sizeOfCanvas, divCanvas);
    newBoard.build();   
}

  //---------------------//
 //-----BUILD CANVAS----//
//---------------------//

function buildCanvas(sizeOfCanvas, div){

    this.size = sizeOfCanvas;
    this.div = div;

    this.build = (function() {
        if(this.size%2 === 0) { 
            for(var i = 0; i < this.size; i += 1) {
                var node = document.createElement('div');
                this.div.appendChild(node);
            } 
            var divObj = this.div.querySelectorAll('div');
            for(var i = 0; i < divObj.length; i += 1) {
                divObj[i].className = 'piece'; 
            }        
        }
    });
}

 //------------------------------//
 //-----CREATE RANDOM NUMBERS----//
//------------------------------//

function createNumberSystem(sizeOfCanvas, div){

    this.size = sizeOfCanvas;
    this.div = div;  
    this.finalSet;  

    this.getFinalSet = (function(){
        return this.finalSet;
    });

    this.run = (function() {
        var firstSet = this.array();
        var secondSet = this.array();
        this.finalSet = firstSet.concat(secondSet);
        this.addID();
    });

    //randomize array
    this.array = (function() {
        var newSize = parseInt(this.size);
        newSize = newSize / 2;
        var firstArray = [];
        var secondArray = [];
        //populate first array
        for(var i = 0; i < newSize; i += 1) {
            firstArray.push(i);
        }
        //randomize, populate second array and splice first array
        for(var i = 0; i < newSize; i += 1) {
            var sizeArray = firstArray.length - 1;
            var random = Math.floor(Math.random() * sizeArray);
            secondArray.push(firstArray[random]);
            firstArray.splice(random, 1);
        }
        return secondArray;       
    });
    this.addID = (function() {
        var divObj = this.div.querySelectorAll('div');
        for(var i = 0; i < divObj.length; i += 1) {
            divObj[i].id = i;
            divObj[i].innerHTML = "";
        }
    });
}

  //---------------------//
 //-- NEW GAME CONTROL--//
//---------------------//

function startGame(size, finalSet){

    this.sizeIn = size;
    this.finalSetIn = finalSet;

    this.engineStart = (function(){
        this.effects();
        this.showNumbers();
        this.onclickready(this.finalSetIn, this.sizeIn);           
    });

    //add jQuery effects
    this.effects = (function(){
         $('.piece').hover(function() {
            if($(this).hasClass('piece subclass')){
                $(this).animate({backgroundColor: '#f2f2f2', color: '#000'}, 120);
            }else{
                $(this).animate({backgroundColor: '#bdc3c7', color: '#1e1e1e'}, 120);
            }           
         }); 
         $('.piece').mouseout(function() {
            if($(this).hasClass('piece subclass')){
                $(this).animate({backgroundColor: '#f2f2f2', color: '#000'}, 120);
            }else{
                $(this).animate({backgroundColor: '#272727', color: '#fff'}, 120);
            }               
         });
    });

    this.showNumbers = (function(){
        //remove and append new button
        $("#startButton").remove();
        var $input = $('<input type="button" value="Restart" onClick = "window.location.reload()"/>');
        $input.appendTo($("#buttonParent"));  

        //disable slide bar
        $("#points").prop( "disabled", true );

        $("#messageFirst").html("You have 5 seconds to memorize the numbers...");
        for(var i = 0; i < this.sizeIn; i += 1) {
            $("#"+i).html(this.finalSetIn[i]);
        }        
    });

    this.onclickready = (function(finalSetIn, sizeIn) {
        var finalSet = finalSetIn;
        var already = [];
        var clickCounter = 0;
        var firstNumb = 0;
        var secondNumb = 0;
        var firstDiv = 0;
        var secondDiv = 0;          
        var firstDIVid = 0;
        var secondDIVid = 0;   
        var timerCount = 0; 
        var points = 0;   

        //Clean up Canvas and add event listeners
        var interval = setInterval(function(){
            if (timerCount > 5){               
                for(var i = 0; i < sizeIn; i += 1) {
                    $("#"+i).html("");
                }   
                for(var i = 0; i < sizeIn; i += 1) {
                    document.getElementById(i).addEventListener('click', onClickCall);
                    already[i] = null;
                }
                $("#messageFirst").html("Now match all the numbers in 25 seconds!");
                clearInterval(interval);
                controller();
                return;
            }else{
                $("#timer").html(timerCount);
                timerCount++;
            }
        },1000);   

        function onClickCall(){
            clickCounter += 1;
            $("#"+this.id).html(finalSet[this.id]);
           // this.innerHTML = 
            if(clickCounter === 1) {
                firstDiv = document.getElementById(this.id);
                firstNumb = finalSet[this.id];
                firstDIVid = this.id;
            }
            if(clickCounter === 2) {
                secondDiv = document.getElementById(this.id);
                secondDIVid = this.id;
                if(firstDiv !== secondDiv) {    
                    secondNumb = finalSet[this.id];
                    //if it matches
                    if(firstNumb === secondNumb) {
                        if(already[firstNumb] !== firstNumb) {
                            already[firstNumb] = firstNumb;
                            clickCounter = 0;
                            document.getElementById(firstDIVid).removeEventListener('click', onClickCall);
                            document.getElementById(secondDIVid).removeEventListener('click', onClickCall);
                            $("#"+firstDIVid).addClass('subclass');
                            $("#"+secondDIVid).addClass('subclass');
                            $("#"+firstDIVid).css( 'cursor', 'default' ); 
                            $("#"+secondDIVid).css( 'cursor', 'default' ); 
                            $("#"+firstDIVid).css( 'background', '#f2f2f2' ); 
                            $("#"+secondDIVid).css( 'background', '#f2f2f2' );   
                            $("#"+firstDIVid).css( 'color', '#000' ); 
                            $("#"+secondDIVid).css( 'color', '#000' );   
                            points += 1;                                                                  
                            return;
                        }
                    }
                    //if it doesn't match
                    if(firstNumb !== secondNumb) {
                        setTimeout(function(){
                            firstDiv.innerHTML = ""; 
                            secondDiv.innerHTML = "";
                            clickCounter = 0;
                        }, 150);
                    }                       
                }
            }            
        }  

        function controller(){
            var intervalGame = setInterval(function(){
                if (timerCount > 20){               
                    for(var i = 0; i < sizeIn; i += 1) {
                        $("#"+i).html(finalSetIn[i]);
                    }   
                    for(var i = 0; i < sizeIn; i += 1) {
                        document.getElementById(i).removeEventListener('click', onClickCall);
                        already[i] = null;
                    }
                    $("#messageFirst").html("Time is up! You scored <b>" + points + " points!</b>");
                    clearInterval(intervalGame);
                    return;
                }else{
                    $("#timer").html(timerCount);
                    timerCount++;
                }
            },1000); 
        }
    });
}

