// ye saare controls hai game ke ki
//left dabaye to left jaaye
//right dabaye to right jaaye
//... aur baaki sb 

let input = {
    down: {},
    pressed: {},
    init() {
        //isme event listener honge jo ye pata krenge ki key konsi press hui
        window.addEventListener("keydown", (e) => {
            //e.code hai key ka naam
            //down object me key ke saamne save krdia ki vo click hui ki nahi
            console.log(e.code)
            this.down[e.code] = true;
        })


        //key release kri to uske hisaab se bhi update kro
        window.addEventListener("keyup", (e) => {
            //e.code hai key ka naam
            //down object me key ke saamne save krdia ki vo click hui ki nahi
            delete this.down[e.code];
            delete this.pressed[e.code];
        })
    }
    ,
    update(gameObj) {

        let mario  = gameObj.entities.mario;

        if(mario.posX>=3181){
            gameObj.reset();
        }

        if (gameObj.userControl == true) { 
            
            //left 
            if (this.isDown("ArrowLeft")) {

                // left jaana hoga

                //uske liye mujhe mario ki position pata honi chahiyeh

                //left dabaya to posX me piche mtlb kam hogyi 
                mario.posX -= mario.velX;
                mario.currentDirection = "left"
                mario.currentState = mario.states.walkingAnim;


            }
            //right

            if (this.isDown("ArrowRight")) {

                // right jaana hoga

                //uske liye mujhe mario ki position pata honi chahiye

                //right dabaya to posX me aage mtlb jyada hogyi 
                mario.posX += mario.velX;
                mario.currentDirection = "right"
                mario.currentState = mario.states.walkingAnim;

            }

            //space

            if (this.isPressed("Space")) {

                //upar bhejdo baaki kaam velocity krdegi


                if (mario.velY == 1.1) {
                    mario.velY -= 15;
                    mario.currentState = mario.states.jumpingAnim;
                }


            }
            
        }



    }
    ,
    isDown(key) {
        //btayega ki press hui vi hai ki ni
        return this.down[key];
    }
    , isPressed(key) {
        if (this.pressed[key]) {
            //press ho rkhi to abhi kuch mt kro 
            return false;
        }
        else if (this.down[key]) {
            //mtlb first time press hui 
            return true;
        }
    }
}