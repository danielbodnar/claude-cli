// src/commands/chat.ts
import { defineCommand } from "citty";
import { loadConfig } from "../config";
import { ConversationManager } from "../core/conversation";

export default defineCommand({
  meta: {
    name: "chat",
    description: "Start a chat session with Claude",
  },

  args: {
    template: {
      type: "string",
      description: "Template to use",
      required: false,
    },
    output: {
      type: "string",
      description: "Output directory",
      required: false,
    },
    "dry-run": {
      type: "boolean",
      description: "Run without saving files",
      required: false,
    },
  },

  async run({ args }) {
    const config = await loadConfig();

    if (args.template && !config.templates[args.template]) {
      consola.error(`Template "${args.template}" not found`);
      process.exit(1);
    }

    const conversation = new ConversationManager(
      process.env.ANTHROPIC_API_KEY!,
      {
        ...config,
        defaults: {
          ...config.defaults,
          outputDir: args.output || config.defaults.outputDir,
          dryRun: args["dry-run"] || false,
        },
      },
    );

    await conversation.start();
  },
});
