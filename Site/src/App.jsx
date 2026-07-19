import { useEffect, useState } from "react";
import criteriaDemo from "../Assets/trade-plan-criteria.gif";
import indicatorsDemo from "../Assets/trade-plan-indicators.gif";
import riskDemo from "../Assets/trade-plan-risk.gif";
import segmentDemo from "../Assets/trade-plan-segment.gif";
import signalsDemo from "../Assets/trade-plan-signals.gif";
import brandLogo from "../Assets/brand-logo.png";
import qualityValueStrategy from "./strategies/qualityvalue.trade-plan.yaml?raw";
import breadthRecoveryStrategy from "./strategies/breadthrecovery.trade-plan.yaml?raw";
import emaCrossoverStrategy from "./strategies/emacrossover.trade-plan.yaml?raw";
import insiderGrowthStrategy from "./strategies/insidergrowth.trade-plan.yaml?raw";

const workflows = [
  { number: "01", title: "Define", text: "Write the trade plan, risk policy, strategy, and simulation in YAML." },
  { number: "02", title: "Compile", text: "Validate the YAML and create a versioned .wr artifact." },
  { number: "03", title: "Run", text: "Use the same artifact in simulation and live execution." },
  { number: "04", title: "Inspect", text: "Query runs, trades, performance, and risk from the CLI." },
];

const capabilities = [
  {
    eyebrow: "Strategy language",
    title: "YAML strategy schema",
    text: "Define indicators, signals, criteria, market segments, and position rules in structured YAML.",
    accent: "01",
  },
  {
    eyebrow: "Runtime",
    title: "Deterministic execution",
    text: "A compiled strategy produces the same decisions when it receives the same inputs.",
    accent: "02",
  },
  {
    eyebrow: "Simulation",
    title: "Historical simulation",
    text: "Run historical simulations and inspect trades, exposure, drawdown, Sharpe ratio, and Sortino ratio.",
    accent: "03",
  },
  {
    eyebrow: "Controls",
    title: "Reusable risk policies",
    text: "Define margin, investment, commission, and per-trade risk limits separately from the trade plan.",
    accent: "04",
  },
];

const demos = [
  { id: "criteria", label: "Criteria", image: criteriaDemo, description: "Complete and validate nested entry and exit conditions." },
  { id: "signals", label: "Signals", image: signalsDemo, description: "Define named boolean expressions from indicator values." },
  { id: "indicators", label: "Indicators", image: indicatorsDemo, description: "Configure measurements, intervals, lookbacks, and transforms." },
  { id: "risk", label: "Risk", image: riskDemo, description: "Configure stop loss, take profit, and holding-period limits." },
  { id: "segment", label: "Segments", image: segmentDemo, description: "Select market indices and include or exclude specific tickers." },
];

const installCommands = {
  windows: "irm https://cli.whalerider.org | iex",
  linux: "curl -s https://cli.whalerider.org/install-wr.sh | tr -d '\\r' | bash",
};

const cliGroups = [
  {
    id: "setup",
    label: "Setup",
    summary: "Install, verify, and configure access profiles.",
    commands: [
      { command: "wr --version", description: "Verify the installed CLI version.", access: "Local" },
      { command: "wr profile set --name <NAME> --access-key <ACCESS_KEY>", description: "Create or update a named access profile.", access: "Local" },
      { command: "wr profile use --name <NAME>", description: "Select the profile used by platform commands.", access: "Local" },
      { command: "wr profile list", description: "List the profiles configured on this machine.", access: "Local" },
    ],
  },
  {
    id: "artifacts",
    label: "Artifacts",
    summary: "Compile declarations and deploy fixed artifacts.",
    commands: [
      { command: "wr compile --file <NAME>.trade-plan.yaml", description: "Compile a trade plan into a .wr artifact.", access: "No auth" },
      { command: "wr compile --file <NAME>.risk-policy.yaml", description: "Compile a reusable account risk policy.", access: "No auth" },
      { command: "wr compile --file <NAME>.strategy.yaml", description: "Compile the strategy composition.", access: "No auth" },
      { command: "wr deploy --file <NAME>.<COMPONENT>.wr", description: "Deploy a compiled artifact to the active environment.", access: "Profile" },
    ],
  },
  {
    id: "simulation",
    label: "Simulation",
    summary: "Start runs, monitor state, and inspect performance.",
    commands: [
      { command: "wr simulation run --simulation-id <SIMULATION_ID>", description: "Start a historical simulation.", access: "Profile" },
      { command: "wr simulation run get --simulation-run-id <RUN_ID>", description: "Get the current state of a simulation run.", access: "Profile" },
      { command: "wr simulation run list --table", description: "List simulation runs in a readable table.", access: "Profile" },
      { command: "wr simulation run performance get --simulation-run-id <RUN_ID> --group-interval ALL --table", description: "Return aggregated performance metrics for a run.", access: "Profile" },
    ],
  },
  {
    id: "trading",
    label: "Trading",
    summary: "Inspect deployed definitions, accounts, and trades.",
    commands: [
      { command: "wr strategy list --table", description: "List deployed strategy compositions.", access: "Profile" },
      { command: "wr trade-plan list --table", description: "List deployed trade plans.", access: "Profile" },
      { command: "wr broker-account config list --table", description: "Find the broker account created for a run.", access: "Profile" },
      { command: "wr trade list --broker-account-id <ACCOUNT_ID> --skip 0 --limit 20 --table", description: "Retrieve trades for a broker account.", access: "Profile" },
    ],
  },
];

