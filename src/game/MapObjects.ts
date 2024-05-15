import { Container, Graphics, Rectangle, Sprite } from "pixi.js";
import { Tween } from "tweedle.js";

export class MapObjects extends Container {
    
    private hitbox: Graphics;

    constructor () {
        super();
        const healthPot = Sprite.from("manaPot");
        healthPot.anchor.set(0.5);
        healthPot.scale.set(0.8);
        this.addChild(healthPot);
        

        new Tween(healthPot).to({scale: {x: 1.2, y: 1.2}}, 1000)
            //.easing(Easing.Elastic.Out)
            .repeat(Infinity)
            .yoyo(true)
            .start();

            
            
        const mana = Sprite.from("manaPot");
        mana.anchor.set(0.5);
        mana.scale.set(0.8);
        this.addChild(mana);
        

        new Tween(mana).to({scale: {x: 1.2, y: 1.2}}, 1000)
            .repeat(Infinity)
            .yoyo(true)
            .start();

            this.hitbox = new Graphics();
            this.hitbox.beginFill(0xFF00FF, 0.3);
            this.hitbox.drawRect(-11, -15, 22, 40);
            this.hitbox.endFill();
            this.addChild(this.hitbox);
    }

    getHitbox(): Rectangle {
        return this.hitbox.getBounds();
    }

    /*public addItem(image:string) {

        const item = Sprite.from(image);
        item.anchor.set(0.5);
        item.scale.set(0.8);
        
        new Tween(item).to({scale: {x: 1.2, y: 1.2}}, 1000)
            .repeat(Infinity)
            .yoyo(true)
            .start();
        
    }*/

    /*public displayItem(stateName: string, _restartAnim?:boolean, onlyOnce?:boolean) {
        this.animContainer.removeChildren();
        const currentState = this.states.get(stateName)

        if (currentState) {
            this.animContainer.addChild(currentState);
            
                
                if (onlyOnce) {

                    let executed = false;
                    
                    currentState.onLoop = () => {
                        
                        if (!executed) {
                            currentState.stop();
                            executed = true;
                        } 
                        
                        
                //currentState.gotoAndPlay(currentState.totalFrames);
                            
                      
                        
                    };
                    executed = false;
                    
                } else  {
                    currentState.play();
                    
                }
            
                
                
                
               
                
                
                
            }
            
            
            }*/
}