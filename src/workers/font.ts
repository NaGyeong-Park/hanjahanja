/// <reference lib="webworker" />

import { generateFont } from "../core";
import {
  FontWorkerFailMessage,
  FontWorkerPayload,
  FontWorkerSuccessMessage,
} from "../types/worker";

self.onmessage = async (event: MessageEvent<FontWorkerPayload>) => {
  const templates = event.data;

  try {
    const fontArrayBuffer = (await generateFont(templates)).toArrayBuffer();
    const result: FontWorkerSuccessMessage = {
      type: "font",
      success: true,
      arrayBuffer: fontArrayBuffer,
    };

    self.postMessage(result, [fontArrayBuffer]);
  } catch (error) {
    let message: string | undefined;

    if (error instanceof Error) {
      message = error.message;
    } else if (error != null) {
      message = JSON.stringify(error);
    }

    const result: FontWorkerFailMessage = {
      type: "font",
      success: false,
      errorMessage: message ?? "Unknown error",
    };

    self.postMessage(result);
  }
};
