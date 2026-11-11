def validate_not_empty(value: str) -> str:
    if not value.strip():
        raise ValueError("This field is required")

    return value.strip()