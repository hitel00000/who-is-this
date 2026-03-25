# Who is this? 🎤

한글 음성에 감정 표현을 더하는 웹 기반 음성 조절 앱입니다.

## 📋 개요

웹 Audio API를 활용하여 음성의 톤(tone)을 실시간으로 조절할 수 있습니다. 톤 슬라이더 하나만으로 음성을 밝게 또는 우울하게 변경할 수 있으며, 자동 이퀄라이저가 선택된 톤에 맞춰 음색을 조절합니다.

## ✨ 주요 기능

### 기본 기능
- **음성 타입 선택**: 여러 음성 중 선택 가능
  - Default: 기본 음성 (mp3 형식)
  - Jeongwoong: 정웅의 목소리 (m4a 형식)

- **음성 재생**: 4가지 한글 음성 제공
  - "누구세요" - who
  - "괜찮아요" - ok
  - "네" - yes
  - "아니오" - no

### 음성 조절
- **Tone (톤)** - 음성의 밝기 조절
  - 0에 가까울수록 어두운/우울한 소리
  - 1에 가까울수록 밝은/생생한 소리
  - 자동 이퀄라이저가 3kHz 대역을 함께 조절 (-12dB ~ +12dB)

- **Pitch (음정)** - 목소리 높낮이 조절
  - 0.5배속 ~ 1.5배속 범위에서 조절

- **Volume (음량)** - 재생 음량 조절
  - 0 ~ 1 범위에서 선형 조절

### 추가 기능
- 모든 설정이 로컬스토리지에 자동 저장
- 모바일 환경에서 진동 피드백 지원
- PWA(Progressive Web App) 지원 - 오프라인 사용 가능

## 🛠️ 기술 스택

- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **Audio Processing**: Web Audio API
  - Highpass Filter (80~300Hz)
  - Peaking EQ Filter (3kHz)
  - Lowpass Filter (800~8000Hz)
  - Gain Control
- **PWA**: Service Worker

## 🚀 사용 방법

### 1. 로컬에서 실행
```bash
python -m http.server 8000
```
브라우저에서 `http://localhost:8000` 접속

### 2. 웹 서버에 배포
모든 파일을 웹 서버의 공개 디렉토리에 업로드

### 3. PWA로 설치
브라우저의 "설치" 버튼을 클릭하여 앱으로 설치 가능

## 📁 파일 구조

```
who-is-this/
├── index.html           # 메인 UI 및 JavaScript 로직
├── manifest.json        # PWA 매니페스트
├── sw.js               # Service Worker (오프라인 지원)
├── generate_tts.py     # 음성 파일 생성 스크립트
├── README.md           # 이 파일
└── audio/              # 음성 파일 디렉토리
    ├── who.mp3         # 기본 음성
    ├── ok.mp3
    ├── yes.mp3
    ├── no.mp3
    └── jeongwoong/     # 정웅의 목소리
        ├── who.m4a
        ├── ok.m4a
        ├── yes.m4a
        └── no.m4a
```

## 🔧 음성 파일 생성

gTTS(Google Text-to-Speech)를 사용하여 음성 파일을 생성합니다.

```bash
pip install gtts
python generate_tts.py
```

## 🎵 새로운 음성 타입 추가 방법

1. **음성 파일 준비**
   - `audio/{voice-type}/` 디렉토리 생성
   - `who.{ext}`, `ok.{ext}`, `yes.{ext}`, `no.{ext}` 파일 추가

2. **index.html 수정**
   - `VOICE_TYPES` 객체에 새로운 음성 타입 추가:
   ```javascript
   const VOICE_TYPES = {
     default: { label: "Default", extension: ".mp3", baseDir: "audio" },
     jeongwoong: { label: "Jeongwoong", extension: ".m4a", baseDir: "audio/jeongwoong" },
     // 새로운 음성 타입을 여기에 추가
     newvoice: { label: "New Voice", extension: ".mp3", baseDir: "audio/newvoice" },
   };
   ```
   - 필요한 음성 구문은 `PHRASES` 배열에서 관리됩니다 (이미 who, ok, yes, no 포함)

3. **빌드/재배포**
   - 변경 사항을 저장하고 서버 재시작

## 🎨 필터링 동작 원리

Tone 값에 따라 다음과 같이 자동 조절됩니다:

| 톤 값 | 하이패스 (Hz) | 로우패스 (Hz) | EQ 게인 (dB) | 느낌 |
|-------|-----------|-----------|-----------|------|
| 0.0 | 80 | 800 | -12 | 우울한, 먹먹한 |
| 0.5 | 190 | 4400 | 0 | 중립적 |
| 1.0 | 300 | 8000 | +12 | 밝은, 생생한 |

## 💾 로컬스토리지 저장 항목

- `who-is-this:voiceType` - 선택된 음성 타입 (default/jeongwoong)
- `who-is-this:tone` - 톤 값
- `who-is-this:pitch` - 음정 값
- `who-is-this:volume` - 음량 값
- `who-is-this:controlsOpen` - 추가 컨트롤 패널 열림 상태

## 🌐 브라우저 호환성

- Chrome/Edge 95+
- Firefox 94+
- Safari 14.1+
- 모바일 브라우저 (Android Chrome, iOS Safari)

## 📄 라이센스

MIT

## 🤝 기여

개선 사항이나 버그 수정에 대한 이슈 및 PR을 환영합니다!