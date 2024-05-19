'use client'

import clsx from 'clsx'
import { useState } from 'react'

export default function Upload({ onHandleFiles }: { onHandleFiles: (files: FileList | null) => void }) {
  const [isDragging, setIsDragging] = useState(false)
  const handleDrop = (event: any) => {
    event.preventDefault()
    setIsDragging(false)
    const files = event.dataTransfer.files
    getUserFiles(files)
  }

  const handleFileSelect = (event: any) => {
    const files = event.target.files
    getUserFiles(files)
  }

  const getUserFiles = (files: FileList | null) => {
    onHandleFiles(files)
  }

  const handleDragOver = (event: any) => {
    event.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  return (
    <div>
      <label
        htmlFor="upload-btn"
        className={clsx('flex w-full cursor-pointer appearance-none items-center justify-center rounded-xl border-2 border-dashed border-gray-200 px-6 py-10 transition-all hover:border-primary-300', {
          'border-primary-300': isDragging,
        })}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
      >
        <div className="space-y-1 text-center">
          <div className="mx-auto inline-flex h-10 w-10 items-center justify-center rounded-full bg-gray-100">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="h-6 w-6 text-gray-500"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"
              />
            </svg>
          </div>
          <div className="text-gray-600">
            <span className="font-medium text-primary-500 hover:text-primary-700">Click to upload</span> or drag and drop
          </div>
          <p className="text-sm text-gray-500">.heic / .heif</p>
          <p className="text-sm text-gray-500">Unlimited uploads, but it is recommended not to exceed 100 files.</p>
        </div>
        <input
          id="upload-btn"
          type="file"
          accept=".heic,.heif"
          className="sr-only"
          multiple
          onChange={handleFileSelect}
        />
      </label>
    </div>
  )
}
