// ye file sirf isliye jisme hum states ke hisaab se animation call krenge 

let animation ={
    update(gameObj){

        let mario = gameObj.entities.mario

        //key press ke saath badalti rhegi aur animation call hoga
        mario.currentState(gameObj);

        gameObj.entities.goombas.forEach((goomba)=>{
            goomba.currentState.animation(gameObj) // ye play krega current state ko 
        })

        gameObj.entities.koopas.forEach((koopa)=>{
            koopa.currentState.animation(gameObj) // ye play krega current state ko 
        })

        gameObj.entities.blocks.forEach((block)=>{
            block.currentState(gameObj) // ye play krega current state ko 
        })
        
    }
}