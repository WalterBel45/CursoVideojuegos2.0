import { Container, Graphics, NineSlicePlane, Rectangle, Texture } from "pixi.js";
import { IHitbox } from "../utils/IHitbox";

export class Platform extends Container implements IHitbox {
    private hitbox: Graphics;
    
    constructor() {
        super();
        const platform = new NineSlicePlane(Texture.from(
            "platform1"), 15, 15, 15, 15);

            this.addChild(platform);
            
            this.hitbox = new Graphics();
            this.hitbox.beginFill(0xFF00FF, 0.3);
            this.hitbox.drawRect(0, 0, 80, 45);
            this.hitbox.endFill();
            this.addChild(this.hitbox);
            
    }
    getHitbox(): Rectangle {
        return this.hitbox.getBounds();
    }
}