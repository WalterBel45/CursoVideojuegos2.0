import { Container, Sprite, Texture } from "pixi.js";

export class ManaBar extends Container {
    private bar: Sprite;
    private frames: Texture[];
    private maxMana: number;
    private currentMana: number;
    

    constructor(frames: Texture[], maxMana: number) {
        super();
        this.frames = frames;
        this.maxMana = maxMana;
        this.currentMana = 0;
    
        const background = new Sprite(Texture.from("manaBarBackground"));
        background.width = 200; 
        background.height = 20; 
        this.addChild(background);

        this.bar = new Sprite(this.frames[0]); 
        this.bar.width = 400; 
        this.bar.height = 60; 
        this.bar.position.set(0, 0);
        this.addChild(this.bar);
    }

    updateMana(currentMana: number): void {
        this.currentMana = currentMana;
    
        const progress = this.currentMana / this.maxMana;
    
        const frameIndex = Math.floor(progress * (this.frames.length - 1));
    
        this.bar.texture = this.frames[frameIndex];
    }
}

