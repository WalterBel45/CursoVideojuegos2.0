import { Container, Sprite } from "pixi.js";

export class Protagonista extends Container{

    constructor() {
        super();

    const Protagonista: Sprite = Sprite.from("./posible_protagonista.png");

	Protagonista.x = 0;
	Protagonista.y = 0;

	this.addChild(Protagonista);
    }
}