from fastapi import FastAPI
from database import Base, engine
from routers import documents, upload, share
from fastapi.middleware.cors import CORSMiddleware

# Create tables
Base.metadata.create_all(bind=engine)

app = FastAPI()

# CORS (important)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(documents.router, prefix="/docs", tags=["Documents"])
app.include_router(upload.router, prefix="/upload", tags=["Upload"])
app.include_router(share.router, prefix="/share", tags=["Sharing"])

@app.get("/")
def root():
    return {"message": "API running"}