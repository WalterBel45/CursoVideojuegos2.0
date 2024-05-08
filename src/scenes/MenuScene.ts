import {Container, Sprite, Texture} from "pixi.js";
import { MenuButtons } from "../game/MenuButtons";
import { IUpdateable } from "../utils/IUpdateable";
import { GoodWitch } from "../game/GoodWitch";
import { HEIGHT } from "..";


export class MenuScene extends Container implements IUpdateable {

    private menuButtons: MenuButtons;
    private character: GoodWitch;
    timePassed: number = 0;

    constructor() {
        super();

        

        const background = new Sprite(Texture.from("background1"));
        this.addChild(background);

        this. menuButtons = new MenuButtons();
        this.addChild(this.menuButtons);

        this.character = new GoodWitch();
        this.addChild(this.character);
        this.character.x = 100;
        this.character.y = HEIGHT;

    
}
    public update(deltaTime: number, _deltaFrame: number): void {
        
        this.timePassed += deltaTime;
        this.character.update(deltaTime);
        
        if (this.timePassed > 2000){
            //this.character.jump();
            this.timePassed = 0;
        }
    }
     
}