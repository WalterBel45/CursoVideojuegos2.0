import {Graphics, NineSlicePlane, Rectangle, Texture } from "pixi.js";
import { IHitbox } from "../utils/IHitbox";
import { PhysicsContainer } from "./PhysicsContainer";
import { MapObjects } from "./MapObjects";

export class Platform extends PhysicsContainer implements IHitbox {
    private hitbox: Graphics;
    private manaPot:MapObjects;
    
    constructor() {
        super();
        const platform = new NineSlicePlane(Texture.from(
            "platform1"), 15, 15, 15, 15);

           

            this.manaPot = new MapObjects();
            this.manaPot.position.x = platform.width / 2;
            this.manaPot.position.y = platform.height - 60;

            this.addChild(platform, this.manaPot);
            
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