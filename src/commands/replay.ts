// src/commands/replay.ts
export default defineCommand({
  meta: {
    name: "replay",
    description: "Replay a previous session",
  },

  args: {
    session: {
      type: "string",
      description: "Session ID to replay",
      required: true,
    },
  },

  async run({ args }) {
    const config = await loadConfig();
    const sessionManager = new SessionManager(config.defaults.sessionDir);

    try {
      const session = await sessionManager.loadSession(args.session);
      // Replay session messages
      for (const message of session.messages) {
        if (message.role === "user") {
          console.log("\n💭 User:", message.content);
        } else if (message.role === "assistant") {
          console.log("\n🤖 Claude:", message.content);
        }
      }
    } catch (error) {
      consola.error(`Failed to replay session: ${error.message}`);
    }
  },
});
