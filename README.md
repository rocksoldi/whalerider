# WhaleRider

Deterministic runtime for algorithmic trading strategies.

Write strategies as declarative programs, compile them into executable artifacts, and execute them across simulation and live trading environments.

Strategies are not scripts.  
They are compiled.

![Trade Plan Criteria Demo](https://www.whalerider.org/Assets/trade-plan-criteria.gif)

WhaleRider turns trading logic into deterministic, reproducible execution:

- Define strategies as declarative YAML
- Compile into executable artifacts (.wr)
- Execute simulations with consistent, repeatable results

Designed for systematic traders, quant developers, and teams that require reproducibility, auditability, and control over strategy execution.

## Install Extension
1. Open **VS Code**
2. Go to Extensions (`Ctrl+Shift+X`)
3. Search **WhaleRider**
4. Click **Install**
## Install CLI
The CLI powers compilation, deployment, and execution.
### Windows (PowerShell)
```bash
irm https://cli.whalerider.org | iex
```
### Linux
```bash
curl -s https://cli.whalerider.org/install-wr.sh | tr -d '\r' | bash
```
### Verify
```bash
wr --version
```
## Compile (No Authentication Required)

You can compile strategies locally without an access key.
This allows you to validate and persist trading plans as executable artifacts (`.wr`) before deploying them.

```bash
wr compile --file <NAME>.<COMPONENT>.yaml
```
Where COMPONENT is one of: 
- trade-plan
- risk-policy
- strategy
- simulation
## Authentication

Platform operations such as deployment, simulation, and live execution require an access profile.

### Create a Profile

```bash
wr profile set --name <NAME> --access-key <YOUR_ACCESS_KEY>
```
### Activate the Profile
```bash
wr profile use --name <NAME>
```
This sets the active profile used by all subsequent commands.
### Platform Capabilities

Once active, you can proceed with the full workflow:

- deploy strategies  
- run simulations  
- retrieve trades  
- analyze performance
## Core Concepts
| Layer        | File Type                 | Purpose                   |
|--------------|--------------------------|---------------------------|
| Trade Plan   | `*.trade-plan.yaml`      | Trading logic             |
| Risk Policy  | `*.risk-policy.yaml`     | Account constraints       |
| Strategy     | `*.strategy.yaml`        | Composition               |
| Simulation   | `*.simulation.yaml`      | Execution context         |
## Example Strategy

Below is a minimal trend-following strategy using EMA crossover.

### Trade Plan
```yaml
NAME: BOUNCY
SIDE: LONG 
RISK:
  ATR_INTERVAL: DAY
  ATR_LOOKBACK: 14
  STOP_LOSS_ATR: 2
  TAKE_PROFIT_ATR: 4
  HOLDING_MAX_PERIOD: 14d
  ENTER_LIMIT_ATR: 0.5
SEGMENT:
  MARKET_INDICES:
    - SP500
INDICATORS:
  -
    NAME: EMA20
    DOMAIN: CANDLE
    INTERVAL: DAY
    MEASUREMENT: Close
    STEPS:
      -
        TYPE: SMA
        LOOKBACK: 20       
  -
    NAME: EMA50
    DOMAIN: CANDLE
    INTERVAL: DAY
    MEASUREMENT: Close
    STEPS:
      -
        TYPE: SMA
        LOOKBACK: 50
SIGNALS:
  -
    NAME: UP_TREND
    IS: EMA20 > EMA50
  -
    NAME: DOWN_TREND
    IS: EMA20 < EMA50           
CRITERIA:
  ENTER:
    IF: DOWN_TREND
    NEXT:
      -
        IF: UP_TREND
  EXIT:
    IF: DOWN_TREND       
```
### Risk Policy
```yaml
NAME: LOW_RISK
INITIAL_MARGIN_RATE: 0.5
MAINTENANCE_MARGIN_RATE: 0.25
MAX_COMMISSION_PCT: 0
MAX_INVESTMENT_PCT: 50
MAX_TRADE_RISK_PCT: 3
```
### Strategy (uses deployed IDs)
```yaml
NAME: MEDIUM-RISK-BOUNCY
RISK_POLICY_ID: <RISK_POLICY_ID>
TRADE_PLAN_ID: <TRADE_PLAN_ID>
```
### Simulation (uses deployed strategy ID)
```yaml
NAME: MEDIUM-RISK-BOUNCY
STRATEGY_ID: <STRATEGY_ID>
FROM: 2018-01-01
TO: 2025-01-01
INITIAL_CASH: 100000

```
## Auto completion

![Trade Plan Risk Demo](https://www.whalerider.org/Assets/trade-plan-risk.gif)

![Trade Plan Segment Demo](https://www.whalerider.org/Assets/trade-plan-segment.gif)

![Trade Plan Indicators Demo](https://www.whalerider.org/Assets/trade-plan-indicators.gif)

![Trade Plan Signals Demo](https://www.whalerider.org/Assets/trade-plan-signals.gif)

![Trade Plan Criteria Demo](https://www.whalerider.org/Assets/trade-plan-criteria.gif)
## Workflow

Install → Define strategy (YAML) → **Compile (.wr)** → **Deploy** → **Run** → **Observe**

### Compile (Local)
```bash
wr compile --file <NAME>.<COMPONENT>.yaml
```
### Deploy
```bash
wr deploy --file <NAME>.<COMPONENT>.wr
```
### Simulation
#### Run
```bash
wr simulation run --simulation-id <SIMULATION_ID>
```
#### Monitor
```bash
wr simulation-run get --simulation-run-id <RUN_ID>
```
#### Retrieve Trades
When a simulation runs, an internal broker account is created automatically.
```bash
wr broker-account config list

wr trade list --broker-account-id <BROKER_ACCOUNT_ID> --skip 0 --limit 3
```
##### Example Output
```text
trade_side  ticker  entered_at           enter_price  exited_at            exit_price  size
----------  ------  -------------------  -----------  -------------------  ----------  ----
LONG        DXCM    2018-01-05 14:30:00  13.14        2018-01-10 14:30:00  13.86       1969
LONG        AEP     2018-01-11 14:30:00  69.79        2018-02-06 14:30:00  65.31       726
LONG        XEL     2018-01-16 14:30:00  45.42        2018-02-06 14:30:00  42.89       1116
...
```
#### Performance Analysis
Aggregated performance metrics grouped by time interval.
```bash
wr simulation-run performance get
  --simulation-run-id   <RUN_ID>
  --from                <YYYY-MM-DD>
  --to                  <YYYY-MM-DD>
  --group-interval      <DAILY|WEEKLY|MONTHLY|YEARLY|ALL>  
  --table
```

##### Example Output

```text
period_start   trades  realized_profit  avg_trade_%  avg_time_in_position  win_rate_%  win_loss  wins  losses  exposure_%  max_dd_%  sharpe  sortino
-------------  ------  ----------------  ------------  --------------------  ----------  --------  ----  ------  ----------  --------  ------  -------
2018-01-01     199     -18,847.57        -0.49         17d                   69.85       1.17      139   60      231.7       51.7      -0.48   -0.63
2019-01-01     149      87,115.98         2.42         22d                   85.91       2.96      128   21      194.1       22.4       2.56    4.04
2020-01-01     163     -30,034.19        -0.80         13d                   74.85       1.53      122   41      105.3       79.4       0.01    0.01
2021-01-01     154     214,164.33         2.23         16d                   85.71       3.18      132   22      206.0       20.1       2.73    5.66
2022-01-01     217       2,448.73         0.03         20d                   71.89       1.35      156   61      197.2       49.7       0.24    0.39
2023-01-01     155     372,088.87         1.90         23d                   82.58       3.00      128   27      234.7       25.1       2.13    3.64
2024-01-01     183     444,569.01         1.03         18d                   74.86       1.50      137   46      238.0       32.7       0.89    1.29
```
**Key metrics:**
- `win_rate_%` – percentage of winning trades  
- `win_loss` – average win / average loss ratio  
- `exposure_%` – capital exposure (can exceed 100%)  
- `max_dd_%` – maximum drawdown  
- `sharpe` – risk-adjusted return  

### Live Execution

WhaleRider supports deploying strategies to a live execution environment backed by integrated brokerage infrastructure.

Compiled strategy artifacts can be executed in real market conditions with a fully managed execution layer.

- Connect a brokerage account
- Deploy compiled strategy artifacts (.wr)
- Execute trades in live markets
- Monitor positions and performance in real time

Live execution is available for approved accounts with guided onboarding.

## Philosophy

Strategies are compiled programs.

`.yaml` defines intent  
`.wr` defines execution  

Compilation produces a fixed execution plan with no hidden state, side effects, or environment-dependent behavior.

The same inputs always produce the same outputs.

For a deeper look at the philosophy behind WhaleRider:
https://medium.com/@erezlif/rocksoldi-whalerider-9570adb0d7cd

## Access

If you are building systematic strategies and need deterministic, reproducible simulation with a clear path to production, we’d like to work with you.

Live execution is available for approved accounts, with guided onboarding.

- Email: support@rocksoldi.com
- LinkedIn: https://www.linkedin.com/in/erez-lifshitz-54846b14/
