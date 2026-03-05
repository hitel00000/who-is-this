from gtts import gTTS

texts = {
    "who": "누구세요",
    "ok": "괜찮아요",
    "yes": "네",
    "no": "아니오"
}

for name, text in texts.items():
    tts = gTTS(text=text, lang='ko')
    tts.save(f"audio/{name}.mp3")
