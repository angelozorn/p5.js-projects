var InputBox;
var mytext="";
function setup() { 
  height = 600;
  width = 400;
  createCanvas(width, height);
  inputBox = createInput().attribute('maxlength', 3);
  inputBox.size(200,20);
  inputBox.input(myInputEvent);
  
  
   textSize(width/12);
  textAlign(CENTER, CENTER);
 
  
} 

function draw() { 
  background(203,168,122);
  w = width/12
   h = height/12
   tw = 2*w
   th = 2*h
  
  
  stroke(255);
  strokeWeight(5);
  setLineDash([7]);
  
  
  
  for (var x = 0; x<=9*w; x += w*3){
    for (var y = 0; y <=9*h; y += h*3){
      line(x+20,height-y-30, tw + x+20, height-y-th-30);
      line(x+20,height-y-th-30,tw + x+20,height-y-30);
        

    }
  }
  
  stroke(0);
  strokeWeight(0); 
  fill(255)
  
  for (var q = 0; q<=12*w; q += w*3){
    for(var p = 0; p<=12*h; p += h*3){
      text(mytext,q,height-p);
    
      
        

    }
  }
   
}

function myInputEvent(){
  mytext = this.value();
}

function setLineDash(list) {
  drawingContext.setLineDash(list);
}
