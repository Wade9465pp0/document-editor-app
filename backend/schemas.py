from pydantic import BaseModel

class DocumentCreate(BaseModel):
    title: str

class DocumentUpdate(BaseModel):
    content: str

class ShareRequest(BaseModel):
    user_id: int