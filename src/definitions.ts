export type userFile = {
  id: string;
  name: string;
  size: string;
  url?: string;
  file: File;
  isConverted: boolean;
  convertedFile?: File;
  convertedSize?: string;
  progress: number;
  error?: string;
};

import type { PropsWithChildren } from "react";

declare module "react" {
  export type FCC<P = object> = FC<PropsWithChildren<P>>;
}
