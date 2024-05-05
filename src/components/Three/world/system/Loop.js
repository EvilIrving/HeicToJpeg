import { Clock } from "three";
// 游戏循环任务
// 获取用户输入
// 计算物理
// 更新动画
// 渲染一帧
const clock = new Clock()

class Loop {
  constructor(camera, scene, renderer,stats) {
    this.camera = camera;
    this.scene = scene;
    this.renderer = renderer;
    this.updateables = []
    this.stats = stats
  }

  start() {
    this.stats.begin()
    this.renderer.setAnimationLoop(() => {
      this.tick()
      this.renderer.render(this.scene, this.camera)
    })
  }
  
  stop() {
    this.stats.end()
    this.renderer.setAnimationLoop(null);
  }
  
  tick() {
    // code to update the game state
    this.stats.update()
    const delta = clock.getDelta()
    for (const object of this.updateables) {
      object.tick(delta)
    }
  }
}

export { Loop };