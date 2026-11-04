from app.db.session import SessionLocal
from backend.app.services.agent.agent_type_service import create_agent_type


db = SessionLocal()

try:
    # Alapértelmezetten aktív
    #create_agent_type(db, "assistant")

    # Saját leírással
    create_agent_type(
        db,
        "researcher",
        "Információkat keres és elemez.",
    )

    # Inaktív típusként
    create_agent_type(
        db,
        "experimental",
        "Kísérleti agent típus.",
        is_active=False,
    )
    print("Agent type created successfully!")
finally:
    db.close()