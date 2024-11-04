// src/index.ts

/*

```bash
# Start a new chat
claude-cli chat

# Use a template
claude-cli chat --template rust

# Replay a session
claude-cli replay <session-id>
```

*/

import { defineCommand, runMain } from "citty";

import { loadConfig } from "./config";
import chat from "./commands/chat";
import replay from "./commands/replay";
import { ConversationManager } from "./core/conversation";

export default defineCommand({
  meta: {
    name: "claude-cli",
    description: "Interactive CLI for Anthropic's Claude API",
  },
  args: {
    template: {
      type: "string",
      description: "Template to use",
      required: false,
    },
    output: {
      type: "string",
      alias: "o",
      description: "Output directory",
      required: false,
    },
  },
  async run({ args }) {
    const config = await loadConfig();
    const conversation = new ConversationManager(
      process.env.ANTHROPIC_API_KEY!,
      config,
    );
    await conversation.start();
  },
});

const main = defineCommand({
  meta: {
    name: "claude-cli",
    version: "1.0.0",
    description: "Interactive CLI for Anthropic's Claude",
  },
  subCommands: {
    chat,
    replay,
  },
});

runMain(main);
