export interface FontWorkerPayload {
  초성1: ImageBitmap;
  초성2: ImageBitmap;
  중성: ImageBitmap;
  종성: ImageBitmap;
  영어특수문자: ImageBitmap;
}

export type FontWorkerMessage =
  | FontWorkerSuccessMessage
  | FontWorkerFailMessage
  | FontWorkerPendingMessage;

export interface FontWorkerSuccessMessage {
  type: "font";
  success: true;
  arrayBuffer: ArrayBuffer;
}

export interface FontWorkerFailMessage {
  type: "font";
  success: false;
  errorMessage: string;
}

export interface FontWorkerPendingMessage {
  type: "ping";
  message?: string;
}
