<template>
  <div class="mx-auto w-1/2 mt-4">
    <h1 class="text-3xl font-bold text-center my-5">HEIC/HEIF Simple, Free, and Offline Converter</h1>
    <el-upload :show-file-list="false" v-model:file-list="imageList" action="#" :http-request="handleHttpUpload"
      :before-upload="beforeUpload" :on-exceed="handleExceed" :on-success="uploadSuccess" :on-progress="handleProgress"
      drag multiple :limit="limit" :accept="fileType.join(',')">
      <el-icon class="el-icon--upload"><upload-filled /></el-icon>
      <div class="el-upload__text">
        Drag & drop or <em>click here</em> to upload your {{ fileType.join(',').replaceAll('image/', '') }}
        images
      </div>
      <template #tip>
        <div class="el-upload__tip">
          Unlimited uploads, but it is recommended not to exceed {{
      limit }} files.
        </div>
      </template>
    </el-upload>

    <el-drawer v-model="showImageList" title="Images List" direction="rtl" size="40%">
      <el-table v-if="isImageSelected" :data="imageList">
        <el-table-column prop="name" label="Name" width="90" show-overflow-tooltip align="center"></el-table-column>
        <el-table-column prop="size" label="Size (MB)" width="90">
          <template #default="{ row }">{{ (row.size / 1024 / 1024).toFixed(2) }}</template>
        </el-table-column>
        <el-table-column prop="convertedSize" label="ConvertedSize (MB)" align="center">
          <template #default="{ row }">{{ row?.convertedSize ? ((row.convertedSize) / 1024 /
      1024).toFixed(2) : '-' }}</template>
        </el-table-column>
        <el-table-column prop="progress" label="Progress">
          <template #default="{ row }">
            <el-progress :percentage="row.progress" />
          </template>
        </el-table-column>
        <el-table-column label="Actions">
          <template #default="{ row }">
            <span v-show="!row.converted" class="px-1 cursor-pointer select-none">-</span>
            <span v-show="row.converted" @click="downloadImage(row)"
              class="px-1 cursor-pointer select-none text-green-500">download</span>
            <!-- <span class="px-1 cursor-pointer select-none text-red-500">删除</span> -->
          </template>
        </el-table-column>
      </el-table>
    </el-drawer>

    <section v-show="isImageSelected" class="flex flex-col w-1/2 ">
      <h4 class="my-2">Options</h4>
      <section class="flex items-center ">
        <span class="text-sm overflow-hidden text-ellipsis whitespace-nowrap flex-1">Format</span>
        <el-select class="ml-4 flex-007" v-model="format" placeholder="please select format">
          <el-option label="PNG" value="image/png"></el-option>
          <el-option label="JPEG" value="image/jpeg"></el-option>
          <!-- <el-option label="GIF" value="image/gif"></el-option> -->
        </el-select>

        <!-- <span class="text-sm overflow-hidden text-ellipsis whitespace-nowrap flex-1">gifInterval</span>
                <el-slider class="ml-7 flex-007" v-model="gifInterval" :min="0.1" :max="1" :step="0.1" /> -->
      </section>
      <section class="flex items-center">
        <span class="text-sm overflow-hidden text-ellipsis whitespace-nowrap flex-1">Quality</span>
        <el-slider class="ml-4 flex-007" v-model="quality" :min="0" :max="1" :step="0.1">Quality</el-slider>
      </section>
    </section>
    <section class="mt-4">
      <el-button :loading="loading" plain @click="convertImages" v-show="isImageSelected">
        Convert
      </el-button>
      <el-button plain @click="previewImages" v-show="isConvertedAll">
        Preview
      </el-button>
      <el-button plain v-show="isConvertedAll" @click="downloadImages">
        Download All
      </el-button>
      <el-button plain v-show="isImageSelected" @click="refreshList">
        Refresh List
      </el-button>
      <el-button v-show="isImageSelected" plain @click="showImageList = true">
        Check List
      </el-button>
    </section>

    <el-image-viewer v-if="imgViewVisible" :url-list="viewImageUrls" @close="imgViewVisible = false" />
    <description />



    <!-- Batch Convert HEIC to PNG or JPG For FREE
        It's compatible with all platforms, requires no registration, and is completely free with unlimited access.
        Enjoy higher compatibility without the need for installation.
        Convert HEIC to JPG or PNG
        Convert your HEIC files to JPG, PNG, or GIF effortlessly with our powerful, user-friendly online converter.
        Enjoy higher
        compatibility without the need for installation. It's compatible with all platforms, requires no registration,
        and is
        completely free with unlimited access. Convert your HEIC images now! -->
  </div>
</template>

<script setup>
import heic2any from 'heic2any';
import Description from './Description.vue';
import JSZip from 'jszip';
import { ref } from 'vue';
// import { useSeoMeta } from '@unhead/vue'

// useSeoMeta({
//     title: 'Heic Converter Free and Easy',
//     description: 'Convert HEIC/HEIF to PNG with high quality and lossless compression.',
//     ogDescription: 'HEIC, HEIF, PNG, converter, conversion, online, secure',
//     ogTitle: 'About',
//     ogImage: 'https://example.com/image.png',
//     twitterCard: 'summary_large_image',
// })

/** todo 
 * 1. 图片预览下载删除功能
 * 2. 优化
 *  */
const fileType = ["image/heic", 'image/heif']
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
    ElMessage.error(`just surpport ${fileType.join(',').replaceAll('image/', '')} format！`)
  // if (!imgSize)
  //     setTimeout(() => {
  //         ElMessage.error(`file size should not exceed ${fileSize}MB！`)
  //     }, 0);
  return imgType;
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
    `You can only upload up to ${max} files, but,you uploaded ${files.length + imageList.value.length} files.`
  )
}

let imgViewVisible = ref(false);
let viewImageUrls = ref([]);
const previewImages = () => {
  viewImageUrls.value = imageList.value.map((item) => URL.createObjectURL(item.convertedImage))
  imgViewVisible.value = true;
};


// 图片转换逻辑
const format = ref('image/jpeg');
const quality = ref(0.8);
// const gifInterval = ref(0.8);

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
  // format.value === 'image/gif' ? option.gifInterval = 0.3 : option.quality = quality.value
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

const refreshList = () => {
  imageList.value = [];
  isConvertedAll.value = false;
  showImageList.value = false;
}
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
      saveAsfile(zipBlob, 'images.zip');
    })
    .catch((error) => {
      console.error('Failed to generate the zip file:', error);
    });
};


const downloadImage = (item) => {
  console.log(item, 'download image');
  saveAsfile(item.convertedImage, `${item.name.split('.')[0]}.${format.value.replace('image/', '')}`);
}
const saveAsfile = (blob, name) => {
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = name;
  link.click();
}
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
