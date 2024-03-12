import { Container, NineSlicePlane, Sprite, Text, Texture } from "pixi.js";

export class UIDemo extends Container {
    
    constructor() {
        super();
        const dialog = new Container();
        dialog.x = 100;
        dialog.y = 50;

        const scorePanel = new Container();
        
        const background = new NineSlicePlane (Texture.from("panelBorder"), 35,35,35,35);
        dialog.addChild(background);
        background.position.set(300, 60)
        background.width = 500;
        background.height = 500;

        const buttonMouseClose = Sprite.from("closeDef");
        buttonMouseClose.scale.set(1.5);
        buttonMouseClose.x = background.width /2 + 100;
        buttonMouseClose.y = buttonMouseClose.height + 350;
        dialog.addChild(buttonMouseClose);

        const buttonMouseLeaderboard = Sprite.from("leaderboardDef");
        buttonMouseLeaderboard.scale.set(1.5);
        buttonMouseLeaderboard.x = buttonMouseClose.x + 80;
        buttonMouseLeaderboard.y = buttonMouseClose.y;
        dialog.addChild(buttonMouseLeaderboard);

        const buttonMouseSaveReply = Sprite.from("saveReplayDef");
        buttonMouseSaveReply.scale.set(1.5);
        buttonMouseSaveReply.x = buttonMouseLeaderboard.x + 80;
        buttonMouseSaveReply.y = buttonMouseClose.y;
        dialog.addChild(buttonMouseSaveReply);

        const buttonPlay = Sprite.from("playDef");
        buttonPlay.scale.set(2.5);
        buttonPlay.x = buttonMouseSaveReply.x + 125;
        buttonPlay.y = buttonMouseClose.y - 25;
        dialog.addChild(buttonPlay);

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

        
        const lastKeyPressed = new Text ("Score : 100000", {fontSize: 30});
        
        
        

        
        const scorePanelvisual = new NineSlicePlane (Texture.from("scorePanel"), 35,35,35,35);
        scorePanelvisual.width = 400;
        scorePanelvisual.height = 100;
        
        lastKeyPressed.x = scorePanelvisual.width / 2 - 100;
        lastKeyPressed.y = scorePanelvisual.height / 2 - 15;
        
        scorePanel.x = buttonMouseClose.x + 100;
        scorePanel.y = background.width / 2 + 60;
        

        scorePanel.addChild(scorePanelvisual);
        scorePanel.addChild(lastKeyPressed);

        this.addChild(dialog, scorePanel, allStars);
    }
}