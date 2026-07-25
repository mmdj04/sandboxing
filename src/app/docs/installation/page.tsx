export default function InstallationPage() {
  return (
    <>
      <h1>Installation</h1>
      <p>Get up and running in minutes.</p>

      <h2>Prerequisites</h2>
      <ul>
        <li>Node.js 18+</li>
        <li>npm, yarn, or pnpm</li>
      </ul>

      <h2>Quick Install</h2>
      <pre><code>{`npx open-source-ai infra init my-project`}</code></pre>

      <h2>Manual Install</h2>
      <pre><code>{`# Create a new project
mkdir my-project && cd my-project

# Initialize package.json
npm init -y

# Install dependencies
npm install @open-source-ai/core @open-source-ai/components @open-source-ai/ai`}</code></pre>

      <h2>Configuration</h2>
      <p>Create an <code>open-source.config.js</code> file in your project root:</p>
      <pre><code>{`module.exports = {
  name: "My Project",
  components: {
    ui: true,
    ai: true,
    docs: true,
  },
  theme: {
    dark: true,
    accentColor: "#3b82f6",
  },
};`}</code></pre>

      <h2>What&apos;s Included</h2>
      <table>
        <thead>
          <tr>
            <th>Package</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><code>@open-source-ai/core</code></td>
            <td>Core infrastructure and utilities</td>
          </tr>
          <tr>
            <td><code>@open-source-ai/components</code></td>
            <td>UI component library</td>
          </tr>
          <tr>
            <td><code>@open-source-ai/ai</code></td>
            <td>AI agent tools and utilities</td>
          </tr>
          <tr>
            <td><code>@open-source-ai/docs</code></td>
            <td>Documentation framework</td>
          </tr>
        </tbody>
      </table>
    </>
  );
}
