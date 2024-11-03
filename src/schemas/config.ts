// src/schemas/config.ts
import { z } from "zod";

export const ConfigSchema = z.object({
  templates: z.record(
    z.object({
      name: z.string(),
      description: z.string().optional(),
      systemPrompt: z.string(),
      userPrompt: z.string().optional(),
      outputDir: z.string().optional(),
      model: z.enum(["claude-2", "claude-instant"]).default("claude-2"),
      formatOptions: z
        .object({
          codeStyle: z.enum(["json", "markdown"]).default("json"),
          highlightTheme: z.string().default("github-dark"),
        })
        .optional(),
    }),
  ),
  defaults: z.object({
    outputDir: z.string().default("./output"),
    model: z.enum(["claude-2", "claude-instant"]).default("claude-2"),
    autoSave: z.boolean().default(true),
    sessionDir: z.string().default("./.claude-sessions"),
  }),
});
