<script setup>
import { onMounted } from 'vue';
import { World } from './world/World'
let world
function main() {
    // Get a reference to the container element
    const container = document.querySelector('#scene-container');

    // 1. Create an instance of the World app
    world = new World(container);

    // 2. Render the scene
    // world.render();
    world.start();
}
function rotate() {
    world.start()
}

function stopRotate() {
    world.stop()
}
onMounted(() => {
    main()
})

</script>

<template>
    <div class="flex flex-col justify-center items-center h-screen w-full">
        <section id="scene-container" class="w-full flex justify-center items-center">
            <!-- Our <canvas> will be inserted here -->

        </section>
        <section class=" flex-1  w-full flex justify-around items-center">
            <button class="duolingo-button">World渲染</button>
            <button class="duolingo-button" @click="rotate">旋转起来</button>
            <button class="duolingo-button" @click="stopRotate">停止旋转</button>
        </section>
    </div>

</template>

<style scoped>
#scene-container {
    flex: 3 1 0%;
}

.duolingo-button {
    background-color: #4CAF50;
    color: #fff;
    border: none;
    padding: 10px 20px;
    font-size: 16px;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

.duolingo-button:hover {
    background-color: #45a049;
}

.duolingo-button:active {
    background-color: #3e8e41;
}
</style>


<!-- // 1. Scene - 场景
// 2. Camera - 相机
// 3. Renderer - 渲染器
// 4. Material - 材质
// 5. Mesh - 网格
// 6. Geometry - 几何体
// 7. Light - 光源
// 8. Texture - 纹理
// 9. Raycaster - 射线检测器
// 10. Object3D - 三维对象
// 11. Vector3 - 三维向量
// 12. Matrix4 - 4x4矩阵
// 13. Line - 线段
// 14. Curve - 曲线
// 15. Animation - 动画
// 16. Loader - 加载器
// 17. Control - 控制器
// 18. Shader - 着色器
// 19. Group - 群组
// 20. Sprite - 精灵 -->