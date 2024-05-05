<template>
    <div class="py-8">
        <h2 class="my-2 text-xl font-bold text-center">step-by-step guide</h2>
        <section>
            <ul class="text-sm">
                <li>1. Choose the HEIC/HEIF files you want to convert.</li>
                <li>2. Drag and drop the files or click on the "Browse files" button to select them.</li>
                <li>3. Choose the options you want to use for the conversion.</li>
                <li>4. Click on the "Convert" button to start the conversion process.</li>
                <li>5. Wait for the conversion process to finish.</li>
                <li>6. Download the converted files to your computer.</li>
            </ul>
        </section>
        <h2 class="my-2 text-xl font-bold text-center">Features</h2>
        <section class="grid grid-cols-3 gap-x-2 gap-y-4">
            <section v-for="item in features" :key="item.title" class="p-4 bg-white rounded-lg shadow-lg">
                <h4 class="my-2 text-sm font-bold text-center">{{ item.title }}</h4>
                <p class="text-sm">{{ item.description }}</p>
            </section>
        </section>
        <h2 class="my-2 text-xl font-bold text-center">Difference Between HEIC, JPEG, and PNG</h2>



    </div>
</template>

<script setup>
const features = [
    { title: 'Simple to use', description: 'Convert HEIC/HEIF to PNG with high quality and lossless compression.' },
    { title: 'Convert multiple files at once', description: 'Convert multiple HEIC/HEIF files at once and download them as a zip file.' },
    { title: 'Keep your files secure', description: 'an offline solution, your files are not uploaded to any server and are kept secure.' },
    { title: 'Keep original size & quality', description: 'Your files are not resized or cropped, and the quality is preserved.' },
    { title: 'No registration required', description: 'You do not need to create an account or provide any personal information.' },
    { title: 'No need to download any software', description: 'You can convert HEIC/HEIF files using our website without installing any software.' },
    { title: 'Convenient ways to save converted files', description: 'You can save your converted files to your computer, Google Drive, or Dropbox.' },
    { title: 'Keep or remove EXIF metadata', description: 'You can choose to keep or remove EXIF metadata from your converted files.' },
    { title: 'Crop & resize options', description: 'You can crop and resize your HEIC/HEIF files before converting them to PNG.' },
]
</script>