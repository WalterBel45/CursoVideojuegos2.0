import { AnimatedSprite, Graphics, ObservablePoint, Rectangle, Texture } from "pixi.js";
import { PhysicsContainer } from "./PhysicsContainer";
//import { HEIGHT, WIDTH } from "..";
//import { Keyboard } from "../utils/keyboard";
import { IHitbox } from "../utils/IHitbox";
import { Keyboard } from "../utils/keyboard";

export class GoodWitch extends PhysicsContainer implements IHitbox {


    private static readonly GRAVITY = 350;
    private static readonly MOVE_SPEED = 350;
    private goodWitchAnimatedRun: AnimatedSprite;
    public canJump = true;
    //private goodWitchAnimatedJump: AnimatedSprite;
    private hitbox: Graphics;

    constructor() {
        super();

        this.goodWitchAnimatedRun = new AnimatedSprite(
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

        /*this.goodWitchAnimatedJump = new AnimatedSprite(
            [
                Texture.from("jumpAnimation1"),
                Texture.from("jumpAnimation2"),
                Texture.from("jumpAnimation3"),
                Texture.from("jumpAnimation4"),
                Texture.from("jumpAnimation5"),
                Texture.from("jumpAnimation6"),
                Texture.from("jumpAnimation7"),
                Texture.from("jumpAnimation8"),
                Texture.from("jumpAnimation9"),
                Texture.from("jumpAnimation10"),
                Texture.from("jumpAnimation11"),
                Texture.from("jumpAnimation12"),
                Texture.from("jumpAnimation13"),
                Texture.from("jumpAnimation14"),
                Texture.from("jumpAnimation15"),
                ],
                false
        ); */

        this.goodWitchAnimatedRun.scale.set(3);
        this.goodWitchAnimatedRun.animationSpeed = 0.3;
        this.goodWitchAnimatedRun.play();
        this.goodWitchAnimatedRun.anchor.set(0.5, 1);


        this.speed.x = 250;
        this.speed.y = 0;
        this.acceleration.y = GoodWitch.GRAVITY;
        Keyboard.down.on("Space", this.jump, this);



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




        this.addChild(this.goodWitchAnimatedRun);
        this.addChild(auxZero);
        this.addChild(this.hitbox);


    }
    public override destroy(options: any) {
        super.destroy(options);
        Keyboard.down.off("Space", this.jump);
    }

    getHitbox(): Rectangle {
        return this.hitbox.getBounds();
    }

    public override update(deltaMS: number) {
        super.update(deltaMS / 1000);
        this.goodWitchAnimatedRun.update(deltaMS / (1000 / 60));

        if (Keyboard.state.get("KeyD")) {
            this.speed.x = GoodWitch.MOVE_SPEED;
            this.scale.x = 1
        } else if (Keyboard.state.get("KeyA")) {
            this.speed.x = -GoodWitch.MOVE_SPEED;
            this.scale.x = -1
        } else {
            this.speed.x = 0;
        }

        /*if (Keyboard.state.get("Space")) {
            this.jump();

        } */
    }
    private jump() {
        if (this.canJump) {
            this.canJump = false;
            this.speed.y = -500;
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
                this.y -= overlap.height;
                this.speed.y = 0;
                this.canJump = true;


            } else if (this.y < platform.y) {
                this.y += overlap.height;
            }

        }
    }
}
