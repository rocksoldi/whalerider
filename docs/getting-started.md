# Connect WhaleRider

[← WhaleRider](../README.md) · [Website connection flow](https://www.whalerider.org/account/api)

WhaleRider works through an MCP connection inside your preferred AI client. Use it to create your own research definitions, run historical simulations, and analyze the resulting data.

## 1. Get your workspace access key

Open [Connect WhaleRider](https://www.whalerider.org/account/api). Follow the workspace enrollment, payment, and email-verification flow shown there. Save your admin access key when it is revealed; it is shown once.

The [Pricing page](https://www.whalerider.org/pricing) is the source for current pricing and availability. If enrollment is not open, follow the status shown on the Connect page.

Already have a workspace? Use your existing key. The same page provides **Recover access key**; recovery replaces the previous key.

## 2. Add the MCP connection

In an AI client that supports remote MCP servers, add a connection named **WhaleRider** with this server URL:

```text
https://mcp.whalerider.org
```

Complete the client's connection flow. When WhaleRider opens its authorization page, enter the admin access key to approve the connection. Keep the key in the authorization flow rather than a chat message or repository file.

Client menus and remote MCP availability vary by product and plan. Follow the client's current MCP setup instructions and the [WhaleRider connection documentation](https://www.whalerider.org/docs#ai-connect).

## 3. Create your first research definition

Start with a small rule set that is easy to inspect. This prompt is from the published WEAK_IBS session:

> Create a trade plan named WEAK_IBS_TRADE_PLAN. Use a maximum holding period of 60 days and a universe containing only SPY. Enter when IBS is below 0.1 and exit when IBS is above 0.8.

Review the generated definition. It should identify the universe, daily price measurements, IBS calculation, entry and exit conditions, and holding limit. You can ask the AI to change any of those rules, or edit the YAML in VS Code.

## 4. Compose and run a simulation

A complete workflow uses four definitions:

1. **Trade plan:** the rules you just created.
2. **Risk policy:** your explicit position-value and risk assumptions.
3. **Strategy:** the deployed trade plan linked to its deployed risk policy.
4. **Simulation:** the strategy, historical period, and starting cash.

Specify your intended assumptions rather than allowing them to remain implicit. Ask WhaleRider to validate the definitions, run the simulation, and report when it reaches a terminal state.

The [WEAK_IBS session](https://www.whalerider.org/sessions/weak-ibs) shows all four definitions and the published historical run. Its assumptions are examples to inspect, not suggested allocations for your own research.

## 5. Continue into analysis

After the run completes, you can ask:

> Show the performance summary, including total return, maximum drawdown, and completed trades.

> Plot annual returns. Identify negative years and examine their simulated trades.

> Show a monthly returns heatmap and an equity curve. State the data frequency used for each chart.

> Show the first 100 simulated trades, then retrieve the next page.

Use the recorded run and its retrieved data as the basis for analysis. See [Real sessions](real-sessions.md) for worked examples, or [CLI and VS Code](developer-tools.md) for direct authoring and automation.

## Support

For workspace access or private account support, contact [whalerider@rocksoldi.com](mailto:whalerider@rocksoldi.com). Billing management is available through the subscription link in your Paddle receipt.
