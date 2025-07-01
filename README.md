# 🚀 n8n Workflow Builder

> **Turn natural language into fully functional [n8n](https://n8n.io) automations — instantly.**

**n8n Workflow Builder** is an AI-powered interface that transforms prompts into production-ready workflows. It leverages a rich, curated library of real automations and enables developers and non-technical users alike to build powerful integrations without writing code.

---

## ✨ Features

- 🧠 **AI-Powered Prompting**: Describe what you want, and let the AI build the workflow.
- 🔍 **Real Automation Library**: Generates workflows based on a growing database of real-world use cases.
- 🎨 **Instant Visual Feedback**: Preview and modify workflows before publishing.
- ⚡ **Export to n8n**: Deploy directly or copy JSON to your local/self-hosted n8n instance.
- 🧩 **Pluggable**: Easily extend with custom nodes or workflow patterns.

---

## 🧪 Live Preview

Try it live: **[n8n-workflow-builder.vercel.app](https://n8n-workflow-builder.vercel.app/)**  
_(Instantly generate production-ready n8n workflows in your browser.)_

Uses AI prompt generation + a curated database of real-world automations from:  
👉 **[Ultimate n8n AI Workflows](https://github.com/oxbshw/-ultimate-n8n-ai-workflows)**

---

## 📦 Installation

Clone the repo:

```bash
git clone https://github.com/oxbshw/n8n-workflow-builder.git
cd n8n-workflow-builder
```

Install dependencies:

```bash
pnpm install
```

Start the development server:

```bash
pnpm dev
```

---

## 🧠 How It Works

1. **You Describe**  
   > _"Send a Slack message when a new row is added in Google Sheets."_

2. **AI Builds Workflow**  
   The AI fetches components from the automation library, adapts them, and assembles a workflow.

3. **You Preview & Export**  
   Modify, fine-tune, or download your ready-to-run n8n JSON.

---

## 📁 Project Structure

```
.
├── app/            # Frontend logic (Next.js)
├── lib/            # Workflow templates and helpers
├── api/            # Serverless endpoints (e.g., AI generation)
└── public/         # Static assets
```

---

## 🔐 Environment Variables

Copy `.env.example` and configure your own:

```bash
cp .env.example .env
```

| Variable               | Description                         |
|------------------------|-------------------------------------|
| `OPENAI_API_KEY`       | API key for OpenAI (workflow generation) |
| `VERCEL_PROJECT_ID`    | (Optional) Used for Vercel integrations |
| `N8N_HOST`             | Base URL of your n8n instance       |

---

## 🧱 Built With

- [n8n](https://n8n.io) – Workflow Automation
- [Next.js](https://nextjs.org) – Web Framework
- [Tailwind CSS](https://tailwindcss.com) – Styling
- [OpenAI](https://openai.com) – Prompt-to-workflow engine
- [Vercel](https://vercel.com) – Deployment

---

## 🛣 Roadmap

- [ ] GitHub OAuth & Workflow Sharing
- [ ] Public Workflow Gallery
- [ ] Voice-Prompt Support (via ElevenLabs)
- [ ] Workflow Deployment to Cloud-hosted n8n

---

## 🤝 Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss the idea.

To contribute:

```bash
git checkout -b feature/your-feature
pnpm dev
```

---

## 📄 License

[MIT](./LICENSE)

---

## 🙋‍♀️ Questions?

Open an [issue](https://github.com/oxbshw/n8n-workflow-builder/issues) or reach out via [X/Twitter](https://twitter.com/oxbshw).
