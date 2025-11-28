"use client";
import { useEffect, useState } from "react";
import { Button } from "@nextui-org/button";
import { Image } from "@nextui-org/image";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/modal";
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/table";
import { useTranslations } from "next-intl";

import { userFile } from "@/definitions";

export default function TableElement({
  isConverting,
  files,
  clear,
  downloads,
  download,
}: {
  isConverting: boolean;
  files: userFile[];
  clear: () => void;
  downloads: () => void;
  download: (file: userFile) => void;
}) {
  const t = useTranslations("Table");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    const maxPage = Math.max(1, Math.ceil(files.length / itemsPerPage));
    setCurrentPage((prevPage) => Math.min(prevPage, maxPage));
  }, [files.length]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = files.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.max(1, Math.ceil(files.length / itemsPerPage));

  // 计算转换进度
  const convertedCount = files.filter((file) => file.isConverted).length;
  const totalCount = files.length;
  const conversionProgress = totalCount > 0 ? Math.round((convertedCount / totalCount) * 100) : 0;

  function clearImages() {
    clear();
    setCurrentPage(1);
  }

  function downloadImages() {
    downloads();
  }

  function downloadImage(file: userFile) {
    download(file);
  }

  function prev() {
    setCurrentPage((prevPage) => Math.max(1, prevPage - 1));
  }

  function next() {
    setCurrentPage((prevPage) => Math.min(totalPages, prevPage + 1));
  }

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [previewFile, setPreviewFile] = useState<userFile | null>(null);

  function previewImage(file: userFile) {
    if (previewFile?.url) {
      URL.revokeObjectURL(previewFile.url);
    }

    const blob = file.convertedFile ?? file.file;
    const url = URL.createObjectURL(blob);
    setPreviewFile({ ...file, url });
    onOpen();
  }

  const closePreview = () => {
    if (previewFile?.url) {
      URL.revokeObjectURL(previewFile.url);
    }
    setPreviewFile(null);
    onClose();
  };

  const hasConvertedFiles = files.some((file) => file.convertedFile);
  const disablePrev = currentPage === 1;
  const disableNext = currentPage >= totalPages;

  return (
    <div className="overflow-x-auto">
      <div className="sm:flex sm:items-center sm:justify-between">
        <h2 className="text-lg font-medium text-foreground">
          {t("photosUploaded")} ({t("filesCount", { count: files.length })})
        </h2>

        <div className="mb-2 flex items-center gap-x-3">
          <Button
            isDisabled={isConverting || files.length === 0}
            radius="full"
            color="primary"
            onClick={clearImages}
          >
            {t("clearAll")}
          </Button>

          <Button
            radius="full"
            color="primary"
            isDisabled={isConverting || !hasConvertedFiles}
            onClick={downloadImages}
          >
            {t("downloadAll")}
          </Button>
        </div>
      </div>

      {/* 统一的转换进度条 */}
      {isConverting && (
        <div className="my-4 rounded-lg border border-primary/20 bg-primary/5 p-4">
          <div className="mb-2 flex items-center justify-between text-sm">
            <span className="font-medium text-foreground">
              {t("convertingFiles")}
            </span>
            <span className="text-muted-foreground">
              {t("progress", { current: convertedCount, total: totalCount, percent: conversionProgress })}
            </span>
          </div>
          <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
            <div
              className="h-full rounded-full bg-primary transition-all duration-300 ease-out"
              style={{ width: `${conversionProgress}%` }}
            ></div>
          </div>
        </div>
      )}

      <div className="p-2">
        <Table aria-label="文件列表">
          <TableHeader>
            <TableColumn>{t("name")}</TableColumn>
            <TableColumn>{t("size")}</TableColumn>
            <TableColumn>{t("convertedSize")}</TableColumn>
            <TableColumn width="220">{t("action")}</TableColumn>
          </TableHeader>
          <TableBody>
            {currentItems.map((file) => (
              <TableRow key={file.id}>
                <TableCell>{file.name}</TableCell>
                <TableCell>{file.size}</TableCell>
                <TableCell>
                  {file.isConverted ? (
                    file.convertedSize
                  ) : file.error ? (
                    <span className="text-destructive font-medium">
                      {file.error}
                    </span>
                  ) : isConverting ? (
                    <span className="text-muted-foreground">{t("converting")}</span>
                  ) : (
                    <span className="text-muted-foreground">{t("waiting")}</span>
                  )}
                </TableCell>
                <TableCell>
                  <div className="w-40">
                    {file.isConverted ? (
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="light"
                          isDisabled={!file.convertedFile}
                          onClick={() => downloadImage(file)}
                        >
                          {t("download")}
                        </Button>
                        <Button
                          size="sm"
                          variant="light"
                          onClick={() => previewImage(file)}
                        >
                          {t("preview")}
                        </Button>
                      </div>
                    ) : file.error ? (
                      <span className="text-destructive font-medium">
                        {file.error}
                      </span>
                    ) : (
                      <span className="text-muted-foreground">{t("waiting")}</span>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Modal isOpen={isOpen} onClose={closePreview} size="lg">
        <ModalContent>
          {() => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                {previewFile?.name}
              </ModalHeader>
              <ModalBody className="flex items-center justify-center p-4">
                <Image
                  src={previewFile?.url || ""}
                  alt={previewFile?.name || t("previewImage")}
                  className="max-h-[60vh] w-auto object-contain"
                />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={closePreview}>
                  {t("close")}
                </Button>
                <Button
                  color="primary"
                  isDisabled={!previewFile?.convertedFile}
                  onPress={() => previewFile && download(previewFile)}
                >
                  {t("download")}
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>

      <div className="mt-2 flex items-center justify-between gap-x-2">
        <Button
          className="w-40"
          radius="full"
          color="primary"
          isDisabled={disablePrev}
          onClick={prev}
        >
          {t("previous")}
        </Button>

        <Button
          className="w-40"
          radius="full"
          color="primary"
          isDisabled={disableNext}
          onClick={next}
        >
          {t("next")}
        </Button>
      </div>
    </div>
  );
}
