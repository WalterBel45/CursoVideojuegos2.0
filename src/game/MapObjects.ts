import { Container, Graphics, Rectangle, Sprite } from "pixi.js";
import { Tween } from "tweedle.js";

export class MapObjects extends Container {
    private hitbox: Graphics;
    private type: string;
    
    constructor(type: string) {
        super();
        let sprite: Sprite;
        this.type = type;
        if (type === "manaPot") {
            sprite = Sprite.from("manaPot");
        } else if (type === "healthPot") {
            sprite = Sprite.from("healthPot");
        } else if (type === "coin") {
            sprite = Sprite.from("coin");
            
        } else {
            throw new Error("Unknown type: " + type);
        }

        sprite.anchor.set(0.5);
        sprite.scale.set(0.8);
        this.addChild(sprite);

        new Tween(sprite).to({ scale: { x: 1.2, y: 1.2 } }, 1000)
            .repeat(Infinity)
            .yoyo(true)
            .start();

        this.hitbox = new Graphics();
        this.hitbox.beginFill(0xFF00FF, 0.3);
        this.hitbox.drawRect(-11, -15, 22, 40);
        this.hitbox.endFill();
        this.addChild(this.hitbox);
    }

    getHitbox(): Rectangle {
        return this.hitbox.getBounds();
    }

    public getType() {
        return this.type;
    }
}