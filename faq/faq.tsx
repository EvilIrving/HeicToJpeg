export default function FaqPage({ feature }: { feature: { title: string, description: string } }) {
    return (
        <div >
            <h3 className="text-lg font-semibold text-gray-800 dark:text-neutral-200">
                {feature.title}
            </h3>
            <p className="mt-2 text-gray-600 dark:text-neutral-400">
                {feature.description}
            </p>
        </div>
    )
}