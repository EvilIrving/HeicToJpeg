import { DirectionalLight, PointLight, RectAreaLight, SpotLight } from "three"
import { RectAreaLightHelper } from 'three/addons/helpers/RectAreaLightHelper.js';

function createLights() {
    const lights = new DirectionalLight('#ffffbb', 8)
    // const lights = new PointLight('#ffffbb',8) // 灯泡
    // const lights = new SpotLight('#ffffbb')  // 聚光灯
    // const lights = new RectAreaLight(0xffffbb, 1.0, 5, 5); // 矩形光源
    // const helper = new RectAreaLightHelper(lights);
    // lights.add(helper); // helper must be added as a child of the light
    lights.position.set(-1, -1, 2)
    lights.tick = (delta) => {
        // lights.position.z -= delta * 0.4;
    }
    return lights
}

export { createLights }

