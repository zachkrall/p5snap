var counter = 0;
var bgColor = 0;
var i = 0;

function setup() {
  createCanvas(500, 500);
}

function x1(t){
  return sin(t / 10) * 300 + sin(t / 10) * 200;
}

function y1(t){
  return cos(t / 10) * 300 + cos(t / 15);
}

function x2(t){
  return sin(t / 15) * 100 + sin( t/ 10) * 100;
}

function y2(t){
  return cos(t / 30) * 200 + cos(t/100) * 3;
}

function draw() {
  translate(width*0.5,height*0.5);

  background('#ED225D');
  fill('#FFFFFF');

  for(var v=0;v<30;v++){
    push();
      blendMode(SCREEN);
      strokeWeight(3);
      stroke(255,255,255, 255-v*7);
      line( x1(i+v) , y1(i+v) , x2(i+v) , y2(i+v) );
    pop();
  }
  i+=10;

}
