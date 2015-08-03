window.onload = function(){

//Things to work on:
//-Add start button
//-After start is pressed show numbers
//-hide numbers and start counter

buildCanvasSize(16);


};

//Global scope
//var numberOfBlocks;
//var finalSet;


var newBoard;
var newGame;
var testSTR;

function engineOn(){
   var numberOfBlocks = $("#rows").html();
   var divCanvas = document.getElementById('gameCanvas');

   var newSystem = new createNumberSystem(numberOfBlocks, divCanvas);
   newSystem.run();
   
   newGame = new startGame(numberOfBlocks, newSystem.getFinalSet());
   newGame.engineStart();
 //  document.getElementById('5').addEventListener('click', newGame.whenClicked());
}


//on input bar change
$("#points").on("input change", function(){ 
    buildCanvasSize(this.value); 
});

//new game start
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


function startGame(size, finalSet){

    this.sizeIn = size;
    this.finalSetIn = finalSet;

    this.engineStart = (function(){
        this.prepare();
                // this.effects();
                // this.timer();
                // this.onclickready(this.finalSetIn, this.sizeIn);           
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

    this.prepare = (function(){
        $("#messageFirst").html("Try to memorize the numbers! ");
        $("#messageSecond").html("The game will start in ");
        var timerCount = 0;    
        while(timerCount <= 10){
            setInterval(function(){
                if (timerCount > 10){
                    $("#messageFirst").html("");
                    $("#messageSecond").html("");
                    $("#counterStart").html("");
                    return;
                }else{
                    $("#counterStart").html(timerCount);
                    timerCount++;
                }
            },1000); 
        }
        if(timerCount > 10){
            this.effects();
            this.timer();
            this.onclickready(this.finalSetIn, this.sizeIn);                 
        }     
    });

    this.timer = (function(){
        var timerCount = 0;    
        setInterval(function(){
            if (timerCount > 15){
                return;
            }else{
                $("#timer").html(timerCount);
                timerCount++;
            }
        },1000);      
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
        for(var i = 0; i < sizeIn; i += 1) {
            document.getElementById(i).addEventListener('click', onClickCall);
            already[i] = null;
        } 
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
    });
}

