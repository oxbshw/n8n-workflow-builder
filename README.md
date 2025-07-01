# n8n Workflow Builder

AI-powered tool to generate **n8n** workflows from natural language prompts, leveraging a database of real workflows, vector search, and open LLMs.

---

## 🚀 What is this?

**n8n Workflow Builder** lets you describe an automation in plain English and instantly generates a production-ready [n8n](https://n8n.io/) workflow. It finds similar workflows from a curated database and uses AI to generate or adapt flows for your use case.

---

## ✨ Features

- **Natural Language Input:** Just describe the desired workflow; no coding needed.
- **Vector Search:** Retrieves similar workflows from a 3,000+ real-world workflow database.
- **AI Generation:** Uses OpenRouter & open-source LLMs (Mistral-7B, etc.) to create new flows.
- **Modern UI:** Fast, responsive frontend with Next.js 14, Tailwind CSS, and shadcn/ui.
- **Open Source:** Fully customizable, extensible, and MIT-licensed.
- **Easy Deploy:** Ready for Vercel and local deployment.

---

## 🏗️ Architecture

```
Frontend (Next.js)
   │
   ▼
Backend (Express)
   │
   ▼
Vector DB (ChromaDB)
```

- **Frontend:** User input, display, download.
- **Backend:** API, vector search, LLM integration.
- **Vector DB:** ChromaDB for similarity search.

---

## 📦 Tech Stack

- **Frontend:** Next.js 14, Tailwind CSS, shadcn/ui
- **Backend:** Node.js, Express
- **Database:** ChromaDB (local or remote)
- **AI:** OpenRouter (Mistral-7B-Instruct)
- **Deployment:** Vercel, Docker, or any Node.js host

---

## ⚡️ Quickstart

### Prerequisites

- Node.js 18+
- Yarn or npm
- Python 3 (for ChromaDB)
- [OpenRouter](https://openrouter.ai/) API key

### 1. Clone & Install

```bash
git clone https://github.com/oxbshw/n8n-workflow-builder.git
cd n8n-workflow-builder
cd backend && npm install
cd ../frontend && npm install
```

### 2. Configure

```bash
cd ../backend
cp .env.example .env
# Edit .env with your OpenRouter API key and ChromaDB URL
```

### 3. Start ChromaDB

```bash
pip install chromadb
chroma run --host localhost --port 8000
```

### 4. Build Embeddings

```bash
cd backend
npm run build-embeddings
```

### 5. Run the App

```bash
# Terminal 1
cd backend && npm run dev

# Terminal 2
cd frontend && npm run dev
```

Visit [http://localhost:3000](http://localhost:3000)

---

## 📝 Example API Usage

**POST** `/api/generate`

```json
{
  "prompt": "Monitor Gmail and send Slack notifications"
}
```

**Response:**
```json
{
  "workflow": { ... },
  "similarWorkflowsCount": 3,
  "timestamp": "2025-07-01T00:00:00.000Z"
}
```

---

## 🛠️ Customization

- Add your own workflows: Place a `workflows.json` in `backend/data/` and run `npm run build-embeddings`.
- Use a remote ChromaDB: Set `CHROMA_URL` in `.env`.

---

## 🤝 Contributing

1. Fork the repo
2. Create a branch: `git checkout -b feature/my-feature`
3. Commit: `git commit -m "Add my feature"`
4. Push: `git push origin feature/my-feature`
5. Open a Pull Request

---

## 📄 License

MIT © [oxbshw](https://github.com/oxbshw)

---

## 🙏 Acknowledgments

- [n8n](https://n8n.io/)
- [OpenRouter](https://openrouter.ai/)
- [ChromaDB](https://www.trychroma.com/)
- [Vercel](https://vercel.com/)

---

## 💬 Support

- [GitHub Issues](https://github.com/oxbshw/n8n-workflow-builder/issues)
- Community discussions tab

---

_Made with ❤️ for the automation community_
