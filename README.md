# AI Assistant

A conversational AI assistant powered by Cloudflare Workers AI and Llama 3.3 70B, featuring persistent chat history using Durable Objects.

## Features

- **LLM**: Llama 3.3 70B on Cloudflare Workers AI
- **Workflow/Coordination**: Durable Objects for session management
- **User Input**: Interactive chat interface with typing indicators
- **Memory/State**: Persistent conversation history across sessions
- **Dark Mode UI**: Professional SaaS-style interface

## Architecture

- **Backend**: Cloudflare Workers with TypeScript
- **AI Model**: `@cf/meta/llama-3.3-70b-instruct-fp8-fast`
- **State Management**: Durable Objects for conversation persistence
- **Frontend**: Vanilla HTML/CSS/JavaScript

## Prerequisites

- Node.js and npm
- Cloudflare account
- Wrangler CLI (`npm install -g wrangler`)

## Setup

1. Clone the repository:
```bash
git clone <your-repo-url>
cd cf-ai-assistant
```

2. Install dependencies:
```bash
npm install
```

3. Login to Cloudflare:
```bash
wrangler login
```

4. Run development server:
```bash
wrangler dev --remote
```

5. In a separate terminal, serve the frontend:
```bash
cd frontend
python3 -m http.server 3000
```

6. Open http://localhost:3000 in your browser

## Deployment

Deploy to Cloudflare:
```bash
wrangler deploy
```

## Project Structure

```
cf-ai-assistant/
├── src/
│   ├── index.ts          # Main worker entry point
│   └── ChatSession.ts    # Durable Object for chat sessions
├── frontend/
│   ├── index.html        # Landing page
│   ├── style.css         # Dark mode styling
│   └── script.js         # Chat functionality
├── wrangler.jsonc        # Cloudflare configuration
└── package.json
```

## Technologies

- Cloudflare Workers
- Cloudflare Workers AI
- Durable Objects
- TypeScript
- Llama 3.3 70B

## License

MIT
