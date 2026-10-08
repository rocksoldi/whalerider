# Simulation execution

| Prompt operation | Inputs | Behavior |
| --- | --- | --- |
| `run_simulation` | simulation name or definition ID | Resolve, start, wait, summarize |
| `get_simulation_run_status` | run | Check current status |
| `get_simulation_run` | run | Inspect status, timestamps, and details |
| `list_simulation_runs` | optional simulation definition ID | Browse, newest first |
| `abort_simulation_run` | run | Request stopping that run |
| `delete_simulation_run` | run | Delete that finished run and associated runtime data |
| `wait_for_simulation_run` | run | Wait for the existing run only |

Match tool names to these operations and use their current schemas. User-facing `run` maps to `simulationRunId`. `simulation` identifies a definition; it is never a run ID. An empty simulation filter lists all runs.

Resolve a simulation name using `get_simulation_data`, then pass its returned definition ID to `run_simulation` in the request shape advertised by the tool. Capture the newly returned run ID. Use `wait_for_simulation_run` for waiting and `get_simulation_run_status` when needed; honor the tool's timeout/retry instructions rather than polling in a tight loop. A wait timeout does not mean the run failed. Do not restart an existing run when asked to wait or inspect it.

On completed runs, call `get_simulation_summary` for the requested concise summary. For failed or canceled runs, report the actual terminal status and useful returned diagnostics; do not claim performance is complete. If a run-start outcome is unknown, inspect runs/state before considering a retry that could create a duplicate.

For deletion, check whether the run is finished. If active, tell the user; deletion does not authorize silently aborting it. Stopping and deleting are separate operations. Confirm success from the actual tool response.
