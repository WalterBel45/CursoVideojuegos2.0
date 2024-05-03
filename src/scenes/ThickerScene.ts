import { Container, Texture, TilingSprite } from "pixi.js";
import { IUpdateable } from "../utils/IUpdateable";
import { GoodWitch } from "../game/GoodWitch";
import { Platform } from "../game/Platform";
import { HEIGHT, WIDTH } from "..";
import { checkCollision } from "../utils/IHitbox";

export class ThickerScene extends Container implements IUpdateable {

    private goodWitch: GoodWitch;
    private platforms: Platform[];
    private world: Container;
    private background: TilingSprite;
    private gameSpeed: number = 100;

    constructor() {
        super();

        this.world = new Container();
        this.background = new TilingSprite(Texture.from("background1"), WIDTH, HEIGHT);
        this.addChild(this.background);

        this.platforms = [];

        let platform1 = new Platform();
        platform1.position.set(450, 750);
        platform1.scale.set(5, 2);
        this.platforms.push(platform1);
        this.world.addChild(platform1);

        platform1 = new Platform();
        platform1.position.set(1200, 750);
        platform1.scale.set(5, 2);
        this.platforms.push(platform1);
        this.world.addChild(platform1);
        
        platform1 = new Platform();
        platform1.position.set(1800, 750);
        platform1.scale.set(5, 2);
        this.platforms.push(platform1);
        this.world.addChild(platform1);
        
        platform1 = new Platform();
        platform1.position.set(2000, 750);
        platform1.scale.set(5, 2);
        this.platforms.push(platform1);
        this.world.addChild(platform1);


        
        this.goodWitch = new GoodWitch();
        this.world.addChild(this.goodWitch);
        this.goodWitch.x = 100;
        this.goodWitch.y = 100;

        this.addChild(this.world);


    }


    public update(deltaTime: number, _deltaFrame: number): void {
        this.goodWitch.update(deltaTime);

        for (let platform of this.platforms) {
            platform.speed.x = -this.gameSpeed;
            platform.update(deltaTime/1000);
            const overlap = checkCollision(this.goodWitch, platform);
            if (overlap != null) {

                this.goodWitch.separate(overlap, platform.position);

            }
        }


        if (this.goodWitch.x > WIDTH) {
            //this.goodWitch.x = WIDTH;



        } else if (this.goodWitch.x < 0) {
            this.goodWitch.x = 0;


        }
        if (this.goodWitch.y > HEIGHT) {
            this.goodWitch.y = HEIGHT;
            this.goodWitch.speed.y = 0;
            this.goodWitch.canJump = true;
        }

        this.world.x = -this.goodWitch.x * this.worldTransform.a + WIDTH/4;
        this.background.tilePosition.x = this.world.x * 0.5;
    }

    
}