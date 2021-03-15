// GOAL: hard code all the text, add text fading

let initialS = 1;
let initialFade = 25;
let initialFadeAmount = 3;
let madeIt = 170;
let maxS = 100; //the max size a bubble will ever be visible on screen
let overshootS = 200; //size past maxS after which a circle will reset itself
let delayTime = 40;

let greyChangeSpeed = 30;
let greyChangeDelay = 3;
  let x = greyChangeDelay;
  let triggerHold = false;
  let holdAmount = 3;
let gateTime = 300;
  let y = gateTime;
  let gateTimerStart;

let droplet = [];
let subArray = [];
let shownElements = [];

let bgR = 252;
let bgG = 248;
let bgB = 169;

let owo = 2;
let uwu = 1;
let firstCircle;
let initCondition = 0; //initCondition is used as an on/off to disable handleAction() after it's first run
let dismount = 1; //most times dismountComponent() is called, this ensures it's only called once

let showALabyrinth = false;
let showGoldenTies = false;
let showLacie = false;

let img;

function preload() {
  img = loadImage("lacie.JPG");
}

function setup() {
  var canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent('sketch-holder');
  setInterval(greyChange, 1000);
  textAlign(LEFT);

  droplet.push(new circle((windowWidth/2), (windowHeight/2), cFirst, 0, firstCircle))
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function draw() {
  background(bgR, bgG, bgB);

  drawAllCircles();
  resetFinishedCircles();
  handleMouseHovered();
}

function drawAllCircles(){
  for(i=0; i<droplet.length; i++){
    droplet[i].delayStart(i);
    droplet[i].gateTimer();
    if(droplet[i].appear === true){
      droplet[i].display();
      droplet[i].expand();
      droplet[i].hue();
    }
  }
}

function handleMouseHovered(){
  for(i=0; i<droplet.length; i++){
    let d = dist(mouseX, mouseY, droplet[i].x, droplet[i].y);

    // if a circle is hovered
    if(d < droplet[i].s && droplet[i].s < madeIt){
      changeBackground(droplet[i].c, droplet[i].pos);
      droplet[i].gate = true;
      handleAction(droplet[i].action);
    }
  }
}

function handleAction(action) {
  if (initCondition === 0) {
    if (action === firstCircle) {
      dismountComponent();
      if (shownElements.includes("welcome-container") === false) {shownElements.push("welcome-container")};
      if (shownElements.includes("header") === false) {shownElements.push("header")};
      triggerHold = true;
      document.getElementById("welcome-container").style.display = "grid";
      var parentNode = document.getElementById("welcome-container");
      owo = 1;
      changeBackground();

      var elementList = parentNode.querySelectorAll('*');
      elementList.forEach(function(item) {
        setTimeout(() => item.style.opacity = 100 + '%', 30)
        setTimeout(() => item.style.opacity = 0 + '%', 9000)
        // setTimeout(() => dismountComponent(), 15000)
      })

      // setTimeout(() => dismountComponent(), 9000);
      setTimeout(() => addAllBlueCircles(), 1000);
      uwu = 1;
      initCondition = 1;
    }
  }
  if(showALabyrinth === true){
    document.getElementById("alabyrinth-container").style.display = "grid";
    document.getElementById("alabyrinth-container").style.opacity = 90 + "%";
  }
  if(showGoldenTies === true){
    document.getElementById("goldenties-container").style.display = "grid";
    document.getElementById("goldenties-container").style.opacity = 90 + "%";
  }
  if(showLacie === true){
    document.getElementById("lacie-container").style.display = "grid";
    document.getElementById("lacie-container").style.opacity = 90 + "%";
  }


}

function dismountComponent(){
    if (shownElements.length > 0 && dismount === 1) {
      for(i=0; i<shownElements.length; i++) {
        document.getElementById(shownElements[i]).style.display = 'none';
        var parentNode = document.getElementById(shownElements[i]);
        var elementList = parentNode.querySelectorAll('*');
        elementList.forEach(function(item) {
          item.style.opacity = 0 + '%';
        })
      }
      shownElements.splice(0);
      dismount = 0;
    }
    setTimeout(() => dismount = 1, 1500)
}

function addAllBlueCircles() {
  droplet[0] = new circle((windowWidth/10)*1.3, (windowHeight/10)*6.2, cBlue, 0);
  droplet[1] = new circle(droplet[0].x + 115, droplet[0].y + 80, cBlue, 1);
  droplet[2] = new circle(droplet[0].x + 240, droplet[0].y + 120, cBlue, 2);
  droplet[3] = new circle(droplet[0].x + 390, droplet[0].y + 130, cBlue, 3);
}

function addAllRedCircles() {
  droplet[4] = new circle((windowWidth/10)*8, (windowHeight/10)*3, cRed, 0);
  droplet[5] = new circle(droplet[4].x - 50, droplet[4].y + 130, cRed, 1);
  droplet[6] = new circle(droplet[5].x + 120, droplet[5].y + 80, cRed, 2);
}

function addAllGreenCircles() {
  droplet[7] = new circle(windowWidth/10*2.5, windowHeight/5, cGreen, 0);
  droplet[8] = new circle(droplet[7].x + 140, droplet[7].y + 20, cGreen, 1);
  droplet[9] = new circle(droplet[8].x + 100, droplet[8].y + 60, cGreen, 2);
  droplet[10] = new circle(droplet[7].x + 300, droplet[7].y + 150, cGreen, 3);
}

function addAllPurpleCircles() {
  droplet[11] = new circle((windowWidth/20)*11, (windowHeight/10)*6, cPurple, 0);
  droplet[12] = new circle(droplet[11].x + 80, droplet[11].y + 80, cPurple, 1);
  droplet[13] = new circle(droplet[12].x + 130, droplet[12].y + 30, cPurple, 2);
  droplet[14] = new circle(droplet[13].x + 130, droplet[13].y + 10, cPurple, 3);
}

function clearText(){
  showALabyrinth = false;
  showGoldenTies = false;
  showLacie = false;
}

function resetFinishedCircles(){
  for(i=0; i<droplet.length; i++){
//     this (maxS + x) is a natural setInterval
    if(droplet[i].s >= maxS && droplet[i].s < maxS + overshootS){
      droplet[i].hide();
    }
    if(droplet[i].s >= maxS + overshootS){
      droplet[i].s = initialS;
      droplet[i].fade = initialFade;
//    the fadeAmount resets naturally under hue();
      droplet[i].appear = true;

    }
  }
}

function greyChange(){
  if(owo === 0){

    clearText();

    if(bgR < 200){bgR = bgR + greyChangeSpeed; opacityChange(60);}
    if(bgR < 215 && bgR >= 200){bgR = bgR + 5; opacityChange(30)}
    if(bgR < 220 && bgR >= 215){bgR = bgR + 1; opacityChange(0); dismountComponent();}
    if (bgR > 220 && bgR <= 225){bgR = bgR - 1; opacityChange(0); dismountComponent();}
    if (bgR > 225 && bgR <= 240){bgR = bgR - 5; opacityChange(30);}
    if (bgR > 240){bgR = bgR - greyChangeSpeed; opacityChange(60);}

    if(bgG < 200){bgG = bgG + greyChangeSpeed}
    if(bgG < 215 && bgG >= 200){bgG = bgG + 5}
    if(bgG < 220 && bgG >= 215){bgG = bgG + 1}
    if (bgG > 220 && bgG <= 225){bgG = bgG - 1}
    if (bgG > 225 && bgG <= 240){bgG = bgG - 5}
    if (bgG > 240){bgG = bgG - greyChangeSpeed}

    if(bgB < 200){bgB = bgB + greyChangeSpeed}
    if(bgB < 215 && bgB >= 200){bgB = bgB + 5}
    if(bgB < 220 && bgB >= 215){bgB = bgB + 1}
    if (bgB > 220 && bgB <= 225){bgB = bgB - 1}
    if (bgB > 225 && bgB <= 240){bgB = bgB - 5}
    if (bgB > 240){bgB = bgB - greyChangeSpeed}
  }
  else if (owo === 1){
    if(triggerHold === true){
      x = greyChangeDelay + holdAmount;
      triggerHold = false;
    }
    else {
      x--;
      if(x <= 0){
        owo = 0;
        x = greyChangeDelay;
      }
    }
  }
}

function opacityChange(opacity) {
  // so shownElements is going to be an array made of css Containers,
  // such that we can getElementById and hard style change the opacity
  // to an amount set by the input, which will be passed on by greyChange()
  for(i=0; i<shownElements.length; i++){
    document.getElementById(shownElements[i]).style.opacity = opacity + "%";
  }
}

function mouseClicked(){
  var parentNode = document.getElementById("alabyrinth-container");
  var elementList = parentNode.querySelectorAll('*');
    console.log(shownElements);
    console.log(dismount);
    console.log('opacity values:', parentNode.style.opacity)
}

function mouseWheel(){
  console.log(x);
}


function allRedDroplets(thisColor){
  if(thisColor.c == cRed){
    return true;
  } else {return false}
}

function allBlueDroplets(thisColor){
  if(thisColor.c == cBlue){
    return true;
  } else {return false}
}

function allGreenDroplets(thisColor){
  if(thisColor.c == cGreen){
    return true;
  } else {return false}
}

function allPurpleDroplets(thisColor){
  if(thisColor.c == cPurple){
    return true;
  } else {return false}
}



function changeBackground(thisColor, thisPos){
  owo = 1;

  // then give me an array with all the circles of that color
  let subRed = droplet.filter(allRedDroplets);
  let subBlue = droplet.filter(allBlueDroplets);
  let subGreen = droplet.filter(allGreenDroplets);
  let subPurple = droplet.filter(allPurpleDroplets);

  if(thisColor === cFirst) {
    bgR = 255; bgG = 179; bgB = 220;
  }

  if(thisColor == cBlue){
    subArray = subBlue;
    if(thisPos == 0 && subArray[0].gate == true){bgR = cBlue.r1; bgG = cBlue.g1; bgB = cBlue.b1}
    if(thisPos == 1 && subArray[1].gate == true && subArray[0].gate == true){bgR = cBlue.r2; bgG = cBlue.g2; bgB = cBlue.b2}
    if(thisPos == 2 && subArray[2].gate == true && subArray[1].gate == true && subArray[0].gate == true){bgR = cBlue.r3; bgG = cBlue.g3; bgB = cBlue.b3}
    if(thisPos == 3 && subArray[3].gate == true && subArray[2].gate == true && subArray[1].gate == true && subArray[0].gate == true){
      bgR = cBlue.r4; bgG = cBlue.g4; bgB = cBlue.b4;
      triggerHold = true;
      showALabyrinth = true;
      dismountComponent();
      if (shownElements.includes("alabyrinth-container") === false) {shownElements.push("alabyrinth-container")};
      uwu = 1;
      var parentNode = document.getElementById("alabyrinth-container");
      var elementList = parentNode.querySelectorAll('*');
      elementList.forEach(function(item) {
        setTimeout(() => item.style.opacity = 100 + '%', 30);
      })
      setTimeout(() => addAllRedCircles(), 3000);
      setTimeout(() => addAllGreenCircles(), 3500);
      setTimeout(() => addAllPurpleCircles(), 4000);
    }
  } else {showALabyrinth = false}

  if(thisColor == cRed){
    subArray = subRed;
    if(thisPos == 0 && subArray[0].gate == true){bgR = cRed.r1; bgG = cRed.g1; bgB = cRed.b1}
    if(thisPos == 1 && subArray[1].gate == true && subArray[0].gate == true){bgR = cRed.r2; bgG = cRed.g2; bgB = cRed.b2}
    if(thisPos == 2 && subArray[2].gate == true && subArray[1].gate == true && subArray[0].gate == true){
      bgR = cRed.r3; bgG = cRed.g3; bgB = cRed.b3;
      triggerHold = true;
      showGoldenTies = true;
      dismountComponent();
      if (shownElements.includes("goldenties-container") === false) {shownElements.push("goldenties-container")};
      var parentNode = document.getElementById("goldenties-container");
      var elementList = parentNode.querySelectorAll('*');
      elementList.forEach(function(item) {
        setTimeout(() => item.style.opacity = 100 + '%', 30);
      })
    }
  } else {showGoldenTies = false}

  if(thisColor == cGreen){
    subArray = subGreen;
    if(thisPos == 0 && subArray[0].gate == true){bgR = cGreen.r1; bgG = cGreen.g1; bgB = cGreen.b1}
    if(thisPos == 1 && subArray[1].gate == true && subArray[0].gate == true){bgR = cGreen.r2; bgG = cGreen.g2; bgB = cGreen.b2}
    if(thisPos == 2 && subArray[2].gate == true && subArray[1].gate == true && subArray[0].gate == true){bgR = cGreen.r3; bgG = cGreen.g3; bgB = cGreen.b3}
    if(thisPos == 3 && subArray[3].gate == true && subArray[2].gate == true && subArray[1].gate == true && subArray[0].gate == true){
      bgR = cGreen.r4; bgG = cGreen.g4; bgB = cGreen.b4;
      triggerHold = true;
      showLacie = true;
      dismountComponent();
      if (shownElements.includes("lacie-container") === false) {shownElements.push("lacie-container")};
      var parentNode = document.getElementById("lacie-container");
      var elementList = parentNode.querySelectorAll('*');
      elementList.forEach(function(item) {
        setTimeout(() => item.style.opacity = 100 + '%', 30);
      })
    }
  } else {showLacie = false}

  if(thisColor == cPurple){
    subArray = subPurple;
    if(thisPos == 0 && subArray[0].gate == true){bgR = cPurple.r1; bgG = cPurple.g1; bgB = cPurple.b1}
    if(thisPos == 1 && subArray[1].gate == true && subArray[0].gate == true){bgR = cPurple.r2; bgG = cPurple.g2; bgB = cPurple.b2}
    if(thisPos == 2 && subArray[2].gate == true && subArray[1].gate == true && subArray[0].gate == true){bgR = cPurple.r3; bgG = cPurple.g3; bgB = cPurple.b3}
    if(thisPos == 3 && subArray[3].gate == true && subArray[2].gate == true && subArray[1].gate == true && subArray[0].gate == true){
      bgR = cPurple.r4; bgG = cPurple.g4; bgB = cPurple.b4;
      triggerHold = true;
    }
  } else {}
}
