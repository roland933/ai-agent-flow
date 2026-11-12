from fastapi import HTTPException
from sqlalchemy.orm import Session

def validate_not_empty(value: str) -> str:
    if not value.strip():
        raise ValueError("This field is required")

    return value.strip()



def validate_unique_field(
    db: Session,
    model,
    field_name: str,
    value: str,
    error_message: str,
    exclude_id: int | None = None,
):
    query = db.query(model).filter(
        getattr(model, field_name) == value
    )

    if exclude_id is not None:
        query = query.filter(model.id != exclude_id)

    if query.first():
        raise HTTPException(
            status_code=409,
            detail=error_message,
        )