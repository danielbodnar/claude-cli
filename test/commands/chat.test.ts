// src/test/commands/chat.test.ts
import { describe, test, expect, vi, beforeEach } from "vitest";
import chat from "../../commands/chat";
import { loadConfig } from "../../config";
import { ConversationManager } from "../../core/conversation";

vi.mock("../../config");
vi.mock("../../core/conversation");

describe("chat command", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  test("should initialize conversation with correct config", async () => {
    const mockConfig = {
      templates: {},
      defaults: {
        outputDir: "default-dir",
        sessionDir: "sessions",
      },
    };

    (loadConfig as any).mockResolvedValue(mockConfig);

    await chat.run({ args: {} });

    expect(ConversationManager).toHaveBeenCalledWith(
      process.env.ANTHROPIC_API_KEY,
      expect.objectContaining({
        defaults: expect.objectContaining({
          outputDir: "default-dir",
          dryRun: false,
        }),
      }),
    );
  });

  test("should error on invalid template", async () => {
    const mockConfig = {
      templates: {},
      defaults: {},
    };

    (loadConfig as any).mockResolvedValue(mockConfig);
    const mockExit = vi
      .spyOn(process, "exit")
      .mockImplementation(() => undefined as never);

    await chat.run({ args: { template: "non-existent" } });

    expect(mockExit).toHaveBeenCalledWith(1);
  });
});
