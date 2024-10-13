"use client";
import { Button, ButtonGroup } from "@nextui-org/button";
import { Slider } from "@nextui-org/slider";

export default function FileTypeConfig({
  format,
  quality,
  setFormat,
  setQualityValue,
}: {
  format: string;
  quality: number;
  setFormat: (format: string) => void;
  setQualityValue: (quality: number) => void;
}) {
  function toggleFormat(convertFormat: string) {
    setFormat(convertFormat);
  }

  function slideQuality(quality: number) {
    setQualityValue(quality);
  }
  return (
    <section className="py-4">
      <div>
        <div>
          <label
            htmlFor="format-btn"
            className="mb-2 block text-lg font-medium text-gray-700"
          >
            Convert to
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
          label="Quality"
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
            label: "text-lg font-medium text-gray-700 mb-2",
            value: "",
            base: " w-4/5",
          }}
        />
      </div>
    </section>
  );
}
