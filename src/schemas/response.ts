const CodeBlockSchema = z.object({
  filename: z.string(),
  language: z.string(),
  content: z.string(),
  path: z.string().optional(),
});

const ClaudeResponseSchema = z.object({
  message: z.string(),
  codeBlocks: z.array(CodeBlockSchema),
  metadata: z.record(z.unknown()),
});
