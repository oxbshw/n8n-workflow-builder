# AI n8n Workflow Generator

An open-source AI-powered tool that generates n8n workflows from natural language descriptions using vector search and large language models.

## 🚀 Features

- **Natural Language Input**: Describe your automation needs in plain English
- **Vector Search**: Finds similar workflows from a database of 3000+ real workflows
- **AI Generation**: Uses OpenRouter API with open-source models like Mistral-7B
- **Clean UI**: Modern, responsive interface built with Next.js and Tailwind CSS
- **Ready to Deploy**: Configured for easy deployment on Vercel
- **Open Source**: Fully open-source and customizable

## 🏗️ Architecture

\`\`\`
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend      │    │   Backend       │    │  Vector DB      │
│   (Next.js)     │───▶│   (Express)     │───▶│   (Chroma)      │
│                 │    │                 │    │                 │
│ • User Input    │    │ • API Routes    │    │ • 3000+ flows   │
│ • JSON Display  │    │ • LLM Integration│    │ • Similarity    │
│ • Download      │    │ • Vector Search │    │   Search        │
└─────────────────┘    └─────────────────┘    └─────────────────┘
\`\`\`

## 🛠️ Tech Stack

- **Frontend**: Next.js 14, Tailwind CSS, shadcn/ui
- **Backend**: Node.js, Express
- **Vector Database**: ChromaDB (local)
- **AI**: OpenRouter API (Mistral-7B-Instruct)
- **Deployment**: Vercel

## 📦 Installation

### Prerequisites

- Node.js 18+ 
- npm or yarn
- ChromaDB (for vector search)

### 1. Clone the Repository

\`\`\`bash
git clone https://github.com/yourusername/n8n-workflow-generator.git
cd n8n-workflow-generator
\`\`\`

### 2. Install Dependencies

\`\`\`bash
# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
\`\`\`

### 3. Environment Setup

Create a `.env` file in the backend directory:

\`\`\`bash
cd backend
cp .env.example .env
\`\`\`

Edit `.env` with your configuration:

\`\`\`env
OPENROUTER_API_KEY=your_openrouter_api_key_here
CHROMA_URL=http://localhost:8000
PORT=3001
\`\`\`

### 4. Start ChromaDB

\`\`\`bash
# Install ChromaDB
pip install chromadb

# Start ChromaDB server
chroma run --host localhost --port 8000
\`\`\`

### 5. Build Vector Database

\`\`\`bash
cd backend
npm run build-embeddings
\`\`\`

### 6. Start the Application

\`\`\`bash
# Terminal 1: Start backend
cd backend
npm run dev

# Terminal 2: Start frontend
cd frontend
npm run dev
\`\`\`

Visit `http://localhost:3000` to use the application.

## 🚀 Deployment

### Deploy to Vercel

1. **Prepare for deployment**:
   \`\`\`bash
   # Make sure all dependencies are installed
   npm install
   \`\`\`

2. **Set up environment variables in Vercel**:
   - `OPENROUTER_API_KEY`: Your OpenRouter API key
   - `CHROMA_URL`: Your ChromaDB instance URL

3. **Deploy**:
   \`\`\`bash
   vercel --prod
   \`\`\`

### Alternative: Manual Deployment

1. **Build the frontend**:
   \`\`\`bash
   cd frontend
   npm run build
   \`\`\`

2. **Deploy backend and frontend** to your preferred hosting service.

## 🔧 Configuration

### OpenRouter API

1. Sign up at [OpenRouter](https://openrouter.ai/)
2. Get your API key
3. Add it to your `.env` file

### Vector Database

The system uses ChromaDB for vector similarity search. You can:

- Use the local ChromaDB instance (default)
- Connect to a remote ChromaDB instance
- Replace with another vector database (requires code changes)

### Workflow Data

Add your own workflow data by:

1. Creating a `workflows.json` file in `backend/data/`
2. Running `npm run build-embeddings` to index the workflows

## 📝 API Documentation

### POST /api/generate

Generate an n8n workflow from a text description.

**Request Body**:
\`\`\`json
{
  "prompt": "Create a workflow that monitors Gmail and sends Slack notifications"
}
\`\`\`

**Response**:
\`\`\`json
{
  "workflow": {
    "name": "Generated Workflow",
    "nodes": [...],
    "connections": {...}
  },
  "similarWorkflowsCount": 5,
  "timestamp": "2024-01-01T00:00:00.000Z"
}
\`\`\`

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [n8n](https://n8n.io/) for the amazing workflow automation platform
- [OpenRouter](https://openrouter.ai/) for providing access to open-source LLMs
- [ChromaDB](https://www.trychroma.com/) for the vector database
- [Vercel](https://vercel.com/) for hosting and deployment

## 📞 Support

If you have any questions or need help:

1. Check the [Issues](https://github.com/yourusername/n8n-workflow-generator/issues) page
2. Create a new issue if your question isn't answered
3. Join our community discussions

---

**Made with ❤️ for the automation community**
