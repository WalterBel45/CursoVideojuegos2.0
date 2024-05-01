import { AnimatedSprite, Graphics, Texture } from "pixi.js";
import { PhysicsContainer } from "./PhysicsContainer";
import { HEIGHT, WIDTH } from "..";
import { Keyboard } from "../utils/keyboard";

export class GoodWitch extends PhysicsContainer {

    private static readonly GRAVITY = 750;
    private static readonly MOVE_SPEED = 350;
    private goodWitchAnimated: AnimatedSprite;
    private physWitch: PhysicsContainer;
    private canJump = true;

    constructor() {
        super();

    this.goodWitchAnimated = new AnimatedSprite(
        [
            Texture.from("goodwitchrun1"),
            Texture.from("goodwitchrun2"),
            Texture.from("goodwitchrun3"),
            Texture.from("goodwitchrun4"),
            Texture.from("goodwitchrun5"),
            Texture.from("goodwitchrun6"),
            Texture.from("goodwitchrun7"),
            Texture.from("goodwitchrun8"),
            Texture.from("goodwitchrun9"),
            Texture.from("goodwitchrun10"),
            Texture.from("goodwitchrun11"),
            Texture.from("goodwitchrun12"),
            Texture.from("goodwitchrun13"),
            Texture.from("goodwitchrun14"),
            Texture.from("goodwitchrun15"),
            Texture.from("goodwitchrun16")
            ],
            false
    );

    this.goodWitchAnimated.scale.set(3);
    this.goodWitchAnimated.animationSpeed = 0.03;
    this.goodWitchAnimated.play();
    this.goodWitchAnimated.anchor.set(0.5, 1);

    this.physWitch = new PhysicsContainer();
    this.physWitch.speed.x = 400;
    this.physWitch.speed.y = 0;
    this.physWitch.acceleration.y = GoodWitch.GRAVITY;

    

    const auxZero = new Graphics();
    auxZero.beginFill(0xFF00FF);
    auxZero.drawCircle(0,0,10);
    auxZero.endFill();

    this.addChild(this.physWitch);
    this.physWitch.addChild(this.goodWitchAnimated);
    this.physWitch.addChild(auxZero);

    
}

public override update(deltaTime: number) {
    const deltaTim = deltaTime / 1000;
    this.physWitch.update(deltaTim);
    this.goodWitchAnimated.update(deltaTime);
  
    if (this.physWitch.x > WIDTH) {
        this.physWitch.x = WIDTH;
        
    } else if (this.physWitch.x < 0) {
        this.physWitch.x = 0;
        
    }
    if (this.physWitch.y > HEIGHT) {
        this.physWitch.y = HEIGHT;
        this.canJump = true;
        
    }

    if (Keyboard.state.get("KeyD")) {
        this.physWitch.speed.x = GoodWitch.MOVE_SPEED;
        this.physWitch.scale.x = 1
    } else if (Keyboard.state.get("KeyA")) {
        this.physWitch.speed.x = -GoodWitch.MOVE_SPEED;
        this.physWitch.scale.x = -1
    } else {
        this.physWitch.speed.x = 0;
    }

    if (Keyboard.state.get("Space") && this.canJump) {
        this.canJump = false;
        this.physWitch.speed.y = -500;
    }


}

    
}