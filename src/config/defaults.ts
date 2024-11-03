// src/config/defaults.ts
export const defaultConfig = {
  templates: {
    rust: {
      name: 'Rust Expert',
      description: 'Expert Rust development assistance',
      systemPrompt: `You are an expert Rust developer. 
Always structure your responses as JSON with the following format:
{
  "message": "Your detailed explanation here",
  "codeBlocks": [
    {
      "filename": "example.rs",
      "language": "rust",
      "content": "// Your code here"
    }
  ]
}`,
    },
    typescript: {
      name: 'TypeScript Expert',
      description: 'Expert TypeScript development assistance',
      systemPrompt: `You are an expert TypeScript developer...`,
    },
  },
  defaults: {
    outputDir: './output',
    model: 'claude-2',
    autoSave: true,
    sessionDir: './.claude-sessions',
  },
};

