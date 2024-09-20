from src.baml_client.sync_client import b
from src.baml_client.types import MessageOutput
import json


def instigate(messages: str) -> MessageOutput:
    response = b.ExtractInstigation(messages)
    return response
