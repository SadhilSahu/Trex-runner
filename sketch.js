var Trex, TrexImages
var Ground,GroundImages
var invisibleGround

function preload(){
  TrexImages=loadAnimation("trex1.png","trex3.png","trex4.png");
  GroundImages= loadImage("ground2.png");
}


function setup (){
createCanvas(800,300);

//trex animation
Trex = createSprite(100,250,25,25);
Trex.addAnimation("TrexAnimation",TrexImages);
Trex.scale=0.5;

//ground animation
Ground=createSprite(400,275,800,5);
  Ground.addImage("GroundImage",GroundImages);
  Ground.velocityX=-8;

  //invisible ground
  invisibleGround = createSprite(400,280,800,10);
  invisibleGround.visible=false;
}


function draw (){
background("grey");

//infinite ground
if(Ground.x<0){
Ground.x=Ground.width/2;
}

//trex jump
if(keyDown("Space")&&Trex.y>175){
Trex.velocityY=-3;
}

//trex gravity
Trex.velocityY=Trex.velocityY+1;
Trex.collide(invisibleGround);

drawSprites();
}
