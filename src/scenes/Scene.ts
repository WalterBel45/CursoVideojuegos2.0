import { Container } from "pixi.js";
import { Protagonista } from "../game/Protagnista";

export class Scene extends Container {

    constructor() {
        super();

        const protagonistagame: Protagonista = new Protagonista();

	protagonistagame.scale.set(0.3, 0.3);
	this.addChild(protagonistagame);
    }
}