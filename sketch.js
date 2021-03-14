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

let bgR = 220;
let bgG = 220;
let bgB = 220;

let owo = 0;
let uwu = 1;
let firstCircle;
let initCondition = 0; //initCondition is used as an on/off to disable handleAction() after it's first run
let dismount = 1; //most times dismountComponent() is called, this ensures it's only called once

let showALabyrinth = false;
let showGoldenTies = false;
let showTime = false;
let showDoggo = false;

let img;

function preload() {
  img = loadImage("lacie.JPG");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  setInterval(greyChange, 1000);
  textAlign(LEFT);

  droplet.push(new circle((windowWidth/2), (windowHeight/2), cFirst, 0, firstCircle))

  // droplet[15] = new circle(windowWidth/2, windowHeight/8, cPurple, 0);
  // droplet[16] = new circle(droplet[15].x - 40, droplet[15].y + 160, cPurple, 1);
  // droplet[17] = new circle(droplet[15].x + 60, droplet[15].y + 280, cPurple, 2);
  // droplet[18] = new circle(droplet[15].x + 200, droplet[15].y + 320, cPurple, 3);


  // word[0] = new text("uwu", 50, 50, 50);
  // word[1] = new text("owo", 100, 100, 50);

}

function draw() {
  background(bgR, bgG, bgB);

  drawAllCircles();
  resetFinishedCircles();
  handleMouseHovered();

// pages:
  about();
  mouse();
  time();
  doggo();

}

function drawAllCircles(){
  for(i=0; i<droplet.length; i++){
    droplet[i].delayStart(i);
    droplet[i].gateTimer();
    if(droplet[i].appear == true){
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
      if (shownElements.includes("welcome-container") === false) {shownElements.push("welcome-container")};
      if (shownElements.includes("header") === false) {shownElements.push("header")};
      triggerHold = true;
      document.getElementById("welcome-container").style.display = "grid";
      // document.getElementById("welcome-container").style.opacity = 90 + "%";
      var parentNode = document.getElementById("welcome-container");
      var elementList = parentNode.querySelectorAll('*');
      elementList.forEach(function(item) {
        setTimeout(() => item.style.opacity = 100 + '%', 30)
      })

      // setTimeout(() => dismountComponent(), 9000);
      setTimeout(() => addAllBlueCircles(), 1000)
      uwu = 1;
      initCondition = 1;
    }
  }
}

