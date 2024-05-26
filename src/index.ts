import { Loader} from 'pixi.js'
import { assets } from './assets';
import { SceneManager } from './utils/SceneManager';
//import { MenuScene } from './scenes/MenuScene';
//import { ThickerScene } from './scenes/ThickerScene';
import { LoaderScene } from './scenes/LoaderScene';

Loader.shared.add(assets);

Loader.shared.onComplete.add(() => {
	

	SceneManager.initialize();
	SceneManager.changeScene(new LoaderScene());
	
});

Loader.shared.load();

