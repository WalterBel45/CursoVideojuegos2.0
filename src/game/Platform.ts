import {Graphics, NineSlicePlane, Rectangle, Texture } from "pixi.js";
import { IHitbox } from "../utils/IHitbox";
import { PhysicsContainer } from "./PhysicsContainer";
import { MapObjects } from "./MapObjects";

export class Platform extends PhysicsContainer implements IHitbox {
    private hitbox: Graphics;
    private manaPot;
    
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
            
            if (Math.random() < 0.5) {

                this.manaPot = new MapObjects();
                this.manaPot.position.x = platform.width / 2;
                this.manaPot.position.y = platform.height - 60;
    
                this.addChild(this.manaPot);
               } else {
                this.manaPot = null;
               }
    }
    getHitbox(): Rectangle {
        return this.hitbox.getBounds();
    }
    
    removeManaPot(): void {
        if (this.manaPot) {
            this.removeChild(this.manaPot);
            this.manaPot = null;
        }
    }

    getManaPot(): MapObjects | null {
        return this.manaPot;
    }
}