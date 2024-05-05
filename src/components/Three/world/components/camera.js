import { PerspectiveCamera, OrthographicCamera } from 'three'

function createCamera(container) {
    // new OrthographicCamera()
    const camera = new PerspectiveCamera(
        35,// fov = Field Of View
        container.clientWidth / container.clientHeight, // aspect ratio (dummy value)
        0.1, // near clipping plane
        500, // far clipping plane
    )
    camera.position.set(1, 1, 34)
    // camera.scale.set(1,1,0.5)
    // camera.rotation.set(1,1,1)
    // 假设时间间隔为 1 秒
    const minScale = 10;
    const maxScale = 40;
    let scale = 0.1, increment = 1

    camera.tick = (delta) => {
        scale += increment * delta
        if (camera.position.z > maxScale) scale *= -1
        if (camera.position.z < minScale) scale *= -1
        // camera.position.z += scale;
    }


    return camera
}

export { createCamera }