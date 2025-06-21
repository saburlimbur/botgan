import type React from 'react';

interface ChatMessageProps {
  content: string;
  sender: 'user' | 'gemini';
  timestamp: string;
  onCopy: () => void;
}

interface ChatInputProps {
  input: string;
  onChange: (val: string) => void;
  onSubmit: () => void;
  onKeyPress: (e: React.KeyboardEvent) => void;
  disabled: boolean;
}

interface MessageProps {
  id: string;
  content: string;
  timestamp: string;
  isBot?: boolean;
  sender: 'user' | 'gemini';
}

export type { ChatMessageProps, ChatInputProps, MessageProps };
