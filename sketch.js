var Trex, TrexImages
var Ground,GroundImages
var invisibleGround;
var cloud,Cloudimage;
var obstacle,obstacle1,obstacle2,obstacles3,obstacle4,obstacle5,obstacle6;
var obstaclegroup,cloudsgroup;
var play=1;
var end=0;3
var Gamestate=play;
var score=0;
var TrexCollided;
var ResetTrexIMG,ResetTrex,TrexGameOverIMG,TrexGameOver;
var jumpSound,Diesound,CheckpointSound;
var message="Good evening";

function preload(){
  TrexImages=loadAnimation("trex1.png","trex3.png","trex4.png");
  TrexCollided=loadAnimation("trex_collided.png");
ResetTrexIMG=loadImage("restart.png");
TrexGameOverIMG=loadImage("gameOver.png");
  GroundImages= loadImage("ground2.png");
Cloudimage= loadImage("cloud.png");
obstacle1=loadImage("obstacle1.png");
obstacle2=loadImage("obstacle2.png");
obstacles3= loadImage("obstacle3.png");
obstacle4=loadImage("obstacle4.png");
obstacle5=loadImage("obstacle5.png");
obstacle6=loadImage("obstacle6.png");
jumpSound=loadSound("jump.mp3");
Diesound=loadSound("die.mp3");
CheckpointSound=loadSound("checkpoint.mp3");
}


function setup (){
createCanvas(windowWidth,windowHeight);
console.log(message);


//restart & game over
ResetTrex = createSprite(width/2,height/2,200,200)
ResetTrex.addImage(ResetTrexIMG);
TrexGameOver = createSprite(width/2,height/3,200,200);
TrexGameOver.addImage(TrexGameOverIMG);
ResetTrex.scale=0.5;
TrexGameOver.scale=0.5;
ResetTrex.visible=false;
TrexGameOver.visible=false;

  
  
  //trex animation
Trex = createSprite(100,height-100,25,25);
Trex.addAnimation("TrexAnimation",TrexImages);
Trex.addAnimation("TrexCollided",TrexCollided);
Trex.scale=0.5;
Trex.debug=true;
Trex.setCollider("rectangle",0,0,30,100)

//ground animation
Ground=createSprite(400,height-100,800,5);
  Ground.addImage("GroundImage",GroundImages);
 

  

  //invisible ground
  invisibleGround = createSprite(400,height-80,800,10);
  invisibleGround.visible=false; 

  //groups
  obstaclegroup=new Group();
  cloudsgroup=new Group();
}


function draw (){
background("grey");

//score display:)
fill ("white");
textSize(25);
text("Score:"+score,width-200,50);
if(Gamestate===play){

  Ground.velocityX=-(8+score/100);

if(score>0&&score%100==0){
CheckpointSound.play();
}

//infinite ground
if(Ground.x<0){
  Ground.x=Ground.width/2;
  }

//trex jump
if(keyDown("Space")&&Trex.y>height-175){
  Trex.velocityY=-15;
  jumpSound.play();
  }

//trex gravity
Trex.velocityY=Trex.velocityY+1;

//creating clouds&obstacles
createClouds();
createObstacles();

//trex game over
if(obstaclegroup.isTouching(Trex)){
    Gamestate=end;
    Diesound.play();
}

//score increase
score=score+Math.round(getFrameRate()/60)
}

if(Gamestate===end){
//trex game over
  Ground.velocityX=0;
  obstaclegroup.setVelocityXEach(0);
  cloudsgroup.setVelocityXEach(0);
  cloudsgroup.setLifetimeEach(-1);
  obstaclegroup.setLifetimeEach(-1);
  Trex.changeAnimation("TrexCollided",TrexCollided);
  ResetTrex.visible=true;
  TrexGameOver.visible=true;

  Trex.velocityY=0;
}

//trex colliding
Trex.collide(invisibleGround);
if(mousePressedOver(ResetTrex)){
reset();

}



drawSprites();


}


function createClouds(){
  if(frameCount%60==0){
    cloud = createSprite(800,height-150,50,30);
    cloud.velocityX=-(8+score/100);
         cloud.y=Math.round(random(0,height-150));
    cloud.addImage(Cloudimage);
    cloud.scale=0.8;
    cloud.depth=Trex.depth-1; 
    cloud.lifetime=100;
    cloudsgroup.add(cloud);
  }
}

function createObstacles(){
if(frameCount%80==0){
obstacle = createSprite(800,height-120,50,75);
obstacle.velocityX=-(7+score/100);
var number=Math.round(random(1,6))
switch(number){
  case 1:obstacle.addImage(obstacle1);
  break;
  case 2:obstacle.addImage(obstacle2);
  break;
  case 3:obstacle.addImage(obstacles3);
  break;
  case 4:obstacle.addImage(obstacle4);
  break;
  case 5:obstacle.addImage(obstacle5);
  break;
  case 6:obstacle.addImage(obstacle6);
  break;
  default:break;      
}
obstacle.scale=0.75;
obstacle.lifetime=114;
obstaclegroup.add(obstacle);
}
}
function reset(){
  Gamestate=play;
  TrexGameOver.visible=false;
  ResetTrex.visible=false;
  obstaclegroup.destroyEach();
  cloudsgroup.destroyEach();
  Trex.changeAnimation("TrexAnimation",TrexImages);
  score=0;
}