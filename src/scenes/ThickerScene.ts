import { Container, NineSlicePlane, Sprite, Texture } from "pixi.js";
import { IUpdateable } from "../utils/IUpdateable";
import { GoodWitch } from "../game/GoodWitch";

export class ThickerScene extends Container implements IUpdateable {

    private goodWitch: GoodWitch;
    

    constructor() {
        super();

        const background: Sprite = Sprite.from("background1");
        const platform1 = new NineSlicePlane(Texture.from(
            "platform1"), 15, 15, 15, 15);
        
            
        platform1.position.set(450, 700);
        platform1.scale.set(5, 2);

        const platform2 = new NineSlicePlane(Texture.from(
            "platform1"), 15, 15, 15, 15);
        
            platform2.position.set(1000, 700);
            platform2.scale.set(5, 2);

        


        
        this.addChild(background, platform1, platform2);
        this.goodWitch = new GoodWitch();
        this.addChild(this.goodWitch);
        
    }

    
    public update(deltaTime: number) {
        this.goodWitch.update(deltaTime);
        
    
}
}