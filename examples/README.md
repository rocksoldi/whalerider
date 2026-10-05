# Research examples

[← WhaleRider](../README.md) · [Real Sessions on the website](https://www.whalerider.org/sessions)

These examples come from the two research sessions featured on the current website. Start with WEAK_IBS for a small, direct rule set; explore PIVOT_SPRING for sequential criteria and financial data.

| Example | Universe | What to inspect |
| --- | --- | --- |
| [WEAK_IBS](weak-ibs/README.md) | SPY | Daily price measurements, a derived IBS indicator, direct entry and exit rules. |
| [PIVOT_SPRING](pivot-spring/README.md) | Point-in-time NASDAQ-100 common stocks | Financial ratios, weekly and monthly pivots, staged criteria, and ATR controls. |

Each directory contains a trade plan, risk policy, strategy template, simulation template, and recorded annual-return data. The accompanying notes explain assumptions and identify the published source run.

## Use the definitions

Trade plans and risk policies can be compiled locally without an access profile. Strategy and simulation templates contain explicit deployment-ID placeholders; replace them with IDs returned by deploying the preceding artifacts in your own workspace.

Follow [CLI and VS Code](../docs/developer-tools.md) for the full deployment order, or ask your connected AI to recreate and validate the definitions from the published session.

Historical results are evidence of the recorded runs. A fresh simulation uses the data and runtime available when it is run; these examples do not promise identical results or future performance.
