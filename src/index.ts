
import { SceneManager } from './utils/SceneManager';
//import { MenuScene } from './scenes/MenuScene';
//import { ThickerScene } from './scenes/ThickerScene';
import { LoaderScene } from './scenes/LoaderScene';

SceneManager.initialize();
SceneManager.changeScene(new LoaderScene());


