type ErrorResponse = {
  error: {
    message: string;
  };
};

type MessageBody = {
  textContent: string;
  sendDate: Date;
  sender: string | undefined;
  // imageContent: (Blob | Uint8Array | ArrayBuffer)[];
  imageContent: (string | StaticImport)[];
  replyTo: {
    sender: string;
    textContent?: string;
    imageContent?: string[];
  };
};
