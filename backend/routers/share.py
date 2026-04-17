from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from database import get_db
from models import Share
from schemas import ShareRequest

router = APIRouter()

@router.post("/{doc_id}")
def share_doc(doc_id: int, req: ShareRequest, db: Session = Depends(get_db)):
    share = Share(document_id=doc_id, user_id=req.user_id)
    db.add(share)
    db.commit()
    return {"message": "shared"}