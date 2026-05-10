# AI Website Builder

An AI-powered tool that generates complete, production-ready websites from text prompts. Describe the website you want, and get working HTML/CSS/JS or React code instantly.

## Features

- **Prompt-to-Website**: Describe any website and get complete, working code
- **Live Preview**: See your generated website rendered in real-time with responsive viewport controls (desktop, tablet, mobile)
- **Streaming Generation**: Watch the HTML being generated in real-time
- **Code Editor**: View and inspect generated code with syntax highlighting
- **Multiple Frameworks**: Generate plain HTML/CSS/JS or React components
- **Download**: Export generated files as individual files or a ZIP archive
- **Modern UI**: Dark theme with smooth animations

## Tech Stack

- **Frontend**: React + Vite + Tailwind CSS
- **Backend**: FastAPI + OpenAI API
- **Code Editor**: CodeMirror 6

## Quick Start

### Prerequisites

- Node.js 18+
- Python 3.10+
- OpenAI API key

### Backend Setup

```bash
cd backend
python -m venv .venv
source .venv/bin/activate
pip install -e .
cp .env.example .env
# Edit .env and add your OPENAI_API_KEY
uvicorn app.main:app --reload --port 8000
```

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

The app will be available at `http://localhost:5173`.

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `OPENAI_API_KEY` | Your OpenAI API key | Required |
| `OPENAI_MODEL` | Model to use for generation | `gpt-4o-mini` |
| `CORS_ORIGINS` | Allowed CORS origins | `http://localhost:5173` |

## Project Structure

```
.
├── backend/
│   ├── app/
│   │   ├── main.py          # FastAPI app
│   │   ├── schemas.py       # Pydantic models
│   │   ├── prompts.py       # AI system prompts
│   │   └── routes/
│   │       └── generator.py  # Generation endpoints
│   ├── pyproject.toml
│   └── .env.example
├── frontend/
│   ├── src/
│   │   ├── App.jsx           # Main app component
│   │   ├── components/       # React components
│   │   ├── utils/            # API & download helpers
│   │   └── index.css         # Global styles
│   ├── package.json
│   └── vite.config.js
└── README.md
```

## License

MIT
