# Reporting and internal pagination

| Prompt operation | Inputs | Defaults |
| --- | --- | --- |
| `get_simulation_summary` | run | Overall completed-run results |
| `get_simulation_performance` | run, optional interval/count | `YEARLY` |
| `list_simulation_trades` | run, optional count | Useful initial selection |
| `list_candles` | ticker, from, to, optional interval/count | `DAY` |

Supported performance intervals: `DAILY`, `WEEKLY`, `MONTHLY`, `YEARLY`, `FULL`. Map `run` to the tool's `simulationRunId`. `count` is the total number the user wants, not a page size. If absent, show a useful overview and explain that more can be requested.

Use `skip=0`, `take=0` for the server's initial bounded default. Continue with returned `nextSkip` and effective `take`, preserving run, interval, and range. Stop on satisfied scope or `hasMore=false`. Fetch all pages when needed for a full-range report or analysis. For visual chart requests, use the MCP charting tools as described in [charting.md](charting.md); they manage their own retrieval. Reuse already retrieved but undisplayed records when asked for more. Clearly disclose partial results; avoid exposing pagination mechanics unless requested.

For candle inputs, `from` is inclusive and `to` exclusive, in UTC. Map `to` to `occurAt`, `fromTimeAgo = to - from`, `toTimeAgo = 00:00:00`, in the duration representation accepted by the tool. Example intervals include `DAY` and `ONE_HOUR`; use the live enum/schema. Preserve the same range on later pages.

Prefer MCP `structuredContent` over parsing text and preserve reported numeric observations. Raw-data files are not required to answer report requests. If only text is available, extract the report JSON without rewriting values.
