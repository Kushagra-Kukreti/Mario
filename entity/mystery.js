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

    createCoins(){

    }

    createMushrooms(){

    }

}