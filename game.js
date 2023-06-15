

//print krne ke liye ek object 
//iske andr jo method hai wahi screen pr print krenge

const render = {
    //intial print --render
    init(gameObj) {
        //draw sky

        //by-default black fill hoga 
        gameObj.tool.fillStyle = "#7ed6df";
        //change krna hai colour


        gameObj.tool.fillRect(0, 0, window.innerWidth, window.innerHeight);

        // gameObj.tool.drawImage(castleImage, 40, 40, 200, 150);

        let mario = gameObj.entities.mario;
        gameObj.levelBuilder.stock(gameObj); //add hojayenge saare entities

        gameObj.tool.drawImage(
            mario.sprite.img,
            mario.sprite.srcX,
            mario.sprite.srcY,
            mario.sprite.srcW,
            mario.sprite.srcH,
            mario.posX,
            mario.posY,
            mario.width,
            mario.height
        );



    }
    ,
    update(gameObj) {

        this.updateFrame(gameObj);
        let mario = gameObj.entities.mario;


        gameObj.tool.clearRect(0, 0, window.innerWidth, window.innerHeight);
        gameObj.tool.fillStyle = "#7ed6df";
        //change krna hai colour

        gameObj.tool.fillRect(0, 0, window.innerWidth, window.innerHeight);


        //ground--pehle ka 
        // gameObj.tool.fillStyle = "#e67e22";
        // gameObj.tool.fillRect(0, 200, window.innerWidth, window.innerHeight-200);

        //abb
        gameObj.levelBuilder.render(gameObj);

        //camera leke aao 
        let camera = gameObj.camera;

        //drawing mario
        this.drawEntity(camera, mario, gameObj)

        //drawing goombas
        gameObj.entities.goombas.forEach((Goomba) => {
            this.drawEntity(camera, Goomba, gameObj)
        })

        //drawing koopas 
        gameObj.entities.koopas.forEach((Koopa) => {
            this.drawEntity(camera, Koopa, gameObj)
        })

        //drawing particles
        gameObj.entities.particles.forEach((particle) => {
            this.drawEntity(camera, particle, gameObj)
        })

        //drawing mushrooms
        gameObj.entities.mushrooms.forEach((mushroom) => {
            this.drawEntity(camera, mushroom, gameObj)
        })
        //drawing coins
        gameObj.entities.coins.forEach((coin) => {
            this.drawEntity(camera, coin, gameObj)
        })


    },
    drawEntity(camera, entity, gameObj) {
        gameObj.tool.drawImage(
            entity.sprite.img,
            entity.sprite.srcX,
            entity.sprite.srcY,
            entity.sprite.srcW,
            entity.sprite.srcH,
            entity.posX - camera.start, //positions ke hisaab se render krre 
            entity.posY,
            entity.width,
            entity.height,
        );
    },
    updateFrame(gameObj) {
        //mario takk ka distance left side se starting of screen ka 
        let centerX = gameObj.entities.mario.posX + gameObj.entities.mario.width / 2;
        let dist = window.innerWidth / 8;

        //ye hummesha sach hoga --iska logic aaram se sochna ye kyu hua
        if (centerX < gameObj.camera.start + (2 * dist)) {

            //agr ye negative hua to na frame ke baahar chle jayega mtlb humari image ke scope ke baahar render krega so 
            //just minimise it to zero mtlb kbhi bhi distance centerX se bada na ho 
            gameObj.camera.start = Math.max(centerX - dist, 0);
        }
    }

}
class Game {

    //game ka basic setup bnayega
    init() {

        //preload krwaali chije firr init krwaaya
        preload().then(() => {


            //canvas pick krlo pehle
            const canvas = document.querySelector(".board");

            //but size chota h canvas ka 
            //size sahi kro canvas ka 

            canvas.height = window.innerHeight;
            canvas.width = window.innerWidth

            //tool for drawing 
            const tool = canvas.getContext("2d") //2d drawing banane waala tool milega isse


            //ye obj pure game ki current state ko btayega
            //mario jump krra 
            //mario colloid krra..

            //issi ke hisaab se draw hoga since conditions change ho rahi h 

            //entities object saare chije jaise mario ko layega, walls ,pipes



            //x and y ko change krre draw krte hue
            tool.scale(2.75, 2.95);


            let entities = {}

            //for movement this camera object is there 
            let camera = {
                start: 0,
                width: window.innerWidth
            }
            //game obj ke through hi print hone jayengi saari chije screen pr isliye gameobj ko pass krre
            let gameObj = {
                tool, canvas, entities, animFrame: 0
                , levelBuilder: new LevelBuilder(levelOne), camera,
                reset: this.reset //this ka mtlb yaha Game class hai 

                , userControl: true //mtlb user control kr skta hai mario ko 

                //animFrame na mario ke speed ko slow krne ke liye hai taaki har frame me na lge walking animation wrna bohot fast daudta milega
            }


            //ek naya mario bnake dega
            let mario = new Mario(spriteSheetImage, 175, 0, 24, 24)

            //mario add krdia entities me 
            gameObj.entities.mario = mario;
            gameObj.entities.scenery = []; // scenery ka empty array 
            gameObj.entities.goombas = [] // new array goombas ke liye intitialise krwa diya 
            gameObj.entities.koopas = [] // new array koopas ke liye intitialise krwa diya 
            gameObj.entities.bricks = []
            gameObj.entities.particles = []; //brick tutne ke baad jo particles bnenge unka array
            gameObj.entities.blocks = []; //mystery boxes ka array
            gameObj.entities.mushrooms = []; //mystery boxes ka array
            gameObj.entities.coins = []; //mystery boxes ka array

            levelOne.goombas.forEach((gCord) => {
                //isse ek ek krke naye goomba banenge aur goomba array gameobj ke goomba  array me add  ho jayenge
                gameObj.entities.goombas.push(new Goomba(spriteSheetImage, gCord[0], gCord[1], gCord[2], gCord[3]))

            })
            levelOne.koopas.forEach((kCord) => {
                //isse ek ek krke naye koopa banenge aur koopas array gameobj ke goomba  array me add  ho jayenge
                gameObj.entities.koopas.push(new Koopa(spriteSheetImage, kCord[0], kCord[1], kCord[2], kCord[3]))

            })



            //gameobj ke paas state hai 
            //uss state ko render krke draw krne ke liye render ko pass krdiya
            render.init(gameObj)

            //controls bhi initialise hojaaye
            input.init()

            // game class ka update call hora
            this.update(gameObj)
        })
    }

    //actual game yahi chlega --run() bhi bol skte hai isse
    update(gameObj) {
        function gameloop() {

            console.log("mario yaha h "+gameObj.entities.mario.posX);

            //checck krte rehte h input ka update to ni aaya 
            input.update(gameObj);


            //animation har render pr lgega
            animation.update(gameObj)

            //movement har render pr mario ke alawa jo bhi entities hai unki 
            movement.update(gameObj)

            //physics add kab hogi input ke baad 
            physics.update(gameObj)




            //update UI changes
            render.update(gameObj);

            gameObj.animFrame++;

            //infinite loop create krega ye --baar baar check krre
            requestAnimationFrame(gameloop);
        }
        gameloop();
    }


    //game ko reset krdega -->shuruwat ke state me layega
    reset() {
        location.reload();
    }
}
const game = new Game();
game.init();