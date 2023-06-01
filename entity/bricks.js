class Brick extends Entity {

    constructor(spritesheet, posX, posY, width, height) {
        const sprite = new Sprite(tileSetImage, 18, 0, 18, 18);
        super(sprite, 'brick', posX, posY, width, height);
    }

    createParticle(gameObj) {
        //this --means brick
        //-8 se upar jayega kyuki Y neeche ki taraf bdta hai 
        let l1 = new Particle(tileSetImage, this.posX, this.posY, this.width / 2, this.height / 2, 10, -8) //left ki taraf girega
        let r1 = new Particle(tileSetImage, this.posX, this.posY, this.width / 2, this.height / 2, -20, -8) //right ki taraf girega 

        gameObj.entities.particles.push(l1, r1);

        //ab remove krdo game se 
        setTimeout(() => {
            let idx = gameObj.entities.particles.indexOf(l1);
            gameObj.entities.particles.splice(idx);
            idx = gameObj.entities.particles.indexOf(r1);
            gameObj.entities.particles.splice(r1);
        },300)
    }

}