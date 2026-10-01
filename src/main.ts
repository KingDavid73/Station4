import "./style.css";
import { sceneOne } from "./content/sceneOne";
import { sceneTwo } from "./content/sceneTwo";
import { modernScene, finalScene, nightScene, morningScene } from "./content/laterScenes";
import { Stage } from "./engine/stage";

const root = document.querySelector<HTMLElement>("#app");
if (!root) throw new Error("Station 4 requires an #app element.");

const stage = new Stage(root);
stage.load([sceneOne, sceneTwo, modernScene, finalScene, nightScene, morningScene]);
