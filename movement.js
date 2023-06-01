// MARIO KE ALAWA JITNI BHi entities hai vo khud move krti hai unki movement ka logic yaha rhega 
const movement = {
    update(gameObj){

        //goomba movement
        gameObj.entities.goombas.forEach((goomba)=>{
            goomba.currentState.movement(gameObj) // ye play krega current state ko 
        })

        //koopa movement
        gameObj.entities.koopas.forEach((koopa)=>{
            koopa.currentState.movement(gameObj) // ye play krega current state ko 
        })
    }
}