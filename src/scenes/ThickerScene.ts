import { Container,Texture, TilingSprite } from "pixi.js";
import { IUpdateable } from "../utils/IUpdateable";
import { GoodWitch } from "../game/GoodWitch";
import { Platform } from "../game/Platform";
import { HEIGHT, WIDTH } from "..";
import { checkCollision } from "../utils/IHitbox";


export class ThickerScene extends Container implements IUpdateable {

    private goodWitch: GoodWitch;
    private platforms: Platform[];
    private world: Container;
    private background: TilingSprite;
    private gameSpeed: number = 100;
    private timePassed: number = 0;
    
    

    constructor() {
        super();


        this.world = new Container();
        this.background = new TilingSprite(Texture.from("background1"), WIDTH, HEIGHT);
        this.addChild(this.background);

        this.platforms = [];

        let platform1 = new Platform();
        platform1.position.set(450, 750);
        platform1.scale.set(5, 2);
        this.platforms.push(platform1);
        this.world.addChild(platform1);

        platform1 = new Platform();
        platform1.position.set(1200, 750);
        platform1.scale.set(5, 2);
        this.platforms.push(platform1);
        this.world.addChild(platform1);
        
        platform1 = new Platform();
        platform1.position.set(1800, 750);
        platform1.scale.set(5, 2);
        this.platforms.push(platform1);
        this.world.addChild(platform1);
        
        platform1 = new Platform();
        platform1.position.set(2000, 750);
        platform1.scale.set(5, 2);
        this.platforms.push(platform1);
        this.world.addChild(platform1);

        

        
        
        
        

        this.addChild(this.world);

        

        this.goodWitch = new GoodWitch();

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
         /*Texture.from("idleAnimation13"),*/
        ], 0.2, 3, true
    );

        this.goodWitch.addState("death", [/*Texture.from("deathAnimation1"),*/
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
            if (platform.getHitbox().right < 0) {
                platform.destroy();
            }
        
        if (this.timePassed > 2000) {
            this.timePassed = 0;
        
            const platform1 = new Platform();
        platform1.position.set(WIDTH + 950, Math.random() * 1080);
        platform1.scale.set(5, 2);
        this.platforms.push(platform1);
        this.world.addChild(platform1);

        }
        

        }
        this.platforms = this.platforms.filter((elem) => !elem.destroyed);


        //this.world.x = -this.goodWitch.x * this.worldTransform.a + WIDTH / 7;
        this.background.tilePosition.x -= this.gameSpeed * deltaTime / 1000; 
    }

    
}