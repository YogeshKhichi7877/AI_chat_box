// export interface Message {
//     id: string;
//     text: string;
//     isUser: boolean;
//     timestamp: Date;
//     type?: 'text' | 'code' | 'image' | 'pdf';
//     images?: string[];
//     codeResults?: CodeResult[];
//   }
  
//   export interface CodeResult {
//     type: 'text' | 'code' | 'output';
//     value: string;
//   }
  
//   export type ChatMode = 'text' | 'code' | 'image' | 'pdf';


export type ChatMode = 'text' | 'code' | 'pdf' | 'chat' | 'thinking' | 'structured';

export interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
  type: ChatMode;
  codeResults?: CodeResult[];
  structuredData?: any;
  thinkingProcess?: string;
}

export interface CodeResult {
  type: 'text' | 'code' | 'output';
  value: string;
}

export interface ChatHistory {
  role: 'user' | 'model';
  parts: { text: string }[];
}

export interface StructuredOutput {
  schema: any;
  data: any;
}

export interface ThinkingResponse {
  thinking: string;
  response: string;
}