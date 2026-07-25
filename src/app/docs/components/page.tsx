export default function ComponentsPage() {
  return (
    <>
      <h1>Components</h1>
      <p>Our component library is the most comprehensive open-source UI toolkit available. Every component is production-ready, fully typed, and beautifully designed.</p>

      <h2>Layout</h2>
      <ul>
        <li><strong>Container</strong> — Responsive container with max-width</li>
        <li><strong>Grid</strong> — Flexible grid system</li>
        <li><strong>Stack</strong> — Vertical and horizontal layouts</li>
        <li><strong>Separator</strong> — Visual dividers</li>
      </ul>

      <h2>Forms</h2>
      <ul>
        <li><strong>Button</strong> — All button variants and sizes</li>
        <li><strong>Input</strong> — Text inputs with validation</li>
        <li><strong>Select</strong> — Dropdown selects</li>
        <li><strong>Checkbox</strong> — Checkboxes and radio buttons</li>
        <li><strong>DatePicker</strong> — Calendar date picker</li>
      </ul>

      <h2>Data Display</h2>
      <ul>
        <li><strong>Table</strong> — Data tables with sorting and filtering</li>
        <li><strong>Card</strong> — Content cards</li>
        <li><strong>Badge</strong> — Status badges</li>
        <li><strong>Avatar</strong> — User avatars</li>
        <li><strong>Tooltip</strong> — Information tooltips</li>
      </ul>

      <h2>Feedback</h2>
      <ul>
        <li><strong>Alert</strong> — Alert messages</li>
        <li><strong>Toast</strong> — Notification toasts</li>
        <li><strong>Modal</strong> — Dialog modals</li>
        <li><strong>Spinner</strong> — Loading indicators</li>
      </ul>

      <h2>Navigation</h2>
      <ul>
        <li><strong>Tabs</strong> — Tab navigation</li>
        <li><strong>Breadcrumb</strong> — Breadcrumb navigation</li>
        <li><strong>Menu</strong> — Dropdown menus</li>
        <li><strong>Sidebar</strong> — Sidebar navigation</li>
      </ul>

      <h2>Usage Example</h2>
      <pre><code>{`import { Button, Card, Input } from "@open-source-ai/components";

export function MyForm() {
  return (
    <Card>
      <Input placeholder="Enter your name" />
      <Button variant="primary">Submit</Button>
    </Card>
  );
}`}</code></pre>

      <h2>Customization</h2>
      <p>Every component supports theming through CSS variables:</p>
      <pre><code>{`:root {
  --color-primary: #3b82f6;
  --color-secondary: #8b5cf6;
  --radius: 0.5rem;
}`}</code></pre>

      <h2>Accessibility</h2>
      <p>All components follow WAI-ARIA guidelines and are fully accessible.</p>
    </>
  );
}
