# MindRec - AI Recommendation Engine

MindRec is an AI-powered Recommendation Engine web application designed and built to discover movies, series, anime, books, music, games, technology content, and travel ideas tailored to personal interests.

Built in exact accordance with the **MindRec Software Requirements Specification (SRS v1.0)** and replicating the **MindRec UI Design (Figure 1)**.

---

## 📸 UI & Feature Implementation Highlights (Figure 1 Fidelity)

1. **Left Sidebar**:
   - Dark purple branded theme (`#140c2e`)
   - Branded **MindRec** logo with glowing 4-point sparkle and subtitle *"Discover. Explore. Enjoy."*
   - Navigation links: **Home** (active `#3c2079`), **Explore**, **My Profile**, **History**, **Settings**, **Logout**
   - **Bottom 3D Purple Robot Mascot**: Custom SVG artwork of the cute 3D purple robot holding a glowing golden star ⭐ with cosmic sparkles and the caption: *"Smarter Recommendations. Just for You 💜"*

2. **Top Navigation Bar**:
   - Pill-shaped search bar: `Search movies, courses, products...` with real-time debounced auto-suggestions
   - Notification bell with unread badge counter (`1`) and dropdown popover
   - User profile pill: Circular portrait of **Dharsitha** with hair bow, dropdown menu for Profile, Liked items, Admin Console, and Settings

3. **Hero Banner**:
   - Deep vibrant purple nebula gradient
   - Title: **"Your Personal AI Recommendation Engine"**
   - Subtitle: *"Discover content you'll love, powered by AI ✨"*
   - Action: **"▶ Get Started"** button
   - Visual: Magic wand emitting glowing stardust towards a 3D glowing neon brain

4. **User Summary Card**:
   - Circular avatar and greeting: *"Hello, Dharsitha! 👋 Keep exploring your interests!"*
   - Real-time stat counters matching Figure 1:
     - ⭐ **120 Points**
     - ❤️ **8 Liked**
     - 🕒 **12 History**

5. **"What are you interested in?" Preference Chips Bar**:
   - Selectable category pills: `🎬 Movies & Series ✓` (active), `💻 Technology`, `🎵 Music`, `📚 Books`, `🍙 Anime`, `🎮 Games`, `✈️ Travel`
   - **Update** button that persists preferences and recalculates recommendations via API

6. **"Your Personalized Recommendations" Grid**:
   - Ranked cards matching Figure 1:
     - **Interstellar**: `★ 95% Match` | Sci-Fi · Drama · Adventure | *"A journey beyond stars..."* | `▶ Watch Trailer` + Heart toggle
     - **Harry Potter Series**: `★ 93% Match` | Fantasy · Adventure | *"Magic, friendship, forever."* | `▶ Watch Trailer` + Heart toggle
     - **The Dark Knight**: `★ 91% Match` | Action · Crime · Drama | *"Why so serious?"* | `▶ Watch Trailer` + Heart toggle
     - **Your Name**: `★ 89% Match` | Anime · Romance · Drama | *"A story across time."* | `▶ Watch Trailer` + Heart toggle

7. **Right Sidebar Panels**:
   - **Recent Activity**:
     - *Interstellar* — Recommended · 2h ago
     - *K-Dramas* — Viewed · 1d ago
     - *Anime Picks* — Recommended · 2d ago
   - **Rate Your Recommendations**: Thumbs up (filled purple) & Thumbs down (outline) buttons with instant re-ranking feedback

8. **Bottom Row Cards**:
   - **"Not sure what to watch?"**: Let our AI decide for you! + Clapperboard graphic + **Surprise Me** button
   - **"Filter by Category"**: `All` (active), `Movies`, `Series`, `Anime`, `Documentaries`, `More ▾`

9. **Interactive YouTube Trailer Modal**:
   - Clicking `▶ Watch Trailer` on any card opens an embedded YouTube trailer player with synopsis, genres, and match score, and automatically logs trailer view activity to the backend!

---

## 🧠 Hybrid AI Recommendation Engine (SRS Section 6)

The engine computes a weighted match percentage score `(0 - 100%)` for each user using:
- **Content-Based Filtering (50%)**: Category preferences, genre overlap ratio, and textual metadata similarity.
- **Collaborative Filtering (35%)**: Co-occurrence and user interaction correlations from likes, ratings, and trailer views.
- **Popularity & Recency Signals (15%)**: Global popularity and average ratings.
- **Diversity Constraint (ER-6)**: Enforces that no more than 60% of recommendations come from a single genre.
- **Cold-Start Handling (ER-3)**: Leverages category preferences and popular items for initial discovery.
- **Negative Feedback Demotion (ER-5)**: Demotes or excludes items user thumbs-downed or disliked.
- **RAG & Live Internet Search Grounding**: Powered by Gemini and real-time knowledge graphs.

## 🚀 How to Run

1. Configure your environment (Optional for live Gemini RAG):
   ```bash
   cp .env.example .env
   # Add your GOOGLE_API_KEY to .env
   ```
2. Open PowerShell or Command Prompt in this folder.
3. Run the application:
   ```powershell
   .\run.ps1
   ```
   *Or with Command Prompt:*
   ```bat
   run.bat
   ```
4. Open your browser and navigate to:
   ```
   http://127.0.0.1:8000/
   ```

### Pre-configured Accounts

| Role | Username | Password | Notes |
|---|---|---|---|
| **User (Figure 1)** | `dharsitha` | `MindRec@2026` | Pre-seeded with 120 points, 8 liked items, 12 history entries |
| **Administrator** | `admin` | `Admin@2026` | Full access to Admin Console, analytics, item CRUD, & model retraining |
