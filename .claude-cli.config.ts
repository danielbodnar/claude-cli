// @filename: config.ts
export default {
  templates: {
    // Custom templates
    myTemplate: {
      name: "My Template",
      description: "Custom template",
      systemPrompt: "Your system prompt here",
    },
  },
  defaults: {
    outputDir: "./output",
    model: "claude-2",
    autoSave: true,
    sessionDir: "./.claude-sessions",
  },
};
