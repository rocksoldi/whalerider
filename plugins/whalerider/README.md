# WhaleRider plugin for Claude

![WhaleRider](assets/whalerider-icon.png)

WhaleRider is software for user-directed research and historical simulation of systematic trading strategies. This plugin connects Claude to the WhaleRider service, so you can go from an idea to a finished simulation in one conversation.

## What you can do

- Describe a strategy in plain language and have it turned into validated trade plans, risk policies, strategies, and simulations.
- Start historical simulation runs and follow them to completion.
- Review summaries, performance, drawdowns, and simulated trades.
- Explore annual returns, monthly heatmaps, equity curves, and trade charts.

## What the plugin contains

- `.mcp.json` declares one remote MCP server, `https://mcp.whalerider.org`, over HTTPS. Nothing runs on your computer. The server provides the tools for definitions, simulation runs, reports, and charts.

The plugin contains no scripts, hooks, or bundled executables, and it sends data only to the WhaleRider server above.

## Getting started

1. Get workspace access at [whalerider.org/account/api](https://www.whalerider.org/account/api).
2. Install the plugin and approve the WhaleRider connection. You sign in on WhaleRider's own authorization page; never paste access keys into chat.
3. Ask, for example: "Create a trade plan for SPY that enters when IBS is below 0.1 and exits when it is above 0.8."

## Important notice

WhaleRider does not execute trades, place orders, provide investment recommendations, manage assets, or provide brokerage services. Historical and simulated results do not guarantee future results.

## Links

[Website](https://www.whalerider.org) · [Documentation](https://www.whalerider.org/docs) · [Real sessions](https://www.whalerider.org/sessions) · [Terms](https://www.whalerider.org/terms) · [Privacy](https://www.whalerider.org/privacy) · Support: whalerider@rocksoldi.com

WhaleRider © 2026 ROCKSOLDI LTD.
