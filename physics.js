let physics = {
    update(gameObj) {
        // this.checkCollision(gameObj.entities.mario)
        this.gravity(gameObj.entities.mario)
        gameObj.entities.goombas.forEach((goomba) => {
            this.gravity(goomba) //har ek goomba pr gravity
        })
        gameObj.entities.koopas.forEach((koopa) => {
            this.gravity(koopa) //har ek koopa pr gravity
        })

        gameObj.entities.particles.forEach((particle) => {
            this.gravity(particle) //har ek koopa pr gravity
        })

        this.entityMarioCollision(gameObj) // koi bhi entity jb mario se collloid kregi to kya kro 
        this.bgEntityCollision(gameObj) // kisi bhi entity ka bg ke saath collision ye sambhaal lega

        this.marioFallingCheck(gameObj) //mario gira ki ni 
    },
    gravity(entity) {
        entity.velY += 1.1; //acceleration ke kaaran velocity bd ri 
        entity.posY += entity.velY;
    },
    // checkCollision(entity) {   // ye ground ka collision check krra tha sirf
    //     if (entity.posY + entity.height >= 180 && entity.velY > 0) {
    //         entity.posY = 172;
    //         entity.velY = 0;
    //         entity.currentState = entity.states.standingAnim;
    //     }
    // },
    entityMarioCollision(gameObj) {

        let { mario, goombas,koopas,bricks,blocks } = gameObj.entities;

        goombas.forEach((goomba) => {

            //goomba aur mario ke beech collision agr hua 
            if (this.checkRectCollision(mario, goomba)) {
                this.handleCollision(mario, goomba, gameObj);

            }
        })

        koopas.forEach((koopa)=>{

            if (this.checkRectCollision(mario, koopa)) {
                this.handleCollision(mario, koopa, gameObj);

            }

        })

        bricks.forEach((brick)=>{

            if (this.checkRectCollision(mario, brick)) {
               

                //direction ke hisaab sw
               let wantToBreak =  this.handleDirec(brick,mario);
               if(wantToBreak){

                // ye particle create krega mere liye
                brick.createParticle(gameObj);

                let idx = gameObj.entities.bricks.indexOf(brick);
                gameObj.entities.bricks.splice(idx,1);

               }

            }

        })

        blocks.forEach((block)=>{

            if (this.checkRectCollision(mario, block)) {
               

                //direction ke hisaab sw
               let wantToReveal =  this.handleDirec(block,mario);
               if(wantToReveal){

                block.currentState = block.states.emptyAnim;

               }

            }

        })

    },
    handleCollision(mario, entity, gameObj) {

        if (entity.type == "goomba" || entity.type == "koopa") {  //agr koi aur hui to death ka scene nahi hoga na


            //left --- mario ki death

            // mtlb dono ne cross krdiya ek dusre ko  && ground pr hai mario
            if (mario.posX < entity.posX && mario.posY == 173.2) {
                
                if (entity.currentState != entity.states.squashed && entity.type == "goomba") { //ye isliye kyuki mario ka animation death ka tbhi lgaana jb already vo dead na ho mtlb jb mario mr ke upar se neeche aata hai usme agr vo vaaps top se takra gaya to gadbad ho jayegi kyuki entity ko to remove hone mai time lgega aur uss beech firse collision na ho ho bhi to squashed state rahi agr to firse ni lgega death animation 
                    this.marioDeath(gameObj, mario);
                }
                else if(entity.type == "koopa"){

                    if(entity.currentState == entity.states.hiding){
                        this.koopaSlide(entity,mario);
                    }
                    else{
                       this.marioDeath(gameObj,mario);
                    }

                }
            }

            //right -- mario ki death 

            if (mario.posX > entity.posX && mario.posY == 173.2) {

                if (entity.currentState != entity.states.squashed && entity.type == "goomba") {
                    this.marioDeath(gameObj, mario);
                }else if(entity.type == "koopa"){

                    if(entity.currentState == entity.states.hiding){
                        this.koopaSlide(entity,mario);
                    }
                    else{
                       this.marioDeath(gameObj,mario);
                    }

                }
            }
            //top -- entity  ki death 
            if (mario.posY < entity.posY && (mario.posX < entity.posX + entity.width) && (mario.posX + mario.width > entity.posX))
                
              //just preventing ki double death na ho 
              if(mario.pointer != "dead" && entity.type == "koopa"){

                if(entity.currentState == entity.states.walkingAnim){
                    //ab agr colloid krega to shell waala lgega
                    this.koopaHide(entity,mario);
                }
                else if(entity.currentState == entity.states.hiding){
                    this.koopaSlide(entity,mario);
                }
                else{
                    this.enemyDeath(gameObj, mario, entity);
                }


              }
            else if (entity.currentState != entity.states.squashed && mario.pointer != "dead" && entity.type == "goomba")
                    this.enemyDeath(gameObj, mario, entity);

        }

    },
    koopaHide(entity,mario){
        entity.currentState = entity.states.hiding;
        entity.posX = (mario.currentDirection == "left")?entity.posX-10:entity.posX+10;

    },
    koopaSlide(entity,mario){
        entity.currentState = entity.states.sliding;
        //mario ki direction mai slide kroo
        entity.currentDirection = mario.currentDirection;
        entity.posX = (mario.currentDirection == "left")?entity.posX-10:entity.posX+10;

    },
    enemyDeath(gameObj, mario, entity) {
        if(entity.type == "goomba")
        {
            entity.currentState = entity.states.squashed;
            entity.pointer = "squashed";
        }
        else if(entity.type == "koopa"){
        entity.velX+=5;
        entity.velY-=14;
        }
        setTimeout(() => {
            if(entity.type == "goomba"){
                let idx = gameObj.entities.goombas.indexOf(entity);
                delete gameObj.entities.goombas[idx]; // taaki marne ke baad ye game se hatt jaaye 

            }
            else if(entity.type == "koopa"){
                let idx = gameObj.entities.koopas.indexOf(entity);
                delete gameObj.entities.koopas[idx]; // taaki marne ke baad ye game se hatt jaaye 

            }
           
        }, 200)

    },
    //mario ki death pr kya kya ho 
    marioDeath(gameObj, mario) {
        mario.velX = 0;
        mario.currentState = mario.states.dead;
        mario.velY = -14;
        mario.pointer = "dead";
        gameObj.userControl = false;
        setTimeout(() => {
            gameObj.reset();
        }, 3000)

    },
    bgEntityCollision(gameObj) {

        let mario = gameObj.entities.mario;
        let goombas = gameObj.entities.goombas;
        let koopas = gameObj.entities.koopas;

        this.bgCollision(mario, gameObj) // collision for mario

        goombas.forEach((goomba) => {
            this.bgCollision(goomba, gameObj);// collision for goomba
        })

        koopas.forEach((koopa) => {
            this.bgCollision(koopa, gameObj);// collision for koopa
        })

    }
    ,
    bgCollision(entity, gameObj) {
        let scenery = gameObj.entities.scenery;

        scenery.forEach((scene) => {

            if (this.checkRectCollision(scene, entity)) { //collision is there

                if (scene.type == 'stair' || scene.type == "pipe") {
                    this.handleDirec(scene, entity);
                }
                else {
                    if (scene.type == "ground") {
                        //pipe waala logic standing ka 
                        if (entity.posY < scene.posY && entity.posX + entity.width > scene.posX && scene.posX + scene.width > entity.posX && entity.velY >= 0) {   //mario upar hona chahiyeh pipe se 
                            // mario pipe ki boundaries me hona chahiyeh 
                            //velocity Y me negative nahi honi chahiyeh-->mtlb upar ki taraf na jaara ho screen mai 

                            if (entity.type == "mario")
                                entity.currentState = entity.states.standingAnim; //taaki animation daudne waala na ho vrna sirf ground pr aane pr hi standing anim lgta h 

                            //baaki type ki entity me already walkingAnim lgega
                            if (entity.pointer != "dead") {
                                entity.posY = scene.posY - entity.height - 1;
                                entity.velY = 1.1; //yaha agr 0 kroge to upar jump ni krne dega 
                            }


                        }

                    }
                }
            }

        })

    },
    checkRectCollision(entity1, entity2) {
        //assuming scene is 1 rect & entity is 2nd rect


        //X-axis --> r2>l1 && r1>l2

        let l1 = entity1.posX;
        let l2 = entity2.posX;
        let r1 = entity1.posX + entity1.width;
        let r2 = entity2.posX + entity2.width;
        //Y-axis --> t2>b1 && t1>b2
        let b1 = entity1.posY;
        let b2 = entity2.posY;
        let t1 = entity1.posY + entity1.height;
        let t2 = entity2.posY + entity2.height;

        if (r2 > l1 && r1 > l2 && t2 > b1 && t1 > b2) {
            return true;   //agr false to kuch ni krna
        }
    },
    handleDirec(scene, entity) {
        //bottom
        //velY<0 --- mtlb hawa mei velocity ghategi na
        if(entity.posY > scene.posY && entity.posX + entity.width > scene.posX && scene.posX + scene.width > entity.posX && entity.velY < 0){

            if(scene.type == "brick" || scene.type == "block"){
                entity.posY = scene.posY + scene.height; //mario ki position thik kro brick se takraane ke baad
                entity.velY = 1.1; //vrna jb takk ground ko hit ni krega gravity ke kaaran fisal ke neeche ayega 
                return true;
            }



        }
        //left
        if (entity.posX < scene.posX && entity.posY >= scene.posY) {
            entity.posX = scene.posX - entity.width;
            if (entity.type == "goomba" || entity.type == "koopa") {
                entity.currentDirection = (entity.currentDirection == "left") ? "right" : "left"
            }
        }
        //right
        if (entity.posX > scene.posX && entity.posY >= scene.posY) {
            entity.posX = scene.posX + scene.width; //jaha entity khtm waha entity start
            if (entity.type == "goomba" || entity.type == "koopa") {
                entity.currentDirection = (entity.currentDirection == "left") ? "right" : "left"
            }
        }
        //top
        if (entity.posY < scene.posY && entity.posX + entity.width > scene.posX && scene.posX + scene.width > entity.posX && entity.velY >= 0) {   //entity upar hona chahiyeh pipe se 
            // entity pipe ki boundaries me hona chahiyeh 
            //velocity Y me negative nahi honi chahiyeh-->mtlb upar ki taraf na jaara ho screen mai 

            if (entity.type == "mario")
                entity.currentState = entity.states.standingAnim; //taaki animation daudne waala na ho vrna sirf ground pr aane pr hi standing anim lgta h 
            entity.posY = scene.posY - entity.height - 1;
            entity.velY = 1.1; //vrna jb takk ground ko hit ni krega gravity ke kaaran fisal ke neeche ayega 


        }
    }
    ,
    marioFallingCheck(gameObj) {
        if (gameObj.entities.mario.posY > 250) {
            // alert("GAME OVER")
            gameObj.reset();
        }
    }
}