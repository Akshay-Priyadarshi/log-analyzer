# Log Analyzer


## Backend (FastAPI + Google ADK)
### Prerequisites
1. [uv](https://docs.astral.sh/uv/)

### Setup & Running the project

1. Change directory to `backend`
    ```BASH
    $ cd backend
    ```

1. Initialise the virtual environment
    ```BASH
    $ uv venv
    ```

1. Install all required dependencies
    ```BASH
    $ uv sync
    ```

1. Activate the environment
    
    For MacOS
    ```BASH
    $ source ./.venv/bin/activate
    ```

    For Windows (PowerShell)
    ```PS
    $ .\.venv\Scripts\Activate.ps1
    ```

    For Windows (CMD)
    ```CMD
    $ .\.venv\Scripts\activate.bat
    ```

1. Run the application
    ```BASH
    $ uv run main.py
    ```


## Frontend (NextJS)

### Prerequisites

1. [NodeJS](https://nodejs.org/en/download)
2. [pnpm](https://pnpm.io/installation)

    Install pnpm using 
    ```BASH
    $ npm i -g pnpm
    ```

### Setup & Running the project

1. Change directory to `frontend`
    ```BASH
    $ cd frontend
    ```

1. Install dependencies for the project
    ```BASH
    $ pnpm i
    ```

1. Run the project in development
    ```BASH
    $ pnpm dev
    ```

1. Running (Production)
    ```BASH
    $ pnpm start
    ```


