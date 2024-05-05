class TreeModel {
    // 固有状态: 视为“上下文无关”部分。 
    constructor(mesh, bark, leaves) {
        this.mesh = mesh; // 网格
        this.bark = bark; // 树皮 
        this.leaves = leaves; // 枝叶
    }
}

class Tree {
    constructor(model, position, height, thickness, barkTint, leafTint) {
        this.model = model;  // treemodel实例
        this.position = position; // 位置
        this.height = height; // 树的高度
        this.thickness = thickness; // 树干的厚度
        this.barkTint = barkTint; // 树皮颜色
        this.leafTint = leafTint; // 叶子颜色
    }
}

// 当共享对象没有有效定义的实体时，使用这种模式就不那么明显（使用它也就越发显得精明）。

// 基于区块建立地表：世界的表面被划分为由微小区块组成的巨大网格。 每个区块都由一种地形覆盖。

/**
 * @class Terrain 这是一个表示地形的类，用于存储地形的属性和提供对属性的访问和操作。
 * @constructor
 * @param {number} movementCost - 移动成本
 * @param {boolean} isWater - 是否是水域
 * @param {Texture} texture - 纹理
 */
class Terrain {
    constructor(movementCost, isWater, texture) {
        this.movementCost = movementCost;
        this.isWater = isWater;
        this.texture = texture;
    }

    /**
     * @method getMovementCost
     * @returns {number} - 返回地形的移动成本
     */
    getMovementCost() {
        return this.movementCost;
    }

    /**
     * @method isWater
     * @returns {boolean} - 如果地形是水域，返回 true；否则返回 false
     */
    isWater() {
        return this.isWater;
    }

    /**
     * @method getTexture
     * @returns {Texture} - 返回地形的纹理
     */
    getTexture() {
        return this.texture;
    }

    get color() {
        if (this.texture === 'GRASS_TEXTURE') {
            return '#00FF00'
        } else if (this.texture === 'HILL_TEXTURE') {
            return '#FFFF00'
        } else if (this.texture === 'RIVER_TEXTURE') {
            return '#2ddfe7'
        }
    }
}

class World {
    constructor(width, height) {
        this.tiles = [];
        this.width = Math.ceil(width / 10);
        this.height = Math.ceil(height / 10);

        // Initialize the world grid with default Terrain
        this.grassTerrain = new Terrain(1, false, 'GRASS_TEXTURE'); // 草地 用绿色
        this.hillTerrain = new Terrain(3, false, 'HILL_TEXTURE'); // 山地 用黄色
        this.riverTerrain = new Terrain(2, true, 'RIVER_TEXTURE'); // 河流 用青色

        // Generate the terrain
        this.generateTerrain();
    }

    generateTerrain() {
        for (let i = 0; i < this.width; i++) {
            this.tiles[i] = [];
            for (let j = 0; j < this.height; j++) {
                if (Math.floor(Math.random() * 10) === 0) {
                    this.tiles[i][j] = this.hillTerrain;
                } else {
                    this.tiles[i][j] = this.grassTerrain;
                }
            }
        }

        const x = Math.floor(Math.random() * this.width);
        for (let y = 0; y < this.height; y++) {
            this.tiles[x][y] = this.riverTerrain;
        }
    }

    getTile(x, y) {
        if (x >= 0 && x < this.width && y >= 0 && y < this.height) {
            return this.tiles[x][y];
        } else {
            throw new Error('Invalid coordinates');
        }
    }
    getTiles() {
        return this.tiles;
    }

    // Place a new Terrain at a specific location in the world
    setTerrainAt(x, y, terrain) {
        if (x >= 0 && x < this.width && y >= 0 && y < this.height) {
            this.tiles[x][y] = terrain;
        }
    }

    // Get the Terrain at a specific location in the world
    getTerrainAt(x, y) {
        if (x >= 0 && x < this.width && y >= 0 && y < this.height) {
            return this.tiles[x][y];
        }
    }

    // Additional functions/methods for World
}

export { TreeModel, Tree, Terrain, World }