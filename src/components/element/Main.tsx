"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Button } from "@nextui-org/button";
import dynamic from "next/dynamic";
import { useTranslations } from "next-intl";

import Upload from "./Upload";

import { userFile } from "@/definitions";

const Config = dynamic(() => import("./FileTypeConfig"), { ssr: false });
const Table = dynamic(() => import("./Table"), { ssr: false });

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
  const t = useTranslations("Main");
  const [userFiles, setUserFiles] = useState<userFile[]>([]);
  const userFilesRef = useRef<userFile[]>([]);

  useEffect(() => {
    userFilesRef.current = userFiles;
  }, [userFiles]);

  const [format, setFormat] = useState("jpeg");
  const [quality, setQuality] = useState(0.8);
  const [loading, setLoading] = useState(false);

  const handleFiles = useCallback((files: FileList | null) => {
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
  }, []);

  const setFormatter = useCallback((nextFormat: string) => {
    setFormat(nextFormat);
  }, []);

  const setQualityValue = useCallback((nextQuality: number) => {
    setQuality(nextQuality);
  }, []);

  function resolveExtension() {
    return format.replace("image/", "");
  }

  const convert = useCallback(async () => {
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
      let convertedCount = 0;
      
      for (const id of fileIds) {
        const targetFile = userFilesRef.current.find((file) => file.id === id);
        if (!targetFile) continue;

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

          convertedCount++;
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
                    error: t("conversionFailed"),
                  }
                : file
            )
          );
        }
      }
    } finally {
      setLoading(false);
    }
  }, [userFiles, format, quality]);

  const downloadImages = useCallback(() => {
    const extension = resolveExtension();
    let hasConvertibleFiles = false;

    (async () => {
      const JSZip = (await import("jszip")).default;
      const saveAs = (await import("file-saver")).default;
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
  }, [userFiles, format]);

  const downloadImage = useCallback((item: userFile) => {
    if (!item.convertedFile) return;

    const extension = resolveExtension();
    (async () => {
      const saveAs = (await import("file-saver")).default;
      saveAs(item.convertedFile!, `${item.name}.${extension}`);
    })();
  }, [format]);

  const clearAllFiles = useCallback(() => {
    setUserFiles([]);
  }, []);

  const hasConvertedFiles = useMemo(
    () => userFiles.some((f) => f.isConverted),
    [userFiles]
  );

  return (
    <>
      <div className="space-y-6">
        <Upload onHandleFiles={handleFiles} isDisabled={loading} />
        {userFiles.length > 0 ? (
          <>
            <div className="space-y-4 rounded-lg border border-border bg-card/50 backdrop-blur-sm p-4 shadow-sm transition-all duration-300">
              <Config
                format={format}
                quality={quality}
                setFormat={setFormatter}
                setQualityValue={setQualityValue}
              />
              <div className="flex flex-wrap gap-3">
                <Button
                  radius="full"
                  className="min-w-40"
                  color="primary"
                  isLoading={loading}
                  onClick={convert}
                  disabled={loading}
                >
                  {loading ? t("converting") : t("convertAll")}
                </Button>
                {hasConvertedFiles && (
                  <Button
                    radius="full"
                    className="min-w-40"
                    color="success"
                    variant="bordered"
                    onClick={downloadImages}
                    disabled={loading}
                  >
                    {t("downloadAll")}
                  </Button>
                )}
                {userFiles.length > 0 && (
                  <Button
                    radius="full"
                    className="min-w-40"
                    color="danger"
                    variant="light"
                    onClick={clearAllFiles}
                    disabled={loading}
                  >
                    {t("clearAll")}
                  </Button>
                )}
              </div>
            </div>
            <Table
              isConverting={loading}
              files={userFiles}
              downloads={downloadImages}
              download={downloadImage}
              clear={clearAllFiles}
            />
          </>
        ) : (
          <div className="rounded-lg border border-dashed border-border bg-muted/30 px-6 py-8 text-center transition-colors duration-300">
            <p className="text-sm text-muted-foreground">
              {t("noFiles")}
            </p>
          </div>
        )}
      </div>
    </>
  );
}
