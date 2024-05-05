<script setup>
import { World } from './Flyweight';
function generateWorld() {
    const world = new World(800, 600);

    drawWorld(world);
}

function drawWorld(world) {

    const canvas = document.querySelector('#canvas');
    const context = canvas.getContext('2d');

    const tiles = world.getTiles();
    for (let i = 0; i < tiles.length; i++) {
        const tile = tiles[i];
        const x = i * 10;
        for (let j = 0; j < tile.length; j++) {
            const y = j * 6
            const cell = tile[j];
            if (cell) {
                context.fillStyle = cell.color;
                context.fillRect(x, y, 10, 10);
            }
        }
    }


}
</script>

<template>
    <div class="flex flex-col justify-center items-center h-screen">
        <section>
            <canvas width="800" height="600" id="canvas" ref="canvas"></canvas>
        </section>
        <section class="left">
            <button class="primary-btn" @click="generateWorld">世界生成</button>
        </section>
    </div>
</template>