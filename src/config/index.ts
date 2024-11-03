// src/config/index.ts
import { createConfig } from 'c12';
import { ConfigSchema } from '../schemas/config';
import { defaultConfig } from './defaults';

export async function loadConfig() {
  const { config } = await createConfig({
    name: 'claude-cli',
    defaults: defaultConfig,
    schema: ConfigSchema,
  });

  return config;
}
