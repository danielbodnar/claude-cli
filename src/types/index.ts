// src/types/index.ts
export interface Message {
  role: "user" | "assistant" | "system";
  content: string;
  timestamp: number;
}

export interface CodeBlock {
  filename: string;
  language: string;
  content: string;
  path?: string;
}

export interface Session {
  id: string;
  startTime: number;
  messages: Message[];
  codeBlocks: CodeBlock[];
  config: any;
}