const strategyExamples = [
  {
    id: "ema-crossover",
    label: "EMA crossover",
    title: "EMA crossover",
    description: "Enters when the 20-day EMA is above the 50-day EMA and exits when the relationship reverses.",
    tags: ["Long", "Daily", "Trend"],
    file: "emacrossover.trade-plan.yaml",
    code: emaCrossoverStrategy,
  },
  {
    id: "breadth-recovery",
    label: "Breadth recovery",
    title: "Breadth recovery",
    description: "Waits for a staged market recovery, then enters stocks that are already in their own uptrend.",
    tags: ["Long", "Breadth", "State machine"],
    file: "breadthrecovery.trade-plan.yaml",
    code: breadthRecoveryStrategy,
  },
  {
    id: "quality-value",
    label: "Quality value",
    title: "Quality value",
    description: "Combines valuation, profitability, controlled debt, liquidity, and a positive long-term trend.",
    tags: ["Long", "Fundamentals", "SP500"],
    file: "qualityvalue.trade-plan.yaml",
    code: qualityValueStrategy,
  },
  {
    id: "insider-growth",
    label: "Insider + macro",
    title: "Insider conviction",
    description: "Combines insider accumulation, supportive economic data, and a long-term price trend.",
    tags: ["Long", "Insiders", "Macro"],
    file: "insidergrowth.trade-plan.yaml",
    code: insiderGrowthStrategy,
  },
];

