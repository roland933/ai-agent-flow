from sqlalchemy import ForeignKey, String, Text, Integer, JSON
from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy import Enum as SQLAlchemyEnum
from app.enums import ExecutionStatus
from app.db.base import Base


class AgentAssignment(Base):
    __tablename__ = "agent_assignments"

    id: Mapped[int] = mapped_column(primary_key=True)

    task_id: Mapped[int] = mapped_column(
        ForeignKey("tasks.id"),
        nullable=False,
    )

    agent_id: Mapped[int] = mapped_column(
        ForeignKey("agents.id"),
        nullable=False,
    )

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

    sequence: Mapped[int] = mapped_column(Integer, nullable=False)

    input_data: Mapped[dict | None] = mapped_column(JSON, nullable=True)
    output_data: Mapped[dict | None] = mapped_column(JSON, nullable=True)

    task: Mapped["Task"] = relationship(back_populates="assignments")
    agent: Mapped["Agent"] = relationship(back_populates="assignments")