function dismountComponent(){
    if (shownElements.length > 0 && dismount === 1) {
      for(i=0; i<shownElements.length; i++) {
        document.getElementById(shownElements[i]).style.display = 'none';
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
  droplet[3] = new circle(droplet[0].x + 450, droplet[0].y + 130, cBlue, 3);
}

function addAllRedCircles() {
  droplet[4] = new circle((windowWidth/10)*8, (windowHeight/10)*3, cRed, 0);
  droplet[5] = new circle(droplet[4].x - 50, droplet[4].y + 130, cRed, 1);
  droplet[6] = new circle(droplet[5].x + 120, droplet[5].y + 80, cRed, 2);
}

function addAllGreenCircles() {
  droplet[7] = new circle(windowWidth/10*2.5, windowHeight/5, cGreen, 0);
  droplet[8] = new circle(droplet[7].x + 140, droplet[7].y, cGreen, 1);
  droplet[9] = new circle(droplet[7].x + 230, droplet[7].y + 60, cGreen, 2);
  droplet[10] = new circle(droplet[7].x + 280, droplet[7].y + 230, cGreen, 3);
}

function about(){
  if(showALabyrinth == true){
    document.getElementById("alabyrinth-container").style.display = "grid";
    document.getElementById("alabyrinth-container").style.opacity = 90 + "%";

    // textAlign(LEFT);
    // fill(10);
    // stroke(10);
    // textSize(46);
    // text("Welcome", 50, 90);
    //
    // let u = 50;
    // textSize(32);
    // text("This is what a webpage might look like", 50, 170);
    // text("Without   redirection", 50, 250);
    // text("               menus on two axes", 50, 250+u*1);
    // text("               hyperlinks", 50, 250+u*2);
    // text("Everything you see on the page", 50, 250+u*3 + 30);
    // text("is all there is to explore", 50, 250+u*4+60);
    //
    // textFont("Helvetica");
  }
}

function mouse(){
  if(showGoldenTies == true){
    document.getElementById("goldenties-container").style.display = "grid";
    document.getElementById("goldenties-container").style.opacity = 90 + "%";
    // textAlign(RIGHT);
    // fill(30);
    // stroke(30);
    // textSize(46);
    // text("Are You", windowWidth - 50, 90);
    //
    // let x = 50;
    // textSize(32);
    // text("more conscious of where your mouse is", windowWidth - 50, 170);
    // text("               when the website looks like this?", windowWidth - 50, 250);
    // text("               what's it like?", windowWidth - 50, 250+80*3);
  }
}

function time(){
  if(showTime == true){
    textAlign(LEFT);
    fill(0);
    stroke(0);
    textSize(22);
    let u = 60;
    text("Did you know English has a linear conception of time?", u, 150);
    text("Many languages are similar, but not all", u+100, 250);
    text("Hopi, for example, spoken by the Hopi people (a Native American group)", u+320, 250+100);
    text('Imagines time to be a ""getting later" of everything that has ever been done"', u+150, 250+280);
    text("This project is in part an attempt to imagine what that's like", u+75, 250+540);
  }
}

function doggo(){
  if(showDoggo === true){
    textAlign(CENTER);
    fill(10);
    stroke(10);
    textSize(32);
    text("this is my doggo", windowWidth/2, windowHeight/5);
    text("her name is Lacie", windowWidth/2, (windowHeight/5)*4 + 20);
    imageMode(CENTER);
    image(img, windowWidth/2, windowHeight/2, 225, 300);
  }
}


function clearText(){
  showALabyrinth = false;
  showGoldenTies = false;
  showTime = false;
  showDoggo = false;
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
  else {
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
    console.log(shownElements);
    console.log(dismount);
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
  // let subGreen = droplet.filter(allGreenDroplets);
  // let subPurple = droplet.filter(allPurpleDroplets);

  if(thisColor === cFirst) {
    bgR = 220; bgG = 220; bgB = 220;
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
        setTimeout(() => item.style.opacity = 100 + '%', 30)
      })
      setTimeout(() => addAllRedCircles(), 9000);
      setTimeout(() => addAllGreenCircles(), 9500);
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
        setTimeout(() => item.style.opacity = 100 + '%', 30)
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
      // showTime = true;
      dismountComponent();
    }
    // if(thisPos == 4 && subArray[4].gate == true && subArray[3].gate == true && subArray[2].gate == true && subArray[1].gate == true && subArray[0].gate == true){bgR = cGreen.r5; bgG = cGreen.g5; bgB = cGreen.b5}
    // if(thisPos == 4 && subArray[5].gate == true && subArray[4].gate == true && subArray[3].gate == true && subArray[2].gate == true && subArray[1].gate == true && subArray[0].gate == true){bgR = cGreen.r6; bgG = cGreen.g6; bgB = cGreen.b6; triggerHold = true; showTime = true;}
  } else {showTime = false}

  if(thisColor == cPurple){
    subArray = subPurple;
    if(thisPos == 0 && subArray[0].gate == true){bgR = cPurple.r1; bgG = cPurple.g1; bgB = cPurple.b1}
    if(thisPos == 1 && subArray[1].gate == true && subArray[0].gate == true){bgR = cPurple.r2; bgG = cPurple.g2; bgB = cPurple.b2}
    if(thisPos == 2 && subArray[2].gate == true && subArray[1].gate == true && subArray[0].gate == true){bgR = cPurple.r3; bgG = cPurple.g3; bgB = cPurple.b3}
    if(thisPos == 3 && subArray[3].gate == true && subArray[2].gate == true && subArray[1].gate == true && subArray[0].gate == true){
      bgR = cPurple.r4; bgG = cPurple.g4; bgB = cPurple.b4;
      triggerHold = true;
      showDoggo = true;
    }
  } else {}
}

// function gateTimer(thisDroplet){
//   // console.log(thisDroplet);
//   if(gateTimerStart == true){
//     y--;
//     // console.log(y);
//     if(y <=0){
//       thisDroplet.gate = false;
//       y = gateTime;
//       gateTimerStart = false;
//     }
//   }
// }
