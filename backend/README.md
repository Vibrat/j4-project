# Backend Service for Funny Movies

This project contributes to the backend service of Funny Movies which are composed of the following features:

- Authentication API with JWT bearer issuer available under `/ath/login`
- CRUD for sharing videos model using background tasks available under `/videos`
- A broadcasting server built by websocket for broading sharing videos available under `/ws/broadcast`

API documentation:

- [Redoc](https://remi.tuidoc.com/redoc)
- [Swagger](https://remi.tuidoc.com/docs)


## Installation & Configuration

The project can be set up either using Docker or local environment. **Note**: Seeds data is initialized on docker container automatically. It is recommended to run database via Docker and either running backend service locally or using Docker.

### Prerequisites

- Python >= 3.10
- Macos Intel 14.3.1
- Docker

### Using Docker

- Build docker image

```bash
docker compose build
```

- Start the backend service. The service will be avaialbe under port 8000

```bash
docker compose up
```

### Local setup

- Make sure to install Python >= 3.10
- Initiate a local pip environment.

```bash
python3 -m venv ./.venv
```

- Activate local python environment (need to activate on every new terminal session)

```bash
source ./.venv/bin/activate
```

- Install dependencies

```bash
pip install -r ./requirements.txt
```

- Run the service

```bash
fastapi dev ./src/main.py
```

- Run tests (optional)

```bash
./run_tests.sh
```

## Usage

Authentication flow is designed minimally and it works as follows:

- If user enter email / password for the first time, an account will be created and jwt token is given.
- Second time user enter email / password, both credentials need to match with database to be given access.

## Next release

- Add migration structure to project.
- Moving app to micro-architect to allow scaling.