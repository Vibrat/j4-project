# Frontend app for Funny Movies

This project contributes to the frontend app of Funny Movies which is written using React/ Nextjs. The project is comprised of:

- Authentication UI with login or register feature.
- Videos Listing after crawling from youtube.
- A websocket channel that receives broadcasting messages from backend.

## Installation & Configuration

The project can be set up either using Docker or local environment.

### Prerequisites

- Nodejs v21.3.0
- Macos Intel 14.3.1
- Docker

### Local setup

- Install dependencies

```bash
npm install
```

- Start the project

```bash
npm run dev
```

- Running test (optional)

```bash
npm run test
```

### Running using Docker

- Build docker image

```bash
docker compose build
```

- Start the backend service. The service will be avaialbe under port 3000

```bash
docker compose up
```

### Next release

- Improve performance of applications
- Implement ping/ pong mechanism to fix implicit disconnection from broadcasting server