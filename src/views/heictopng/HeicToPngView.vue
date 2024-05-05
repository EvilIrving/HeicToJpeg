<template>
    <div class="mx-auto w-1/2 mt-4">
        <h1 class="text-3xl font-bold text-center my-5">HEIC Images Free Online Converter</h1>
        <el-upload :show-file-list="false" v-model:file-list="imageList" action="#" :http-request="handleHttpUpload"
            :before-upload="beforeUpload" :on-exceed="handleExceed" :on-success="uploadSuccess"
            :on-progress="handleProgress" drag multiple :limit="limit" :accept="fileType.join(',')">
            <el-icon class="el-icon--upload"><upload-filled /></el-icon>
            <div class="el-upload__text">
                拖拽文件到这里或 <em>点击选择文件</em>
            </div>
            <template #tip>
                <div class="el-upload__tip">
                    上传文件支持 {{ fileType.join(' / ').replace('image/', '') }} 格式，单个文件大小不超过 {{ fileSize }}MB，且文件数量不超过 {{
            limit }} 个
                </div>
            </template>
        </el-upload>

        <el-drawer v-model="showImageList" title="图片列表" direction="rtl" size="40%">
            <el-table v-if="isImageSelected" :data="imageList">
                <el-table-column prop="name" label="Name" width="90" show-overflow-tooltip
                    align="center"></el-table-column>
                <el-table-column prop="size" label="Size (MB)" width="90">
                    <template #default="{ row }">{{ (row.size / 1024 / 1024).toFixed(2) }}</template>
                </el-table-column>
                <el-table-column prop="convertedSize" label="ConvertedSize (MB)" align="center">
                    <template #default="{ row }">{{ row?.convertedSize ? ((row.convertedSize) / 1024 /
            1024).toFixed(2) : 'converting' }}</template>
                </el-table-column>
                <el-table-column prop="progress" label="Upload Progress">
                    <template #default="{ row }">
                        <el-progress :percentage="row.progress" />
                    </template>
                </el-table-column>
                <!-- <el-table-column label="Actions">
                    <template #default="{ row }">
                        <span class="px-1 cursor-pointer select-none text-blue-500" >预览</span>
                        <span class="px-1 cursor-pointer select-none text-green-500">下载</span>
                        <span class="px-1 cursor-pointer select-none text-red-500">删除</span>
                    </template>
                </el-table-column> -->
            </el-table>
        </el-drawer>

        <section v-show="isImageSelected" class="flex flex-col w-1/2 ">
            <h4 class="my-2">参数调整</h4>
            <section class="flex items-center ">
                <span class="text-sm overflow-hidden text-ellipsis whitespace-nowrap flex-1">格式</span>
                <el-select class="ml-4 flex-007" v-model="format" placeholder="请选择转换格式">
                    <el-option label="PNG" value="image/png"></el-option>
                    <el-option label="JPEG" value="image/jpeg"></el-option>
                    <el-option label="GIF" value="image/gif"></el-option>
                </el-select>
            </section>
            <section class="flex items-center">
                <span class="text-sm overflow-hidden text-ellipsis whitespace-nowrap flex-1">质量</span>
                <el-slider class="ml-4 flex-007" v-model="quality" :min="0" :max="1" :step="0.1">质量</el-slider>
            </section>
        </section>
        <section class="mt-4">
            <el-button :loading="loading" plain @click="convertImages" v-show="isImageSelected">
                转换
            </el-button>
            <el-button plain @click="previewImages" v-show="isConvertedAll">
                预览
            </el-button>
            <el-button plain v-show="isConvertedAll" @click="downloadImages">
                下载
            </el-button>
            <el-button plain @click="showImageList = true">
                查看
            </el-button>
            <el-button plain @click="removeExif">
                移除
            </el-button>

        </section>

        <el-image-viewer v-if="imgViewVisible" :url-list="viewImageUrls" @close="imgViewVisible = false" />
        <description />
    </div>
</template>

<script setup>
import heic2any from 'heic2any';
import Description from './Description.vue';
import JSZip from 'jszip';
import { ref } from 'vue';
/** todo 
 * 1. 图片预览下载删除功能
 * 2. 优化
 *  */
const fileType = ["image/heic"]
// const fileType = ["jpeg", "png", "gif"]
const fileSize = 10
const limit = 100
const imageList = ref([]);

/**
 * @description 文件上传之前判断
 * @param rawFile 选择的文件
 * */
