# Four composable research artifacts

[← WhaleRider](../README.md) · [Complete product reference](https://www.whalerider.org/docs)

WhaleRider preserves research rules as inspectable YAML definitions. Compilation validates a document and produces a fixed `.wr` artifact. Deployment returns the identifier used to compose the next layer.

```text
Trade plan ──┐
             ├── Strategy ── Simulation ── Run ── Analysis
Risk policy ─┘
```

| Artifact | File suffix | Defines |
| --- | --- | --- |
| Trade plan | `.trade-plan.yaml` | Universe, side, indicators, signals, entry and exit criteria, and position controls. |
| Risk policy | `.risk-policy.yaml` | Reusable per-position value limits and position-risk budget. |
| Strategy | `.strategy.yaml` | One deployed trade plan connected to one deployed risk policy. |
| Simulation | `.simulation.yaml` | One or more deployed strategies, starting cash, historical dates, and optional allocation and financing assumptions. |

## Trade plan

Indicators can read price bars, financial statements, ratios, company events, macro series, and other supported data domains. Signals give names to Boolean conditions. Criteria specify when a simulated position enters or exits.

Criteria can describe a sequence rather than a single test. For example, [PIVOT_SPRING](../examples/pivot-spring/README.md) starts a setup above monthly support, waits for a break below it, then requires recovery and continued financial strength. `NEXT` expresses that ordered process.

The [WEAK_IBS trade plan](../examples/weak-ibs/weak-ibs.trade-plan.yaml) is a smaller example with direct entry and exit signals.

## Risk policy

| Field | Meaning |
| --- | --- |
| `MAX_POSITION_VALUE_PCT` | Maximum value of one simulated position as a percentage of current account equity. |
| `MIN_POSITION_VALUE_PCT` | Minimum viable position value as a percentage of current account equity, when specified. |
| `MAX_POSITION_RISK_PCT` | Target loss budget for position sizing, as a percentage of current account equity. |

Position-risk limits are sizing assumptions, not guaranteed-loss limits. Simulated fill rules, gaps, slippage, and evaluation timing can affect the outcome. See the [risk and allocation reference](https://www.whalerider.org/docs#risk).

## Strategy

A strategy binds `TRADE_PLAN_ID` and `RISK_POLICY_ID` to the identifiers returned by deploying those artifacts in your workspace. Names alone do not establish the link.

The example strategy files contain explicit placeholders. Replace them with your own deployment IDs before compiling. Historical IDs from the website's sessions are provenance, not reusable references for another workspace.

## Simulation and run

A simulation definition sets `STRATEGIES`, `INITIAL_CASH`, `FROM`, and `TO`. Additional fields can model allocation and financing assumptions.

Creating the simulation definition and starting a run are separate operations. A **simulation ID** identifies the definition; a **simulation run ID** identifies an execution of that definition and is used to retrieve its status and performance.

Reuse the same definition for another run or revise the definitions to investigate a different hypothesis. Keep the period, inputs, and assumptions with the results so comparisons remain interpretable.

[Deployment walkthrough](developer-tools.md#compile-and-deploy-in-order) · [Example definitions](../examples/README.md)
