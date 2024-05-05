class Resizer {
    constructor(container, camera, renderer) {
        this.setSize(container, camera, renderer)

        // window.addEventListener('resize', () => {
        //     this.setSize(container, camera, renderer)
        //     this.onResize()
        // })

        window.requestAnimationFrame(() => {
            this.setSize(container, camera, renderer)
            this.onResize()
        })
    }


    setSize(container, camera, renderer) {
        camera.aspect = container.clientWidth / container.clientHeight

        // update the camera's frustum
        camera.updateProjectionMatrix();
        renderer.setSize(container.clientWidth, container.clientHeight)
        renderer.setPixelRatio(window.devicePixelRatio)
    }
    onResize() {

    }
}

export { Resizer }