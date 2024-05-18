'use client'
import clsx from "clsx";
import { Slider } from '@nextui-org/react'
export default function Config({ format, quality, setFormat, setQualityValue }: { format: string, quality: number, setFormat: (format: string) => void, setQualityValue: (quality: number) => void }) {
    function toggleFormat(convertFormat: string) {
        setFormat(convertFormat)
    }

    function slideQuality(quality: number) {
        setQualityValue(quality)
    }
    return (
        <section className=" py-4 mx-auto max-w-3xl">
            <div className="mt-2">
                <label
                    htmlFor=""
                    className="block text-lg font-medium text-gray-700 mb-2"
                >
                    Convert to
                </label>
                <div className="flex w-full">
                    <button className={clsx(
                        "btn grid h-10 flex-grow rounded-box place-items-center",
                        {
                            "btn-active": format === "jpeg",
                        }
                    )}
                        onClick={() => { toggleFormat("jpeg") }}
                    >JPG</button>
                    <div className="divider divider-horizontal"></div>
                    <button className={clsx(
                        "btn grid h-10 flex-grow rounded-box place-items-center",
                        {
                            "btn-active": format === "png",
                        }
                    )} onClick={() => { toggleFormat("png") }}>PNG</button>
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
                    onChange={(value) => { slideQuality(value as number) }}
                    classNames={{
                        labelWrapper: "mb-2",
                        label: "text-lg font-medium text-gray-700 mb-2",
                        value: "",
                    }}
                />
            </div>
        </section>
    )
}
