# AgentFlow – AI Agent Workflow Dashboard

AgentFlow is a full-stack web application for managing AI agents, organizing tasks, and monitoring workflow executions through a centralized dashboard.

The project aims to provide a structured environment where users can manage agents, assign them to tasks, and execute multi-step workflows while tracking their progress and results.

## Features

- **Dashboard Overview** – View key statistics and get an overview of tasks, agents, and executions.
- **Agent Management** – Browse and manage available AI agents.
- **Task Management** – Create, organize, and manage tasks with different execution statuses.
- **Agent Assignments** – Assign agents to tasks and define their execution order.
- **Workflow Execution** – Execute multi-step workflows where agents process tasks sequentially.
- **Execution Monitoring** – Track workflow and individual assignment statuses, including pending, in-progress, completed, and failed states.

## Tech Stack

### Frontend
- React
- TypeScript
- Vite
- Tailwind CSS
- shadcn/ui
- Zustand
- TanStack Query (React Query)

### Backend
- Python
- FastAPI
- SQLAlchemy
- Alembic
- Pydantic

### Database & Infrastructure
- PostgreSQL
- Docker
- Docker Compose

## Architecture

AgentFlow uses a separated frontend and backend architecture.

Frontend (React + TypeScript)
        |
        | HTTP / REST API
        |
Backend (FastAPI)
        |
        | SQLAlchemy
        |
PostgreSQL Database


The frontend communicates with the backend through REST API endpoints. The backend handles business logic, database operations, agent assignments, and workflow execution.

Long-running workflow execution is handled using FastAPI background tasks, allowing the API to respond immediately while the workflow continues processing.

## Project Structure


AgentFlow/
│    src/
│       ├── api/
│       ├── components/
│       ├── features/
│       ├── hooks/
│       └── ...
│
├── backend/
│   └── app/
│       ├── api/
│       │   └── routes/
│       ├── db/
│       ├── enums/
│       ├── models/
│       ├── schemas/
│       └── services/
│
└── docker-compose.yml


*The structure above is a simplified overview of the main application modules.*

## Getting Started

### Prerequisites

- Node.js and npm
- Python 3.12
- Docker and Docker Compose

### Backend Setup

1. Navigate to the backend directory.
2. Configure the required environment variables in your `.env` file.
3. Start the backend services:

```bash
docker-compose up --build
```

The FastAPI application will be available at:


http://localhost:8000


Interactive API documentation:


http://localhost:8000/docs


### Frontend Setup

1. Navigate to the frontend directory.
2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

The frontend will be available at:


http://localhost:5173


## API

The backend exposes REST API endpoints for managing agents, tasks, assignments, and workflow execution.

Main endpoint groups include:

- `/agents` – Agent management
- `/agent-types` – Agent type management
- `/tasks` – Task management and workflow execution
- `/agent-assignments` – Agent assignment management

For detailed endpoint documentation, visit the FastAPI Swagger UI at `/docs`.

## Current Development Status

AgentFlow is an actively developed project.

The core backend architecture, database models, task management endpoints, and workflow execution logic are being developed alongside the frontend API integration.

Some functionality may still be under development or use simulated agent execution results.

## Future Improvements

- Integration with real AI models and external AI APIs.
- Advanced workflow configuration.
- Improved execution history and monitoring.
- More detailed agent configuration.
- Authentication and user management.
- Enhanced error handling and execution recovery.


**AgentFlow** – A centralized dashboard for managing AI agents and orchestrating workflows.