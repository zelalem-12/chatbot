import { KeyboardEvent, ChangeEvent } from "react";

export interface Message {
  source: string;
  message: string;
  timestamp: string;
}

export interface Messages {
  messages: Message[];
}

export interface MessageForm {
  message: string;
  onButtonSendMessage: () => void;
  onKeyEnterSendMessage: (event: KeyboardEvent<HTMLInputElement>) => void;
  onTypingMessage: (event: ChangeEvent<HTMLInputElement>) => void;
}

export interface Response {
  text: string;
}
