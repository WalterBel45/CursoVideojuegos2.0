import { Container, Sprite, Texture } from "pixi.js";

export class HealthBar extends Container {
    private bar: Sprite;
    private frames: Texture[];
    private maxHealth: number;
    private currentHealth: number;
    private lastSmoothedValue: number;

    constructor(frames: Texture[], maxHealth: number) {
        super();
        this.frames = frames;
        this.maxHealth = maxHealth;
        this.currentHealth = 0;
        this.lastSmoothedValue = 0;

        
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

    updateHealth(currentHealth: number): void {
       
        this.currentHealth = currentHealth;
    
       
        const progress = this.currentHealth / this.maxHealth;
        const smoothFactor = 0.5; 
        const smoothedProgress = this.smoothValue(progress, smoothFactor);
        const frameIndex = Math.floor(smoothedProgress * (this.frames.length - 1));
    
        
        this.bar.texture = this.frames[frameIndex];
    }
    
    private smoothValue(value: number, factor: number): number {
        return value * factor + (1 - factor) * this.lastSmoothedValue;
    }
    
}