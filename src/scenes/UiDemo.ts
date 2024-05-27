import { Container, NineSlicePlane, Sprite, Text, Texture } from "pixi.js";
import { Button } from "../ui/button";
import { Keyboard } from "../utils/keyboard";
import { SceneManager } from "../utils/SceneManager";
import { MenuScene } from "./MenuScene";
import { CoinsCounter } from "../game/CoinsCounter";

export class UIDemo extends Container {

    private buttonMouseClose: Button;
    private buttonMouseLeaderboard: Button;
    private buttonMouseSaveReply: Button;
    private buttonPlay: Button;
    private lastKeyPressed: Text;
    private coinsCollected:CoinsCounter

    constructor() {
        super();
        const dialog = new Container();
        dialog.x = 100;
        dialog.y = 50;
        this.coinsCollected = new CoinsCounter();


        // Creacion del fondo
        const background = new NineSlicePlane(Texture.from("panelBorder"), 35, 35, 35, 35);
        dialog.addChild(background);
        background.position.set(300, 60)
        background.width = 500;
        background.height = 500;

        //Botones
        this.buttonMouseClose = new Button(Texture.from("closeDef"), 
        Texture.from("closeDown"), 
        Texture.from("closeOver"),
        );
        this.buttonMouseClose.on("buttonClick", this.onButtonClick, this);
        this.buttonMouseClose.x = background.width / 2 + 100;
        this.buttonMouseClose.y = this.buttonMouseClose.height + 350;
        dialog.addChild(this.buttonMouseClose);

        this.buttonMouseLeaderboard = new Button(Texture.from("leaderboardDef"), 
        Texture.from("leaderboardDown"), 
        Texture.from("leaderboardOver"),
        );
        this.buttonMouseLeaderboard.on("buttonClick", this.onButtonClick, this);
        this.buttonMouseLeaderboard.x = this.buttonMouseClose.x + 80;
        this.buttonMouseLeaderboard.y = this.buttonMouseClose.y;
        dialog.addChild(this.buttonMouseLeaderboard);

        this.buttonMouseSaveReply = new Button(Texture.from("saveReplayDef"), 
        Texture.from("saveReplayDown"), 
        Texture.from("saveReplayOver"),
        );
        this.buttonMouseSaveReply.on("buttonClick", this.onButtonClick, this);
        this.buttonMouseSaveReply.x = this.buttonMouseLeaderboard.x + 80;
        this.buttonMouseSaveReply.y = this.buttonMouseClose.y;
        dialog.addChild(this.buttonMouseSaveReply);

        this.buttonPlay = new Button(Texture.from("playDef"), 
        Texture.from("playDown"), 
        Texture.from("playOver"),
        );
        this.buttonPlay.on("buttonClick", this.goToMenu, this);
        this.buttonPlay.x = this.buttonMouseSaveReply.x + 125;
        this.buttonPlay.y = this.buttonMouseClose.y - 25;
        this.buttonPlay.scale.set(1.5);
        dialog.addChild(this.buttonPlay);


        //Panel de puntuacion y estrellas conseguidas
        const scorePanel = new Container();

        const starsLevel = Sprite.from("starDef");
        starsLevel.scale.set(1.0);
        starsLevel.x = scorePanel.x + 400;
        starsLevel.y = scorePanel.y + 100;
        dialog.addChild(starsLevel);

        const starsLevel2 = Sprite.from("starDef");
        starsLevel2.scale.set(1.5);
        starsLevel2.x = starsLevel.x + 85;
        starsLevel2.y = scorePanel.y + 70;
        dialog.addChild(starsLevel2);

        const starsLevel3 = Sprite.from("starDef");
        starsLevel3.scale.set(1.0);
        starsLevel3.x = scorePanel.x + 610;
        starsLevel3.y = scorePanel.y + 100;
        dialog.addChild(starsLevel3);

        const allStars = new Container();
        allStars.addChild(starsLevel, starsLevel2, starsLevel3);
        allStars.x = scorePanel.x + 100;
        allStars.y = scorePanel.y + 60;


        this.lastKeyPressed = new Text(`Monedas: ${this.coinsCollected.getCoins()}`, { fontSize: 30 });


        const scorePanelvisual = new NineSlicePlane(Texture.from("scorePanel"), 35, 35, 35, 35);
        scorePanelvisual.width = 400;
        scorePanelvisual.height = 100;

        this.lastKeyPressed.x = scorePanelvisual.width / 2 - 100;
        this.lastKeyPressed.y = scorePanelvisual.height / 2 - 15;

        scorePanel.x = this.buttonMouseClose.x + 100;
        scorePanel.y = background.width / 2 + 60;


        scorePanel.addChild(scorePanelvisual);
        scorePanel.addChild(this.lastKeyPressed);

        // Teclado
        /*document.addEventListener("keydown", this.onKeyDown.bind(this));
        document.addEventListener("keyup", this.onKeyUp.bind(this));*/

        this.addChild(dialog, scorePanel, allStars);

        Keyboard.down.on("KeyB", this.onKeyB, this);
        Keyboard.up.on("KeyB", this.onKeyBUp, this);
    }

    /*private onKeyDown(e : KeyboardEvent) : void {
        console.log("key pressed!", e.code);
        this.lastKeyPressed.text = e.code;
        if (e.code == "KeyA") {
            console.log("apretamos la A!");
        }
    }*/

    /*private onKeyUp(e : KeyboardEvent) : void {
        console.log("key released!", e.code); 
    } */
    
    private onButtonClick(): void {
        console.log("my new buttton clicked!", Keyboard.state.get("KeyA"), this);
    }

    private onKeyB() : void {
        console.log("aprete la B", this);
    }

    private onKeyBUp() : void {
        console.log("solte la B", this);
    }

    private goToMenu(): void {
        SceneManager.changeScene(new MenuScene());
    }
}