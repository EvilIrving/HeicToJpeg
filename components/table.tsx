'use client'
import { userFile } from '@/types/definitions'
import { useState } from 'react'

export default function Table({ isConverted, files, clear, downloads, download }: { isConverted: boolean; files: userFile[]; clear: () => void; downloads: () => void; download: (file: userFile) => void }) {
  function clearImages() {
    clear()
  }
  function downloadImages() {
    downloads()
  }
  function downloadImage(file: userFile) {
    download(file)
  }
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentItems = files.slice(indexOfFirstItem, indexOfLastItem)

  const totalPages = Math.ceil(files.length / itemsPerPage)

  function prev() {
    setCurrentPage((prevPage) => prevPage - 1)
  }

  function next() {
    setCurrentPage((prevPage) => prevPage + 1)
  }
  return (
    <div className="overflow-x-auto">
      <div className="sm:flex sm:items-center sm:justify-between">
        <h2 className="text-lg font-medium text-gray-800 dark:text-white">Photos uploaded ({files.length} files)</h2>

        <div className="flex items-center mb-2 gap-x-3">
          <button
            type="submit"
            className="btn"
            onClick={() => {
              clearImages()
            }}
          >
            Clear All
          </button>
          <button
            disabled={!isConverted}
            type="submit"
            className="btn"
            onClick={() => {
              downloadImages()
            }}
          >
            Download All
          </button>
        </div>
      </div>

      <table className="table">
        {/* head */}
        <thead>
          <tr>
            {/* TODO 预览 */}
            <th>Name</th>
            <th>Size</th>
            <th>Converted Size</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((file, index) => {
            return (
              <tr key={file.name}>
                <th>
                  <div className="text-sm">{file.name}</div>
                </th>
                <td>
                  <span>{file.size}</span>
                </td>
                <td>
                  {/* TODO 改为进度条 */}
                  <span>{`${file.isConverted ? file.convertedSize : '/'}`} </span>
                </td>
                <th>
                  {file.isConverted ? (
                    <>
                      <button
                        className="btn btn-ghost btn-xs"
                        onClick={() => downloadImage(file)}
                      >
                        download
                      </button>
                    </>
                  ) : (
                    <>
                      <span>/</span>
                    </>
                  )}
                </th>
              </tr>
            )
          })}
        </tbody>
      </table>
      <div className="join grid grid-cols-2 mt-2 max-w-sm">
        <button
          className="join-item btn"
          disabled={currentPage === 1}
          onClick={prev}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-5 h-5 rtl:-scale-x-100"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18"
            />
          </svg>
          Previous
        </button>
        <button
          className="join-item btn"
          disabled={currentPage === totalPages}
          onClick={next}
        >
          Next
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-5 h-5 rtl:-scale-x-100"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
            />
          </svg>
        </button>
      </div>
    </div>
  )

  function table() {
    function prev() {}
    function next() {}

    return <table></table>
  }
}
