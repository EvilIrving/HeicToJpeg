export type userFile = {
  // uuid: string
  name: string;
  size: string;
  url?: string;
  file: File;
  isConverted: boolean;
  convertedFile?: File;
  convertedSize?: string;
  progress: number;
};

import type { PropsWithChildren } from "react";

declare module "react" {
  export type FCC<P = object> = FC<PropsWithChildren<P>>;
}
