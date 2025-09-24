"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@nextui-org/button";

import Config from "./FileTypeConfig";
import Table from "./Table";
import Upload from "./Upload";

import { userFile } from "@/definitions";

function createFileId() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }

  return `${Date.now()}-${Math.random()}`;
}

function getFileSize(size: number) {
  return `${(size / 1024 / 1024).toFixed(2)}MB`;
}

export default function UI() {
  const [userFiles, setUserFiles] = useState<userFile[]>([]);
  const userFilesRef = useRef<userFile[]>([]);

  useEffect(() => {
    userFilesRef.current = userFiles;
  }, [userFiles]);

  const [format, setFormat] = useState("jpeg");
  const [quality, setQuality] = useState(0.8);
  const [loading, setLoading] = useState(false);

  function handleFiles(files: FileList | null) {
    if (!files || files.length === 0) return;

    const incomingFiles: userFile[] = Array.from(files).map((file) => ({
      id: createFileId(),
      name: file.name.split(".")?.[0] || "",
      size: getFileSize(file.size),
      file,
      isConverted: false,
      progress: 0,
    }));

    setUserFiles((prevFiles) => [...prevFiles, ...incomingFiles]);
  }

  function setFormatter(nextFormat: string) {
    setFormat(nextFormat);
  }

  function setQualityValue(nextQuality: number) {
    setQuality(nextQuality);
  }

  function resolveExtension() {
    return format.replace("image/", "");
  }

  async function convert() {
    if (!userFiles.length) return;

    const fileIds = userFiles.map((file) => file.id);
    setLoading(true);

    setUserFiles((prevFiles) =>
      prevFiles.map((file) =>
        fileIds.includes(file.id)
          ? {
              ...file,
              progress: 0,
              isConverted: false,
              convertedSize: undefined,
              convertedFile: undefined,
              error: undefined,
            }
          : file
      )
    );

    const option = { toType: `image/${resolveExtension()}`, quality };
    const extension = resolveExtension();

    try {
      const { default: heic2any } = await import("heic2any");
      for (const id of fileIds) {
        const targetFile = userFilesRef.current.find((file) => file.id === id);
        if (!targetFile) continue;

        setUserFiles((prevFiles) =>
          prevFiles.map((file) =>
            file.id === id
              ? {
                  ...file,
                  progress: 25,
                  error: undefined,
                }
              : file
          )
        );

        try {
          const result = await heic2any({
            blob: targetFile.file,
            ...option,
          });

          const blobResult = Array.isArray(result) ? result[0] : (result as Blob);
          const convertedFile = new File(
            [blobResult],
            `${targetFile.name}.${extension}`
          );

          setUserFiles((prevFiles) =>
            prevFiles.map((file) =>
              file.id === id
                ? {
                    ...file,
                    isConverted: true,
                    progress: 100,
                    convertedSize: getFileSize(convertedFile.size),
                    convertedFile,
                    error: undefined,
                  }
                : file
            )
          );
        } catch (error) {
          console.error("Failed to convert file:", error);
          setUserFiles((prevFiles) =>
            prevFiles.map((file) =>
              file.id === id
                ? {
                    ...file,
                    progress: 0,
                    error: "Conversion failed",
                  }
                : file
            )
          );
        }
      }
    } finally {
      setLoading(false);
    }
  }

  function downloadImages() {
    const extension = resolveExtension();
    let hasConvertibleFiles = false;

    (async () => {
      const JSZip = (await import("jszip")).default;
      const { saveAs } = await import("file-saver");
      const zip = new JSZip();

      userFiles.forEach((item) => {
        if (!item.convertedFile) return;
        hasConvertibleFiles = true;
        zip.file(`${item.name}.${extension}`, item.convertedFile, { binary: true });
      });

      if (!hasConvertibleFiles) return;

      zip
        .generateAsync({ type: "blob" })
        .then((zipBlob) => {
          saveAs(zipBlob, "images.zip");
        })
        .catch((error) => {
          console.error("Failed to generate the zip file:", error);
        });
    })();
  }

  function downloadImage(item: userFile) {
    if (!item.convertedFile) return;

    const extension = resolveExtension();
    (async () => {
      const { saveAs } = await import("file-saver");
      saveAs(item.convertedFile!, `${item.name}.${extension}`);
    })();
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
