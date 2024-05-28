import { Container,Texture, TilingSprite } from "pixi.js";
import { IUpdateable } from "../utils/IUpdateable";
import { GoodWitch } from "../game/GoodWitch";
import { Platform } from "../game/Platform";
import { checkCollision } from "../utils/IHitbox";
import { ManaBar } from "../game/ManaBar";
import { SceneManager } from "../utils/SceneManager";
import { HealthBar } from "../game/HealthBar";
import { CoinsCounter } from "../game/CoinsCounter";
import { UIDemo } from "./UiDemo";




export class ThickerScene extends Container implements IUpdateable {

    private goodWitch: GoodWitch;
    private platforms: Platform[];
    private world: Container;
    private background: TilingSprite;
    private gameSpeed: number = 100;
    private timePassed: number = 0;
    private manaBar:ManaBar;
    private healthBar:HealthBar;
    private coinCounter:CoinsCounter;
    private uiDemoScene:UIDemo;
    private deceleration: number = 0.01;
    

    constructor() {
        super();

        this.goodWitch = new GoodWitch();
        this.world = new Container();
        this.background = new TilingSprite(Texture.from("background1"), SceneManager.WIDTH, SceneManager.HEIGHT);
        this.addChild(this.background);

        this.platforms = [];

        let platform1 = new Platform(this.goodWitch);
        platform1.position.set(450, 750);
        platform1.scale.set(5, 2);
        this.platforms.push(platform1);
        this.world.addChild(platform1);

        platform1 = new Platform(this.goodWitch);
        platform1.position.set(1200, 750);
        platform1.scale.set(5, 2);
        this.platforms.push(platform1);
        this.world.addChild(platform1);
        
        platform1 = new Platform(this.goodWitch);
        platform1.position.set(1800, 750);
        platform1.scale.set(5, 2);
        this.platforms.push(platform1);
        this.world.addChild(platform1);
        
        
        this.addChild(this.world);

    
        this.goodWitch.x = 50;
        this.goodWitch.y = 50;
        
        this.goodWitch.addState("run", [
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
        ], 0.5, 3, true
       );

        this.goodWitch.addState("jump", [Texture.from("jumpAnimation1"),
        Texture.from("jumpAnimation2"),
        Texture.from("jumpAnimation3"),
        Texture.from("jumpAnimation4"),
        Texture.from("jumpAnimation5"),
        Texture.from("jumpAnimation6"),
        Texture.from("jumpAnimation7"),
        Texture.from("jumpAnimation8"),
        Texture.from("jumpAnimation9"),
        Texture.from("jumpAnimation10"),
        Texture.from("jumpAnimation11"),
        Texture.from("jumpAnimation12"),
        Texture.from("jumpAnimation13"),
        Texture.from("jumpAnimation14"),
        Texture.from("jumpAnimation15"),
        ], 0.09, 3, false
    );

         this.goodWitch.addState("idle", [
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

        this.goodWitch.addState("death", [
        Texture.from("deathAnimation2"),
        Texture.from("deathAnimation3"),
        Texture.from("deathAnimation4"),
        Texture.from("deathAnimation5"),
        Texture.from("deathAnimation6"),
        Texture.from("deathAnimation7"),
        Texture.from("deathAnimation8"),
        Texture.from("deathAnimation9"),
        Texture.from("deathAnimation10"),
        ], 0.2, 3, false
    )

        this.goodWitch.addState("attack", [Texture.from("attackAnimation1"),
        Texture.from("attackAnimation2"),
        Texture.from("attackAnimation3"),
        Texture.from("attackAnimation4"),
        Texture.from("attackAnimation5"),
        Texture.from("attackAnimation6"),
        Texture.from("attackAnimation7"),
        Texture.from("attackAnimation8"),
        Texture.from("attackAnimation9"),
        Texture.from("attackAnimation10"),
        ], 0.2, 3, false
    ) 

    
        this.world.addChild(this.goodWitch);
         this.goodWitch.playState("idle");
         
         const manaBarFrames: Texture[] = [
            Texture.from("manabar1"),
            Texture.from("manabar2"),
            Texture.from("manabar3"),
            Texture.from("manabar4"),
            Texture.from("manabar5"),
            Texture.from("manabar6"),
            Texture.from("manabar7"),
            Texture.from("manabar8"),
            Texture.from("manabar9"),
            Texture.from("manabar10"),
            Texture.from("manabar11"),
            Texture.from("manabar12"),
            Texture.from("manabar13"),
            Texture.from("manabar14"),
            Texture.from("manabar15"),
            Texture.from("manabar16"),
            Texture.from("manabar17"),
            Texture.from("manabar18"),
            Texture.from("manabar19"),
            Texture.from("manabar20"),
            Texture.from("manabar21"),
            Texture.from("manabar22"),
            Texture.from("manabar23"),
            Texture.from("manabar24"),
            Texture.from("manabar25"),
            Texture.from("manabar26"),
            Texture.from("manabar27"),
            Texture.from("manabar28"),
            Texture.from("manabar29"),
            Texture.from("manabar30"),
            Texture.from("manabar31"),
            Texture.from("manabar32"),
            Texture.from("manabar33"),
            Texture.from("manabar34"),
            Texture.from("manabar35"),
            Texture.from("manabar36"),
            Texture.from("manabar37"),
            Texture.from("manabar38"),
            Texture.from("manabar39"),
            Texture.from("manabar40"),
            Texture.from("manabar41"),  
        ];

        const healthBarFrames: Texture [] = [
            Texture.from("healthBar0"),
            Texture.from("healthBar1"),
            Texture.from("healthBar2"),
            Texture.from("healthBar3"),
            Texture.from("healthBar4"),
            Texture.from("healthBar5"),
            Texture.from("healthBar6"),
            Texture.from("healthBar7"),
            Texture.from("healthBar8"),
            Texture.from("healthBar12"),
        ]

        this.manaBar = new ManaBar(manaBarFrames, this.goodWitch.getManaMax());
        this.manaBar.position.set(10, 10); 
        this.addChild(this.manaBar);

        this.healthBar = new HealthBar(healthBarFrames, this.goodWitch.getHealthMax());
        this.healthBar.position.set(10, 80); 
        this.addChild(this.healthBar);

        this.coinCounter = new CoinsCounter();
        this.coinCounter.position.set(1750, 10);
        this.addChild(this.coinCounter);

        this.uiDemoScene = new UIDemo();
        
    }


    public update(deltaTime: number, _deltaFrame: number): void {
        
        this.goodWitch.update(deltaTime);

        this.timePassed += deltaTime;

        for (let platform of this.platforms) {
            platform.speed.x = -this.gameSpeed;
            platform.update(deltaTime/1000);
            const overlap = checkCollision(this.goodWitch, platform);
    
            if (overlap != null) {
                this.goodWitch.separate(overlap, platform.position);
                
            }
            
            const pot = platform.getManaPot();
            if (pot && checkCollision(this.goodWitch, pot)) {
                platform.removeManaPot();
                if (pot.getType() === "manaPot") {
                    this.goodWitch.addMana(10);
                    this.manaBar.updateMana(this.goodWitch.getMana());
                } else if (pot.getType() === "healthPot") {
                    this.goodWitch.addHealth(10);
                    this.healthBar.updateHealth(this.goodWitch.getHealth());
                } else if (pot.getType() === "coin") {
                    //this.goodWitch.collectCoins(1);
                    this.coinCounter.addCoins(1);
                    this.gameSpeed += 20;
                    this.deceleration += 0.0020;
                }
            }

            if (platform.getHitbox().right < 0) {
                platform.destroy();
            }
        
        if (this.timePassed > 4000) {
            this.timePassed = 0;
        
            if (!this.goodWitch.isManaFull() || !this.goodWitch.isHealthFull()) {
                const platform1 = new Platform(this.goodWitch);
                platform1.position.set(SceneManager.WIDTH + 1250, Math.random() * 950);
                platform1.scale.set(5, 2);
                this.platforms.push(platform1);
                this.world.addChild(platform1);
            }
        }
        
    }
        this.platforms = this.platforms.filter((elem) => !elem.destroyed);

    // Si no hay plataformas que se detenga el fondo
    if (this.platforms.length === 0) {
        if (this.gameSpeed > 0) {
            this.gameSpeed -= this.deceleration * deltaTime;
            if (this.gameSpeed < 0) {
                this.gameSpeed = 0;
            }
        }

        this.background.tilePosition.x -= this.gameSpeed * deltaTime / 1000;

        if (this.gameSpeed === 0) {
            this.background.addChild(this.uiDemoScene);
            this.uiDemoScene.position.set(350, 100);
        }
    } else {
        this.background.tilePosition.x -= this.gameSpeed * deltaTime / 1000;
    }
    this.healthBar.updateHealth(this.goodWitch.getHealth());
}
}
