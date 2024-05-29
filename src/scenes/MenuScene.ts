import {Sprite, Texture, Text, TextStyle} from "pixi.js";
import { MenuButtons } from "../game/MenuButtons";
import { IUpdateable } from "../utils/IUpdateable";
import { GoodWitch } from "../game/GoodWitch";
import { SceneBase } from "../utils/SceneBase";
import { SceneManager } from "../utils/SceneManager";
import { Button } from "../ui/button";
import { ThickerScene } from "./ThickerScene";


export class MenuScene extends SceneBase implements IUpdateable {

    private menuButtons: MenuButtons;
    private character: GoodWitch;
    timePassed: number = 0;

    constructor() {
        super();

        const background = new Sprite(Texture.from("background1"));
        this.addChild(background);

        this. menuButtons = new MenuButtons();
        this.addChild(this.menuButtons);

        const startButton = new Button(Texture.from("playDef"), 
        Texture.from("playDown"), 
        Texture.from("playOver"),
        );
        startButton.on("buttonClick", this.goToGame, this);
       startButton.x = SceneManager.WIDTH / 2 + 75;
        startButton.scale.set(1.5);
        startButton.y = SceneManager.HEIGHT / 2;
        this.addChild(startButton);

        this.character = new GoodWitch(this);
        this.character.addState("idle", [
            Texture.from("idleAnimation1"),
             Texture.from("idleAnimation2"),
             Texture.from("idleAnimation3"),
             Texture.from("idleAnimation4"),
             Texture.from("idleAnimation5"),
             Texture.from("idleAnimation6"),
             Texture.from("idleAnimation7"),
             Texture.from("idleAnimation8"),
             Texture.from("idleAnimation9"),
             Texture.from("idleAnimation10"),
             Texture.from("idleAnimation11"),
             Texture.from("idleAnimation12"),
            ], 0.2, 3, true
        );
        this.addChild(this.character);
        this.character.playState("idle");
        this.character.x = 100;
        this.character.y = SceneManager.HEIGHT;
        this.character.speed.x = 0;
        this.character.speed.y = 0;

        const style = new TextStyle({
            dropShadow: true,
            fill: "#751cb0",
            fontFamily: "Comic Sans MS",
            fontSize: 120,
            fontVariant: "small-caps",
            letterSpacing: -1,
            miterLimit: 8,
            stroke: "#0d1735",
            strokeThickness: 10,
            trim: true
        });
        const wickedTwinText = new Text('Wicked Twin', style);
        
        wickedTwinText.anchor.set(0.5, 0);
        wickedTwinText.position.set(SceneManager.WIDTH / 2, 50); 
        
        //"The Orange Witch's Journey" con una fuente más pequeña
        const style1 = new TextStyle({
            dropShadow: true,
            fill: "#b0641c",
            fontFamily: "Comic Sans MS",
            fontSize: 80,
            fontVariant: "small-caps",
            letterSpacing: -1,
            miterLimit: 8,
            stroke: "#0d1735",
            strokeThickness: 10,
            trim: true
        });
        const orangeWitchText = new Text('The Orange Witch\'s Journey', style1);
        orangeWitchText.anchor.set(0.5, 0); 
        orangeWitchText.position.set(SceneManager.WIDTH / 2, wickedTwinText.y + wickedTwinText.height + 10); 
        
        
        this.addChild(wickedTwinText, orangeWitchText);


    
}
    public update(deltaTime: number, _deltaFrame: number): void {
        
        this.timePassed += deltaTime;
        this.character.update(deltaTime);
        
    }

    public goToGame () {
        SceneManager.changeScene(new ThickerScene());
    }
     
}