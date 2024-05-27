import { Container, Text, TextStyle } from 'pixi.js';

export class CoinsCounter extends Container {
    private coinText: Text;
    private coins: number = 0;

    constructor() {
        super();

        const style = new TextStyle({
            fontFamily: 'Arial',
            fontSize: 36,
            fill: '#ffffff',
            stroke: '#000000',
            strokeThickness: 5,
        });

        this.coinText = new Text('Coins: 0', style);
        this.addChild(this.coinText);
    }

    public addCoins(amount: number) {
        this.coins += amount;
        this.updateText();
    }

    public updateText() {
        this.coinText.text = `Coins: ${this.coins}`;
    }

    public getCoins() {
        return this.coins;
    }
}