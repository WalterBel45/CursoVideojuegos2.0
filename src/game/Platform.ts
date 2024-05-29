import { Sprite, Texture, Graphics, Rectangle } from "pixi.js";
import { PhysicsContainer } from "./PhysicsContainer";
import { IHitbox } from "../utils/IHitbox";
import { MapObjects } from "./MapObjects";
import { GoodWitch } from "./GoodWitch";

export class Platform extends PhysicsContainer implements IHitbox {
    private hitbox: Graphics;
    private pot: MapObjects | null;
    private goodWitch: GoodWitch;

    constructor(goodWitch: GoodWitch) {
        super();
        this.goodWitch = goodWitch;

        const platform = new Sprite(Texture.from("platform1"));
        this.addChild(platform);

        this.hitbox = new Graphics();
        this.hitbox.beginFill(0xFF00FF, 0.00001);
        this.hitbox.drawRect(0, 0, 80, 45);
        this.hitbox.endFill();
        this.addChild(this.hitbox);

        const rand = Math.random();

        if (this.goodWitch.isManaFull() && !this.goodWitch.isHealthFull()) {
            // Incrementar la probabilidad de healthPot
            if (rand < 0.66) {
                this.pot = new MapObjects("healthPot");
            } else if (rand > 0.66) {
                this.pot = new MapObjects("coin");
            } else {
                this.pot = null;
            }
        } else if (!this.goodWitch.isManaFull() && this.goodWitch.isHealthFull()) {
            // Incrementar la probabilidad de manaPot
            if (rand < 0.66) {
                this.pot = new MapObjects("manaPot");
            } else if (rand > 0.66) {
                this.pot = new MapObjects("coin");
            } else {
                this.pot = null;
            }
        } else {
            // Distribución normal cuando ambos no están llenos
            if (rand < 0.33) {
                this.pot = new MapObjects("manaPot");
            } else if (rand < 0.66) {
                this.pot = new MapObjects("healthPot");
            } else if (rand < 0.88) {
                this.pot = new MapObjects("coin");
            } else {
                this.pot = null;
            }
        }

        if (this.pot) {
            this.pot.position.x = platform.width / 2;
            this.pot.position.y = platform.height - 60;
            this.addChild(this.pot);
        }
    }

    getHitbox(): Rectangle {
        return this.hitbox.getBounds();
    }

    removeManaPot(): void {
        if (this.pot) {
            this.removeChild(this.pot);
            this.pot = null;
        }
    }

    getManaPot(): MapObjects | null {
        return this.pot;
    }
}