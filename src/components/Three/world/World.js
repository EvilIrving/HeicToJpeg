import { createCamera } from "./components/camera";
import { createCube } from "./components/cube";
import { createLights } from "./components/lights";
import { Loop } from "./system/Loop";
import { createScene } from "./components/scene";
import { createRenderer } from "./system/renderer";
import { Resizer } from "./system/Resizers";
import { createStats } from "./components/stats";
class World {
    // 1. Create an instance of the World app
    #camera = null
    #scene = null
    #renderer = null
    #cube = null
    #resizer = null
    #lights = null
    #loop = null
    #stats = null
    constructor(container) {
        this.#camera = createCamera(container)
        this.#scene = createScene()
        this.#renderer = createRenderer()
        this.#cube = createCube()
        this.#lights = createLights()
        this.#stats = createStats(container);
        this.#loop = new Loop(this.#camera, this.#scene, this.#renderer, this.#stats)
        // this.#loop.updateables.push(this.#lights)
        this.#loop.updateables.push(this.#camera)
        
        this.#cube.forEach(cube => {
            this.#scene.add(cube, this.#lights)
            this.#loop.updateables.push(cube)
        });
        this.#resizer = new Resizer(container, this.#camera, this.#renderer)
        // this.#resizer.onResize = () => {
        //     this.render();
        // };

        container.append(this.#renderer.domElement)
    }

    // 组件components和系统systems。组件是可以放置到场景中的任何东西，例如立方体、相机和场景本身，
    // 而系统是在组件或其他系统上运行的东西。在这里，是渲染器和大小调整函数

    // 2. Render the scene
    render() {
        this.#renderer.render(this.#scene, this.#camera)
    }

    start() {
        this.#loop.start()
    }


    stop() {
        this.#loop.stop()
    }
}

export { World };

/**
 * 任务:
 * 测试其他直射光类型, 其他材质
 * 
 * 使用 mesh.add(meshB) 并调整 position scale rotation 查看互相影响( 为什么没有影响?)
 * 不使用.degToRad
 * 
 * 启用和禁用AA的差异:
 * 旋转立方体，直到边缘垂直和水平
 * 禁用状态下:使用cube.scale放大立方体。使用cube.position.z使立方体更靠近您。 使用camera.position.z使相机更靠近立方体。观看如何变化
 * 
 * 玩玩devicePixelRatio, 设置场景大小为不同值看看效果
 */