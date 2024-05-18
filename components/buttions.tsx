'use client'
export default function Buttons({ loading, convert, preview }: { loading: boolean, convert: () => void, preview: () => void }) {
    function convertCommand() {
        convert()
    }

    function previewCommand() {
        preview()
    }


    return (
        <section className="flex gap-4 py-4 mx-auto max-w-3xl">
            <button className="btn"
                onClick={() => { convertCommand() }}>
                {
                    loading ? <span className="loading loading-spinner"></span> : null
                }
                Convert
            </button>
            {/* <button
                type="submit"
                className="btn"
                onClick={() => { previewCommand() }}
            >
                Preview
            </button> */}
            {/* <button type="submit" className="btn">Download All</button> */}
        </section>
    )
}