# Keeping the public presence aligned

The public website is the source for product positioning, access flow, availability, and product scope. This repository adds portable examples and concise developer guides.

## Repository settings

The intended About description, homepage, topics, and social-preview asset are recorded in [repository.json](repository.json). GitHub does not apply this file automatically.

After publishing the repository content, apply the description and homepage through the repository's About settings. Replace the topics with the list in the JSON file. Upload [social-preview.png](../assets/social-preview.png) under repository **Settings → General → Social preview**.

If using GitHub CLI, the description and homepage can also be set with:

```text
gh repo edit rocksoldi/whalerider --description "Systematic research infrastructure for your preferred AI. Build validated research rules, run historical simulations, and analyze results through MCP, VS Code, or the CLI." --homepage "https://www.whalerider.org/"
```

## Content updates

When the website changes, review these items together:

| Website change | Repository files to review |
| --- | --- |
| Hero, description, or brand | README, hero assets, social preview, repository metadata |
| Access flow or MCP endpoint | README and getting-started guide |
| CLI or schema | Developer guide, artifact guide, and example YAML |
| Featured research sessions | Session guide, example notes, source data, and session images |
| Product scope | README footer and product descriptions |

Link to current pricing rather than repeating a price in this repository. Client setup menus should remain in the clients' current documentation rather than being frozen here.

## Assets and evidence

The logo is copied from the website's brand asset. Hero and session SVGs use the website's light and dark color tokens. SVGs are the editable sources; the social preview is a 1280 × 640 PNG.

The featured annual-return bars are drawn from the CSV files in the example directories. Do not replace them with illustrative performance curves. Preserve losses alongside gains, and show the historical period and drawdown with the return.

Example YAML is adapted from the website's published session definitions. Trade-plan and risk-policy logic is preserved. Strategy and simulation references are replaced with explicit workspace-ID placeholders. Historical run IDs appear only in the session notes as provenance.

Check all local links and render the README in light and dark themes before publishing. Compile trade plans and risk policies, then verify strategy and simulation templates using temporary valid identifiers. Do not deploy or start a simulation as part of documentation validation.
