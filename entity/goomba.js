//enemy hai ye ek 
//mario jaisa hi h  to uska hi code utha lo 


//isme hume bas itna pta ho ki mario ki position aur uski width height kya hai bas
class Goomba extends Entity {

    constructor(spritesheet, posX, posY, width, height) {
        //pixi.pomple.com me image lejaana jo hisse ke corrdinates chahiyeh select krna vo area aurb inspect pr jaake console me mil jaayenge abhi directly likhra

        let img = new Sprite(spritesheet, 115, 5, 16, 16) //inn coordinates pr image padi hui hai 

        super(img, "goomba", posX, posY, width, height);

        //itna aage ya peeche jayega x-direction mai
        this.velX = 1.2;
        this.velY = 0;

        //convinience ke liye this ko self me store krliya
        let self = this;


        //animations 
        this.animFrame = {

            //right walk krne me spritesheet ke ye ye coordinates ke mario use honge
            walking: {
                frames: [
                    new Sprite(spritesheet, 115, 5, 16, 16),
                    new Sprite(spritesheet, 131, 5, 16, 16),
                ],
                counter: 0 // counter is for looping the animation
            },
            squashed: new Sprite(spritesheet, 147.5, 5, 16, 16), //pichak jayega jb 
        }

        //states 
        //isme har state ke liye animation ka function likha jayega
        this.states = {
            walkingAnim:{
                animation(gameObj){
                    if (gameObj.animFrame % 5 == 0) {


                        self.sprite = self.animFrame.walking.frames[self.animFrame.walking.counter];
                        self.animFrame.walking.counter++;
    
                        if (self.animFrame.walking.counter > 1) {
                            //kyuki 2 hi frame h walkinmg left ke
                            self.animFrame.walking.counter = 0;
                        }
                    }
    
                },
                movement(){
                    if(self.currentDirection == "left") //self -- goomba
                    {
                       self.posX-=self.velX;
                    }
                    else{
                        self.posX+=self.velX;
                    }

                }
            },
            squashed:{
                movement(){
                    self.velX = 0;
                },
                animation(){
                    self.sprite = self.animFrame.squashed;
                }
            }
            

        }

        //direction default right and state standing hogi 
        this.currentDirection = "left"
        this.currentState = this.states.walkingAnim;


    }

}