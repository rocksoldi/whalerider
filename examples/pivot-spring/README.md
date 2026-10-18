# PIVOT_SPRING

[← Examples](../README.md) · [Full research session](https://www.whalerider.org/sessions/pivot-spring)

This example follows the published WhaleRider session from user-defined rules through linked definitions, historical simulation, and analysis.

## Research rules and assumptions

The hypothesis combines financial strength with a staged break and recovery around standard S2 pivots:

1. Restrict the universe to common stocks with point-in-time NASDAQ-100 membership.
2. Require operating profit margin above 15% and operating cash flow to sales above 10%.
3. Start a setup when the daily low is above the standard monthly S2 pivot.
4. Wait for the daily low to move below monthly S2.
5. Enter after the daily close recovers above weekly S2 when both financial conditions qualify. Monthly and weekly pivots refresh at their respective calendar boundaries.
6. Use daily 14-period ATR controls: a 1.5 ATR stop, a 1.5 ATR take-profit distance, and maximum adverse entry slippage of 0.25 ATR. Close a remaining position after 30 calendar days.

The risk policy caps one position at 30% of current equity, sets a minimum position value of 1%, and uses a 3% position-risk budget. The published simulation starts with $100,000 and omits margin and financing configuration.

## Definition files

| File | How to use it |
| --- | --- |
| [Trade plan](pivot-spring.trade-plan.yaml) | Inspect or compile locally. |
| [Risk policy](pivot-spring.risk-policy.yaml) | Inspect the sizing assumptions or compile locally. |
| [Strategy](pivot-spring.strategy.yaml) | Uses the exact names of the included trade plan and risk policy. |
| [Simulation](pivot-spring.simulation.yaml) | Uses the included strategy name; review the period and starting cash. |

The strategy and simulation definitions use portable artifact names. Deploy their dependencies first. See the [deployment walkthrough](../../docs/developer-tools.md#compile-and-deploy-in-order). The example files preserve the published rule logic; using the same definitions does not promise that a new run will reproduce historical results exactly.

## Recorded historical result

| Metric | Published value |
| --- | --- |
| Universe | Point-in-time NASDAQ-100 common stocks |
| Period | 2016-01-01 through 2026-06-30, inclusive |
| Starting cash | $100,000 |
| Ending realized account value | $2,339,391.78 |
| Total return | 2,239.39% |
| CAGR | 35.03% |
| Maximum drawdown | 23.91% |
| Completed trades | 1,135 |
| Sharpe ratio | 1.46 |
| Sortino ratio | 2.54 |
| Profit factor | 1.53 |
| Win rate | 59.03% |
| Exposure | 89.24% |
| Exposure-adjusted CAGR | 39.25% |

Values are transcribed from the [published session](https://www.whalerider.org/sessions/pivot-spring), recorded October 15, 2026 and checked against the live website on October 18, 2026. The [source snapshot](recorded-results.json) retains the published summary and annual-return payloads. They describe that recorded run, rather than a newly executed simulation. Account value and returns reflect realized results and exclude open-position valuations.

## Annual returns

[Download the recorded annual values](annual-returns.csv). These rounded values are retained as reported; compounding rounded annual returns may differ from the full-precision total.

| Year | Return |
| --- | --- |
| 2016 | +45.82% |
| 2017 | +13.61% |
| 2018 | +3.48% |
| 2019 | +35.21% |
| 2020 | +69.95% |
| 2021 | +50.46% |
| 2022 | +27.69% |
| 2023 | +70.59% |
| 2024 | +2.84% |
| 2025 | +71.95% |
| 2026* | +2.47% |

*2026 is a partial year through June 30. July–December are outside the simulation period.

## Provenance

| Recorded artifact | ID |
| --- | --- |
| Trade plan | `6ad120896912b9e82ba86c11` |
| Risk policy | `6ad120ac6912b9e82ba86c12` |
| Strategy | `6ad120c86912b9e82ba86c13` |
| Simulation definition | `6ad120eb6912b9e82ba86c14` |
| Simulation run | `6ad121036912b9e82ba86c15` |

These public session identifiers document the source. The definitions compose through portable names. Start a run using the simulation ID returned by deployment in your workspace.

Historical and simulated results do not guarantee future results. This is a research example, not an investment recommendation. [Product scope](../../README.md#help-and-contact).
