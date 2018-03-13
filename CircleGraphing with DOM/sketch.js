var radius;
var rotation = 0;
var gfx;
var HDgfx;
var forceUpdate = true;

var stepSl;
var rotSl;
var densSl;
var thickSl;

function setup() {
  createCanvas(windowHeight, windowHeight); 
 
  //Step Slider
  stepSlider = createSlider(0, 360, 2, 1);
  stepSlider.position(10, 50);
  stepSlider.style('width', '180px');
  
  //Rotation Slider
  rotSlider = createSlider(0, 360, 0, 1);
  rotSlider.position(10, 80);
  rotSlider.style('width', '180px');
  
  //Density Slider
  densSlider = createSlider(.25, 8, 1, .25);
  densSlider.position(10, 110);
  densSlider.style('width', '180px');
  
  //Thickness Slider
  thickSlider = createSlider(1, 8, 1, 1);
  thickSlider.position(10, 140);
  thickSlider.style('width', '180px');  

  colorMode(HSB, 360);
  
  stepSl = stepSlider.value();
  rotSl = rotSlider.value();
  densSl = densSlider.value();
  thickSl = thickSlider.value();
  
  gfx = createGraphics(width, height);
  gfx.translate(width/2, height/2);
  
  HDgfx = createGraphics(width*10, height*10);
  HDgfx.translate(width*5, height*5);
} 

function draw() {
  //if(stepSl != stepSlider.value() || rotSl != rotSlider.value() || densSl != densSlider.value() || thickSl != thickSlider.value() || forceUpdate) {
    //background(0); 
    image(DrawCircleGraph(gfx, stepSl), 0, 0);
    stepSl = stepSlider.value();
	rotSl = rotSlider.value();
	densSl = densSlider.value();
	thickSl = thickSlider.value();
    forceUpdate = false;
  //}
}

function DrawCircleGraph(graphic) {
  //Clear with a rect (since I can't get clear() to work)
  graphic.noStroke();
  graphic.fill(0);
  graphic.rect(-graphic.width/2, -graphic.height/2, graphic.width, graphic.height);
  
  graphic.colorMode(HSB, 360);
  graphic.strokeWeight(thickSl);
  radius = graphic.height/2 * .95;
  
  for (var i = 180; i >= 0; i-=densSl) {
    graphic.stroke(180+i, 360, 360);
    graphic.line(CircleX(180+i), CircleY(180+i), CircleX((180+i)*stepSl + rotSl), CircleY((180+i)*stepSl + rotSl));
    if(i != 180 && i != 0) {
      graphic.stroke(180-i, 360, 360);
      graphic.line(CircleX(180-i), CircleY(180-i), CircleX((180-i)*stepSl + rotSl), CircleY((180-i)*stepSl + rotSl));
    }
  }

  return graphic;
}

function keyPressed() {
  if (keyCode == 83) {
    //Press 's' to save the current image
    save(DrawCircleGraph(gfx), "image_small.jpg");
  }
  else if (keyCode == 68) {
    //Press 'd' to fail a download in chrome or possible crash the tab/browser
    save(DrawCircleGraph(HDgfx), "image_big.jpg");
  }  
  else if (keyCode == 82) {
    //Press 'r' to reset all changable settings
    //document.getElementById("stepSlider").value = 2;
    //rotSlider.value = 0;
  }
}

function CircleX(degrees) {
	return sin(DegreesToRadians(degrees))*radius;
}
 
function CircleY(degrees) {
	return cos(DegreesToRadians(degrees))*radius;
}

function DegreesToRadians(degrees) {
  return degrees * 2 * PI / 360;
}