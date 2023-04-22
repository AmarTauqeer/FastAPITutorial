import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from routes.user import user

app = FastAPI()

app.include_router(user)

app.add_middleware(
    CORSMiddleware,
    allow_methods=["*"],
    allow_headers=["*"],
    allow_credentials=True,
    allow_origins=["http://localhost:3000"]
)

if __name__ == '__main__':
    uvicorn.run(app, host='127.0.0.1', port=8001)
