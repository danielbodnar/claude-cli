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
import chat from "./commands/chat";
import replay from "./commands/replay";

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
