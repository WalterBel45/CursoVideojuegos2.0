import { Container, Sprite } from "pixi.js";
import { IUpdateable } from "../utils/IUpdateable";
import { GoodWitch } from "../game/GoodWitch";
import { Platform } from "../game/Platform";
import { checkCollision } from "../utils/IHitbox";

export class ThickerScene extends Container implements IUpdateable {

    private goodWitch: GoodWitch;
    private platforms: Platform [];

    constructor() {
        super();

        const background: Sprite = Sprite.from("background1");
        
        this.platforms = [];

        const platform1 = new Platform();
        platform1.position.set(450, 700);
        platform1.scale.set(5, 2);
        this.platforms.push(platform1);
        
        const platform2 = new Platform();
        platform2.position.set(1000, 700);
        platform2.scale.set(5, 2);
        this.platforms.push(platform2);


        


        
        this.addChild(background,platform1,platform2);
        this.goodWitch = new GoodWitch();
        this.addChild(this.goodWitch);
        
    }

    
    public update(deltaTime: number) {
        this.goodWitch.update(deltaTime);
        
        //console.log(checkCollision(this.goodWitch, this.platforms[0]));
        for (let platform of this.platforms) {
            
            const overlap = checkCollision(this.goodWitch, platform)
            if (overlap != null) {
                this.goodWitch.y -= overlap.height;
            }
        
        }
}
}