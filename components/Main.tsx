'use client'

import Upload from '@/components/Upload'
import Config from '@/components/Trans-config'
import Buttons from '@/components/Buttions'
import Table from '@/components/Table'
import { useState } from 'react'
import { userFile } from '@/types/definitions'
import heic2any from 'heic2any'
import JSZip from 'jszip'

export default function UI() {
  const [userFiles, setUserFiles] = useState<userFile[]>([])
  const newFiles: userFile[] = []
  function handleFiles(files: FileList | null) {
    if (files === null) return
    for (let i = 0; i < files.length; i++) {
      const file = files[i]
      newFiles.push({
        name: file.name.split('.')?.[0] || '',
        size: getFileSize(file.size),
        file: file,
        isConverted: false,
        convertedFile: null,
        convertedSize: null,
        progress: 0,
      })
    }
    setUserFiles(newFiles)
  }

  function getFileSize(size: number) {
    return (size / 1024 / 1024).toFixed(2) + 'MB'
  }

  const [format, setFormat] = useState('jpeg')
  function setFormatter(format: string) {
    setFormat(format)
  }

  const [quality, setQuality] = useState(0.8)
  function setQualityValue(quality: number) {
    setQuality(quality)
  }

  const [isConverted, setIsConverted] = useState(false)
  const [loading, setLoading] = useState(false)

  function convert() {
    setLoading(true)
    setIsConverted(false)
    if (isConverted) {
      // 如果已经是再次转换,更新 progress
      userFiles.forEach((item) => {
        item.progress = 0
        item.convertedSize = null
        item.isConverted = false
        item.convertedFile = null
      })
    }

    // Convert image format and update progress
    const option = { toType: `image/${format}`, quality: quality }
    // format.value === 'image/gif' ? option.gifInterval = 0.3 : option.quality = quality.value
    let convertedCount = 0 // 记录已转换成功的图片数量

    userFiles.forEach((item) => {
      const fileName = item.name.split('.')[0]
      const extension = format.replace('image/', '')
      const convertedImage = heic2any({
        blob: item.file,
        ...option, // cuts the quality and size by half
      })

      convertedImage.then((result) => {
        const file = new File([result as Blob], `${fileName}.${extension}`)
        item.isConverted = true
        item.progress = 100
        item.convertedSize = getFileSize(file.size)
        item.convertedFile = file
        convertedCount++ // 每次转换成功，计数器加1
        // 检查是否所有图片都已转换成功
        if (convertedCount === userFiles.length) {
          setLoading(false)
          setIsConverted(true)
        }
      })
    })
  }
  function preview() {}
  function downloadImages() {
    const zip = new JSZip()
    userFiles.forEach((item) => {
      zip.file(item.name, item.convertedFile as File, { binary: true })
    })

    // Generate the zip file
    zip
      .generateAsync({ type: 'blob' })
      .then((zipBlob) => {
        // Create a download link and trigger the download
        saveAsfile(zipBlob, 'images.zip')
      })
      .catch((error) => {
        console.error('Failed to generate the zip file:', error)
      })
  }

  function downloadImage(item: userFile) {
    saveAsfile(item.convertedFile as File, `${item.name}.${format.replace('image/', '')}`)
  }

  function saveAsfile(blob: Blob, name: string) {
    const link = document.createElement('a')
    link.href = URL.createObjectURL(blob)
    link.download = name
    link.click()
  }
  return (
    <>
      {/* <div role="alert" className="flex flex-col alert alert-info w-1/3 absolute left-1/2 transform -translate-x-1/2">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-info shrink-0 w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                    <span>you have files undownloaded, do you want to clear them all?</span>
                    <div className='flex gap-4'>
                        <button className="btn btn-sm">Deny</button>
                        <button className="btn btn-sm btn-primary">Accept</button>
                    </div>
                </div> */}
      <Upload onHandleFiles={(files: FileList | null) => handleFiles(files)} />
      {userFiles.length > 0 ? (
        <>
          <Config
            format={format}
            quality={quality}
            setFormat={(format: string) => setFormatter(format)}
            setQualityValue={(quality: number) => setQualityValue(quality)}
          />
          <Buttons
            loading={loading}
            convert={() => convert()}
            preview={() => preview()}
          />
          <Table
            isConverted={isConverted}
            files={userFiles}
            downloads={() => downloadImages()}
            download={(item: userFile) => downloadImage(item)}
            clear={() => setUserFiles([])}
          />
        </>
      ) : null}
    </>
  )
}
