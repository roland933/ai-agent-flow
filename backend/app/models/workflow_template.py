
from sqlalchemy import String, Text
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.db.base import Base


class WorkflowTemplate(Base):
    __tablename__ = "workflow_templates"

    id: Mapped[int] = mapped_column(primary_key=True)

    name: Mapped[str] = mapped_column(
        String(150),
        nullable=False,
    )

    description: Mapped[str | None] = mapped_column(
        Text,
        nullable=True,
    )

    task_title: Mapped[str] = mapped_column(
        String(150),
        nullable=False,
    )

    task_description: Mapped[str | None] = mapped_column(
        Text,
        nullable=True,
    )

    output_name: Mapped[str] = mapped_column(
        String(150),
        nullable=False,
    )

    output_description: Mapped[str | None] = mapped_column(
        Text,
        nullable=True,
    )

    output_format: Mapped[str] = mapped_column(
        String(20),
        nullable=False,
        default="markdown",
    )

    assignments: Mapped[list["WorkflowTemplateAssignment"]] = relationship(
        back_populates="workflow",
        cascade="all, delete-orphan",
        order_by="WorkflowTemplateAssignment.sequence",
    )


    
