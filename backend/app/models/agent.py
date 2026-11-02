from sqlalchemy import String,ForeignKey
from sqlalchemy.orm import Mapped, mapped_column,relationship


from app.db.base import Base

class Agent(Base):
    __tablename__="agents"

    id:Mapped[int] = mapped_column(primary_key=True)
    name:Mapped[str] = mapped_column(String(100))
    agent_type_id: Mapped[int] = mapped_column(
        ForeignKey("agent_types.id"),
        nullable=False,
    )

    agent_type: Mapped["AgentType"] = relationship(back_populates="agents")

    assignments: Mapped[list["AgentAssignment"]] = relationship(
    back_populates="agent"
)


