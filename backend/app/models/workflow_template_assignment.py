
from sqlalchemy import ForeignKey, Integer, Text
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.db.base import Base


class WorkflowTemplateAssignment(Base):
    __tablename__ = "workflow_template_assignments"

    id: Mapped[int] = mapped_column(primary_key=True)

    workflow_id: Mapped[int] = mapped_column(
        ForeignKey("workflow_templates.id"),
        nullable=False,
    )

    agent_id: Mapped[int] = mapped_column(
        ForeignKey("agents.id"),
        nullable=False,
    )

    instructions: Mapped[str | None] = mapped_column(
        Text,
        nullable=True,
    )

    sequence: Mapped[int] = mapped_column(
        Integer,
        nullable=False,
    )

    workflow: Mapped["WorkflowTemplate"] = relationship(
        back_populates="assignments",
    )

    agent: Mapped["Agent"] = relationship()
