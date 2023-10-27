import { ClientMessage } from "@/types/models";

interface MessageProps extends ClientMessage {
  chatID: string;
  inTransit?: boolean;
  uploadProgress?: number;
}
