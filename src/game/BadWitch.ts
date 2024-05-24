import { AnimatedSprite, Container, Graphics, Rectangle, Texture } from "pixi.js";
import { IHitbox } from "../utils/IHitbox";
import { PhysicsContainer } from "./PhysicsContainer";

export class BadWitch extends PhysicsContainer implements IHitbox {
    
    public states: Map<string, AnimatedSprite> = new Map();
    private hitbox:Graphics;
    private animContainer: Container = new Container();
    
    constructor () {
        super();
        this.hitbox = new Graphics();
        this.hitbox.beginFill(0xFF00FF, 0.3);
        this.hitbox.drawRect(0, 0, 125, 125);
        this.hitbox.endFill();
        this.hitbox.x = -90;
        this.hitbox.y = -120;
    }
    
    getHitbox(): Rectangle {
        return this.hitbox.getBounds();
    }

    public addState(stateName: string, frames: Texture[] | string[], animationSpeed: number, scale: number, loop: boolean) {

        const texArray: Texture[] = [];
        for (const tex of frames) {
            if (typeof tex == "string") {
                texArray.push(Texture.from(tex));
            } else {
                texArray.push(tex);
            }
        }
        const tempAnimation: AnimatedSprite = new AnimatedSprite(texArray);
        tempAnimation.animationSpeed = animationSpeed;
        tempAnimation.scale.set(scale);
        if (loop) {
            tempAnimation.loop = loop;
        } 
        tempAnimation.play();
        tempAnimation.anchor.set(0.5, 1);
        this.states.set(stateName, tempAnimation);
    }

    public playState(stateName: string, _restartAnim?:boolean, onlyOnce?:boolean) {
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
            }
}