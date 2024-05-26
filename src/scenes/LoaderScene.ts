import { Graphics } from "pixi.js";
import { SceneBase } from "../utils/SceneBase";
import { SceneManager } from "../utils/SceneManager";

export class LoaderScene extends SceneBase {
    
    public override update(): void {}

    private bar:Graphics;

    constructor () {
        super();
        this.bar = new Graphics();
        this.bar.beginFill(0xFF0000, 1);
        this.bar.drawRect(0,0,SceneManager.WIDTH * 0.8, SceneManager.HEIGHT * 0.1);
        this.bar.endFill();

        this.bar.lineStyle(5, 0x000000, 1);
        this.bar.beginFill(0x000000, 0);
        this.bar.drawRect(0,0,SceneManager.WIDTH * 0.8, SceneManager.HEIGHT * 0.1);
        this.bar.endFill();

        this.bar.x = SceneManager.WIDTH * 0.5;
        this.bar.y = SceneManager.HEIGHT * 0.5;

        this.bar.pivot.x = this.bar.width / 2;
        this.bar.pivot.y = this.bar.height / 2;

        this.addChild(this.bar);

        this.setBarPercent(50);
    }
    
    private setBarPercent(percent:number) {
        this.bar.scale.x = (percent / 100);
    }
}