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
        <h2 className="text-lg font-medium text-gray-800 dark:text-white">
          Photos uploaded ({files.length} files)
        </h2>

        <div className="mb-2 flex items-center gap-x-3">
          <Button
            isDisabled={isConverting || files.length === 0}
            radius="full"
            color="primary"
            onClick={clearImages}
          >
            Clear All
          </Button>

          <Button
            radius="full"
            color="primary"
            isDisabled={isConverting || !hasConvertedFiles}
            onClick={downloadImages}
          >
            Download All
          </Button>
        </div>
      </div>

      <div className="p-2">
        <Table aria-label="文件列表">
          <TableHeader>
            <TableColumn>Name</TableColumn>
            <TableColumn>Size</TableColumn>
            <TableColumn>Converted Size</TableColumn>
            <TableColumn>Action</TableColumn>
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
                    <span className="text-red-500 dark:text-red-400">
                      {file.error}
                    </span>
                  ) : file.progress ? (
                    <div className="h-2.5 w-full rounded-full bg-gray-200 dark:bg-gray-700">
                      <div
                        className="h-2.5 rounded-full bg-blue-600"
                        style={{ width: `${file.progress}%` }}
                      ></div>
                    </div>
                  ) : isConverting ? (
                    "Converting..."
                  ) : (
                    "Waiting"
                  )}
                </TableCell>
                <TableCell>
                  {file.isConverted ? (
                    <>
                      <Button
                        size="sm"
                        variant="light"
                        isDisabled={!file.convertedFile}
                        onClick={() => downloadImage(file)}
                      >
                        Download
                      </Button>
                      <Button
                        size="sm"
                        variant="light"
                        onClick={() => previewImage(file)}
                        className="ml-2"
                      >
                        Preview
                      </Button>
                    </>
                  ) : file.error ? (
                    <span className="text-red-500 dark:text-red-400">
                      {file.error}
                    </span>
                  ) : (
                    "Waiting..."
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Modal isOpen={isOpen} onClose={closePreview} size="xl">
        <ModalContent>
          {() => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                {previewFile?.name}
              </ModalHeader>
              <ModalBody>
                <Image
                  src={previewFile?.url || ""}
                  alt={previewFile?.name || "预览图片"}
                  className="h-auto max-w-full"
                />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={closePreview}>
                  Close
                </Button>
                <Button
                  color="primary"
                  isDisabled={!previewFile?.convertedFile}
                  onPress={() => previewFile && download(previewFile)}
                >
                  Download
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
          Previous
        </Button>

        <Button
          className="w-40"
          radius="full"
          color="primary"
          isDisabled={disableNext}
          onClick={next}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
