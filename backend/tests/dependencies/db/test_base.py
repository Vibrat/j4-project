import os
import tempfile
from unittest import TestCase, mock
from src.dependencies.db.base import SQLORM

TEST_DIR = tempfile.gettempdir()

class TestDatabaseBase(TestCase):
  def test_database_launch_session(self):
    session = SQLORM(database_url="sqlite:///:memory:test.db").get_session()
    self.assertTrue(session.is_active, "Session should be active")

  def test_if_database_conn_is_singleton(self):
    conn1 = SQLORM(database_url="sqlite:///:memory:test1.db")
    conn2 = SQLORM(database_url="sqlite:///:memory:test2.db")
    self.assertEqual(conn1, conn2, "Session should be the same instance")

  def test_if_creation_success(self):
    try:
      conn = SQLORM(database_url=f"sqlite:///{TEST_DIR}/test3.db")
      conn.base.metadata.create_all(conn.engine)
    except Exception as e:
      self.fail(f"Failed to create database: {e}")
  