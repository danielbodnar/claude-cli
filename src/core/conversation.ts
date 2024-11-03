// src/core/conversation.ts
import { intro, outro, text, confirm, spinner } from "@clack/prompts";
import { highlight } from "cli-highlight";
import { nanoid } from "nanoid";
import { AnthropicClient } from "./anthropic";
import { SessionManager } from "./session";

export class ConversationManager {
  private client: AnthropicClient;
  private session: Session;
  private sessionManager: SessionManager;

  constructor(apiKey: string, config: any) {
    this.client = new AnthropicClient(apiKey);
    this.session = {
      id: nanoid(),
      startTime: Date.now(),
      messages: [],
      codeBlocks: [],
      config,
    };
    this.sessionManager = new SessionManager(config.defaults.sessionDir);
  }

  async start() {
    intro("🤖 Claude CLI");

    while (true) {
      const userInput = await text({
        message: "💭 Your message:",
        placeholder: "Type your message or /quit to exit",
      });

      if (userInput === "/quit") {
        break;
      }

      const s = spinner();
      s.start("Thinking...");

      const response = await this.client.chat([
        ...this.session.messages,
        { role: "user", content: userInput, timestamp: Date.now() },
      ]);

      s.stop("Got response");

      // Parse and display response
      const parsedResponse = this.parseResponse(response.content);
      this.displayResponse(parsedResponse);

      // Handle code blocks
      if (parsedResponse.codeBlocks?.length) {
        await this.handleCodeBlocks(parsedResponse.codeBlocks);
      }

      // Auto-save session
      if (this.session.config.defaults.autoSave) {
        await this.sessionManager.saveSession(this.session);
      }
    }

    outro("Thanks for using Claude CLI! 👋");
  }

  private displayResponse(response: any) {
    console.log("\n");
    console.log("┌─────────────────────────────────────────────────────");
    console.log("│ Claude:");
    console.log("│");
    console.log("│", response.message.replace(/\n/g, "\n│ "));

    if (response.codeBlocks?.length) {
      response.codeBlocks.forEach((block: CodeBlock) => {
        console.log("│");
        console.log("│ 📄", block.filename);
        console.log(
          "│",
          highlight(block.content, { language: block.language }),
        );
      });
    }
    console.log("└─────────────────────────────────────────────────────\n");
  }

  private async handleCodeBlocks(blocks: CodeBlock[]) {
    for (const block of blocks) {
      const shouldSave = await confirm({
        message: `Save ${block.filename}?`,
        initialValue: true,
      });

      if (shouldSave) {
        await this.saveCodeBlock(block);
      }
    }
  }

  private async saveCodeBlock(block: CodeBlock) {
    const { outputDir } = this.session.config.defaults;
    const fullPath = pathe.join(outputDir, block.filename);

    if (await exists(fullPath)) {
      const newName = await text({
        message: `${block.filename} already exists. Enter new filename:`,
        placeholder: block.filename,
      });

      if (newName) {
        block.filename = newName;
      }
    }

    await writeFile(pathe.join(outputDir, block.filename), block.content);
    consola.success(`Saved ${block.filename}`);
  }
}
