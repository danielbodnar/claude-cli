// src/core/session.ts
import { dump, load } from "js-yaml";
import { ensureDir, writeFile, readFile } from "fs-extra";
import { pathe } from "pathe";
import type { Session } from "../types";
import consola from "consola";

export class SessionManager {
  constructor(private sessionDir: string) {}

  async saveSession(session: Session) {
    await ensureDir(this.sessionDir);
    const filename = `${session.id}.yaml`;
    const path = pathe.join(this.sessionDir, filename);

    const yaml = dump(session, {
      noRefs: true,
      sortKeys: true,
    });

    await writeFile(path, yaml);
    consola.info(`Session saved: ${filename}`);
  }

  async loadSession(id: string): Promise<Session> {
    const path = pathe.join(this.sessionDir, `${id}.yaml`);
    const content = await readFile(path, "utf-8");
    return load(content) as Session;
  }
}
