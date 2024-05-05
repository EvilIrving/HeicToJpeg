import { BoxGeometry, CircleGeometry, CylinderGeometry, TorusGeometry, Mesh, MeshBasicMaterial, MeshStandardMaterial, LineBasicMaterial, BufferGeometry, Float16BufferAttribute, LineDashedMaterial, LineSegments, Vector3, CatmullRomCurve3, Line, Float32BufferAttribute, MeshLambertMaterial, MathUtils } from 'three'
import { hilbert3D } from '../utils/GeometryUtils';
import { easeOutCubic } from '../utils/utils';
function createShape(geometry, color = '#ee3f4d') {
    const material = new MeshStandardMaterial({ color })
    // const material = new LineBasicMaterial({ color:"purple", linewidth: 2, linejoin: 'square' })
    // const material = new LineDashedMaterial({ color: "purple", linewidth: 2, dashSize: 2, gapSize: 1 })
    const shape = new Mesh(geometry, material)
    return shape
}

function createCube() {
    // const rectangleGeometry = new BoxGeometry(3, 2, 1)
    // const circleGeometry = new CircleGeometry(1, 32)
    // const cylinderGeometry = new CylinderGeometry()
    // const torusGeometry = new TorusGeometry(1, 0.4, 16, 32)
    // const rectangle = createShape(rectangleGeometry,'purple')
    // const circle = createShape(circleGeometry)
    // const cylinder = createShape(cylinderGeometry)
    // const torus = createShape(torusGeometry)


    // rectangle.position.set(-5,2,2)
    // circle.position.set(2, -2, -5)
    // cylinder.position.set(6, 0, -5)
    // torus.position.set(-7, 0, -5)

    const cubeGeometry = new BoxGeometry(10, 10, 10)
    const cube = createShape(cubeGeometry)
    cube.position.set(0, 0, -40)
    cube.rotation.set(1, 2, 1);
    const radiansPerSecond = MathUtils.degToRad(36)

    const movementSpeed = 20; // 移动速度，单位：单位距离/秒
    const targetY = 20; // 目标位置
    let currentY = 0; // 当前位置

    cube.tick = (delta) => {
        // cube.rotation.y += radiansPerSecond * delta
        // cube.rotation.x += radiansPerSecond * delta
        // cube.rotation.z += radiansPerSecond * delta
        const distance = targetY - currentY; // 到目标位置的距离
        const maxDistance = movementSpeed * delta; // 每帧最大移动距离

        if (Math.abs(distance) <= maxDistance) {
            // 如果距离小于最大移动距离，则直接到达目标位置
            currentY = targetY;
        } else {
            // 否则根据缓动函数来移动
            const direction = Math.sign(distance); // 移动方向（向上为正，向下为负）
            const movedDistance = direction * maxDistance;
            currentY += movedDistance * easeOutCubic(Math.abs(movedDistance) / Math.abs(distance));
        }

        // 在这里根据计算得到的当前位置来进行进一步操作
        // 比如设置 cube.position.y

        cube.position.y = currentY;


    }
    // rectangle, circle, cylinder, torus
    return [cube]

    // 虚线立方体
    // const { boxGeometry, lines } = createHiberteCube()
    // boxGeometry.rotation.set(0, 2, 0);
    // lines.rotation.set(0, 2, 0);
    // return [boxGeometry, lines]


    // const lines = createRandomLine()
    // lines.rotation.set(-0.5, -0.1, 0.8);
    // // 解耦动画速度与帧率,保持无论在高或低帧率上 1s 旋转 30°
    // const radiansPerSecond = MathUtils.degToRad(36)
    // lines.tick = (delta) => {
    //     lines.rotation.y += radiansPerSecond * delta
    //     lines.rotation.x += radiansPerSecond * delta
    //     lines.rotation.z += radiansPerSecond * delta
    // }
    // return [lines]
}

function createRandomLine() {
    const segments = 1000, r = 10, t = 1
    const material = new LineBasicMaterial({ vertexColors: true })
    const geometry = new BufferGeometry();
    const positions = [], colors = [];
    for (let i = 0; i < segments; i++) {
        const x = Math.random() * r - r / 2;
        const y = Math.random() * r - r / 2;
        const z = Math.random() * r - r / 2;

        positions.push(x, y, z);
        colors.push((x / r) + 0.5);
        colors.push((y / r) + 0.5);
        colors.push((z / r) + 0.5);

        // const color = "#" + ("000000" + Math.random().toString(16).substring(2, 6)).slice(-6)
        // colors.push(color);
    }
    geometry.setAttribute('position', new Float32BufferAttribute(positions, 3));
    geometry.setAttribute('color', new Float32BufferAttribute(colors, 3));
    generateMorphTargets(geometry, segments, r, t)
    geometry.computeBoundingSphere();
    return new Line(geometry, material)
}

function generateMorphTargets(geometry, segments, r, t) {

    const data = [];

    for (let i = 0; i < segments; i++) {
        const x = Math.random() * r - r / 2;
        const y = Math.random() * r - r / 2;
        const z = Math.random() * r - r / 2;
        data.push(x, y, z);
    }

    const morphTarget = new Float32BufferAttribute(data, 3);
    morphTarget.name = 'target1';
    geometry.morphAttributes.position = [morphTarget];
}


// 创建立方体虚线框矩形
function createHiberteCube() {
    // 创建一个立方体
    const boxGeometry = createBox(50, 50, 50)

    console.log(boxGeometry);

    // 创建立方体内的希尔伯特曲线
    const lines = createHiberteLine()
    return { boxGeometry, lines }
}

function createBox(width, height, depth) {
    const w = width * 0.5,
        h = height * 0.5,
        d = depth * 0.5;

    // 12 条边，每条边由两个顶点组成

    const position = [
        - w, - h, - d,
        - w, h, - d,

        - w, h, - d,
        w, h, - d,

        w, h, - d,
        w, - h, - d,

        w, - h, - d,
        - w, - h, - d,

        - w, - h, d,
        - w, h, d,

        - w, h, d,
        w, h, d,

        w, h, d,
        w, - h, d,

        w, - h, d,
        - w, - h, d,

        - w, - h, - d,
        - w, - h, d,

        - w, h, - d,
        - w, h, d,

        w, h, - d,
        w, h, d,

        w, - h, - d,
        w, - h, d];
    const geometry = new BufferGeometry(); // 高效地存储顶点、法线、UV 等几何数据
    geometry.setAttribute('position', new Float32BufferAttribute(position, 3)) // 使用 position 数组作为数据，并将每个顶点表示为三个浮点数（x、y 和 z 坐标）
    const boxGeometry = new LineSegments(geometry, new LineDashedMaterial({ color: 0xffaa00, dashSize: 3, gapSize: 1 }));
    boxGeometry.computeLineDistances(); // 计算线段之间的距离，用于绘制虚线效果。

    return boxGeometry
}

function createHiberteLine() {
    const subdivisions = 6;
    const recursion = 1;

    const points = hilbert3D(new Vector3(0, 0, 0), 25.0, recursion, 0, 1, 2, 3, 4, 5, 6, 7);
    const spline = new CatmullRomCurve3(points);

    const samples = spline.getPoints(points.length * subdivisions);
    const geometrySpline = new BufferGeometry().setFromPoints(samples);

    const line = new Line(geometrySpline, new LineDashedMaterial({ color: 0xffffff, dashSize: 1, gapSize: 0.5 }));
    line.computeLineDistances();

    return line
}


export { createCube }