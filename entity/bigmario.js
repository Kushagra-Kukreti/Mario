
//isme hume bas itna pta ho ki mario ki position aur uski width height kya hai bas
class BigMario extends Entity {

    constructor(spritesheet, posX, posY, width, height) {
        //pixi.pomple.com me image lejaana jo hisse ke corrdinates chahiyeh select krna vo area aurb inspect pr jaake console me mil jaayenge abhi directly likhra
        // isBig = false
        // if(isBig == true){

            let img = new Sprite(spritesheet, 279, 0, 17, 38)

            super(img, "bigmario", posX, posY, width, height);
    
            //itna aage ya peeche jayega x-direction mai
            this.velX = 1.8;
            this.velY = 0;
    
    
            //states---> standing,walking,jumping
    
            //sbke frames honge
    
    
            //convinience ke liye this ko self me store krliya
            let self = this;
            this.animFrame = {
    
                //right walk krne me spritesheet ke ye ye coordinates ke mario use honge
                walkRight: {
                    frames: [
                        new Sprite(spritesheet, 294, 3, 19, 35),
                        new Sprite(spritesheet, 311, 4, 16, 34),
                        new Sprite(spritesheet, 326, 3, 17, 36),
                    ],
                    counter: 0
    
                },
                //left walk krne me spritesheet ke ye ye coordinates ke mario use honge
                walkLeft: {
                    frames: [
                        new Sprite(spritesheet, 583, 37, 16, 34),
                        new Sprite(spritesheet, 564, 37, 21, 31),
                        new Sprite(spritesheet, 550, 37, 19, 31),
                    ],
                    counter: 0 // counter is for looping the animation
                },
                //right stand krne me spritesheet ke ye ye coordinates ke mario use honge
                standRight: new Sprite(spritesheet, 279, 0, 17, 38),
                standLeft: new Sprite(spritesheet, 596, 36, 20, 33),
                jumpRight: new Sprite(spritesheet, 503, 4, 16, 36),
                jumpLeft: new Sprite(spritesheet, 374, 38, 19, 33),
                dead: new Sprite(spritesheet, 357, 41, 18, 30),
            }
    
            //isme har state ke liye animation ka function likha jayega
            this.states = {
    
                walkingAnim(gameObj) {
                   
                    if(gameObj.animFrame%5 ==0){
    
    
    
                    if(self.currentDirection == "left") {
    
                        self.sprite = self.animFrame.walkLeft.frames[self.animFrame.walkLeft.counter];
                        self.animFrame.walkLeft.counter++;
    
                        if(self.animFrame.walkLeft.counter>2){
                            //kyuki 3 hi frame h walkinmg left ke
                            self.animFrame.walkLeft.counter = 0;
                        }
                  
                    }
                    else {
                        //direction right hai 
                        self.sprite = self.animFrame.walkRight.frames[self.animFrame.walkRight.counter];
                        self.animFrame.walkRight.counter++;
    
                        if(self.animFrame.walkRight.counter>2){
                            //kyuki 3 hi frame h walkinmg left ke
                            self.animFrame.walkRight.counter = 0;
                        }
    
                    }
    
    
    
                }
    
                },
                standingAnim() {
    
                    if(self.currentDirection == "left") {
                     
                        //image change krre -->>spritesheet se utaake
                    self.sprite = self.animFrame.standLeft;
                     
                    }
                    else {
                        //direction right hai 
    
                        
                        //image change krre -->>spritesheet se utaake
                    self.sprite = self.animFrame.standRight;
                    }
    
                },
                jumpingAnim() {
    
                    if(self.currentDirection == "left") {
                        //image change krre -->>spritesheet se utaake
                    self.sprite = self.animFrame.jumpLeft;
                    }
                    else {
                        //direction right hai 
                            //image change krre -->>spritesheet se utaake
                    self.sprite = self.animFrame.jumpRight;
                    }
    
                },
                dead(){
                    self.sprite = self.animFrame.dead;
                }
    
    
            }
           
            //direction default right and state standing hogi 
            this.currentDirection = "right"
            this.currentState = this.states.standingAnim



    }

}