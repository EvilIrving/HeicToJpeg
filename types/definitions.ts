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


import type { FC, PropsWithChildren } from 'react';

declare module 'react' {
	export type FCC<P = {}> = FC<PropsWithChildren<P>>;
}
