"use client";

import { useState } from "react";
import { Button } from "@nextui-org/button";
import heic2any from "heic2any";
import JSZip from "jszip";

import Config from "./FileTypeConfig";
import Table from "./Table";
import Upload from "./Upload";

import { userFile } from "@/definitions";

export default function UI() {
  const [userFiles, setUserFiles] = useState<userFile[]>([]);
  const newFiles: userFile[] = [];
  function handleFiles(files: FileList | null) {
    if (files === null) return;
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      newFiles.push({
        name: file.name.split(".")?.[0] || "",
        size: getFileSize(file.size),
        file: file,
        isConverted: false,
        progress: 0,
      });
    }
    setUserFiles(newFiles);
  }

  function getFileSize(size: number) {
    return (size / 1024 / 1024).toFixed(2) + "MB";
  }

  const [format, setFormat] = useState("jpeg");
  function setFormatter(format: string) {
    setFormat(format);
  }

  const [quality, setQuality] = useState(0.8);
  function setQualityValue(quality: number) {
    setQuality(quality);
  }

  const [isConverted, setIsConverted] = useState(false);
  const [loading, setLoading] = useState(false);

  function convert() {
    setLoading(true);
    setIsConverted(false);
    if (isConverted) {
      userFiles.forEach((item) => {
        item.progress = 0;
        item.isConverted = false;
      });
      setUserFiles([...userFiles]);
    }

    const option = { toType: `image/${format}`, quality: quality };
    let currentIndex = 0;

    const convertNextFile = () => {
      if (currentIndex >= userFiles.length) {
        setLoading(false);
        setIsConverted(true);
        return;
      }

      const item = userFiles[currentIndex];
      const fileName = item.name.split(".")[0];
      const extension = format.replace("image/", "");

      item.progress = 0;
      setUserFiles([...userFiles]);

      const convertedImage = heic2any({
        blob: item.file,
        ...option,
      });

      convertedImage.then((result) => {
        const file = new File([result as Blob], `${fileName}.${extension}`);
        item.isConverted = true;
        item.progress = 100;
        item.convertedSize = getFileSize(file.size);
        item.convertedFile = file;

        setUserFiles([...userFiles]);
        currentIndex++;
        convertNextFile();
      });

      // 模拟转换进度
      let progress = 0;
      const progressInterval = setInterval(() => {
        progress += 10;
        if (progress > 90) {
          clearInterval(progressInterval);
        } else {
          item.progress = progress;
          setUserFiles([...userFiles]);
        }
      }, 100);
    };

    convertNextFile();
  }
  function preview() {}
  function downloadImages() {
    const zip = new JSZip();
    userFiles.forEach((item) => {
      // 保存文件时添加格式信息
      zip.file(
        `${item.name}.${format.replace("image/", "")}`,
        item.convertedFile as File,
        { binary: true }
      );
    });

    // Generate the zip file
    zip
      .generateAsync({ type: "blob" })
      .then((zipBlob) => {
        // Create a download link and trigger the download
        saveAsfile(zipBlob, "images.zip");
      })
      .catch((error) => {
        console.error("Failed to generate the zip file:", error);
      });
  }

  function downloadImage(item: userFile) {
    saveAsfile(
      item.convertedFile as File,
      `${item.name}.${format.replace("image/", "")}`
    );
  }

  function saveAsfile(blob: Blob, name: string) {
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = name;
    link.click();
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
          <Button
            radius="full"
            className="mt-4 w-40"
            color="primary"
            isLoading={loading}
            onClick={convert}
          >
            Convert
          </Button>
          <Table
            isConverted={isConverted}
            isConverting={loading}
            files={userFiles}
            downloads={() => downloadImages()}
            download={(item: userFile) => downloadImage(item)}
            clear={() => setUserFiles([])}
          />
        </>
      ) : null}
    </>
  );
}