function CopyButton({ value }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      setCopied(false);
    }
  }

  return (
    <button className="copy-button" type="button" onClick={copy} aria-label="Copy command">
      {copied ? "Copied" : "Copy"}
    </button>
  );
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeDemo, setActiveDemo] = useState(demos[0]);
  const [platform, setPlatform] = useState("windows");
  const [activeCliGroup, setActiveCliGroup] = useState(cliGroups[0]);
  const [activeStrategy, setActiveStrategy] = useState(strategyExamples[0]);

  useEffect(() => {
    function closeOnResize() {
      if (window.innerWidth > 760) setMenuOpen(false);
    }

    window.addEventListener("resize", closeOnResize);
    return () => window.removeEventListener("resize", closeOnResize);
  }, []);

  return (
    <div className="site-shell">
      <header className="site-header">
        <a className="brand" href="#top" aria-label="WhaleRider home">
          <img className="brand-logo" src={brandLogo} alt="" />
          <span className="brand-name">WhaleRider</span>
        </a>

        <button
          className="menu-button"
          type="button"
          aria-label="Toggle navigation"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span />
          <span />
        </button>

        <nav className={menuOpen ? "main-nav is-open" : "main-nav"} aria-label="Main navigation">
          <a href="#workflow" onClick={() => setMenuOpen(false)}>Workflow</a>
          <a href="#capabilities" onClick={() => setMenuOpen(false)}>Capabilities</a>
          <a href="#cli" onClick={() => setMenuOpen(false)}>CLI</a>
          <a href="#examples" onClick={() => setMenuOpen(false)}>Examples</a>
          <a href="#editor" onClick={() => setMenuOpen(false)}>Editor</a>
          <a className="nav-cta" href="https://github.com/rocksoldi/whalerider">View repository <span>↗</span></a>
        </nav>
      </header>

      <main id="top">
        <section className="hero section-frame">
          <div className="hero-copy">
            <div className="eyebrow hero-brandline">
              <span className="status-dot" />
              <span><small>WhaleRider</small>Cross-domain strategy compiler</span>
            </div>
            <h1>One language.<br /><em>Every signal.</em></h1>
            <p className="hero-lede">
              Combine technical, fundamental, breadth, insider, and economic data in one YAML definition. Compile it to a .wr artifact, then run the same artifact in simulation or live trading.
            </p>
            <div className="hero-actions">
              <a className="button button-primary" href="#examples">Explore strategies <span>→</span></a>
              <a className="button button-quiet" href="#install">Install CLI</a>
            </div>
            <div className="hero-flow" aria-label="YAML compiles to an artifact used in simulation or live trading">
              <div><small>Source</small><strong>YAML</strong></div>
              <span aria-hidden="true">→</span>
              <div><small>Artifact</small><strong>.WR</strong></div>
              <span aria-hidden="true">→</span>
              <div><small>Runtime</small><strong>SIMULATION / LIVE</strong></div>
            </div>
          </div>

          <div className="hero-visual" aria-label="WhaleRider extension running in Visual Studio Code">
            <div className="vscode-window">
              <div className="vscode-titlebar">
                <div className="vscode-menu"><span>File</span><span>Edit</span><span>Selection</span><span>View</span><span>Run</span><span>Terminal</span></div>
                <span className="vscode-title">emacrossover.trade-plan.yaml — WhaleRider — Visual Studio Code</span>
                <div className="vscode-controls" aria-hidden="true"><span>—</span><span>□</span><span>×</span></div>
              </div>
              <div className="vscode-tabbar"><span className="is-active"><i /> emacrossover.trade-plan.yaml <b>×</b></span></div>
              <div className="vscode-editor-view">
                <div className="vscode-code" aria-label="Complete EMA crossover strategy YAML example">
                  {strategyExamples[0].code.split("\n").map((line, index) => (
                    <div className="vscode-code-line" key={`${index}-${line}`}>
                      <span>{index + 1}</span>
                      <code>{line || " "}</code>
                    </div>
                  ))}
                </div>
              </div>
              <div className="vscode-statusbar">
                <span>main</span>
                <span>WhaleRider: ready</span>
                <span>YAML&nbsp;&nbsp;UTF-8&nbsp;&nbsp;LF</span>
              </div>
            </div>
          </div>
        </section>

        <section className="principles-bar" aria-label="WhaleRider principles">
          <div><strong>01</strong><span>Define intent</span></div>
          <div><strong>02</strong><span>Compile behavior</span></div>
          <div><strong>03</strong><span>Execute consistently</span></div>
        </section>

        <section className="workflow section-frame" id="workflow">
          <div className="section-heading">
            <div><span className="section-index">01 / Workflow</span><h2>One artifact.<br />Same behavior.</h2></div>
            <p>The YAML defines the strategy. The compiled .wr file is the executable artifact used by each runtime.</p>
          </div>
          <div className="workflow-grid">
            {workflows.map((item, index) => (
              <article className="workflow-step" key={item.number}>
                <div className="step-top"><span>{item.number}</span>{index < workflows.length - 1 && <i aria-hidden="true">→</i>}</div>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="runtime-panel section-frame">
          <div className="runtime-copy">
            <span className="section-index">Compiled artifact</span>
            <h2>YAML defines intent.<br /><em>.wr defines execution.</em></h2>
            <p>The compiler validates the YAML and creates a fixed execution plan. Store the artifact and run it in any supported environment.</p>
            <ul>
              <li><span>✓</span> Schema-validated before execution</li>
              <li><span>✓</span> Reproducible across repeated runs</li>
              <li><span>✓</span> Auditable from declaration to trade</li>
            </ul>
          </div>
          <div className="runtime-diagram" aria-label="YAML compiles into a WhaleRider executable artifact">
            <div className="file-card source-file"><span>YAML</span><strong>strategy.yaml</strong><small>Human-readable intent</small></div>
            <div className="compiler-node"><span>WR</span><strong>Compiler</strong><i>→</i></div>
            <div className="file-card compiled-file"><span>.WR</span><strong>strategy.wr</strong><small>Deterministic artifact</small></div>
          </div>
        </section>

        <section className="capabilities section-frame" id="capabilities">
          <div className="section-heading compact">
            <div><span className="section-index">02 / Capabilities</span><h2>Explicit inputs.<br />Deterministic outputs.</h2></div>
            <p>Strategy logic, risk limits, compilation, execution, and simulation are separate and testable.</p>
          </div>
          <div className="capability-grid">
            {capabilities.map((capability) => (
              <article className="capability-card" key={capability.title}>
                <div className="capability-meta"><span>{capability.eyebrow}</span><b>{capability.accent}</b></div>
                <h3>{capability.title}</h3>
                <p>{capability.text}</p>
                <div className="card-line" />
              </article>
            ))}
          </div>
        </section>

        <section className="cli-section section-frame" id="cli">
          <div className="section-heading compact">
            <div><span className="section-index">03 / CLI reference</span><h2>CLI commands.</h2></div>
            <p>Use the CLI to compile artifacts, deploy them, start simulations, and query results.</p>
          </div>
          <div className="cli-reference">
            <aside className="cli-sidebar" aria-label="CLI command groups">
              <div className="cli-sidebar-label">Command groups</div>
              {cliGroups.map((group) => (
                <button
                  type="button"
                  className={activeCliGroup.id === group.id ? "is-active" : ""}
                  key={group.id}
                  onClick={() => setActiveCliGroup(group)}
                >
                  <span>{group.label}</span>
                  <i>{String(cliGroups.indexOf(group) + 1).padStart(2, "0")}</i>
                </button>
              ))}
              <a href="#install">Install the CLI <span>→</span></a>
            </aside>
            <div className="cli-command-panel">
              <div className="cli-panel-heading">
                <div><span>wr / {activeCliGroup.id}</span><h3>{activeCliGroup.label}</h3></div>
                <p>{activeCliGroup.summary}</p>
              </div>
              <div className="cli-command-list">
                {activeCliGroup.commands.map((item) => (
                  <article className="cli-command-row" key={item.command}>
                    <div className="command-copy">
                      <span className="prompt">$</span>
                      <code>{item.command}</code>
                      <CopyButton value={item.command} />
                    </div>
                    <div className="command-explainer"><p>{item.description}</p><span>{item.access}</span></div>
                  </article>
                ))}
              </div>
              <div className="cli-help-note"><span>?</span><p>Use <code>wr help</code> to list commands and <code>wr help &lt;command&gt;</code> for command-specific options.</p></div>
            </div>
          </div>
        </section>

        <section className="examples-section section-frame" id="examples">
          <div className="section-heading examples-heading">
            <div><span className="section-index">04 / Strategy examples</span><h2>Strategy examples<br />in YAML.</h2></div>
            <p>These examples show indicators, signals, entry criteria, exit criteria, and risk settings.</p>
          </div>
          <div className="strategy-browser">
            <div className="strategy-tabs" role="tablist" aria-label="Strategy examples">
              {strategyExamples.map((strategy, index) => (
                <button
                  type="button"
                  role="tab"
                  aria-selected={activeStrategy.id === strategy.id}
                  className={activeStrategy.id === strategy.id ? "is-active" : ""}
                  key={strategy.id}
                  onClick={() => setActiveStrategy(strategy)}
                >
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <strong>{strategy.label}</strong>
                  <i>→</i>
                </button>
              ))}
            </div>
            <div className="strategy-content">
              <div className="strategy-details">
                <span className="strategy-type">Trade plan example</span>
                <h3>{activeStrategy.title}</h3>
                <p>{activeStrategy.description}</p>
                <div className="strategy-tags">{activeStrategy.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
                <div className="strategy-try">
                  <span>Compile this example</span>
                  <code>wr compile --file {activeStrategy.file}</code>
                </div>
              </div>
              <div className="strategy-code">
                <div className="strategy-code-bar"><span>{activeStrategy.file}</span><CopyButton value={activeStrategy.code} /></div>
                <pre><code>{activeStrategy.code}</code></pre>
              </div>
            </div>
          </div>
        </section>

        <section className="editor-section section-frame" id="editor">
          <div className="section-heading editor-heading">
            <div><span className="section-index">05 / VS Code extension</span><h2>Edit WhaleRider YAML<br />in VS Code.</h2></div>
            <div className="editor-intro">
              <p>The extension provides completion, schema validation, and diagnostics for WhaleRider files.</p>
              <div className="extension-install">
                <span>Install the extension</span>
                <ol>
                  <li><b>1</b><span>Open Extensions in VS Code.</span></li>
                  <li><b>2</b><span>Search for <code>WhaleRider DSL</code>.</span></li>
                  <li><b>3</b><span>Select WhaleRider DSL and click Install.</span></li>
                </ol>
              </div>
            </div>
          </div>
          <div className="demo-shell">
            <div className="demo-tabs" role="tablist" aria-label="Editor feature demos">
              {demos.map((demo) => (
                <button
                  type="button"
                  role="tab"
                  aria-selected={activeDemo.id === demo.id}
                  className={activeDemo.id === demo.id ? "is-active" : ""}
                  key={demo.id}
                  onClick={() => setActiveDemo(demo)}
                >
                  {demo.label}
                </button>
              ))}
            </div>
            <div className="demo-stage">
              <div className="demo-description"><span>Live authoring</span><p>{activeDemo.description}</p></div>
              <div className="demo-image-frame"><img src={activeDemo.image} alt={`${activeDemo.label} editor completion demonstration`} /></div>
            </div>
          </div>
        </section>

        <section className="install-section section-frame" id="install">
          <div className="install-card">
            <div className="install-copy">
              <span className="section-index">06 / Get started</span>
              <h2>Install the CLI<br />and compile locally.</h2>
              <p>Install WhaleRider, verify the CLI, and compile a YAML file. Local compilation does not require an access profile.</p>
              <div className="install-steps">
                <div><b>1</b><span><strong>Install</strong><small>Choose your platform</small></span></div>
                <div><b>2</b><span><strong>Verify</strong><small>Run wr --version</small></span></div>
                <div><b>3</b><span><strong>Compile</strong><small>Generate your .wr artifact</small></span></div>
              </div>
            </div>
            <div className="install-terminal">
              <div className="platform-tabs" role="tablist" aria-label="Installation platform">
                <button className={platform === "windows" ? "is-active" : ""} type="button" onClick={() => setPlatform("windows")}>Windows</button>
                <button className={platform === "linux" ? "is-active" : ""} type="button" onClick={() => setPlatform("linux")}>Linux</button>
              </div>
              <div className="command-block"><span className="prompt">$</span><code>{installCommands[platform]}</code><CopyButton value={installCommands[platform]} /></div>
              <div className="verify-block"><span>Then verify the installation</span><div><span className="prompt">$</span><code>wr --version</code></div></div>
              <a className="text-link" href="https://github.com/rocksoldi/whalerider/tree/main/Examples/ema-crossover">Open the EMA crossover example <span>↗</span></a>
            </div>
          </div>
        </section>

        <section className="closing section-frame">
          <span className="closing-kicker">Deterministic by design</span>
          <h2>The same inputs.<br />The same decisions.</h2>
          <p>Define the strategy, compile the artifact, and reproduce the same execution from the same inputs.</p>
          <div className="hero-actions closing-actions">
            <a className="button button-primary" href="#install">Open CLI setup <span>→</span></a>
            <a className="button button-quiet" href="mailto:support@rocksoldi.com">support@rocksoldi.com</a>
          </div>
        </section>
      </main>

      <footer className="site-footer section-frame">
        <div className="footer-brand"><div><strong>WhaleRider</strong><small>Deterministic strategy runtime</small></div></div>
        <div className="footer-links"><a href="#cli">CLI</a><a href="#examples">Examples</a><a href="#install">Install</a><a href="https://medium.com/@erezlif/rocksoldi-whalerider-9570adb0d7cd">Philosophy ↗</a></div>
        <p>© {new Date().getFullYear()} Rocksolid. WhaleRider documentation.</p>
      </footer>
    </div>
  );
}

export default App;
