import FaqItem from './faq'
export default function FAQ() {
  const features = [
    {
      title: 'Works Offline',
      description: 'Convert HEIC/HEIF images to PNG format without an internet connection.',
    },
    {
      title: 'Batch Conversion',
      description: 'Convert multiple HEIC/HEIF files at once and download them as a zip file.',
    },
    {
      title: 'Preserve Original Quality',
      description: 'Maintain the original size and quality of your files during the conversion process.',
    },
    {
      title: 'No Registration Required',
      description: 'Start converting your files instantly without the need for registration or personal information.',
    },
    {
      title: 'Preview before Download',
      description: 'Preview your files before downloading to ensure they meet your expectations.',
    },
  ]

  return (
    <div className="py-10 lg:py-12">
      <div className="max-w-2xl mx-auto text-center ">
        <h2 className="text-2xl font-bold md:text-3xl py-10 lg:py-14 md:leading-tight text-gray-800 dark:text-neutral-200">What I have</h2>
      </div>
      <div className="grid sm:grid-cols-2 gap-6 md:gap-12">
        {features.map((feature) => (
          <FaqItem
            key={feature.title}
            feature={feature}
          ></FaqItem>
        ))}
      </div>
    </div>
  )
}
