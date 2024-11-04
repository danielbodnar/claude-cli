// src/core/anthropic.ts
import Anthropic from "@anthropic-ai/sdk";
import {  } from "h3";
import { consola } from "consola";

const rateLimiter = rateLimit({
  window: "1m",
  max: 20,
});

export class AnthropicClient {
  private client: Anthropic;

  constructor(apiKey: string) {
    this.client = new Anthropic({
      apiKey,
    });
  }

  async chat(messages: Message[], model: string = "claude-2") {
    await rateLimiter();

    try {
      const response = await this.client.messages.create({
        model,
        messages: messages.map((m) => ({
          role: m.role,
          content: m.content,
        })),
      });

      return response;
    } catch (error) {
      consola.error("Error calling Anthropic API:", error);
      throw error;
    }
  }
}
