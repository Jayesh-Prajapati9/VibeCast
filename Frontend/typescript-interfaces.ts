// src/types/index.ts - TypeScript Interfaces and Types
export interface MessageData {
  sender?: string;
  text: string;
  time?: Date;
  isSelf?: boolean;
  isSystem?: boolean;
}

export interface CreateRoomModalProps {
  roomId: string;
  onClose: () => void;
  onEnterRoom: () => void;
}

export interface MessageProps {
  message: MessageData;
}
