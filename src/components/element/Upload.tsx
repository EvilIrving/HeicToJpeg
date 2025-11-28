"use client";

import { ChangeEvent, DragEvent, memo, useState } from "react";
import clsx from "clsx";
import { useTranslations } from "next-intl";

interface UploadProps {
  onHandleFiles: (files: FileList | null) => void;
  isDisabled?: boolean;
}

function Upload({
  onHandleFiles,
  isDisabled = false,
}: UploadProps) {
  const t = useTranslations("Upload");
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const validateFiles = (files: FileList | null): boolean => {
    if (!files) return false;

    for (const file of Array.from(files)) {
      if (!file.name.toLowerCase().match(/\.(heic|heif)$/)) {
        setError(t("invalidFormat", { fileName: file.name }));
        return false;
      }
      if (file.size > 500 * 1024 * 1024) {
        setError(t("fileTooLarge", { fileName: file.name }));
        return false;
      }
    }
    return true;
  };

  const handleDrop = (event: DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
    setIsDragging(false);
    setError(null);
    const { files } = event.dataTransfer;

    if (validateFiles(files)) {
      onHandleFiles(files?.length ? files : null);
    }
  };

  const handleFileSelect = (event: ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target;
    setError(null);
    if (validateFiles(files)) {
      onHandleFiles(files?.length ? files : null);
    }
  };

  const handleDragOver = (event: DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  return (
    <div>
      <label
        htmlFor="upload-btn"
        className={clsx(
          "flex w-full cursor-pointer appearance-none items-center justify-center rounded-xl border-2 border-dashed px-6 py-10 transition-all duration-300 hover:border-primary hover:bg-accent/50",
          {
            "border-primary bg-primary/5 ring-2 ring-primary/20": isDragging,
            "border-border bg-card": !isDragging,
            "opacity-50 cursor-not-allowed": isDisabled,
          }
        )}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
      >
        <div className="space-y-1 text-center">
          <div className="mx-auto inline-flex size-10 items-center justify-center rounded-full bg-muted transition-colors hover:bg-accent">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-6 text-muted-foreground"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"
              />
            </svg>
          </div>
          <div className="text-foreground">
            <span className="font-medium text-primary hover:text-primary/80 transition-colors">
              {t("clickToUpload")}
            </span>{" "}
            {t("dragAndDrop")}
          </div>
          <p className="text-sm text-muted-foreground">{t("fileTypes")}</p>
          <p className="text-sm text-muted-foreground">
            {t("fileLimit")}
          </p>
          {error && (
            <p className="mt-2 text-sm text-destructive font-medium" role="alert">
              ⚠️ {error}
            </p>
          )}
        </div>
        <input
          id="upload-btn"
          type="file"
          accept=".heic,.heif"
          className="sr-only"
          multiple
          onChange={handleFileSelect}
          disabled={isDisabled}
          aria-label={t("ariaLabel")}
          aria-describedby="file-upload-description"
        />
      </label>
      <p id="file-upload-description" className="sr-only">
        {t("ariaDescription")}
      </p>
    </div>
  );
}

export default memo(Upload);
