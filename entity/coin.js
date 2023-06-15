class Coin extends Entity {
    
    //isme alag se velX and velY kyuki isko tutke aage aur neeche bhi jaana hai 
    constructor(spritesheet, posX, posY, width, height) {
        const sprite = new Sprite(spriteSheetImage,17, 25, -14, -24);
        super(sprite,'coin',posX,posY,width,height);
        this.posX = posX; // ye do isse krega position change krke
        this.posY=posY; // ye giraane ke liye gravity se

}
}