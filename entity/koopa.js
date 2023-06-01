//duck jaisa do dikhta hai 


//isme hume bas itna pta ho ki mario ki position aur uski width height kya hai bas
class Koopa extends Entity {

    constructor(spritesheet, posX, posY, width, height) {
        //pixi.pomple.com me image lejaana jo hisse ke corrdinates chahiyeh select krna vo area aurb inspect pr jaake console me mil jaayenge abhi directly likhra

        let img = new Sprite(spritesheet, 253, 29, 16, 24)

        super(img, "koopa", posX, posY, width, height);

        //itna aage ya peeche jayega x-direction mai
        this.velX = 1;
        this.velY = 0;

        //states---> standing,walking,jumping

        //sbke frames honge


        //convinience ke liye this ko self me store krliya
        let self = this;
        this.animFrame = {

            //right walk krne me spritesheet ke ye ye coordinates ke mario use honge
            walkRight: {
                frames: [
                    new Sprite(spritesheet, 253, 29, 16, 24),
                    new Sprite(spritesheet, 237, 29, 16, 24),
                ],
                counter: 0

            },
            //left walk krne me spritesheet ke ye ye coordinates ke mario use honge
            walkLeft: {
                frames: [
                    new Sprite(spritesheet, 173, 5, 16, 24),
                    new Sprite(spritesheet, 189, 5, 16, 24),
                ],
                counter: 0 // counter is for looping the animation
            },
            hiding :new Sprite(spritesheet, 237.5, 14, 16, 15),
        }

        //isme har state ke liye animation ka function likha jayega
        this.states = {
           walkingAnim:{
            animation(gameObj){

                if(gameObj.animFrame%5 ==0){
                    if(self.currentDirection == "left") {
    
                        self.sprite = self.animFrame.walkLeft.frames[self.animFrame.walkLeft.counter];
                        self.animFrame.walkLeft.counter++;
    
                        if(self.animFrame.walkLeft.counter>1){
                            //kyuki 3 hi frame h walkinmg left ke
                            self.animFrame.walkLeft.counter = 0;
                        }
                  
                    }
                    else {
                        //direction right hai 
                        self.sprite = self.animFrame.walkRight.frames[self.animFrame.walkRight.counter];
                        self.animFrame.walkRight.counter++;
    
                        if(self.animFrame.walkRight.counter>1){   // yaha 2 hi frame hai to >1 ka check lgaya 0 and 1
                            //kyuki 3 hi frame h walkinmg left ke
                            self.animFrame.walkRight.counter = 0;
                        }
    
                    }

            }
           }
           ,
           movement(){
            if(self.currentDirection == "left"){
                self.posX-= self.velX;
            }
            else{
                self.posX+= self.velX;
            }

           }

            },
            hiding:{
                movement(){
                   self.velX = 0; //jaha ho vaha ruk jaao
                   self.height = 16;
                   self.width = 13;
                },
                animation(){ 

                    self.sprite = self.animFrame.hiding; 

                }

            },
            sliding:{
                movement(){
                    self.height = 16;
                    self.width = 13;
                    if(self.currentDirection == "left"){
                        self.posX-=2;
                    }
                    else{
                        self.posX+=2;
                    }
                    
                },
                animation(){

                    self.sprite = self.animFrame.hiding; 


                }

            }

        }
       
        //direction default right and state standing hogi 
        this.currentDirection = "right"
        this.currentState = this.states.walkingAnim;



    }

}