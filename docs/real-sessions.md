# Real research sessions

[← WhaleRider](../README.md) · [Browse complete sessions](https://www.whalerider.org/sessions)

The website publishes research conversations that connect natural-language requests to generated definitions, completed historical simulations, and result-level questions. This repository provides downloadable definitions and recorded annual values for the two featured sessions.

## PIVOT_SPRING

A user-defined NASDAQ-100 hypothesis combines financial strength with a staged recovery from standard S2 support. The session demonstrates sequential criteria, multiple data domains, reusable position limits, and a simulation from January 2016 through June 2026.

The published run reports a **2,239.39% total return**, **35.03% CAGR**, **23.91% maximum drawdown**, and **1,135 completed trades** from January 1, 2016 through June 30, 2026. Ending realized account value is **$2,339,391.78** from $100,000 starting cash. Account value and returns exclude open-position valuations. The conversation continues into annual and monthly returns, the equity curve, and completed trades. The 2026 annual return of **2.47%** covers only January–June.

[Full conversation and analysis](https://www.whalerider.org/sessions/pivot-spring) · [Definitions, assumptions, and provenance](../examples/pivot-spring/README.md) · [Annual-return data](../examples/pivot-spring/annual-returns.csv)

## WEAK_IBS

A smaller SPY hypothesis enters when daily internal bar strength is below 0.1 and exits above 0.8. It demonstrates a derived indicator, direct signals, simple composition, and a twenty-year simulation.

The published run reports a **480.67% total return**, **14.80% maximum drawdown**, and **389 completed trades** for 2006–2025.

[Full conversation and analysis](https://www.whalerider.org/sessions/weak-ibs) · [Definitions, assumptions, and provenance](../examples/weak-ibs/README.md) · [Annual-return data](../examples/weak-ibs/annual-returns.csv)

## Reading the evidence

Pivot Spring values and definitions were checked against the live website's recorded session on October 18, 2026; its [source snapshot](../examples/pivot-spring/recorded-results.json) preserves the summary and annual-return payloads. The Weak IBS example retains its earlier October 5, 2026 snapshot. The records identify the original run IDs; no fresh simulation was run to produce these summaries.

The featured README chart plots the recorded Pivot Spring annual returns and marks the partial 2026 period explicitly; values are retained as reported. Its headline metrics are the published full-run values. The repository does not infer weekly observations or reconstruct trade history from annual values.

When adapting a session, review the universe, indicators, data timing, historical period, position assumptions, and simulated fill model. Keep the definition and run IDs with any new results so the analysis can be traced to its inputs.

Historical and simulated results do not guarantee future results. WhaleRider provides software for user-directed research and historical simulation. See the [product documentation](https://www.whalerider.org/docs) for the complete model.
