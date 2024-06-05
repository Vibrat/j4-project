from sqlalchemy.orm import Session
from ...dependencies.db import models

def get_user_by_email(db: Session, email: str):
  """
  Retrieves a user from the database based on the provided email.

  Args:
      db (Session): The database session object.
      email (str): The email of the user to retrieve.

  Returns:
      models.User or None: The user object if found, None otherwise.
  """
  return db.query(models.User).filter(models.User.email == email).first()

def create_user(db: Session, user: models.User):
  """
  Creates a new user in the database.

  Args:
      db (Session): The database session object.
      user (models.User): The user object to be created.

  Returns:
      models.User
  """
  db.add(user)
  db.commit()
  db.refresh(user)
  return user