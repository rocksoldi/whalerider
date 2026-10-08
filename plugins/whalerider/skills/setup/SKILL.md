---
name: setup
description: Help a user connect and begin using the installed WhaleRider plugin. Use for WhaleRider plugin setup, onboarding, or connection troubleshooting.
---

# Set up WhaleRider

This package uses the production environment. Its website is https://www.whalerider.org and its MCP endpoint is https://mcp.whalerider.org. Tell the user which environment is connected before their first research action. They need workspace access for this environment; access to another environment may not grant access here.

Discover the authenticated WhaleRider tools provided by the client. Never ask the user to paste access keys, passwords, or tokens into chat or package files. If authentication is needed, direct them to the client's MCP connection settings and the WhaleRider OAuth authorization page. Let them complete sign-in there. This skill cannot configure or authenticate the connection itself.

If tools are unavailable, explain that the plugin's WhaleRider MCP connection must be enabled and authenticated. Report the actual connection error if available. Do not claim setup succeeded based only on installing the skill.

Once tools are available, explain the workflow briefly: define research rules, create validated artifacts, run a historical simulation when requested, then inspect reports and charts. Offer to list existing definitions or simulation runs as a first read-only action. Do not create definitions, start runs, or modify data merely to test setup.

For research workflows, use the packaged whalerider skill and its references. Current tool schemas and returned validation instructions are authoritative. Use exact returned IDs and never fabricate data or assume a tool call proves chart UI visibility.

