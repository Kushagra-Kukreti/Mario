class LevelBuilder{

    //level --> hai ki pure level ke entities ka data 
    constructor(level){

    this.sceneryEntities =[];// ye ek array hai jisme entities build hoke push hongi 

    this.bricks = []; // iss level ki saari bricks yaha rahegi

    this.blocks = []; // ye saare mystery boxes

    // ye to ground ka hogya 
    level.ground.forEach((gCord)=>{
            

            //ground bnake array me daalre
            this.sceneryEntities.push(

            new Ground(tileSetImage,gCord[0],gCord[1],gCord[2],gCord[3]) // ye ground maine bg blueprint se liya 
            //tileSetImage maine preload se uthaayi
          
            )
      })
    
    level.shrubs.forEach((shrub) => {
        this.sceneryEntities.push(
          new Shrub(tileSetImage, shrub[0], shrub[1], shrub[2], shrub[3]),
        );
      }); 

      level.mountains.forEach((mountain) => {
        this.sceneryEntities.push(
          new Mountain(
            mountainImage, mountain[0], mountain[1], mountain[2], mountain[3]),
        );
      });

      level.pipes.forEach((pipe) => {
      this.sceneryEntities.push(
          new Pipe(tileSetImage, pipe[0], pipe[1], pipe[2], pipe[3]),
        );
      });

      level.smallClouds.forEach((smallCloud) => {
        this.sceneryEntities.push(
          new SmallCloud(
            cloudImage, smallCloud[0], smallCloud[1], smallCloud[2], smallCloud[3],
        ));
      });

      level.mediumClouds.forEach((mediumCloud) => {
        this.sceneryEntities.push(
          new MediumCloud(
            cloudImage, mediumCloud[0], mediumCloud[1], mediumCloud[2], mediumCloud[3],
        ));
      });

      level.largeClouds.forEach((largeCloud) => {
        this.sceneryEntities.push(
          new LargeCloud(
            cloudImage, largeCloud[0], largeCloud[1], largeCloud[2], largeCloud[3],
        ));
      });

      level.stairs.forEach((stair) => {
        this.sceneryEntities.push(
          new Stair(tileSetImage, stair[0], stair[1], stair[2], stair[3]));
      });

      level.bricks.forEach((brick) => {
        this.bricks.push(
          new Brick(tileSetImage,brick[0],brick[1],brick[2],brick[3]));
      });
       
       
      //coins ko block me add kro 
      level.coins.forEach((coin) => {
        this.blocks.push(
          new Block("coin",tileSetImage,coin[0],coin[1],coin[2],coin[3]));
      });

      //mushrooms ko block me add kro 
      level.mushrooms.forEach((mushroom) => {
        this.blocks.push(
          new Block("mushroom",tileSetImage,mushroom[0],mushroom[1],mushroom[2],mushroom[3]));
      });

      // single entites
      this.sceneryEntities.push(
        new Flag(tileSetImage, level.flag[0], level.flag[1], level.flag[2], level.flag[3]),
      );
      this.sceneryEntities.push(
        new Flagpole(
            tileSetImage, level.flagpole[0], level.flagpole[1], level.flagpole[2], level.flagpole[3]),
      );
      this.sceneryEntities.push( 
        new Castle( 
            castleImage, level.castle[0], level.castle[1], level.castle[2], level.castle[3]),
      ); 

    }

    stock(gameObj){
        //  console.log("from stock function")
        //ye gameObj me entities ko daal dega 
        this.sceneryEntities.forEach((entity)=>{
            gameObj.entities.scenery.push(entity)
        })

        this.bricks.forEach((brick)=>{
          gameObj.entities.bricks.push(brick)
      })

      this.blocks.forEach((block)=>{
        gameObj.entities.blocks.push(block)
    })

    }

    render(gameObj){
      // console.log("from render function")
        //print krega level ki entities ko 

        let camera = gameObj.camera;



        gameObj.entities.scenery.forEach((entity)=>{
          this.drawEntity(entity,camera,gameObj);
        })

        gameObj.entities.bricks.forEach((brick)=>{
          this.drawEntity(brick,camera,gameObj);
        })

        gameObj.entities.blocks.forEach((block)=>{
          this.drawEntity(block,camera,gameObj);
        })


    }
    drawEntity(entity,camera,gameObj){

        let entityEnd = entity.posX+entity.width;
        let frameWidth = camera.start+camera.width;
         
        //for drawing 
        if(entity.posX>=camera.start && entityEnd<=frameWidth ){
        gameObj.tool.drawImage(
            entity.sprite.img,
            entity.sprite.srcX,
            entity.sprite.srcY,
            entity.sprite.srcW,
            entity.sprite.srcH,
            entity.posX-camera.start, //movement ke hisaab se X me frame ke render me change
            entity.posY,
            entity.width,
            entity.height
        );
        }
    }
}