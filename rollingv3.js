let z = [];
let k =[];
var slider;

class AnimatedLine {
  constructor(x1, y1, x2, y2, segmentLength, spaceLength) {
    this.x1 = x1;
    this.y1 = y1;
    this.x2 = x2;
    this.y2 = y2;
    this.segmentLength = segmentLength;
    this.spaceLength = spaceLength;
    this.sw = 3;
    this.stro = 50;
    this.buddy = self;

    // Calculate length
    this.L = sqrt(
      pow((this.x1 - this.x2), 2) +
      pow((this.y1 - this.y2), 2));
    console.log(this.L)

    // calculate angle
    this.S = atan2(this.y2 - this.y1, this.x2 - this.x1)

    // calculate number of segments
    this.numS = this.L / (this.segmentLength + this.spaceLength)

    // calculate length of tail
    this.tailL = this.L % (this.segmentLength + this.spaceLength)

    this.beginningLength = 0;
    this.tailLength = this.tailL;
    this.difference = (this.segmentLength + this.spaceLength)

  }
  setsw(num){
    this.sw = num;
  }
  setstro(stro){
    this.stro = stro;
  }
  setbud(bud){
    this.buddy = bud;
  }

  move(rate) {
    this.beginningLength += rate
    if (this.beginningLength >= this.segmentLength + this.spaceLength ) {
      this.beginningLength = 0;
    }
    
    this.difference = (this.segmentLength + this.spaceLength)-this.beginningLength
  }
  dis () {
    var a = createVector(this.x1,this.y1);
    var b = createVector(this.x2,this.y2);
    let p = createVector(mouseX,mouseY);
    let op = orthogonalProjection2(a,b,p);
    let d = p5.Vector.dist(p,op);
    
    if (d<6){
      this.setsw(6);
      this.setstro(0);
      this.buddy.setsw(6);
      this.buddy.setstro(0);
    }
    
    else {
      this.setsw(3);
      this.setstro(50);
      
         }
    
  }

  display() {
    
    
    

    stroke(this.stro)
    strokeWeight(this.sw)
    for (let i = 0; i < this.numS; i++) {
      
      // check if dash segment exceeds total line length
      var distCheck = sqrt(
        pow((this.segmentLength + this.spaceLength) * (i + 1) 
            * cos(this.S) - this.spaceLength * cos(this.S) 
            + this.beginningLength * cos(this.S), 2) 
        + pow((this.segmentLength + this.spaceLength) * (i + 1) 
              * sin(this.S) - this.spaceLength * sin(this.S) 
              + this.beginningLength * sin(this.S), 2)
      )

      // if it does, we simply don't draw it
      if (distCheck <= this.L) {
        line(
          this.x1 + (this.segmentLength + this.spaceLength) * i 
              * cos(this.S) + this.beginningLength * cos(this.S),
          this.y1 + (this.segmentLength + this.spaceLength) * i 
              * sin(this.S) + this.beginningLength * sin(this.S),
          this.x1 + (this.segmentLength + this.spaceLength) * (i + 1) 
              * cos(this.S) - this.spaceLength * cos(this.S) 
              + this.beginningLength * cos(this.S),
          this.y1 + (this.segmentLength + this.spaceLength) * (i + 1) 
              * sin(this.S) - this.spaceLength * sin(this.S) 
              + this.beginningLength * sin(this.S)
        )
      }
    }
  }
}



function setup() {
 
  createCanvas(400, 400);
  strw = 25;
  slider = createSlider(0.01,1,0.1,0.01);
 
  
  
  
  
  r = random(255);
  g = random(100,200);
  b = random(100);
  
  u = 8;
  c = 8;
    

 for(var x = 0; x<=200; x+=strw){
   if(x == 0){
     k.push(new AnimatedLine(0, x,200-x, 200, u,c));
   
   k.push(new AnimatedLine(200-x, 200,0, 400-x, u,c));
   
  
   
   k.push(new AnimatedLine(400-x, 0,200, 200-x, u,c));
   
   k.push(new AnimatedLine(200, 200+x,400-x, 400, u,c));
   
   z.push(random(255));
   z.push(random(100,200));
   z.push(random(200));
     
     
   }
   else{
   k.push(new AnimatedLine(0, x,200-x, 200, u,c));
   
   k.push(new AnimatedLine(200-x, 200,0, 400-x, u,c));
   k.push(new AnimatedLine(200, 200-x,x, 0, u,c));
   k.push(new AnimatedLine(x, 400,200, 200+x, u,c));
   
   k.push(new AnimatedLine(400-x, 0,200, 200-x, u,c));
   
   k.push(new AnimatedLine(200, 200+x,400-x, 400, u,c));
   k.push(new AnimatedLine(200+x, 200,400, x, u,c));
   k.push(new AnimatedLine(400, 400-x,200+x, 200, u,c));
   z.push(random(255));
   z.push(random(100,200));
   z.push(random(100));
   }
   
  for(var dd=0;dd<k.length;dd++){
    for(var cc=0;cc<k.length;cc++){
      
      if (k[dd].x2 == k[cc].x1 && k[dd].y2 == k[cc].y1){
        
        k[dd].buddy = k[cc];
        
        break
    }
      else if (k[dd].x1==k[cc].x2 && k[dd].y1==k[cc].y2){
        k[dd].buddy = k[cc];
        break
        }
        
      else if (k[dd].x1 == k[cc].x2 && k[dd].y1 == k[cc].y2){
         k[dd].buddy = k[cc];
      }
     
    
    
    
    }}
    
    for (var abc = 0; abc<k.length;abc++){
      if (k[abc].x1 == 200 && k[abc].y1 == 200 && k[abc].x2 == 400 && k[abc].y2 == 400){
        k[abc].setbud(k[0]);
        k[0].setbud(k[abc]);
      }
      else if (k[abc].x1 == 200 && k[abc].y1 == 200 && k[abc].x2 == 0 && k[abc].y2 == 400){
        k[abc].setbud(k[2]);
        
      }
    }
   
 }
  
   
  
  
    
    
    print(k.length)
  
                                 
}

function draw() {
  
  for(var y = 0; y<=200; y+=strw){
    strokeWeight(strw);
    gg = y/strw
      
      stroke(z[3*gg],z[3*gg+1],z[3*gg+2]);
     line(0,y,200-y,200);
      
      line(0,400-y,200-y,200);
      
      
      line(y,0,200,200-y);
     
      line(400-y,0,200,200-y);
     
  
      line(y,400,200,200+y)
      
      line(400-y,400,200,200+y)
      
    
      line(400,y,200+y,200)
      
      line(400,400-y,200+y,200)
      
    
  }
  
   for(let j = 0; j<k.length;j++) {
         stroke(0)
        strokeWeight(3);
        k[j].display();
        k[j].move(slider.value());
         k[j].dis();}
    
       
    
      
  
  
}
function orthogonalProjection2(a, b, p) {
  
  // find nearest point alont a SEGMENT 
  
  d1 = p5.Vector.sub(b, a);
  d2 = p5.Vector.sub(p, a);
  l1 = d1.mag();
  
  dotp = constrain(d2.dot(d1.normalize()), 0, l1);
      
  return p5.Vector.add(a, d1.mult(dotp))
  
}
