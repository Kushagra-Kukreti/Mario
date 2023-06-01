// ye class pick kregi aur entity class iski picked image ko place kregi
class Sprite {

    //img -->konsi image se nikaalna hai
    //konsa portion nikaalna hai 
    constructor(img, srcX, srcY, srcW, srcH) {

        this.img = img;
        this.srcX = srcX;
        this.srcY = srcY;
        this.srcW = srcW;
        this.srcH = srcH;

    }

}


//ye game me place kregi image se uthake kisi bhi chij ko 
class Entity {

    constructor(sprite, type, posX, posY, width, height) {

        this.sprite = sprite;
        this.type = type;

        //game ke coordinates
        this.posX = posX;
        this.posY = posY;
        this.width = width;
        this.height = height;

    }

}