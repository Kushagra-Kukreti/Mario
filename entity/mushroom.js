class Mushroom extends Entity {
    
    //isme alag se velX and velY kyuki isko tutke aage aur neeche bhi jaana hai 
    constructor(spritesheet, posX, posY, width, height,velx,velY) {
        const sprite = new Sprite(spriteSheetImage,623, 2, 20, 22);
        super(sprite,'mushroom',posX,posY,width,height);
        this.posX=posX; // ye do isse krega position change krke
        this.posY=posY; // ye giraane ke liye gravity se
        this.velX =velx;
        this.velY= velY;
    
       let self = this;

       this.states ={
        movement(gameObj){
            self.posX +=self.velX;
        }
       }
}

}