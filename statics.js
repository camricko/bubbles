
class circle {
  constructor(x, y, c, pos, action){
    this.x = x;
    this.y = y;
    this.s = initialS;
    this.pos = pos;
    this.c = c;
    this.hovered = false;
    this.timer = 1;

    this.r = c.r;
    this.g = c.g;
    this.b = c.b;
    this.fade = initialFade;
    this.fadeAmount = initialFadeAmount;

    this.appear = false;
    this.counter = 0;

    this.gate = false;

    this.action = action;
  }

  display(){
    if(this.appear === true){
      fill(this.r, this.g, this.b, this.fade)
    } else {
      noFill()
    }
    noStroke();
    ellipse(this.x, this.y, this.s);
  }

  expand(){
    this.s = this.s + 1.2;
  }

  hue(){
    if(this.s > (maxS/3)*1.1){
      this.fadeAmount = -3;
    } else {
      this.fadeAmount = initialFadeAmount;
    }
    this.fade = this.fade + this.fadeAmount;
  }

  hide(){
    this.appear = false;
  }

  delayStart(i){
    this.startTime = i*delayTime;
    this.counter = this.counter + 1;
    if(this.counter >= this.startTime){
      this.appear = true;
    }
  }

  gateTimer(){
    if (this.gate == true){
      y--;
      if(y <= 0){
        this.gate = false;
        y = gateTime;
      }
    }
  }
}

// class text {
//   constructor(words, x, y, size){
//     this.words = words;
//     this.x = x;
//     this.y = y;
//     this.size = size;
//   }
//
//   display(){
//     fill(0);
//     stroke(0);
//     text(this.words, this.x, this.y);
//
//     // textFont("Helvetica");
//     textSize(this.size);
//   }
// }

var cFirst = {r: 40, g: 140, b: 240}

var cBlue = {r: 40, g: 140, b: 240,
             r1: 201, g1: 222, b1: 242,
             r2: 166, g2: 201, b2: 234,
             r3: 146, g3: 190, b3: 232,
             r4: 146, g4: 190, b4: 232,
            };
var cRed = {r: 255, g: 20, b: 20,
            r1: 242, g1: 201, b1: 201,
            r2: 242, g2: 177, b2: 177,
            r3: 245, g3: 144, b3: 144,
            r4: 232, g4: 90, b4: 90,
            r5: 240, g5: 60, b5: 60,
            };
var cGreen = {r: 35, g: 168, b: 66,
              r1: 184, g1: 230, b1: 187,
              r2: 158, g2: 222, b2: 162,
              r3: 118, g3: 207, b3: 124,
              r4: 87, g4: 194, b4: 94,
              r5: 84, g5: 204, b5: 92,
              r6: 68, g6: 179, b6: 85,
            };
var cPurple = {r: 205, g: 64, b:320,
              r1: 221, g1: 174, b1: 232,
              r2: 218, g2: 153, b2: 232,
              r3: 217, g3: 136, b3: 235,
              r4: 212, g4: 113, b4: 235,
            };
