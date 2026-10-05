# PIVOT_SPRING

[← Examples](../README.md) · [Full research session](https://www.whalerider.org/sessions/pivot-spring)

This example follows the published WhaleRider session from user-defined rules through linked definitions, historical simulation, and analysis.

## Research rules and assumptions

The hypothesis combines financial strength with a staged break and recovery around standard S2 pivots:

1. Restrict the universe to common stocks with point-in-time NASDAQ-100 membership.
2. Require operating profit margin above 15% and operating cash flow to sales above 10%.
3. Start a setup when the daily low is above the standard monthly S2 pivot.
4. Wait for the daily low to move below monthly S2.
5. Enter after the daily close recovers above weekly S2 while the financial conditions remain true.
6. Use daily 14-period ATR controls: a 3 ATR stop and a 1.5 ATR take-profit distance. Close a remaining position after 30 calendar days.

The risk policy caps one position at 30% of current equity, sets a minimum position value of 1%, and uses a 3% position-risk budget. The published simulation starts with $100,000 and omits margin and financing configuration.

## Definition files

| File | How to use it |
| --- | --- |
| [Trade plan](pivot-spring.trade-plan.yaml) | Inspect or compile locally. |
| [Risk policy](pivot-spring.risk-policy.yaml) | Inspect the sizing assumptions or compile locally. |
| [Strategy](pivot-spring.strategy.yaml) | Replace both deployment-ID placeholders before compiling. |
| [Simulation](pivot-spring.simulation.yaml) | Replace the strategy-ID placeholder; review the period and starting cash. |

The strategy and simulation templates use your own workspace's deployed IDs. See the [deployment walkthrough](../../docs/developer-tools.md#compile-and-deploy-in-order). The example files preserve the published rule logic; replacing IDs does not promise that a new run will reproduce historical results exactly.

## Recorded historical result

| Metric | Published value |
| --- | --- |
| Universe | Point-in-time NASDAQ-100 common stocks |
| Period | 2016-01-01 through 2025-12-31 |
| Starting cash | $100,000 |
| Ending equity | $864,077.73 |
| Total return | 764.08% |
| CAGR | 24.07% |
| Maximum drawdown | 28.03% |
| Completed trades | 944 |
| Sharpe ratio | 1.20 |
| Sortino ratio | 1.81 |
| Profit factor | 1.454 |

Values are transcribed from the [published session](https://www.whalerider.org/sessions/pivot-spring), checked against the website source on October 5, 2026. They describe that recorded run, rather than a newly executed simulation.

## Annual returns

[Download the recorded annual values](annual-returns.csv). These rounded values are retained as reported; compounding rounded annual returns may differ from the full-precision total.

| Year | Return |
| --- | --- |
| 2016 | +23.35% |
| 2017 | +8.89% |
| 2018 | -17.02% |
| 2019 | +38.04% |
| 2020 | +87.57% |
| 2021 | +60.54% |
| 2022 | -10.47% |
| 2023 | +66.87% |
| 2024 | +11.98% |
| 2025 | +11.47% |

## Provenance

| Recorded artifact | ID |
| --- | --- |
| Trade plan | `6ab230c83b7850e53b6732f5` |
| Risk policy | `6ab231393b7850e53b6732f6` |
| Strategy | `6ab231573b7850e53b6732f7` |
| Simulation definition | `6ab231873b7850e53b6732f8` |
| Simulation run | `6ab234d13b7850e53b6732f9` |

These public session identifiers document the source. Use IDs from your own workspace to compose and run the templates.

Historical and simulated results do not guarantee future results. This is a research example, not an investment recommendation. [Product scope](../../README.md#help-and-contact).
