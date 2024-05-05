function easeOutCubic(t) {
    // 缓动函数，逐渐减慢速度实现平滑过渡
    t--;
    return t * t * t + 1;
}


export { easeOutCubic };