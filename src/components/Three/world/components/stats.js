import Stats from "stats.js";

function createStats(container) {
    let stats = new Stats();
    stats.showPanel(0); // 0: fps, 1: ms, 2: mb, 3+: custom
    container.appendChild(stats.dom);
    return stats;
}

export { createStats };