import os
import requests
from dotenv import load_dotenv
import json

load_dotenv()

API_KEY = os.getenv("GEMINI_API_KEY")

API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent"

def analyze_code(code: str, language: str):
    prompt = f"""
You're a helpful programming assistant.

Analyze the following {language} code and if and provide with the following information:
1. "What it does"
2. "2. Time and space complexity" 
3. "3. Suggestions to improve it" 

Code:
{code}
"""

    headers = {
        "Content-Type": "application/json",
        "X-goog-api-key": API_KEY
    }

    data = {
        "contents": [
            {
                "parts": [
                    {
                        "text": prompt
                    }
                ]
            }
        ]
    }

    try:
        response = requests.post(API_URL, headers=headers, json=data)
        response.raise_for_status()

        result = response.json()
        raw_text = result['candidates'][0]['content']['parts'][0]['text']

        return raw_text  # ✅ Just return the raw string always

    except Exception as e:
        return f"Error: {str(e)}"
