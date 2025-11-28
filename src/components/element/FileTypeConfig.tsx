"use client";
import { memo, useCallback } from "react";
import { Button, ButtonGroup } from "@nextui-org/button";
import { Slider } from "@nextui-org/slider";
import { useTranslations } from "next-intl";

interface FileTypeConfigProps {
  format: string;
  quality: number;
  setFormat: (format: string) => void;
  setQualityValue: (quality: number) => void;
}

function FileTypeConfig({
  format,
  quality,
  setFormat,
  setQualityValue,
}: FileTypeConfigProps) {
  const t = useTranslations("Config");
  const toggleFormat = useCallback((convertFormat: string) => {
    setFormat(convertFormat);
  }, [setFormat]);

  const slideQuality = useCallback((quality: number) => {
    setQualityValue(quality);
  }, [setQualityValue]);
  return (
    <section className="py-4">
      <div>
        <div>
          <label
            htmlFor="format-btn"
            className="mb-2 block text-lg font-medium text-foreground"
          >
            {t("convertTo")}
          </label>
        </div>

        <div className="mt-2">
          <ButtonGroup className="w-4/5">
            <Button
              radius="full"
              className="w-1/2"
              color={format === "jpeg" ? "primary" : "default"}
              onClick={() => toggleFormat("jpeg")}
            >
              JPG
            </Button>
            <Button
              radius="full"
              className="w-1/2"
              color={format === "png" ? "primary" : "default"}
              onClick={() => toggleFormat("png")}
            >
              PNG
            </Button>
          </ButtonGroup>
        </div>
      </div>

      <div className="mt-4">
        <Slider
          label={t("quality")}
          step={0.01}
          maxValue={1}
          minValue={0}
          defaultValue={0.4}
          value={quality}
          onChange={(value) => {
            slideQuality(value as number);
          }}
          classNames={{
            labelWrapper: "mb-2",
            label: "text-lg font-medium text-foreground mb-2",
            value: "",
            base: " w-4/5",
          }}
        />
      </div>
    </section>
  );
}

export default memo(FileTypeConfig);
