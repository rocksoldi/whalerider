# CLI and VS Code

[← WhaleRider](../README.md) · [Full documentation](https://www.whalerider.org/docs)

Use VS Code for direct YAML editing and the CLI for compilation, workspace operations, and automation. You can move between these tools and an AI conversation using the same research definitions.

## Install the CLI

Windows PowerShell:

```powershell
irm https://cli.whalerider.org | iex
```

Linux:

```bash
curl -s https://cli.whalerider.org/install-wr.sh | tr -d '\r' | bash
```

Verify installation:

```text
wr --version
```

## Install the VS Code extension

Open Extensions in VS Code, search for **WhaleRider DSL**, and select **Install**. Open a WhaleRider YAML definition to use completion, hover documentation, diagnostics, and schema-aware editing.

## Compile locally

From the root of a clone of this repository:

```text
wr compile --file examples/weak-ibs/weak-ibs.trade-plan.yaml
wr compile --file examples/weak-ibs/weak-ibs.risk-policy.yaml
```

Compilation does not require an access profile. It validates the document and reports the generated `.wr` artifact path. Compiled artifacts are ignored by this repository.

## Connect the CLI to your workspace

Get your workspace key through [Connect WhaleRider](https://www.whalerider.org/account/api), then configure a profile locally. Replace the placeholder with your own key:

```text
wr profile set --name research --access-key <YOUR_ACCESS_KEY>
wr profile use --name research
```

A profile is required for deployment, running simulations, and retrieving workspace data. Keep credentials out of shared command transcripts and repository files.

## Compile and deploy in order

Every angle-bracket value below is a placeholder. Replace it before executing the command or compiling a template. The compile result reports the actual output path; use that path for deployment.

### 1. Deploy the trade plan and risk policy

After compiling the two files above:

```text
wr deploy --file <TRADE_PLAN_ARTIFACT_PATH>
wr deploy --file <RISK_POLICY_ARTIFACT_PATH>
```

Record each returned `DeploymentId`.

### 2. Link and deploy the strategy

In [weak-ibs.strategy.yaml](../examples/weak-ibs/weak-ibs.strategy.yaml), replace `<YOUR_TRADE_PLAN_ID>` and `<YOUR_RISK_POLICY_ID>` with the corresponding IDs from step 1. Then:

```text
wr compile --file examples/weak-ibs/weak-ibs.strategy.yaml
wr deploy --file <STRATEGY_ARTIFACT_PATH>
```

Record the strategy's `DeploymentId`.

### 3. Link and deploy the simulation

In [weak-ibs.simulation.yaml](../examples/weak-ibs/weak-ibs.simulation.yaml), replace `<YOUR_STRATEGY_ID>` with the ID from step 2. Review the initial cash and date range, then:

```text
wr compile --file examples/weak-ibs/weak-ibs.simulation.yaml
wr deploy --file <SIMULATION_ARTIFACT_PATH>
```

Record the simulation's `DeploymentId`.

### 4. Start and inspect the run

```text
wr simulation run --simulation-id <YOUR_SIMULATION_ID>
wr simulation run get --simulation-run-id <YOUR_RUN_ID>
```

Use the run ID returned by the start command to check status. Once it is completed:

```text
wr simulation run performance get --simulation-run-id <YOUR_RUN_ID> --group-interval FULL --table
wr simulation run performance get --simulation-run-id <YOUR_RUN_ID> --group-interval YEARLY --table
wr simulation run performance get --simulation-run-id <YOUR_RUN_ID> --group-interval MONTHLY --table
```

`DAILY` and `WEEKLY` are also available. Use `FULL` for the aggregate run.

To inspect simulated trades, identify the broker-account record associated with the run, then page through its trades:

```text
wr broker-account config list --table
wr trade list --broker-account-id <YOUR_BROKER_ACCOUNT_ID> --skip 0 --limit 100 --table
wr trade list --broker-account-id <YOUR_BROKER_ACCOUNT_ID> --skip 100 --limit 100 --table
```

The broker-account identifier here belongs to the platform's simulation data model.

## Command help

Use the installed CLI's help for available commands and version-specific options:

```text
wr -h
wr compile -h
wr simulation run performance get -h
```

The [website reference](https://www.whalerider.org/docs#cli-reference) covers the wider command surface. The [artifact model](artifact-model.md) explains how the deployment layers fit together.
