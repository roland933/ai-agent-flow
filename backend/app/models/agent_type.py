from sqlalchemy import String, Text, Boolean
from sqlalchemy.orm import Mapped, mapped_column,relationship

from app.db.base import Base


class AgentType(Base):
    __tablename__="agent_types"

    id:Mapped[int] = mapped_column(primary_key=True)
    name:Mapped[str] = mapped_column(
        String(50),
        unique=True,
        nullable=False
    )

    description:Mapped[str | None] = mapped_column(
        Text,
        nullable=True,
    )

    is_active: Mapped[bool] = mapped_column(
        Boolean,
        default=True,
        nullable=False
    )

    agents: Mapped[list["Agent"]] = relationship(back_populates="agent_type")