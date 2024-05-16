import { AnimatedSprite, Container, Graphics, ObservablePoint, Rectangle, Texture } from "pixi.js";
import { PhysicsContainer } from "./PhysicsContainer";
//import { HEIGHT, WIDTH } from "..";
//import { Keyboard } from "../utils/keyboard";
import { IHitbox } from "../utils/IHitbox";
import { Keyboard } from "../utils/keyboard";
import { SceneManager } from "../utils/SceneManager";

export class GoodWitch extends PhysicsContainer implements IHitbox {


    private static readonly GRAVITY = 350;
    private static readonly MOVE_SPEED = 350;
    public canJump = true;
    private hitbox: Graphics;
    private static readonly JUMP_SPEED = 600;
    public isJumping = false;
    public states: Map<string, AnimatedSprite> = new Map();
    private animContainer: Container = new Container();
    private maximumFallSpeed = 300;
    private canDying = false;
    private isDying: boolean = false;
    private isAttacking = false;
    private canAttack = true;
    private mana:number;
    private manaMax:number;
    


    constructor() {
        super();

        this.mana = 0;
        this.manaMax = 100;
        this.addChild(this.animContainer);
        this.speed.x = 0;
        this.speed.y = 0;
        this.acceleration.y = GoodWitch.GRAVITY;

        if (Keyboard.down) {
            Keyboard.down.on("Space", this.jump, this);
            Keyboard.down.on("KeyQ", this.die, this);
            Keyboard.down.on("KeyE", this.attack, this);
        }




        const auxZero = new Graphics();
        auxZero.beginFill(0xFF00FF);
        auxZero.drawCircle(0, 0, 10);
        auxZero.endFill();

        this.hitbox = new Graphics();
        this.hitbox.beginFill(0xFF00FF, 0.3);
        this.hitbox.drawRect(0, 0, 125, 125);
        this.hitbox.endFill();
        this.hitbox.x = -90;
        this.hitbox.y = -120;



        this.addChild(auxZero);
        this.addChild(this.hitbox);


    }

    getMana():number {
        return this.mana;
    }

    getManaMax(): number {
        return this.manaMax;
    }

    addMana(amount:number): void {
        this.mana = Math.min(this.mana + amount, this.manaMax);
    }

    public override destroy(options: any) {
        super.destroy(options);
        
        Keyboard.down.off("Space", this.jump);
        Keyboard.down.off("KeyQ", this.die);
        Keyboard.down.off("KeyE", this.attack);

    }

    getHitbox(): Rectangle {
        return this.hitbox.getBounds();
    }

    public override update(deltaMS: number) {
        super.update(deltaMS / 1000);
        

        /*for (const state of this.states.values()) {
            state.update(deltaMS / (1000 / 60));
        }*/

        if (Keyboard.state.get("KeyD")) {
            this.speed.x = GoodWitch.MOVE_SPEED;
            this.scale.x = 1
            this.playState("run");
            
        } else if (Keyboard.state.get("KeyA")) {
            this.speed.x = -GoodWitch.MOVE_SPEED;
            this.scale.x = -1
            this.playState("run");
        }
        else {
            this.speed.x = 0;
            this.playState("idle");
        }

        if (this.isJumping) {
            this.playState("jump", true, true);
            
        }
        
        if (this.isDying) {
            this.playState("death", true, true);
            
            
            
        }

        if (this.isAttacking) {
           this.playState("attack", true, true); 
           
            
           

            
        
    }


        if (Keyboard.state.get("KeyS")) {

            this.acceleration.y = GoodWitch.GRAVITY * 2;

        } else {
            this.acceleration.y = GoodWitch.GRAVITY;

        }
        

        if (this.x > SceneManager.WIDTH) {
            this.x = SceneManager.WIDTH;



        } else if (this.x < 0) {
            this.x = 0;



        }
        if (this.y > SceneManager.HEIGHT) {
            this.y = SceneManager.HEIGHT;
            this.speed.y = 0;
            this.canJump = true;
            this.isJumping = false;
            this.canDying = true;
            this.canAttack = true;
            
        } else if (this.y < 0) {
            this.y = 0;
            this.speed.y = 0;
        }

        if (this.speed.y > this.maximumFallSpeed) {
            this.speed.y = this.maximumFallSpeed;

        } 
        

    }

    public jump() {
        if (this.canJump && !this.isJumping) {
            this.isJumping = true;
            this.canJump = false;
            this.speed.y = -GoodWitch.JUMP_SPEED;
            




        }
    }

    public die() {
        if (this.canDying && !this.isDying) {
            this.speed.x = 0;
            this.speed.y = 0;
            this.isDying = true;
            this.canDying = false;
        }
        
    }

    public attack() {
       if (this.canAttack && !this.isAttacking) {
        this.canAttack = false;
        this.isAttacking = true;
       }
    }

    public separate(overlap: Rectangle, platform: ObservablePoint<any>) {
        if (overlap.width < overlap.height) {

            if (this.x > platform.x) {
                this.x += overlap.width;
            } else if (this.x < platform.x) {
                this.x -= overlap.width;

            }

        } else {

            if (this.y > platform.y) {

                this.y += overlap.height;
                this.acceleration.y += GoodWitch.GRAVITY;
                


            } else if (this.y < platform.y) {
                this.acceleration.y = 0;
            this.speed.y = 0;
            this.y -= overlap.height;
            this.canJump = true;
            this.isJumping = false;
            this.isAttacking = false;
            }
            




        }





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
            

            
        
    




