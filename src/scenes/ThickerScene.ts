import { AnimatedSprite, Container, Texture, Ticker } from "pixi.js";
import { SceneBase } from "../utils/SceneBase";

export class ThickerScene extends SceneBase {
private goodWitchAnimated: AnimatedSprite;

    constructor() {
        super();

    this.goodWitchAnimated = new AnimatedSprite(
        [
            Texture.from("goodwitchrun1"),
            Texture.from("goodwitchrun2"),
            Texture.from("goodwitchrun3"),
            Texture.from("goodwitchrun4"),
            Texture.from("goodwitchrun5"),
            Texture.from("goodwitchrun6"),
            Texture.from("goodwitchrun7"),
            Texture.from("goodwitchrun8"),
            Texture.from("goodwitchrun9"),
            Texture.from("goodwitchrun10"),
            Texture.from("goodwitchrun11"),
            Texture.from("goodwitchrun12"),
            Texture.from("goodwitchrun13"),
            Texture.from("goodwitchrun14"),
            Texture.from("goodwitchrun15"),
            Texture.from("goodwitchrun16")
            ],
            false
    );

    this.goodWitchAnimated.scale.set(3);
    this.goodWitchAnimated.animationSpeed = 0.4;
    this.goodWitchAnimated.play();
    this.addChild(this.goodWitchAnimated);
}
    
}