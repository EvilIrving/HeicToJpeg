export type userFile = {
  // uuid: string
  name: string
  size: string
  file: File
  isConverted: boolean
  convertedFile: File | null
  convertedSize: string | null
  progress: number
}
