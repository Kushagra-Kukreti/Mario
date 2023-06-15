class Block extends Entity {
     //content -->btaayega ki isme mushroom chupa hai ya coin
    constructor(content,spritesheet, posX, posY, width, height) {
        const sprite = new Sprite(tileSetImage, 433, 1, 17, 17);
        super(sprite, 'block', posX, posY, width, height);
        this.content = content;
        let self = this;

        this.animFrame={
            full:new Sprite(tileSetImage,433, 1, 17, 17 ),
            empty: new Sprite(tileSetImage,486, 0, 18, 18) 
        }
        this.states = {

            fullAnim(){
               self.sprite = self.animFrame.full;
            },
            emptyAnim(){
               self.sprite = self.animFrame.empty;
            }

        }
        this.currentState = this.states.fullAnim;
    }

    createCoins(gameObj){
         let coin = new Coin(spriteSheetImage,this.posX,this.posY-this.height+3,this.width,this.height,1.1,0);
         console.log("niklega",coin)
         gameObj.entities.coins.push(coin);

         setTimeout(() => {
            let idx = gameObj.entities.coins.indexOf(coin);
            gameObj.entities.coins.splice(idx);
        },50)
    }

    createMushrooms(gameObj){

        let mushroom = new Mushroom(spriteSheetImage,this.posX,this.posY-this.height+2,this.width,this.height,1.1,0);
        console.log("niklega",mushroom)
        gameObj.entities.mushrooms.push(mushroom);

    }

}