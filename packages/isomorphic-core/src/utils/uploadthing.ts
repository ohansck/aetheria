import {
  generateUploadButton,
  generateUploadDropzone,
  generateUploader,
} from "@uploadthing/react";
import { generateReactHelpers } from "@uploadthing/react/hooks";
import type { OurFileRouter } from "../../../../apps/isomorphic/src/app/api/uploadthing/core";

export const Uploader = generateUploader<OurFileRouter>();
export const UploadButton = generateUploadButton<OurFileRouter>();
export const UploadDropzone = generateUploadDropzone<OurFileRouter>();

export const { useUploadThing, uploadFiles } =
  generateReactHelpers<OurFileRouter>();
