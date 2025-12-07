# CNPA Quiz App 🎓

A Progressive Web App (PWA) for practicing CNCF Certified Cloud Native Platform Engineering Associate (CNPA) exam questions.

## Features

- ✅ 135 practice questions covering CNPA exam topics
- 🎲 Random selection of 50 questions per quiz attempt
- 📱 Offline support via Service Worker
- 💾 Progress tracking with IndexedDB
- 🎨 Responsive design for mobile and desktop
- 📖 Comprehensive question explanations (150-200 words)
- 🏷️ Difficulty levels: Easy, Medium, Hard
- 📊 Score tracking and results summary

## Quick Start

### Prerequisites

- Python 3.x (for local development server)
- Modern web browser with PWA support (Chrome, Firefox, Safari, Edge)

### Installation & Running

1. **Clone the repository:**
```bash
git clone <your-repo-url>
cd cnpa-quiz-app
```

2. **Start the development server:**
```bash
python3 -m http.server 8000 --directory public
```

3. **Open in your browser:**
```
http://localhost:8000
```

4. **Start practicing!**
   - Click "Start Quiz" to begin
   - Answer questions and get instant feedback
   - Your progress is automatically saved

### Installing as a PWA

#### Desktop (Chrome/Edge):
1. Open `http://localhost:8000`
2. Look for the install icon (⊕) in the address bar
3. Click "Install" to add to your desktop

#### Mobile (iOS):
1. Open in Safari
2. Tap the Share button
3. Select "Add to Home Screen"

#### Mobile (Android):
1. Open in Chrome
2. Tap the menu (⋮)
3. Select "Add to Home Screen"

## Usage

### Starting a Quiz
- Click **"Start Quiz"** to begin with 50 randomly selected questions from the 104-question bank
- Each quiz attempt will have different questions
- Click **"Continue Quiz"** to resume from where you left off

### Answering Questions
1. Read the question carefully
2. Select your answer by clicking an option
3. Click **"Submit Answer"** to check if you're correct
4. Read the explanation to understand the concept
5. Click **"Next Question"** to continue

### Viewing Results
- Complete all questions to see your final score
- Review your percentage and total correct answers
- Click **"Start New Quiz"** to practice again

## Troubleshooting

### Service Worker Cache Issues

If you see old content after updates:

**Option 1: Hard Refresh**
- Windows/Linux: `Ctrl + Shift + R`
- Mac: `Cmd + Shift + R`

**Option 2: Clear Cache via DevTools**
1. Open DevTools (`F12`)
2. Go to **Application** tab
3. Click **"Clear storage"** in the left sidebar
4. Click **"Clear site data"** button
5. Refresh the page

### Questions Not Loading

If questions don't appear:
1. Check browser console for errors (`F12` → Console tab)
2. Verify the server is running on port 8000
3. Ensure `public/data/questions.json` exists
4. Try clearing cache and hard refreshing

### Port Already in Use

If port 8000 is busy:
```bash
# Use a different port
python3 -m http.server 8080 --directory public

# Then access at http://localhost:8080
```

## Project Structure

```
cnpa-quiz-app/
├── public/                    # All served files
│   ├── index.html            # Main HTML file
│   ├── manifest.json         # PWA manifest
│   ├── service-worker.js     # Service worker for offline support
│   ├── css/
│   │   └── styles.css        # Application styles
│   ├── js/
│   │   ├── app.js           # Main application logic
│   │   ├── quiz.js          # Quiz state management
│   │   ├── db.js            # IndexedDB wrapper
│   │   └── sw-register.js   # Service worker registration
│   ├── data/
│   │   └── questions.json   # Quiz questions (135 questions)
│   └── icons/
│       ├── icon-192.png     # PWA icon (192x192)
│       ├── icon-512.png     # PWA icon (512x512)
│       └── icon.svg         # Source SVG icon
├── predata/                  # Raw question data sources
│   ├── questions.json       # Original 30 questions
│   ├── questions_gpt.json   # 20 GPT-generated questions
│   ├── questions_additional_20.json      # 5 LF-style questions
│   ├── questions_comprehensive_45.json   # 29 comprehensive questions
│   ├── questions_final_20.json           # 20 final questions
│   ├── questions_batch2_lf.json          # 16 LF sample questions
│   └── questions_batch2_extended.json    # 15 extended questions
├── scripts/
│   └── convert_questions.py # Data conversion script
└── README.md                # This file
```

## Data Management

### Question Format

Questions are stored in JSON with this structure:
```json
{
  "id": "CNPA-001",
  "domain": "Platform Engineering Core Fundamentals",
  "topic": "Automation and Efficiency",
  "difficulty": "easy",
  "question_type": "single_choice",
  "question_text": "What is the goal of automating processes?",
  "options": [
    { "id": "A", "text": "Option A text" },
    { "id": "B", "text": "Option B text" }
  ],
  "correct_option_ids": ["A"],
  "explanation": "Detailed explanation here",
  "tags": ["automation", "efficiency"]
}
```

### Adding More Questions

1. Edit `predata/questions.json` or `predata/questions_gpt.json`
2. Run the conversion script:
```bash
python3 scripts/convert_questions.py
```
3. Restart the server and hard refresh your browser

## Technology Stack

- **Frontend:** Pure HTML5, CSS3, JavaScript (no frameworks)
- **Storage:** IndexedDB for client-side data persistence
- **Offline:** Service Workers for PWA functionality
- **Server:** Python's built-in HTTP server (development only)

## Browser Support

- ✅ Chrome/Edge 67+
- ✅ Firefox 63+
- ✅ Safari 11.1+
- ✅ Mobile browsers (iOS Safari, Chrome Android)

## Development

### Modifying Questions
```bash
# Edit question files in predata/
vim predata/questions.json

# Convert to app format
python3 scripts/convert_questions.py

# Restart server (Ctrl+C then restart)
python3 -m http.server 8000 --directory public
```

### Updating Service Worker
When you make changes to cached files:
1. Update `CACHE_NAME` version in `public/service-worker.js`
2. Users will need to hard refresh to get updates

### Testing PWA Features
1. Open DevTools (`F12`)
2. Go to **Application** tab
3. Check:
   - **Manifest:** Verify PWA configuration
   - **Service Workers:** Check registration status
   - **Storage → IndexedDB:** View saved quiz progress
   - **Cache Storage:** See cached resources

## Contributing

Contributions welcome! Areas for improvement:
- Additional practice questions
- Question filtering by topic/difficulty
- Review mode for incorrect answers
- Statistics and progress tracking
- Timed quiz mode
- Multi-language support

## License

Unofficial practice questions for educational purposes. Not affiliated with CNCF or Linux Foundation.

## Acknowledgments

- Questions based on CNCF CNPA exam domains
- Built with vanilla JavaScript for maximum compatibility
- Icons generated with SVG and ImageMagick

---

**Happy studying! Good luck with your CNPA certification! 🚀**
