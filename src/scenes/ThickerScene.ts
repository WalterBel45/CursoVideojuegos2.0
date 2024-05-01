import { Container, Sprite } from "pixi.js";
import { IUpdateable } from "../utils/IUpdateable";
import { GoodWitch } from "../game/GoodWitch";

export class ThickerScene extends Container implements IUpdateable {

    private goodWitch: GoodWitch;
    

    constructor() {
        super();

        const background: Sprite = Sprite.from("background1");
        const platform1: Sprite = Sprite.from("platform1");
        const platform2: Sprite = Sprite.from("platform1");
        
        platform1.position.set(650, 700);
        platform2.anchor.set(1000, 700)

        


        
        this.addChild(background, platform1, platform2);
        this.goodWitch = new GoodWitch();
        this.addChild(this.goodWitch);
        
    }

    
    public update(deltaTime: number) {
        this.goodWitch.update(deltaTime);
        
    
}
}