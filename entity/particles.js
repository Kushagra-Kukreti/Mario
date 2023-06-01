//brick jb break hogi to uske tutne ka animation 
class Particle extends Entity {
    
    //isme alag se velX and velY kyuki isko tutke aage aur neeche bhi jaana hai 
    constructor(spritesheet, posX, posY, width, height,velx,velY) {
        const sprite = new Sprite(tileSetImage,25,6,10,7);
        super(sprite,'particle',posX,posY,width,height);
        this.posX+=velx; // ye do isse krega position change krke
        this.velY=velY; // ye giraane ke liye gravity se

}
}