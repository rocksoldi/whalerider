# WEAK_IBS

[← Examples](../README.md) · [Full research session](https://www.whalerider.org/sessions/weak-ibs)

This example follows the published WhaleRider session from user-defined rules through linked definitions, historical simulation, and analysis.

## Research rules and assumptions

The hypothesis uses daily internal bar strength (IBS) on SPY:

```text
IBS = (Close - Low) / (High - Low + 0.0000001)
```

Enter when IBS is below 0.1. Exit when IBS is above 0.8, with an independent maximum holding period of 60 calendar days. The small denominator offset is preserved from the published definition.

The published risk policy sets both position value and position-risk budgets to 100% of equity. The simulation starts with $100,000 and omits margin and financing configuration. These settings reproduce the published research assumptions; choose and validate your own assumptions when adapting the example.

## Definition files

| File | How to use it |
| --- | --- |
| [Trade plan](weak-ibs.trade-plan.yaml) | Inspect or compile locally. |
| [Risk policy](weak-ibs.risk-policy.yaml) | Inspect the sizing assumptions or compile locally. |
| [Strategy](weak-ibs.strategy.yaml) | Replace both deployment-ID placeholders before compiling. |
| [Simulation](weak-ibs.simulation.yaml) | Replace the strategy-ID placeholder; review the period and starting cash. |

The strategy and simulation templates use your own workspace's deployed IDs. See the [deployment walkthrough](../../docs/developer-tools.md#compile-and-deploy-in-order). The example files preserve the published rule logic; replacing IDs does not promise that a new run will reproduce historical results exactly.

## Recorded historical result

| Metric | Published value |
| --- | --- |
| Universe | SPY |
| Period | 2006-01-01 through 2025-12-31 |
| Starting cash | $100,000 |
| Ending equity | $580,672.67 |
| Total return | 480.67% |
| CAGR | 9.19% |
| Maximum drawdown | 14.80% |
| Completed trades | 389 |
| Sharpe ratio | 0.88 |
| Sortino ratio | 1.41 |
| Profit factor | 1.95 |

Values are transcribed from the [published session](https://www.whalerider.org/sessions/weak-ibs), checked against the website source on October 5, 2026. They describe that recorded run, rather than a newly executed simulation.

## Annual returns

[Download the recorded annual values](annual-returns.csv). These rounded values are retained as reported; compounding rounded annual returns may differ from the full-precision total.

| Year | Return |
| --- | --- |
| 2006 | +13.78% |
| 2007 | +10.30% |
| 2008 | +25.29% |
| 2009 | +20.49% |
| 2010 | +7.77% |
| 2011 | -2.77% |
| 2012 | +1.36% |
| 2013 | +13.86% |
| 2014 | +3.27% |
| 2015 | +9.04% |
| 2016 | +13.69% |
| 2017 | +3.05% |
| 2018 | -12.53% |
| 2019 | +18.23% |
| 2020 | +25.07% |
| 2021 | +15.74% |
| 2022 | +4.28% |
| 2023 | +7.96% |
| 2024 | +2.10% |
| 2025 | +11.63% |

## Provenance

| Recorded artifact | ID |
| --- | --- |
| Trade plan | `6aae9c9331249edb825f66a9` |
| Risk policy | `6aae9cdb31249edb825f66aa` |
| Strategy | `6aae9d0b31249edb825f66ab` |
| Simulation definition | `6aae9d3631249edb825f66ac` |
| Simulation run | `6aae9d5431249edb825f66ad` |

These public session identifiers document the source. Use IDs from your own workspace to compose and run the templates.

Historical and simulated results do not guarantee future results. This is a research example, not an investment recommendation. [Product scope](../../README.md#help-and-contact).
