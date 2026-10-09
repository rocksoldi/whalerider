# Plugins

WhaleRider is published to two directories. Each package is self-contained, because a directory
imports only the files inside its own folder.

| Folder | Directory | Manifest | MCP config |
| --- | --- | --- | --- |
| `claude/` | Claude | `.claude-plugin/plugin.json` | `.mcp.json` |
| `openai/` | ChatGPT | `plugin.json` | `mcp.json` |
| `shared/` | both | source of truth for the icon and LICENSE | n/a |

Both packages point at the same server, `https://mcp.whalerider.org`, and contain no skills.

## Keeping them in sync

Copies of the shared files live inside each package. When `shared/` changes, copy it over:

- `shared/icon.png` to `claude/.claude-plugin/icon.png`, `claude/assets/whalerider-icon.png`, `openai/assets/icon.png` and `openai/assets/logo.png`
- `shared/icon.svg` to `claude/assets/whalerider-icon.svg`
- `shared/LICENSE` to `claude/LICENSE`

## Packaging the OpenAI plugin

Zip the contents of `openai/` so that `plugin.json` sits at the ZIP root, then upload it at
https://platform.openai.com/plugins. Keep the ZIP outside the repository.
