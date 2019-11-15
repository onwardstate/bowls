var canvas = document.getElementById("canvas");
var context = canvas.getContext('2d');
var width = 500, height = 500;
var bracketImg = new Image();
bracketImg.src = "cfbChart.jpg";
imgWidth = 4000;
imgHeight = 4500;

var xVar = 0;
var yVar = -2000;

var xVel = -20;
var yVel = -20;

var xAcc = -.1;
var yAcc = -.1;

var jerk = 0;

var xPos = 0;
var yPos = 4;

var interval = 500;
var dir = "";
var shouldMove = false;
var isEnd = false;
var isStart = true;
var inRange = true;
var isClicked = false;

document.addEventListener("click", clicked);
function clicked(e){
    var rect = canvas.getBoundingClientRect();
    if (!shouldMove){
            
        var mouseX = e.clientX - rect.left;
        var mouseY = e.clientY - rect.top;

        xVel = -20;
        yVel = -20; //resetting yVel

        winButtonX = 2/3 * interval;
        winButtonY = 1/6 * interval;
        lossButtonX = winButtonX;
        lossButtonY = winButtonX;
        buttonWidth = 1/3 * interval;
        buttonHeight = 1/6 * interval;

        startButtonX = 1/4 * interval;
        startButtonY = 3/4 * interval;
        startButtonWidth = 1/2 * interval;
        startButtonHeight = 1/4 * interval;

        inRange = true;
        if (xPos <= 0 || xPos >= 7){
            inRange = false;
        }
                

        if (mouseX > winButtonX && mouseX < (winButtonX + buttonWidth) && mouseY > winButtonY && mouseY < (winButtonY + buttonHeight) && !isEnd && inRange){
            if (xPos == 5 && yPos == 0){
                shouldMove = true;
                yVel = Math.abs(yVel) * -1;
                xVel = 0;
                yPos += 2; //toilet bowl
                xAcc = -1 * Math.abs(xAcc)
                yAcc = Math.abs(yAcc)
            }
            else{
                dir = "up";
                shouldMove = true;
                yVel = Math.abs(yVel);
                xPos += 2;
                yPos -= 2;
                xAcc = -1 * Math.abs(xAcc)
                yAcc = -1 * Math.abs(yAcc)
            }
        }
        else if (mouseX > lossButtonX && mouseX < (lossButtonX + buttonWidth) && mouseY > lossButtonY && mouseY < (lossButtonY + buttonHeight) && !isEnd && inRange){
            if (xPos == 5){
                shouldMove = true;
                yVel = 2 * Math.abs(yVel) * -1;
                if (yPos > 4){
                    yVel *= -1;
                }
                xPos += 2;
                if (yPos == 2){
                    yPos += 2; //rose bowl
                    yVel = -20;
                }
                else{
                    yPos = 6; //toilet bowl
                    xVel = -20;
                }
                
                xAcc = -1 * Math.abs(xAcc)
                yAcc = Math.abs(yAcc)
            }
            else{
                dir = "down";
                shouldMove = true;
                yVel = Math.abs(yVel) * -1;
                xPos += 2;
                yPos += 2;
                xAcc = -1 * Math.abs(xAcc)
                yAcc = Math.abs(yAcc)
            }
            
        }
        else if((mouseX > startButtonX && mouseX < (startButtonX + startButtonWidth) && mouseY > startButtonY && mouseY < (startButtonY + startButtonHeight))){ //start and start over buttons will be same position
            if (isStart){
                shouldMove = true;
                yVel = 0;
                xPos += 1;
                isStart = false;
            }
            if (isEnd){
                shouldMove = true;
                xVel = 0;
                yVel = 0;
                xPos = 0;
                yPos = 4;
                xVar = 0;
                yVar = -2000;
                isEnd = false;
                isStart = true;
                /*
                shouldMove = true;
                xVel = 50;
                yVel = 50;
                
                if (yPos < 4){
                    yVel *= -1;
                }

                xPos = 0;
                yPos = 4;
                
                isEnd = false;
                isStart = true;
                */
            }
        }
        
        if (xPos == 7){
            isEnd = true;
        }
    }
}


function draw(){
    context.drawImage(bracketImg, xVar, yVar, imgWidth, imgHeight);
    requestAnimationFrame(draw);

    var xEnd = ((-1) * (xPos) * interval);
    var yEnd = ((-1) * (yPos) * interval);
    if (shouldMove){
        xVar += xVel;
        yVar += yVel;
        //xVel += xAcc;
        //yVel += yAcc;
        
        /*if(xVar <= end / 2 && xAcc < 0){
            xAcc *= -1;
            yAcc *= -1;
        }*/
        if (yVar == yEnd){
            yVel = 0;
        }
        if (xVar == xEnd){
            xVel = 0;
        }
        if (yVar == yEnd && xVar == xEnd){
            shouldMove = false;
        }

    }
}

draw();