const beforeUpload = rawFile => {
    const imgSize = rawFile.size / 1024 / 1024 < fileSize;
    const imgType = fileType.includes(rawFile.type);
    if (!imgType)
        ElMessage.error(`上传文件只支持 ${fileType.join(',').replace('image/', '')} 格式！`)
    if (!imgSize)
        setTimeout(() => {
            ElMessage.error(`上传文件大小不能超过 ${fileSize}MB！`)
        }, 0);
    return imgType && imgSize;
};

/**
 * @description 文件上传时 进度
 * @param event 上传事件
 */
const handleProgress = (event, file, fileList) => {
    console.log(event, file, fileList, 'progress');
    const progress = Math.round((event.loaded / event.total) * 100);
    const index = fileList.value.findIndex(item => item.uid === file.uid);
    if (index !== -1) {
        fileList.value[index].progress = progress;
    }
};
/**
 * @description 自定义图片上传
 * @param options upload 所有配置项
 * */
const handleHttpUpload = async (options) => { };

/**
 * @description 图片上传成功
 * @param response 上传响应结果
 * @param uploadFile 上传的文件
 * */
const uploadSuccess = (files) => {
    console.log(files, 'upload success');
    //     const fileSize = (file.size / 1024 / 1024).toFixed(2);
    //     const uploadedFile = {
    //         name: file.name,
    //         size: fileSize,
    //         progress: 100,
    //         converted: false,
    //     };
    //     imageList.value.push(uploadedFile);
};

/**
 * @description 文件数超出
 * */
const handleExceed = (files) => {
    ElMessage.warning(
        `每次最多转换 ${max} 张图片，已选择 ${files.length} 张，共 ${files.length + imageList.value.length} 张`
    )
}

let imgViewVisible = ref(false);
let viewImageUrls = ref([]);
const previewImages = () => {
    viewImageUrls.value = imageList.value.map((item) => URL.createObjectURL(item.convertedImage))
    imgViewVisible.value = true;
};


// 图片转换逻辑
const format = ref('image/png');
const quality = ref(0.5);

const isImageSelected = computed(() => {
    return imageList.value.length > 0;
});
let isConvertedAll = ref(false);
let showImageList = ref(false);
let loading = ref(false);
const convertImages = () => {
    if (isConvertedAll.value) {
        // 如果已经是再次转换,更新 progress
        imageList.value.forEach((item) => {
            item.progress = 0
            item.convertedSize = 0
            item.converted = false
            item.convertedImage = null
        })
        isConvertedAll.value = false
    }
    loading.value = true
    showImageList.value = true
    // Convert image format and update progress
    const option = { toType: format.value, quality: quality.value }
    let convertedCount = 0; // 记录已转换成功的图片数量

    imageList.value.forEach((item) => {
        const convertedImage = heic2any({
            blob: item.raw,
            ...option // cuts the quality and size by half
        })

        convertedImage.then((result) => {
            item.converted = true;
            item.progress = 100;
            item.convertedSize = result.size
            item.convertedImage = result;
            convertedCount++; // 每次转换成功，计数器加1 
            // 检查是否所有图片都已转换成功
            if (convertedCount === imageList.value.length) {
                loading.value = false;
                showImageList.value = false;
                isConvertedAll.value = true;
            }
        })
    })
};


const downloadImages = () => {
    const zip = new JSZip();
    imageList.value.forEach((item) => {
        const filename = `${item.name.split('.')[0]}.${format.value.replace('image/', '')}`;
        zip.file(filename, item.convertedImage, { binary: true });
    })

    // Generate the zip file
    zip.generateAsync({ type: 'blob' })
        .then((zipBlob) => {
            // Create a download link and trigger the download
            const link = document.createElement('a');
            link.href = URL.createObjectURL(zipBlob);
            link.download = 'converted_images.zip';
            link.click();
        })
        .catch((error) => {
            console.error('Failed to generate the zip file:', error);
        });
};

// todo 移除 exif
// crop changedpi
/**
 * TODO:
 * 移除 EXIF 参考 https://squoosh.app/ exif-remover/
 * https://exiftool.org/#links http://code.ciaoca.com/javascript/exif-js/  https://piexifjs.readthedocs.io/en/latest/sample.html#insert-exif-into-jpeg
 * 图片裁剪 
 * 调整 DPI 参考 
 * 
 *  */

</script>