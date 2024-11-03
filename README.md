# 🤖 Claude CLI

> An elegant interactive CLI for Anthropic's Claude API, built with TypeScript and Bun.js

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## 📚 Table of Contents

<details>
<summary>Click to expand</summary>

- [Features](#-features)
- [Installation](#-installation)
- [Usage](#-usage)
  - [Basic Commands](#basic-commands)
  - [Templates](#templates)
  - [Session Management](#session-management)
- [Configuration](#-configuration)
- [Examples](#-examples)
- [Development](#-development)
- [Contributing](#-contributing)
- [License](#-license)

</details>

## ✨ Features

- 🎯 Interactive chat sessions with Claude
- 📝 Smart code detection and file saving
- 🎨 Beautiful console interface with syntax highlighting
- 💾 Auto-save and session replay
- 🔄 Rate limiting and error handling
- 📦 Template support for common use cases
- 🧪 Dry-run mode for testing
- 🔍 Type-safe configuration with Zod

## 🚀 Installation

```bash
# Using bun
bun install -g claude-cli

# Using npm
npm install -g claude-cli
```

## 🎮 Usage

### Basic Commands

```bash
# Start a new chat session
claude-cli chat

# Use a specific template
claude-cli chat --template rust

# Replay a previous session
claude-cli replay <session-id>

# Show help
claude-cli --help
```

### Templates

<details>
<summary>Available Templates</summary>

```typescript twoslash
// @filename: templates.ts
const templates = {
  rust: {
    name: 'Rust Expert',
    description: 'Expert Rust development assistance',
    systemPrompt: `You are an expert Rust developer...`
  },
  typescript: {
    name: 'TypeScript Expert',
    description: 'Expert TypeScript development assistance',
    systemPrompt: `You are an expert TypeScript developer...`
  }
}
```

</details>

### Session Management

Sessions are automatically saved in `.claude-sessions` directory as YAML files:

```yaml
id: abc123
startTime: 1234567890
messages:
  - role: user
    content: Hello
    timestamp: 1234567890
  - role: assistant
    content: Hi! How can I help you today?
    timestamp: 1234567891
codeBlocks:
  - filename: example.rs
    language: rust
    content: |
      fn main() {
          println!("Hello, world!");
      }
```

## ⚙️ Configuration

Create a `.claude-cli.config.ts` file in your project root:

```typescript twoslash
// @filename: config.ts
export default {
  templates: {
    // Custom templates
    myTemplate: {
      name: 'My Template',
      description: 'Custom template',
      systemPrompt: 'Your system prompt here',
    }
  },
  defaults: {
    outputDir: './output',
    model: 'claude-2',
    autoSave: true,
    sessionDir: './.claude-sessions',
  }
}
```

## 📝 Examples

<details>
<summary>Basic Chat Session</summary>

```bash
$ claude-cli chat
🤖 Welcome to Claude CLI!
💭 Your message: Help me write a Rust function to calculate Fibonacci numbers

┌─────────────────────────────────────────────────────
│ Claude:
│ I'll help you create an efficient Rust function for calculating Fibonacci numbers.
│ Here's an implementation using dynamic programming:
│
│ 📄 fib.rs
│ fn fibonacci(n: u64) -> u64 {
│     if n <= 1 {
│         return n;
│     }
│
│     let mut a = 0;
│     let mut b = 1;
│
│     for _ in 2..=n {
│         let temp = a + b;
│         a = b;
│         b = temp;
│     }
│
│     b
│ }
│
│ Would you like me to save this file?
└─────────────────────────────────────────────────────
```

</details>

<details>
<summary>Using Templates</summary>

```bash
$ claude-cli chat --template rust
🤖 Rust Expert Mode Activated!
💭 Your message: How do I read a large JSON file efficiently?
...
```

</details>

## 🛠️ Development

```bash
# Clone the repository
git clone https://github.com/yourusername/claude-cli.git

# Install dependencies
bun install

# Build
bun run build

# Run tests
bun test

# Run locally
bun run dev
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

MIT License - see the [LICENSE](LICENSE) file for details

---

<div align="center">
  Made with ❤️ using Bun.js and TypeScript
</div>
