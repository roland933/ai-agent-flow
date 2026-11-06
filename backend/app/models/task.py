from sqlalchemy import String, Text,Enum as SQLAlchemyEnum
from sqlalchemy.orm import Mapped, mapped_column,relationship
from app.enums import ExecutionStatus
from app.db.base import Base


class Task(Base):
    __tablename__ = "tasks"

    id: Mapped[int] = mapped_column(primary_key=True)
    title: Mapped[str] = mapped_column(String(150), nullable=False)
    description: Mapped[str | None] = mapped_column(Text, nullable=True)
    status: Mapped[ExecutionStatus] = mapped_column(
        SQLAlchemyEnum(
            ExecutionStatus,
            name="execution_status",
            values_callable=lambda enum: [item.value for item in enum],
        ),
        default=ExecutionStatus.PENDING,
        nullable=False,
    )
    assignments:Mapped[list["AgentAssignment"]] = relationship(back_populates="task")