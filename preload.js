
//saari images preload krlo 
const castleImage = new Image();//-->empty image mil jayegi isse
const cloudImage = new Image();
const mountainImage = new Image();
const spriteSheetImage = new Image();
const tileSetImage = new Image();

function preload() {
    tileSetImage.src = "./assets/sprites/tileset_gutter.png"
    castleImage.src = "./assets/sprites/castle.png"
    cloudImage.src = "./assets/sprites/clouds.png"
    mountainImage.src = "./assets/sprites/mountain.png"
    spriteSheetImage.src = "./assets/sprites/spritesheet.png"


    //saari images load hojayegi jb tb then krna jo maine game.js me krna
    return new Promise((resolve, reject) => {

        let p1 = new Promise((resolve, reject) => {


            castleImage.addEventListener("load", () => {
                console.log("Image Loaded");
                resolve();
            })

        })

        let p2 = new Promise((resolve, reject) => {


            cloudImage.addEventListener("load", () => {
                console.log("Image Loaded");
                resolve();
            })

        })

        let p3 = new Promise((resolve, reject) => {


            mountainImage.addEventListener("load", () => {
                console.log("Image Loaded");
                resolve();
            })

        })

        let p4 = new Promise((resolve, reject) => {


            spriteSheetImage.addEventListener("load", () => {
                console.log("Image Loaded");
                resolve();
            })

        })

        let p5 = new Promise((resolve, reject) => {

            tileSetImage.addEventListener("load", () => {
                console.log("Image Loaded");
                resolve();
            })

        })

        //jb saare chl jayenge tb big promise chl payega
        let BigPromise = Promise.all([p1, p2, p3, p4, p5])

        BigPromise.then(() => {
            //tb resolve hoga ki paacho load hogyi
            resolve();
        })
    })


}

preload();
