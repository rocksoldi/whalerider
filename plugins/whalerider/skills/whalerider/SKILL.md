---
name: whalerider
description: Manage WhaleRider trading definitions, simulation runs, and reports through its MCP tools, and request styled charts through its MCP charting tools. Use for WhaleRider operations and charts, not general investment advice or unrelated charting.
---

# WhaleRider

Help the user get a useful result quickly, then iterate. Reuse supplied details and verified conversation context. Ask only for missing essentials or an ambiguous selection; collect related questions together. Keep internal IDs, schema mappings, and pagination out of the conversation unless needed to select a result or requested explicitly.

## Connection and routing

Use the authenticated WhaleRider MCP connection available in the client. Discover its current tool descriptions and schemas; server names and tool prefixes vary by installation. This skill does not configure credentials or connect itself. If the tools are unavailable, explain that the WhaleRider connector must be enabled; do not fabricate results.

The skill supports the operations in the prompt catalog. It works even when the client has no MCP prompt picker: choose the matching tools directly. Reading a prompt never executes an operation. Current tool schemas and returned validation instructions take precedence over the reference's parameter examples.

- Define, change, view, browse, or remove Trade Plans, Risk Policies, Strategies, and Simulations: read [references/artifacts.md](references/artifacts.md).
- Start, inspect, list, wait for, stop, or delete simulation runs: read [references/execution.md](references/execution.md).
- Summaries, performance, trades, and candles: read [references/reporting.md](references/reporting.md).
- Annual performance bars, monthly performance heatmaps, realized account-value curves, trade candlesticks, and summary cards: read [references/charting.md](references/charting.md) and call the matching MCP charting tool.

## Operating invariants

- Definition IDs and execution run IDs identify different things. Reuse exact returned IDs. Resolve names and types through lookup/list tools; ask for a selection if multiple exact matches remain.
- WhaleRider owns authoring, syntax, defaults, and validation. Delegate creation and changes to `create_artifact` and `repair_artifact`; do not invent YAML or silently create missing dependencies.
- Follow the user's authorized action without adding unnecessary confirmation. Browsing or charting does not authorize starting a run, changing a definition, stopping a run, deleting data, or uploading files.
- Base success and final status on returned results. Handle tool errors as errors. Correct a specific invalid argument when possible; avoid blind retrying a mutation after an unknown outcome—inspect the existing state first.
- Reports remain authoritative. Preserve metric definitions, missing observations, partial coverage, and reported prices. The MCP charting tools own data retrieval, calculations, and visual presentation.

## Charting through MCP

For a chart or visual summary request, call the matching MCP charting tool described in [references/charting.md](references/charting.md). Pass the verified run ID and the user's selection. Use the tool defaults when no metric, palette, or trade selection was supplied. Preserve the selected palette across follow-up requests.

Let the client display the tool's MCP App. Do not also generate HTML, images, SVG, or another chart, execute the bundled renderer, or fetch raw reports to recreate the visual. The chart tool retrieves the required data internally. Files and assets packaged with this skill are not a chart-generation workflow for the assistant.

After success, provide a brief interpretation only when useful. Do not claim the UI was visible unless confirmed, and do not invent an HTML link or claim the server saved a chart. If the client cannot display MCP Apps, explain that limitation and suggest opening the connected server in a supporting client. If the chart tool is missing or returns an error, explain the missing capability or returned error; do not substitute a locally generated chart.
