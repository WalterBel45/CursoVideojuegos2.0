import { Container, Sprite } from "pixi.js";
import { IUpdateable } from "../utils/IUpdateable";
import { GoodWitch } from "../game/GoodWitch";
import { Platform } from "../game/Platform";
import { HEIGHT, WIDTH } from "..";
import { checkCollision } from "../utils/IHitbox";

export class ThickerScene extends Container implements IUpdateable {

    private goodWitch: GoodWitch;
    private platforms: Platform[];

    constructor() {
        super();

        const background: Sprite = Sprite.from("background1");

        this.platforms = [];

        const platform1 = new Platform();
        platform1.position.set(450,950);
        platform1.scale.set(5, 2);
        this.platforms.push(platform1);

        const platform2 = new Platform();
        platform2.position.set(1200, 950);
        platform2.scale.set(5, 2);
        this.platforms.push(platform2);



        this.addChild(background, platform1, platform2);
        this.goodWitch = new GoodWitch();
        this.addChild(this.goodWitch);

    }


    public update(deltaTime: number, _deltaFrame: number): void {
        this.goodWitch.update(deltaTime);

        for ( let platform of this.platforms) {
            const overlap = checkCollision(this.goodWitch, platform);
            if (overlap != null) {

                if (overlap.width < overlap.height) {
                    this.goodWitch.x -= overlap.width;
                } else {
                    this.goodWitch.y -= overlap.height;
                this.goodWitch.canJump = true;
                }
                
                
            }
        }


        if (this.goodWitch.x > WIDTH) {
            this.goodWitch.x = WIDTH;



        } else if (this.goodWitch.x < 0) {
            this.goodWitch.x = 0;


        }
        if (this.goodWitch.y > HEIGHT) {
            this.goodWitch.y = HEIGHT;
            this.goodWitch.canJump = true;
        }

    }
}