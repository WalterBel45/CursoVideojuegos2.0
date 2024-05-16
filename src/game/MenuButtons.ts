import { Container, Texture } from "pixi.js";
import { Button } from "../ui/button";
import { Keyboard } from "../utils/keyboard";
import { SceneManager } from "../utils/SceneManager";

export class MenuButtons extends Container {

    //private startButton : Button;
    private exitButton: Button;
     
    constructor () {
        super();

        this.exitButton = new Button(Texture.from("closeDef"), 
        Texture.from("closeDown"), 
        Texture.from("closeOver"),
        );
        this.exitButton.on("buttonClick", this.onButtonClick, this);
        this.exitButton.x = SceneManager.WIDTH / 2 - 75;
        this.exitButton.scale.set(1.5);
        this.exitButton.y = SceneManager.HEIGHT / 2;
        this.addChild(this.exitButton);

        /*this.startButton = new Button(Texture.from("playDef"), 
        Texture.from("playDown"), 
        Texture.from("playOver"),
        );
        this.startButton.on("buttonClick", this.onButtonClick, this);
        this.startButton.x = SceneManager.WIDTH / 2 + 75;
        this.startButton.scale.set(1.5);
        this.startButton.y = SceneManager.HEIGHT / 2;
        this.addChild(this.startButton);*/
        
    }

    private onButtonClick(): void {
        console.log("my new buttton clicked!", Keyboard.state.get("KeyA"), this);
    }
}