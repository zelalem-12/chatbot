export interface Message {
  sender: string;
  message: string;
  timestamp: string;
}

export interface Messages {
  messages: Message[];
}
