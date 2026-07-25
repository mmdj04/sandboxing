export default function AIAgentsPage() {
  return (
    <>
      <h1>AI Agents</h1>
      <p>Our AI agent framework makes it easy to build autonomous, intelligent agents that can reason, use tools, and complete complex tasks.</p>

      <h2>Features</h2>
      <ul>
        <li><strong>Tool Use</strong> — Agents can use any tool you define</li>
        <li><strong>Memory</strong> — Persistent and working memory</li>
        <li><strong>Reasoning</strong> — Chain-of-thought reasoning</li>
        <li><strong>Streaming</strong> — Real-time response streaming</li>
        <li><strong>Multi-Agent</strong> — Agent collaboration</li>
      </ul>

      <h2>Quick Start</h2>
      <pre><code>{`import { Agent, Tool } from "@open-source-ai/ai";

const searchTool: Tool = {
  name: "search",
  description: "Search the web",
  execute: async (query) => {
    // Your search implementation
    return results;
  },
};

const agent = new Agent({
  model: "gpt-4",
  tools: [searchTool],
  systemPrompt: "You are a helpful research assistant.",
});

const response = await agent.run("Find information about open-source AI");`}</code></pre>

      <h2>Agent Architecture</h2>
      <pre><code>{`┌─────────────────────────────────────┐
│           Agent Runtime             │
├─────────────────────────────────────┤
│  ┌─────────┐  ┌─────────────────┐  │
│  │ Memory  │  │   Reasoning     │  │
│  │         │  │   Engine        │  │
│  └─────────┘  └─────────────────┘  │
├─────────────────────────────────────┤
│  ┌─────────────────────────────────┐│
│  │         Tool Executor          ││
│  └─────────────────────────────────┘│
└─────────────────────────────────────┘`}</code></pre>

      <h2>Memory Types</h2>
      <h3>Working Memory</h3>
      <p>Temporary context for the current conversation.</p>

      <h3>Persistent Memory</h3>
      <p>Long-term storage across sessions.</p>

      <h3>Shared Memory</h3>
      <p>Memory shared between multiple agents.</p>

      <h2>Tools</h2>
      <p>Define custom tools for your agents:</p>
      <pre><code>{`const calculatorTool: Tool = {
  name: "calculator",
  description: "Perform mathematical calculations",
  parameters: {
    expression: {
      type: "string",
      description: "Mathematical expression to evaluate",
    },
  },
  execute: async ({ expression }) => {
    return eval(expression); // Use a safe math library in production
  },
};`}</code></pre>

      <h2>Multi-Agent Systems</h2>
      <p>Create teams of agents that work together:</p>
      <pre><code>{`import { AgentTeam } from "@open-source-ai/ai";

const team = new AgentTeam({
  agents: [
    { name: "researcher", role: "Find information" },
    { name: "writer", role: "Write content" },
    { name: "reviewer", role: "Review and edit" },
  ],
});

const result = await team.run("Write a blog post about open-source AI");`}</code></pre>
    </>
  );
}
