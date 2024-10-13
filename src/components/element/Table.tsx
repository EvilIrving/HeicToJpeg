"use client";
import { useState } from "react";
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
  isConverted,
  isConverting,
  files,
  clear,
  downloads,
  download,
}: {
  isConverted: boolean;
  isConverting: boolean;
  files: userFile[];
  clear: () => void;
  downloads: () => void;
  download: (file: userFile) => void;
}) {
  function clearImages() {
    clear();
  }
  function downloadImages() {
    downloads();
  }
  function downloadImage(file: userFile) {
    download(file);
  }
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = files.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(files.length / itemsPerPage);

  function prev() {
    setCurrentPage((prevPage) => prevPage - 1);
  }

  function next() {
    setCurrentPage((prevPage) => prevPage + 1);
  }

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [previewFile, setPreviewFile] = useState<userFile | null>(null);

  function previewImage(file: userFile) {
    file.url = URL.createObjectURL(file.convertedFile || file.file);
    setPreviewFile(file);
    onOpen();
  }

  return (
    <div className="overflow-x-auto">
      <div className="sm:flex sm:items-center sm:justify-between">
        <h2 className="text-lg font-medium text-gray-800 dark:text-white">
          Photos uploaded ({files.length} files)
        </h2>

        <div className="mb-2 flex items-center gap-x-3">
          <Button
            isDisabled={isConverting}
            radius="full"
            color="primary"
            onClick={clearImages}
          >
            Clear All
          </Button>

          <Button
            radius="full"
            color="primary"
            isDisabled={isConverting}
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
              <TableRow key={file.name}>
                <TableCell>{file.name}</TableCell>
                <TableCell>{file.size}</TableCell>
                <TableCell>
                  {file.isConverted ? (
                    file.convertedSize
                  ) : file.progress ? (
                    <div className="h-2.5 w-full rounded-full bg-gray-200 dark:bg-gray-700">
                      <div
                        className="h-2.5 rounded-full bg-blue-600"
                        style={{ width: `${file.progress}%` }}
                      ></div>
                    </div>
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
                  ) : (
                    "Waiting..."
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalContent>
          {(onClose) => (
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
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button
                  color="primary"
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
          isDisabled={currentPage === 1}
          onClick={prev}
        >
          Previous
        </Button>

        <Button
          className="w-40"
          radius="full"
          color="primary"
          isDisabled={currentPage === totalPages}
          onClick={next}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
