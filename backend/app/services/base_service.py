from typing import TypeVar,Generic,Callable
from sqlalchemy.orm import Session,Query
from fastapi import HTTPException
from pydantic import BaseModel
from app.db.base import Base

T = TypeVar("T",bound=Base)
CreateSchema = TypeVar("CreateSchema", bound=BaseModel)
UpdateSchema = TypeVar("UpdateSchema", bound=BaseModel)

class BaseService(Generic[T,CreateSchema,UpdateSchema]):

    model: type[T]

    def create(self,db: Session,create_data:CreateSchema)->T:
        try:
            model = self.model(**create_data.model_dump())

            db.add(model)
            db.commit()
            db.refresh(model)

            return model

        except Exception:
            db.rollback()
            raise

    def update(
        self,
        db: Session,
        id: int,
        update_data:UpdateSchema,
        detail_message: str = "Not found",
)->T:
        try:
            model = self.get_by_id(db, id, detail_message)

            data = update_data.model_dump(exclude_unset=True)

            for key, value in data.items():
                setattr(model, key, value)

            db.commit()
            db.refresh(model)

            return model
        except Exception:
             db.rollback()
             raise

    def get_all(self,db:Session)->list[T]:
        return db.query(self.model).all()

    def get_by_id(self,
                  db:Session,
                  id:int,
                  detail_message:str="Not found",
                  filter_callback: Callable[[Query], Query] | None = None
                  )->T:
            
            query = db.query(self.model)

            if filter_callback is not None:
                query = filter_callback(query)

            model =  query.filter(self.model.id == id).first()

            if model is None:
                        raise HTTPException(
                            status_code=404,
                            detail=detail_message,
                        )
            return model

    def delete(
    self,
    db: Session,
    id: int,
    detail_message: str = "Not found",
) -> None:
        model = self.get_by_id(db, id, detail_message)

        db.delete(model)
        db.commit()