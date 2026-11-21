const { useState, useEffect, useRef } = React;

// API Base URL
const API_BASE = '/api/v1';

// Robot Mascot SVG Component (Exact replica of Figure 1 bottom sidebar)
function RobotMascot() {
  return (
    <div className="relative mt-auto pt-4 pb-2 px-3">
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-b from-[#251550] to-[#170c36] p-4 text-center border border-purple-500/20 shadow-lg">
        {/* Glowing sparkles background */}
        <div className="absolute top-2 left-3 w-1.5 h-1.5 bg-yellow-300 rounded-full animate-ping opacity-75"></div>
        <div className="absolute top-6 right-4 w-1 h-1 bg-purple-300 rounded-full animate-pulse"></div>
        <div className="absolute bottom-4 left-4 w-1 h-1 bg-yellow-200 rounded-full"></div>
        
        {/* Robot SVG with 3D purple lighting holding a glowing yellow star */}
        <div className="relative w-28 h-28 mx-auto -mb-2 flex items-center justify-center">
          <svg viewBox="0 0 160 160" className="w-full h-full drop-shadow-[0_8px_16px_rgba(112,59,247,0.4)]">
            <defs>
              <linearGradient id="robotBodyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ede9fe" />
                <stop offset="45%" stopColor="#c4b5fd" />
                <stop offset="85%" stopColor="#8b5cf6" />
                <stop offset="100%" stopColor="#6d28d9" />
              </linearGradient>
              <linearGradient id="robotScreenGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#1e1b4b" />
                <stop offset="100%" stopColor="#0f172a" />
              </linearGradient>
              <radialGradient id="starGlow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#fef08a" />
                <stop offset="40%" stopColor="#facc15" />
                <stop offset="100%" stopColor="#eab308" />
              </radialGradient>
              <filter id="glowEffect" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>

            {/* Antennas */}
            <line x1="80" y1="45" x2="80" y2="28" stroke="#a78bfa" strokeWidth="4" strokeLinecap="round" />
            <circle cx="80" cy="24" r="6" fill="#c084fc" filter="url(#glowEffect)" />
            <line x1="50" y1="52" x2="40" y2="38" stroke="#a78bfa" strokeWidth="3" strokeLinecap="round" />
            <circle cx="38" cy="35" r="4" fill="#a855f7" />

            {/* Robot Head */}
            <rect x="42" y="44" width="76" height="58" rx="26" fill="url(#robotBodyGrad)" stroke="#ffffff" strokeWidth="2" />
            
            {/* Dark Visor Screen */}
            <rect x="52" y="56" width="56" height="34" rx="14" fill="url(#robotScreenGrad)" />

            {/* Glowing Eyes */}
            <ellipse cx="66" cy="72" rx="4.5" ry="6.5" fill="#38bdf8" filter="url(#glowEffect)" />
            <ellipse cx="94" cy="72" rx="4.5" ry="6.5" fill="#38bdf8" filter="url(#glowEffect)" />
            {/* Smile */}
            <path d="M74 81 Q80 86 86 81" fill="none" stroke="#38bdf8" strokeWidth="2.5" strokeLinecap="round" />

            {/* Robot Body */}
            <rect x="54" y="98" width="52" height="42" rx="18" fill="url(#robotBodyGrad)" />
            {/* Center Heart/Core */}
            <circle cx="80" cy="116" r="6" fill="#a855f7" />
            <circle cx="80" cy="116" r="3" fill="#e9d5ff" />

            {/* Left Arm resting */}
            <path d="M52 108 C40 114 42 128 50 134" fill="none" stroke="url(#robotBodyGrad)" strokeWidth="9" strokeLinecap="round" />
            
            {/* Right Arm raised holding the glowing Star */}
            <path d="M106 108 C118 104 128 95 132 84" fill="none" stroke="url(#robotBodyGrad)" strokeWidth="9" strokeLinecap="round" />

            {/* Golden Star in hand with glow */}
            <g transform="translate(132, 76) scale(0.9)" filter="url(#glowEffect)">
              <polygon points="0,-16 4.5,-5 16,-4 7.5,4 10,15 0,9 -10,15 -7.5,4 -16,-4 -4.5,-5" fill="url(#starGlow)" stroke="#fef9c3" strokeWidth="1" />
            </g>
          </svg>
        </div>

        <p className="text-[13px] font-semibold text-purple-200 tracking-tight leading-tight mt-1">
          Smarter Recommendations.
        </p>
        <p className="text-[12px] text-purple-300/80 font-medium mt-0.5">
          Just for You 💜
        </p>
      </div>
    </div>
  );
}

// Hero Brain & Magic Wand SVG Artwork (Figure 1 Banner Right Side)
function HeroIllustration() {
  return (
    <div className="relative w-64 h-48 md:w-80 md:h-52 flex items-center justify-center select-none pointer-events-none">
      {/* Ambient Radial Glow */}
      <div className="absolute w-48 h-48 bg-purple-400/25 rounded-full blur-2xl animate-soft-pulse"></div>

      <svg viewBox="0 0 320 220" className="w-full h-full drop-shadow-[0_10px_25px_rgba(0,0,0,0.3)]">
        <defs>
          <linearGradient id="wandGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="30%" stopColor="#e9d5ff" />
            <stop offset="100%" stopColor="#1e103f" />
          </linearGradient>
          <linearGradient id="brainNeon" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#c084fc" />
            <stop offset="50%" stopColor="#e879f9" />
            <stop offset="100%" stopColor="#818cf8" />
          </linearGradient>
          <radialGradient id="sparkleLight" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="40%" stopColor="#f3e8ff" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
        </defs>

        {/* 3D Wireframe Glowing Neon Brain */}
        <g transform="translate(170, 45)" className="animate-soft-pulse">
          {/* Brain Left Hemisphere */}
          <path d="M55,30 C45,15 25,12 12,25 C-2,38 -2,65 10,78 C15,84 22,95 38,98 C50,100 55,85 55,70 Z" 
                fill="none" stroke="url(#brainNeon)" strokeWidth="3.5" strokeDasharray="3 2" />
          {/* Brain Right Hemisphere */}
          <path d="M55,30 C65,15 85,12 98,25 C112,38 112,65 100,78 C95,84 88,95 72,98 C60,100 55,85 55,70 Z" 
                fill="none" stroke="url(#brainNeon)" strokeWidth="3.5" strokeDasharray="3 2" />
          
          {/* Internal Neural Gyri / Curves */}
          <path d="M25,35 C35,45 20,60 35,75 C45,85 50,75 50,60" fill="none" stroke="#e0e7ff" strokeWidth="2.2" opacity="0.85" />
          <path d="M85,35 C75,45 90,60 75,75 C65,85 60,75 60,60" fill="none" stroke="#e0e7ff" strokeWidth="2.2" opacity="0.85" />
          <path d="M35,28 Q55,42 75,28" fill="none" stroke="#c084fc" strokeWidth="2" opacity="0.7" />
          
          {/* Neural Synapse Nodes (Glowing Dots) */}
          <circle cx="25" cy="35" r="3" fill="#ffffff" />
          <circle cx="85" cy="35" r="3" fill="#ffffff" />
          <circle cx="35" cy="75" r="3.5" fill="#f472b6" />
          <circle cx="75" cy="75" r="3.5" fill="#38bdf8" />
          <circle cx="55" cy="55" r="4" fill="#ffffff" />
          <circle cx="15" cy="52" r="2.5" fill="#e879f9" />
          <circle cx="95" cy="52" r="2.5" fill="#c084fc" />

          {/* Glowing Neural Ring */}
          <ellipse cx="55" cy="62" rx="68" ry="48" fill="none" stroke="rgba(192, 132, 252, 0.35)" strokeWidth="1.5" strokeDasharray="6 4" />
        </g>

        {/* Floating Magic Wand with Glowing Tip */}
        <g transform="translate(60, 110) rotate(-38)" className="animate-floating">
          {/* Wand Handle & Shaft */}
          <rect x="0" y="0" width="10" height="95" rx="5" fill="url(#wandGrad)" stroke="#6b21a8" strokeWidth="1.5" />
          <rect x="1" y="2" width="8" height="24" rx="4" fill="#ffffff" opacity="0.9" />

          {/* Wand Star Tip */}
          <g transform="translate(5, -6)">
            <circle cx="0" cy="0" r="10" fill="url(#sparkleLight)" />
            <polygon points="0,-14 3.5,-4 14,-3 6,4 8,14 0,8 -8,14 -6,4 -14,-3 -3.5,-4" fill="#ffffff" />
          </g>
        </g>

        {/* Sparkle Stream from Wand to Brain */}
        <g opacity="0.9">
          <circle cx="108" cy="88" r="2.5" fill="#ffffff" />
          <circle cx="122" cy="76" r="4" fill="#fef08a" />
          <circle cx="138" cy="85" r="2" fill="#ffffff" />
          <circle cx="150" cy="68" r="3" fill="#e9d5ff" />
          <circle cx="162" cy="82" r="2.5" fill="#facc15" />
          <polygon points="122,60 124,66 130,68 124,70 122,76 120,70 114,68 120,66" fill="#ffffff" />
          <polygon points="152,100 154,104 158,105 154,106 152,110 150,106 146,105 150,104" fill="#fef08a" />
        </g>
      </svg>
    </div>
  );
}

// Main MindRec Application
function App() {
  // Navigation & View state
  const [currentRoute, setCurrentRoute] = useState('home');
  const [token, setToken] = useState(localStorage.getItem('mindrec_token') || 'dharsitha-session-token-mindrec-2026');
  const [currentUser, setCurrentUser] = useState({
    username: 'dharsitha',
    full_name: 'Dharsitha',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    points: 120,
    role: 'user'
  });

  // Summary & Stats
  const [summaryData, setSummaryData] = useState({
    points: 120,
    liked_count: 8,
    history_count: 12,
    recent_activity: [
      { id: 1, item_title: 'Interstellar', item_poster: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=120&auto=format&fit=crop&q=80', activity_type: 'recommended', time_ago: '2h ago' },
      { id: 2, item_title: 'K-Dramas', item_poster: 'https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?w=120&auto=format&fit=crop&q=80', activity_type: 'viewed', time_ago: '1d ago' },
      { id: 3, item_title: 'Anime Picks', item_poster: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=120&auto=format&fit=crop&q=80', activity_type: 'recommended', time_ago: '2d ago' },
    ]
  });

  // Category Preferences
  const allCategories = [
    { name: 'Movies & Series', icon: '🎬' },
    { name: 'Technology', icon: '💻' },
    { name: 'Music', icon: '🎵' },
    { name: 'Books', icon: '📚' },
    { name: 'Anime', icon: '🍙' },
    { name: 'Games', icon: '🎮' },
    { name: 'Travel', icon: '✈️' }
  ];
  const [selectedInterests, setSelectedInterests] = useState(['Movies & Series']);
  const [categoryFilter, setCategoryFilter] = useState('All');

  // Recommendations Data
  const [recommendations, setRecommendations] = useState([
    {
      id: 1,
      title: 'Interstellar',
      match_score: 95,
      genres: [{ name: 'Sci-Fi' }, { name: 'Drama' }, { name: 'Adventure' }],
      tagline: 'A journey beyond stars...',
      poster_url: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&auto=format&fit=crop&q=80',
      trailer_url: 'zSWdZVtXT7E',
      is_liked: true
    },
    {
      id: 2,
      title: 'Harry Potter Series',
      match_score: 93,
      genres: [{ name: 'Fantasy' }, { name: 'Adventure' }],
      tagline: 'Magic, friendship, forever.',
      poster_url: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=600&auto=format&fit=crop&q=80',
      trailer_url: 'VyHV0BRtdxo',
      is_liked: false
    },
    {
      id: 3,
      title: 'The Dark Knight',
      match_score: 91,
      genres: [{ name: 'Action' }, { name: 'Crime' }, { name: 'Drama' }],
      tagline: 'Why so serious?',
      poster_url: 'https://images.unsplash.com/photo-1509281373149-e957c6296406?w=600&auto=format&fit=crop&q=80',
      trailer_url: 'EXeTwQWrcwY',
      is_liked: true
    },
    {
      id: 4,
      title: 'Your Name',
      match_score: 89,
      genres: [{ name: 'Anime' }, { name: 'Romance' }, { name: 'Drama' }],
      tagline: 'A story across time.',
      poster_url: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=600&auto=format&fit=crop&q=80',
      trailer_url: 'xU47nhruN-Q',
      is_liked: false
    }
  ]);

  // Explore & Browse items
  const [exploreItems, setExploreItems] = useState([]);
  const [likedItems, setLikedItems] = useState([]);
  const [historyItems, setHistoryItems] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [unreadNotifications, setUnreadNotifications] = useState(1);

  // Search Bar
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  // Modals & Popups
  const [trailerModalItem, setTrailerModalItem] = useState(null);
  const [surpriseModalItem, setSurpriseModalItem] = useState(null);
  const [itemDetailModal, setItemDetailModal] = useState(null);
  const [similarItems, setSimilarItems] = useState([]);
  const [userStarRating, setUserStarRating] = useState(0);

  const [showNotificationMenu, setShowNotificationMenu] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  // RAG & Expanded List State
  const [aiInsights, setAiInsights] = useState('');
  const [ragMode, setRagMode] = useState('Gemini-2.5-RAG');
  const [isRagLoading, setIsRagLoading] = useState(false);
  const [isExpandedView, setIsExpandedView] = useState(false);
  const [showCategoryMore, setShowCategoryMore] = useState(false);
  const [exactMatch, setExactMatch] = useState(null);
  const [isInternetGrounded, setIsInternetGrounded] = useState(false);
  const [visibleCount, setVisibleCount] = useState(24);

  // Additional Feature Modals
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showOnboardingModal, setShowOnboardingModal] = useState(false);
  const [showAdminAddModal, setShowAdminAddModal] = useState(false);
  const [adminUsersList, setAdminUsersList] = useState([]);
  const [newItemForm, setNewItemForm] = useState({
    title: '', category_id: 1, genres: 'Sci-Fi, Adventure',
    tagline: '', description: '', poster_url: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=600',
    trailer_url: 'YoHD9XEInc0', release_year: 2025, creator: 'MindRec Studios'
  });

  // Admin state
  const [adminMetrics, setAdminMetrics] = useState(null);
  const [adminWeights, setAdminWeights] = useState({ content: 0.50, collaborative: 0.35, popularity: 0.15, min_threshold: 60 });

  // Show Toast
  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3500);
  };

  // Auth Headers
  const getHeaders = () => {
    return {
      'Content-Type': 'application/json',
      'Authorization': token ? `Bearer ${token}` : ''
    };
  };

  // Initial Data Fetch
  useEffect(() => {
    fetchDashboardSummary();
    fetchRecommendations();
    fetchNotifications();
  }, [token]);

  // Load Explore items when route changes
  useEffect(() => {
    if (currentRoute === 'explore') fetchExploreItems();
    if (currentRoute === 'liked') fetchLikedItems();
    if (currentRoute === 'history') fetchHistoryItems();
    if (currentRoute === 'admin') {
      fetchAdminAnalytics();
      fetchAdminUsers();
    }
  }, [currentRoute, categoryFilter]);

  // Fetch Dashboard Summary
  const fetchDashboardSummary = async () => {
    try {
      const res = await fetch(`${API_BASE}/dashboard/summary/`, { headers: getHeaders() });
      if (res.ok) {
        const data = await res.json();
        setSummaryData({
          points: data.points ?? 120,
          liked_count: data.liked_count ?? 8,
          history_count: data.history_count ?? 12,
          recent_activity: data.recent_activity || []
        });
        if (data.user) {
          setCurrentUser(prev => ({ ...prev, ...data.user }));
        }
      }
    } catch (err) {
      console.warn('API offline, using cached summary state', err);
    }
  };

  // Fetch Recommendations (Connected with AI RAG Engine)
  const fetchRecommendations = async (cat = categoryFilter, query = searchQuery) => {
    setIsRagLoading(true);
    try {
      const params = new URLSearchParams();
      if (cat && cat !== 'All') params.append('category', cat);
      if (query && query.trim()) params.append('q', query.trim());
      params.append('limit', '120');

      const res = await fetch(`${API_BASE}/recommendations/rag/?${params.toString()}`, { headers: getHeaders() });
      if (res.ok) {
        const data = await res.json();
        if (data.results && data.results.length > 0) {
          setRecommendations(data.results);
        }
        if (data.ai_insights) setAiInsights(data.ai_insights);
        if (data.rag_mode) setRagMode(data.rag_mode);
        if (data.exact_match) {
          setExactMatch(data.exact_match);
        } else {
          setExactMatch(null);
        }
        setIsInternetGrounded(!!data.is_internet_grounded);
      }
    } catch (err) {
      console.warn('API error fetching recommendations', err);
    } finally {
      setIsRagLoading(false);
    }
  };

  // Submit search query directly to AI RAG engine
  const handleSearchSubmit = (q) => {
    const term = (q !== undefined ? q : searchQuery).trim();
    setCurrentRoute('home');
    setIsExpandedView(true);
    fetchRecommendations(categoryFilter, term);
    showToast(term ? `AI RAG retrieval started for "${term}" 🤖` : 'Refreshing recommendations...');
    setTimeout(() => {
      const el = document.getElementById('personalized-section');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 150);
  };

  // Fetch Explore Items
  const fetchExploreItems = async () => {
    try {
      const categoryParam = categoryFilter && categoryFilter !== 'All' ? `&category=${encodeURIComponent(categoryFilter)}` : '';
      const res = await fetch(`${API_BASE}/items/?limit=120${categoryParam}`, { headers: getHeaders() });
      if (res.ok) {
        const data = await res.json();
        setExploreItems(data.results || []);
      }
    } catch (err) {
      console.warn('Error fetching explore items', err);
    }
  };

  // Fetch Liked Items
  const fetchLikedItems = async () => {
    try {
      const res = await fetch(`${API_BASE}/liked/`, { headers: getHeaders() });
      if (res.ok) {
        const data = await res.json();
        setLikedItems(data.results || []);
      }
    } catch (err) {
      console.warn('Error fetching liked items', err);
    }
  };

  // Fetch History Items
  const fetchHistoryItems = async () => {
    try {
      const res = await fetch(`${API_BASE}/activity/`, { headers: getHeaders() });
      if (res.ok) {
        const data = await res.json();
        setHistoryItems(data.results || []);
      }
    } catch (err) {
      console.warn('Error fetching history', err);
    }
  };

  // Fetch Notifications
  const fetchNotifications = async () => {
    try {
      const res = await fetch(`${API_BASE}/notifications/`, { headers: getHeaders() });
      if (res.ok) {
        const data = await res.json();
        setNotifications(data.results || []);
        setUnreadNotifications(data.unread_count ?? 1);
      }
    } catch (err) {
      console.warn('Error fetching notifications', err);
    }
  };

  // Fetch Admin Analytics
  const fetchAdminAnalytics = async () => {
    try {
      const res = await fetch(`${API_BASE}/admin/analytics/`, { headers: getHeaders() });
      if (res.ok) {
        const data = await res.json();
        setAdminMetrics(data.metrics);
        if (data.model_weights) setAdminWeights(data.model_weights);
      }
    } catch (err) {
      console.warn('Error fetching admin analytics', err);
    }
  };

  // Fetch Admin Users List
  const fetchAdminUsers = async () => {
    try {
      const res = await fetch(`${API_BASE}/admin/users/`, { headers: getHeaders() });
      if (res.ok) {
        const data = await res.json();
        setAdminUsersList(data || []);
      }
    } catch (err) {
      console.warn('Error fetching users', err);
    }
  };

  // Open Item Detail & Fetch Similar Items
  const openItemDetail = async (item) => {
    setItemDetailModal(item);
    setUserStarRating(item.user_rating || 0);
    setSimilarItems([]);
    try {
      const res = await fetch(`${API_BASE}/items/${item.id}/similar/`, { headers: getHeaders() });
      if (res.ok) {
        const data = await res.json();
        setSimilarItems(data || []);
      }
    } catch (e) {
      console.warn('Error fetching similar items', e);
    }
  };

  // Rate an item 1-5 stars
  const handleRateItem = async (item, score) => {
    setUserStarRating(score);
    showToast(`Rated "${item.title}" ${score} Stars! ⭐ (+2 pts)`);
    setSummaryData(prev => ({ ...prev, points: prev.points + 2 }));
    try {
      await fetch(`${API_BASE}/items/${item.id}/rate/`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify({ score })
      });
      fetchDashboardSummary();
    } catch (e) {
      console.warn('Error rating item', e);
    }
  };

  // Global Search Debounce
  useEffect(() => {
    if (!searchQuery.trim() || searchQuery.length < 2) {
      setSearchResults([]);
      setIsSearching(false);
      return;
    }

    setIsSearching(true);
    const timeout = setTimeout(async () => {
      try {
        const res = await fetch(`${API_BASE}/items/?q=${encodeURIComponent(searchQuery)}&limit=6`, { headers: getHeaders() });
        if (res.ok) {
          const data = await res.json();
          setSearchResults(data.results || []);
        }
      } catch (err) {
        console.warn('Search fetch error', err);
      } finally {
        setIsSearching(false);
      }
    }, 280);

    return () => clearTimeout(timeout);
  }, [searchQuery]);

  // Toggle Like Action (Optimistic UI)
  const toggleLike = async (item) => {
    const isCurrentlyLiked = !!item.is_liked;
    const newLikedState = !isCurrentlyLiked;

    // Optimistically update recommendations
    setRecommendations(prev => prev.map(it => it.id === item.id ? { ...it, is_liked: newLikedState } : it));
    setExploreItems(prev => prev.map(it => it.id === item.id ? { ...it, is_liked: newLikedState } : it));

    // Update summary counts
    setSummaryData(prev => ({
      ...prev,
      liked_count: newLikedState ? prev.liked_count + 1 : Math.max(0, prev.liked_count - 1),
      points: newLikedState ? prev.points + 5 : prev.points
    }));

    showToast(newLikedState ? `Added "${item.title}" to Favorites! ❤️ (+5 pts)` : `Removed "${item.title}" from Favorites.`);

    try {
      const method = newLikedState ? 'POST' : 'DELETE';
      await fetch(`${API_BASE}/items/${item.id}/like/`, {
        method,
        headers: getHeaders()
      });
      fetchDashboardSummary();
    } catch (err) {
      console.warn('Like API error', err);
    }
  };

  // Watch Trailer Modal & Log Activity
  const openTrailerModal = (item) => {
    setTrailerModalItem(item);
    // Log trailer activity
    try {
      fetch(`${API_BASE}/activity/trailer/`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify({ item_id: item.id })
      });
    } catch (err) {
      console.warn('Error recording trailer view', err);
    }
  };

  // "Surprise Me" Action
  const triggerSurpriseMe = async () => {
    try {
      const res = await fetch(`${API_BASE}/recommendations/surprise/`, { headers: getHeaders() });
      if (res.ok) {
        const data = await res.json();
        setSurpriseModalItem(data.item);
        fetchDashboardSummary();
      } else {
        // Fallback pick
        if (recommendations.length > 0) {
          const randomPick = recommendations[Math.floor(Math.random() * recommendations.length)];
          setSurpriseModalItem(randomPick);
        }
      }
    } catch (err) {
      if (recommendations.length > 0) {
        setSurpriseModalItem(recommendations[0]);
      }
    }
  };

  // Rate Recommendations (Thumbs Up / Down)
  const handleRateRecommendations = async (isPositive) => {
    showToast(isPositive ? 'Thanks for the thumbs up! Re-ranking high matches ✨' : 'Noted! Demoting similar items from your feed 👍');
    try {
      const res = await fetch(`${API_BASE}/recommendations/feedback/`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify({ is_positive: isPositive })
      });
      if (res.ok) {
        const data = await res.json();
        if (data.updated_recommendations) {
          setRecommendations(data.updated_recommendations);
        }
      }
    } catch (err) {
      console.warn('Rate API error', err);
    }
  };

  // Save Preferences Chips (Triggers AI RAG Synthesis)
  const handleUpdatePreferences = async () => {
    showToast('Preferences updated! Recomputing recommendations with AI RAG... 🔄');
    try {
      await fetch(`${API_BASE}/preferences/`, {
        method: 'PUT',
        headers: getHeaders(),
        body: JSON.stringify({ categories: selectedInterests })
      });
      fetchRecommendations(selectedInterests[0] || 'All', searchQuery);
      showToast('Personalized feed refreshed with AI RAG! 🎯');
    } catch (err) {
      fetchRecommendations();
    }
  };

  // Toggle Interest Chip
  const toggleInterest = (categoryName) => {
    setSelectedInterests(prev => {
      if (prev.includes(categoryName)) {
        if (prev.length === 1) return prev; // Keep at least one
        return prev.filter(c => c !== categoryName);
      } else {
        return [...prev, categoryName];
      }
    });
  };

  // Model Retraining in Admin
  const handleRetrainModel = async () => {
    showToast('Retraining AI Model with updated hyperparameters...');
    try {
      const res = await fetch(`${API_BASE}/admin/model/retrain/`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify({
          content_weight: adminWeights.content,
          collaborative_weight: adminWeights.collaborative,
          popularity_weight: adminWeights.popularity,
          min_threshold: adminWeights.min_threshold
        })
      });
      if (res.ok) {
        showToast('AI Model Retrained Successfully! Metrics updated.');
        fetchAdminAnalytics();
        fetchRecommendations();
      }
    } catch (err) {
      showToast('Model weights updated.');
    }
  };

  // Clear History
  const handleClearHistory = async () => {
    try {
      await fetch(`${API_BASE}/activity/`, { method: 'DELETE', headers: getHeaders() });
      setHistoryItems([]);
      setSummaryData(prev => ({ ...prev, history_count: 0, recent_activity: [] }));
      showToast('Activity history cleared.');
    } catch (err) {
      console.warn('Error clearing history', err);
    }
  };

  // Switch User Profile / Demo Login
  const handleQuickSwitchUser = (username) => {
    if (username === 'admin') {
      const adminTok = 'admin-session-token-mindrec-2026';
      setToken(adminTok);
      localStorage.setItem('mindrec_token', adminTok);
      setCurrentUser({
        username: 'admin',
        full_name: 'MindRec Admin',
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
        points: 500,
        role: 'admin'
      });
      showToast('Switched to Admin Account 🛡️');
      setCurrentRoute('admin');
    } else {
      const userTok = 'dharsitha-session-token-mindrec-2026';
      setToken(userTok);
      localStorage.setItem('mindrec_token', userTok);
      setCurrentUser({
        username: 'dharsitha',
        full_name: 'Dharsitha',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
        points: 120,
        role: 'user'
      });
      showToast('Switched to Dharsitha (Explorer) 💜');
      setCurrentRoute('home');
    }
    setShowAuthModal(false);
  };

  // Complete Onboarding
  const handleCompleteOnboarding = async (interests) => {
    setSelectedInterests(interests);
    setShowOnboardingModal(false);
    showToast('Welcome to MindRec! Cold-start resolved (+10 pts) 🎉');
    setSummaryData(prev => ({ ...prev, points: prev.points + 10 }));
    try {
      await fetch(`${API_BASE}/preferences/`, {
        method: 'PUT',
        headers: getHeaders(),
        body: JSON.stringify({ categories: interests })
      });
      fetchRecommendations();
    } catch (err) {
      fetchRecommendations();
    }
  };

  // Admin Add Item
  const handleAdminCreateItem = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API_BASE}/admin/items/`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify(newItemForm)
      });
      if (res.ok) {
        showToast(`Item "${newItemForm.title}" added to catalogue! 🎉`);
        setShowAdminAddModal(false);
        fetchExploreItems();
        fetchRecommendations();
      } else {
        showToast('Error adding item.');
      }
    } catch (err) {
      showToast('Error creating item.');
    }
  };

  // Admin Toggle User Status
  const handleToggleUserActive = async (targetUser) => {
    try {
      const res = await fetch(`${API_BASE}/admin/users/${targetUser.id}/`, {
        method: 'PATCH',
        headers: getHeaders(),
        body: JSON.stringify({ is_active: !targetUser.is_active })
      });
      if (res.ok) {
        showToast(`User ${targetUser.username} status updated.`);
        fetchAdminUsers();
      }
    } catch (err) {
      console.warn('Error updating user', err);
    }
  };

  return (
    <div className="flex min-h-screen bg-[#f3f0fb] text-[#1c1335]">

      {/* ===================== 1. LEFT SIDEBAR ===================== */}
      <aside className="w-64 bg-[#140c2e] text-white flex flex-col justify-between shrink-0 fixed inset-y-0 left-0 z-30 transition-all shadow-2xl">
        <div>
          {/* Logo Brand Header */}
          <div className="px-6 pt-6 pb-6 cursor-pointer" onClick={() => setCurrentRoute('home')}>
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-purple-600 to-indigo-400 flex items-center justify-center shadow-lg shadow-purple-500/30">
                <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2L14.7 8.5L21.5 11.2L14.7 13.9L12 20.4L9.3 13.9L2.5 11.2L9.3 8.5L12 2Z"/>
                </svg>
              </div>
              <span className="text-xl font-bold tracking-tight text-white font-display">MindRec</span>
            </div>
            <p className="text-[11px] text-[#9a8db9] font-medium mt-1 tracking-wide">
              Discover. Explore. Enjoy.
            </p>
          </div>

          {/* Nav Items List */}
          <nav className="px-3 space-y-1.5 mt-2">
            {[
              { id: 'home', label: 'Home', icon: 'home' },
              { id: 'explore', label: 'Explore', icon: 'compass' },
              { id: 'profile', label: 'My Profile', icon: 'user' },
              { id: 'history', label: 'History', icon: 'clock' },
              { id: 'settings', label: 'Settings', icon: 'settings' },
              { id: 'admin', label: 'Admin Console', icon: 'shield' },
            ].map((item) => {
              const isActive = currentRoute === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setCurrentRoute(item.id)}
                  className={`w-full flex items-center gap-3.5 px-4 py-2.5 rounded-xl font-medium text-sm transition-all text-left ${
                    isActive
                      ? 'bg-[#3c2079] text-white shadow-md shadow-purple-950/40'
                      : 'text-[#9f94ba] hover:bg-[#201444] hover:text-white'
                  }`}
                >
                  {/* Icon Rendering */}
                  {item.icon === 'home' && (
                    <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/>
                    </svg>
                  )}
                  {item.icon === 'compass' && (
                    <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10"/>
                      <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/>
                    </svg>
                  )}
                  {item.icon === 'user' && (
                    <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                    </svg>
                  )}
                  {item.icon === 'clock' && (
                    <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10"/>
                      <polyline points="12 6 12 12 16 14"/>
                    </svg>
                  )}
                  {item.icon === 'settings' && (
                    <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/>
                      <circle cx="12" cy="12" r="3"/>
                    </svg>
                  )}
                  {item.icon === 'shield' && (
                    <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
                    </svg>
                  )}
                  <span>{item.label}</span>
                </button>
              );
            })}

            {/* Switch Account / Auth Modal Trigger */}
            <button
              onClick={() => setShowAuthModal(true)}
              className="w-full flex items-center gap-3.5 px-4 py-2.5 rounded-xl font-medium text-sm text-[#9f94ba] hover:bg-[#201444] hover:text-white transition-all text-left"
            >
              <span className="text-sm">🔑</span>
              <span>Switch / Sign In</span>
            </button>

            {/* Logout button */}
            <button
              onClick={() => {
                showToast('Logged out. Switched to Guest View.');
              }}
              className="w-full flex items-center gap-3.5 px-4 py-2.5 rounded-xl font-medium text-sm text-[#9f94ba] hover:bg-[#201444] hover:text-white transition-all text-left"
            >
              <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/>
              </svg>
              <span>Logout</span>
            </button>
          </nav>
        </div>

        {/* Mascot Illustration at the Bottom of Sidebar */}
        <RobotMascot />
      </aside>

      {/* ===================== 2. MAIN CONTENT AREA ===================== */}
      <div className="flex-1 ml-64 flex flex-col min-w-0">

        {/* --- Top Navigation Bar --- */}
        <header className="sticky top-0 z-20 bg-[#f3f0fb]/90 backdrop-blur-md px-8 py-3.5 flex items-center justify-between border-b border-purple-100/60">
          {/* Global Search Input */}
          <div className="relative w-full max-w-xl">
            <div className="relative flex items-center">
              <svg className="absolute left-4 w-4 h-4 text-purple-400 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8"/>
                <line x1="21" y1="21" x2="16.65" y2="16.65"/>
              </svg>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleSearchSubmit(searchQuery);
                  }
                }}
                placeholder="Search movies, courses, products... (Press Enter for RAG)"
                className="w-full pl-11 pr-4 py-2.5 bg-white rounded-full text-sm font-medium text-gray-800 placeholder-purple-400/80 shadow-sm border border-purple-200/60 focus:outline-none focus:ring-2 focus:ring-purple-500/30 focus:border-purple-400 transition-all"
              />
              {searchQuery && (
                <button onClick={() => { setSearchQuery(''); fetchRecommendations(categoryFilter, ''); }} className="absolute right-3.5 text-gray-400 hover:text-gray-600 text-xs">
                  ✕
                </button>
              )}
            </div>

            {/* Debounced Search Auto-Suggestions & RAG Action Dropdown */}
            {searchQuery.length >= 2 && (
              <div className="absolute left-0 right-0 top-12 mt-1 bg-white rounded-2xl shadow-xl border border-purple-100 p-2.5 z-50 animate-fadeIn">
                {/* Prominent AI RAG Trigger Button */}
                <div
                  onClick={() => handleSearchSubmit(searchQuery)}
                  className="p-2.5 mb-2 rounded-xl bg-gradient-to-r from-purple-50 to-indigo-50 hover:from-purple-100 hover:to-indigo-100 cursor-pointer flex items-center justify-between border border-purple-200/80 transition-all shadow-xs"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-base">🤖</span>
                    <div>
                      <span className="text-xs font-bold text-purple-950 block">Synthesize with AI RAG Engine</span>
                      <span className="text-[11px] text-purple-700">Retrieve & rank items matching "{searchQuery}"</span>
                    </div>
                  </div>
                  <span className="text-[11px] font-bold text-white bg-[#703bf7] hover:bg-[#5e22e2] px-3 py-1 rounded-lg shadow-xs flex items-center gap-1">
                    <span>Search RAG</span>
                    <span>→</span>
                  </span>
                </div>

                <div className="px-3 py-1 text-[11px] font-semibold text-purple-600 uppercase tracking-wider flex justify-between">
                  <span>Fast Suggestions</span>
                  {isSearching && <span className="animate-pulse">Searching...</span>}
                </div>
                {searchResults.length === 0 && !isSearching ? (
                  <div className="p-4 text-center text-sm text-gray-500">
                    No results found for "{searchQuery}". Try "Interstellar", "Sci-Fi" or "Python".
                  </div>
                ) : (
                  <div className="space-y-1">
                    {searchResults.map(item => (
                      <div
                        key={item.id}
                        onClick={() => {
                          openItemDetail(item);
                          setSearchQuery('');
                        }}
                        className="flex items-center gap-3 p-2 rounded-xl hover:bg-purple-50 cursor-pointer transition-colors"
                      >
                        <img src={item.poster_url} alt={item.title} className="w-10 h-10 object-cover rounded-lg shadow-xs" />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-bold text-gray-900 truncate">{item.title}</p>
                          <p className="text-xs text-purple-600 truncate">{item.category?.name} · {item.tagline || 'Recommended'}</p>
                        </div>
                        <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-purple-100 text-purple-700">
                          ★ {item.avg_rating}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Right Header Controls */}
          <div className="flex items-center gap-4">
            {/* Onboarding Preferences Shortcut */}
            <button
              onClick={() => setShowOnboardingModal(true)}
              className="hidden md:flex items-center gap-1.5 px-3 py-1.5 bg-purple-100 text-purple-800 rounded-full text-xs font-bold hover:bg-purple-200 transition-colors"
              title="First-time interest picker"
            >
              <span>🪄</span>
              <span>Cold Start Setup</span>
            </button>

            {/* Notification Bell */}
            <div className="relative">
              <button
                onClick={() => setShowNotificationMenu(!showNotificationMenu)}
                className="relative p-2.5 rounded-full bg-white text-gray-600 hover:text-purple-600 hover:bg-purple-50 transition-all border border-purple-100 shadow-sm"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"/>
                </svg>
                {unreadNotifications > 0 && (
                  <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-white animate-pulse">
                    {unreadNotifications}
                  </span>
                )}
              </button>

              {/* Notification Popover */}
              {showNotificationMenu && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-2xl border border-purple-100 p-3 z-50 animate-fadeIn">
                  <div className="flex items-center justify-between pb-2 border-b border-purple-50">
                    <span className="font-bold text-sm text-gray-900">Notifications</span>
                    <button
                      onClick={() => {
                        setUnreadNotifications(0);
                        showToast('All notifications marked as read.');
                      }}
                      className="text-xs text-purple-600 hover:underline font-medium"
                    >
                      Mark all read
                    </button>
                  </div>
                  <div className="space-y-2 mt-2 max-h-60 overflow-y-auto">
                    {notifications.length === 0 ? (
                      <p className="text-xs text-gray-500 py-3 text-center">No new notifications</p>
                    ) : (
                      notifications.map(n => (
                        <div key={n.id} className="p-2 rounded-xl bg-purple-50/50 hover:bg-purple-50 transition-colors cursor-pointer">
                          <p className="text-xs font-bold text-gray-900">{n.title}</p>
                          <p className="text-[11px] text-gray-600 mt-0.5">{n.message}</p>
                          <span className="text-[10px] text-purple-500 font-medium">{n.time_ago}</span>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* User Profile Pill */}
            <div className="relative">
              <button
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                className="flex items-center gap-2.5 pl-1.5 pr-3 py-1 bg-white rounded-full border border-purple-100 shadow-sm hover:shadow-md transition-all"
              >
                <img
                  src={currentUser.avatar}
                  alt={currentUser.full_name}
                  className="w-8 h-8 rounded-full object-cover ring-2 ring-purple-500/20"
                />
                <span className="text-sm font-bold text-gray-800">{currentUser.full_name || 'Dharsitha'}</span>
                <svg className="w-3.5 h-3.5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7"/>
                </svg>
              </button>

              {/* Profile Dropdown Menu */}
              {showProfileMenu && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-purple-100 py-2 z-50 animate-fadeIn">
                  <div className="px-4 py-2 border-b border-purple-50">
                    <p className="text-xs font-bold text-gray-900">{currentUser.full_name}</p>
                    <p className="text-[11px] text-purple-600">Points: {summaryData.points} ⭐</p>
                  </div>
                  <button
                    onClick={() => { setCurrentRoute('profile'); setShowProfileMenu(false); }}
                    className="w-full text-left px-4 py-2 text-xs font-medium text-gray-700 hover:bg-purple-50 hover:text-purple-700"
                  >
                    👤 My Profile
                  </button>
                  <button
                    onClick={() => { setCurrentRoute('liked'); setShowProfileMenu(false); }}
                    className="w-full text-left px-4 py-2 text-xs font-medium text-gray-700 hover:bg-purple-50 hover:text-purple-700"
                  >
                    ❤️ Liked Items ({summaryData.liked_count})
                  </button>
                  <button
                    onClick={() => { setCurrentRoute('admin'); setShowProfileMenu(false); }}
                    className="w-full text-left px-4 py-2 text-xs font-medium text-gray-700 hover:bg-purple-50 hover:text-purple-700"
                  >
                    🛡️ Admin Console
                  </button>
                  <button
                    onClick={() => { setCurrentRoute('settings'); setShowProfileMenu(false); }}
                    className="w-full text-left px-4 py-2 text-xs font-medium text-gray-700 hover:bg-purple-50 hover:text-purple-700"
                  >
                    ⚙️ Settings
                  </button>
                  <div className="border-t border-purple-50 my-1 pt-1">
                    <button
                      onClick={() => { setShowAuthModal(true); setShowProfileMenu(false); }}
                      className="w-full text-left px-4 py-2 text-xs font-bold text-purple-700 hover:bg-purple-50"
                    >
                      🔄 Switch Demo Account
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* --- Main Dashboard Container --- */}
        <main className="p-8 space-y-6">

          {/* Toast Alert Banner */}
          {toastMessage && (
            <div className="fixed bottom-6 right-6 z-50 bg-[#1e103f] text-white px-5 py-3 rounded-2xl shadow-2xl border border-purple-500/40 flex items-center gap-3 animate-bounce">
              <span className="text-purple-400 text-lg">✨</span>
              <span className="text-sm font-semibold">{toastMessage}</span>
            </div>
          )}

          {/* ===================== VIEW ROUTING ===================== */}

          {/* -------------------- 1. HOME VIEW (Figure 1 UI Dashboard) -------------------- */}
          {currentRoute === 'home' && (
            <div className="space-y-6">

              {/* Row 1: Hero Banner + User Summary Card */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
                
                {/* Hero Banner (Span 8 or 9 cols) */}
                <div className="lg:col-span-8 hero-gradient rounded-3xl p-7 md:p-8 text-white relative overflow-hidden flex flex-col justify-between shadow-xl shadow-purple-900/20">
                  {/* Subtle Background Glows */}
                  <div className="absolute top-0 right-0 w-80 h-80 bg-purple-400/20 rounded-full blur-3xl pointer-events-none"></div>

                  <div className="relative z-10 max-w-lg">
                    <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight leading-snug font-display">
                      Your <span className="text-purple-200">Personal AI</span><br/>
                      Recommendation Engine
                    </h1>
                    <p className="text-sm md:text-base text-purple-200/90 font-medium mt-2.5 flex items-center gap-1.5">
                      Discover content you'll love, powered by AI ✨
                    </p>
                    <div className="mt-6">
                      <button
                        onClick={() => {
                          const elem = document.getElementById('personalized-section');
                          if (elem) elem.scrollIntoView({ behavior: 'smooth' });
                        }}
                        className="inline-flex items-center gap-2.5 px-6 py-2.5 bg-white text-[#2a135a] font-bold text-sm rounded-full shadow-lg hover:bg-purple-50 hover:shadow-xl transition-all transform hover:-translate-y-0.5 active:translate-y-0"
                      >
                        <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                          <polygon points="5 3 19 12 5 21 5 3"/>
                        </svg>
                        <span>Get Started</span>
                      </button>
                    </div>
                  </div>

                  {/* Hero Right Artwork: Glowing Wand & 3D Neon Brain */}
                  <div className="absolute right-2 bottom-0 md:right-4 md:bottom-2 pointer-events-none">
                    <HeroIllustration />
                  </div>
                </div>

                {/* User Summary Card (Span 4 cols) */}
                <div className="lg:col-span-4 bg-white rounded-3xl p-6 shadow-sm border border-purple-100 flex flex-col justify-between card-shadow">
                  {/* Avatar and Greeting */}
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <img
                        src={currentUser.avatar}
                        alt="User Avatar"
                        className="w-16 h-16 rounded-full object-cover ring-4 ring-purple-100 shadow-sm"
                      />
                      <span className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></span>
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 tracking-tight flex items-center gap-1.5">
                        Hello, {currentUser.full_name || 'Dharsitha'}! 👋
                      </h3>
                      <p className="text-xs text-purple-600 font-medium mt-0.5">
                        Keep exploring your interests!
                      </p>
                    </div>
                  </div>

                  {/* 3 Stat Counters */}
                  <div className="grid grid-cols-3 gap-2 mt-6 pt-5 border-t border-purple-50 text-center">
                    <div className="p-2.5 rounded-2xl bg-purple-50/60 hover:bg-purple-50 transition-colors">
                      <div className="flex justify-center mb-1 text-amber-500">
                        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                        </svg>
                      </div>
                      <div className="text-lg font-extrabold text-gray-900">{summaryData.points}</div>
                      <div className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider">Points</div>
                    </div>

                    <div className="p-2.5 rounded-2xl bg-purple-50/60 hover:bg-purple-50 transition-colors">
                      <div className="flex justify-center mb-1 text-rose-500">
                        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                        </svg>
                      </div>
                      <div className="text-lg font-extrabold text-gray-900">{summaryData.liked_count}</div>
                      <div className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider">Liked</div>
                    </div>

                    <div className="p-2.5 rounded-2xl bg-purple-50/60 hover:bg-purple-50 transition-colors">
                      <div className="flex justify-center mb-1 text-purple-600">
                        <svg className="w-5 h-5 fill-none stroke-current" strokeWidth="2.5" viewBox="0 0 24 24">
                          <circle cx="12" cy="12" r="10"/>
                          <polyline points="12 6 12 12 16 14"/>
                        </svg>
                      </div>
                      <div className="text-lg font-extrabold text-gray-900">{summaryData.history_count}</div>
                      <div className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider">History</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Row 2: "What are you interested in?" Preference Chips Bar */}
              <div className="bg-white rounded-3xl p-6 shadow-sm border border-purple-100 card-shadow">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <h2 className="text-base font-bold text-gray-900 flex items-center gap-2">
                      <span className="text-purple-600 text-lg">🪄</span>
                      What are you interested in?
                    </h2>
                    <p className="text-xs text-gray-500 mt-0.5">
                      Select your preferences for better recommendations
                    </p>
                  </div>

                  {/* Chips Container */}
                  <div className="flex flex-wrap items-center gap-2">
                    {allCategories.map(cat => {
                      const isSelected = selectedInterests.includes(cat.name);
                      return (
                        <button
                          key={cat.name}
                          onClick={() => toggleInterest(cat.name)}
                          className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
                            isSelected
                              ? 'bg-[#703bf7] text-white shadow-sm shadow-purple-500/30'
                              : 'bg-white text-gray-700 border border-purple-200/80 hover:border-purple-400 hover:bg-purple-50/50'
                          }`}
                        >
                          <span>{cat.icon}</span>
                          <span>{cat.name}</span>
                          {isSelected && <span className="text-[10px]">✓</span>}
                        </button>
                      );
                    })}

                    {/* Update Button */}
                    <button
                      onClick={handleUpdatePreferences}
                      className="px-5 py-1.5 bg-[#5e22e2] text-white font-bold text-xs rounded-full hover:bg-[#4d16c9] shadow-md shadow-purple-600/30 transition-all ml-1"
                    >
                      Update
                    </button>
                  </div>
                </div>
              </div>

              {/* Row 3: Recommendations Grid + Right Column (Recent Activity & Rate) */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">

                {/* Left Section (Span 8 or 9 cols): Personalized Recommendations */}
                <div id="personalized-section" className="lg:col-span-8 space-y-4">
                  {/* Header */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <h2 className="text-lg font-extrabold text-gray-900 flex items-center gap-2 font-display">
                        <span className="text-purple-600">★</span>
                        <span>Your Personalized Recommendations</span>
                      </h2>
                      {categoryFilter !== 'All' && (
                        <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-purple-100 text-purple-700 border border-purple-200">
                          {categoryFilter} ({recommendations.length})
                        </span>
                      )}
                      {searchQuery && (
                        <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-indigo-100 text-indigo-700 border border-indigo-200">
                          "{searchQuery}"
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-2">
                      {categoryFilter === 'All' && !searchQuery && (
                        <button
                          onClick={() => setIsExpandedView(!isExpandedView)}
                          className="text-xs font-bold text-purple-600 hover:text-purple-800 flex items-center gap-1 group bg-purple-50 px-3 py-1 rounded-full border border-purple-200 hover:bg-purple-100 transition-all"
                        >
                          <span>{isExpandedView ? 'Show Top 4' : `See All (${recommendations.length})`}</span>
                          <span className="group-hover:translate-x-0.5 transition-transform">→</span>
                        </button>
                      )}
                      <button
                        onClick={() => setCurrentRoute('recommendations')}
                        className="text-xs font-bold text-purple-600 hover:text-purple-800 flex items-center gap-1 group"
                        title="Open full catalog recommendation view"
                      >
                        <span>Full View</span>
                        <span className="group-hover:translate-x-0.5 transition-transform">↗</span>
                      </button>
                    </div>
                  </div>

                  {/* AI RAG Synthesis Banner (Shown when category filtered, searched, or expanded) */}
                  {(categoryFilter !== 'All' || searchQuery || isExpandedView || aiInsights) && (
                    <div className="bg-gradient-to-r from-purple-950 via-indigo-950 to-[#1e1035] rounded-3xl p-5 text-white shadow-md border border-purple-500/30 mb-2 animate-fadeIn">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        <div className="flex items-start gap-3">
                          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center shrink-0 shadow-inner text-xl">
                            🤖
                          </div>
                          <div>
                            <div className="flex flex-wrap items-center gap-2">
                              <span className="text-xs font-extrabold uppercase tracking-wider text-purple-300">
                                AI RAG Knowledge Synthesis
                              </span>
                              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
                                {ragMode || 'Gemini 2.5 RAG'}
                              </span>
                              {categoryFilter !== 'All' && (
                                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-500/30 text-purple-200 border border-purple-400/30">
                                  Category: {categoryFilter}
                                </span>
                              )}
                              {searchQuery && (
                                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-indigo-500/30 text-indigo-200 border border-indigo-400/30">
                                  Query: "{searchQuery}"
                                </span>
                              )}
                            </div>
                            <p className="text-xs text-purple-100/90 mt-1.5 leading-relaxed font-medium">
                              {aiInsights || `Retrieved ${recommendations.length} items from current database, augmented with your preferences and synthesized for maximum relevance.`}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 shrink-0 self-end sm:self-auto">
                          {(categoryFilter !== 'All' || searchQuery || isExpandedView) && (
                            <button
                              onClick={() => {
                                setCategoryFilter('All');
                                setSearchQuery('');
                                setIsExpandedView(false);
                                fetchRecommendations('All', '');
                              }}
                              className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-purple-200 hover:text-white text-xs font-semibold transition-all border border-white/10 flex items-center gap-1"
                            >
                              <span>✕</span>
                              <span>Reset to Top 4</span>
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* 🏆 Exact Internet Consensus Match Spotlight (Shown for queries like "best horror movies") */}
                  {exactMatch && (
                    <div className="bg-gradient-to-br from-[#1c0e35] via-[#29124a] to-[#14082b] rounded-3xl p-6 text-white shadow-2xl border-2 border-amber-400/50 relative overflow-hidden animate-fadeIn mb-5">
                      <div className="absolute -right-20 -top-20 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl pointer-events-none"></div>
                      <div className="absolute -left-20 -bottom-20 w-80 h-80 bg-amber-400/10 rounded-full blur-3xl pointer-events-none"></div>

                      <div className="relative z-10">
                        {/* Header Bar */}
                        <div className="flex flex-wrap items-center justify-between gap-3 mb-4 pb-3 border-b border-white/10">
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="px-3.5 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 text-purple-950 shadow-md flex items-center gap-1.5">
                              <span>🏆</span>
                              <span>#1 Exact Internet Match (Critical Consensus)</span>
                            </span>
                            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 flex items-center gap-1.5">
                              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                              Live Web Search Grounded
                            </span>
                          </div>
                          <span className="text-xs text-purple-200 font-semibold bg-white/5 px-3 py-1 rounded-full border border-white/10">
                            Search: "{searchQuery || 'best horror movies'}"
                          </span>
                        </div>

                        {/* Body Layout: Poster + Rich Info */}
                        <div className="flex flex-col md:flex-row gap-6 items-start">
                          {/* Big Poster */}
                          <div
                            className="relative w-full md:w-52 aspect-[2/3] rounded-2xl overflow-hidden shrink-0 shadow-2xl border border-white/20 group cursor-pointer"
                            onClick={() => openTrailerModal(exactMatch)}
                          >
                            <img
                              src={exactMatch.poster_url}
                              alt={exactMatch.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20"></div>

                            {/* Match score badge */}
                            <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-amber-400 text-purple-950 font-black text-xs shadow-lg flex items-center gap-1">
                              <span>★</span>
                              <span>{exactMatch.match_score}% Match</span>
                            </div>

                            {/* Play Trailer Icon Overlay */}
                            <div className="absolute inset-0 flex items-center justify-center opacity-90 group-hover:opacity-100 transition-opacity">
                              <div className="w-14 h-14 rounded-full bg-[#703bf7] text-white flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform">
                                <svg className="w-6 h-6 fill-current ml-0.5" viewBox="0 0 24 24">
                                  <polygon points="5 3 19 12 5 21 5 3"/>
                                </svg>
                              </div>
                            </div>
                            <span className="absolute bottom-2.5 inset-x-2.5 text-center text-[10px] font-bold text-white/95 bg-black/60 py-1 rounded-lg backdrop-blur-xs">
                              ▶ Watch Trailer
                            </span>
                          </div>

                          {/* Content */}
                          <div className="flex-1 flex flex-col justify-between space-y-3">
                            <div>
                              <div className="flex flex-wrap items-center gap-2.5">
                                <h3 className="text-2xl font-black text-white font-display tracking-tight">
                                  {exactMatch.title}
                                </h3>
                                <span className="text-base font-bold text-purple-300">
                                  ({exactMatch.release_year})
                                </span>
                                <span className="px-2.5 py-0.5 rounded-md bg-white/10 text-amber-300 text-xs font-black border border-white/10">
                                  ⭐ {exactMatch.avg_rating} / 10 · 93% RT
                                </span>
                              </div>

                              <p className="text-xs text-purple-300 font-semibold mt-1">
                                Directed by <span className="text-white font-bold">{exactMatch.creator}</span>
                              </p>

                              {/* Genres */}
                              <div className="flex flex-wrap gap-1.5 mt-2.5">
                                {(exactMatch.genres || []).map((g, idx) => (
                                  <span key={idx} className="text-[11px] font-bold px-2.5 py-0.5 rounded-lg bg-purple-500/25 text-purple-200 border border-purple-400/30">
                                    {g.name || g}
                                  </span>
                                ))}
                              </div>

                              {/* Tagline */}
                              <p className="text-xs text-amber-200/90 italic font-medium mt-3">
                                "{exactMatch.tagline}"
                              </p>

                              {/* Description */}
                              <p className="text-xs text-purple-100/90 leading-relaxed mt-2 font-normal">
                                {exactMatch.description}
                              </p>

                              {/* Why it is the exact match */}
                              <div className="mt-3.5 p-3.5 rounded-2xl bg-white/5 border border-white/10">
                                <span className="text-[11px] font-extrabold uppercase tracking-wider text-amber-400 flex items-center gap-1.5 mb-1">
                                  <span>✨</span>
                                  <span>Why this is the exact #1 horror movie:</span>
                                </span>
                                <p className="text-xs text-purple-100 font-medium leading-relaxed">
                                  {exactMatch.explanation}
                                </p>
                              </div>
                            </div>

                            {/* Actions */}
                            <div className="flex flex-wrap items-center gap-3 pt-3 border-t border-white/10 mt-2">
                              <button
                                onClick={() => openTrailerModal(exactMatch)}
                                className="px-5 py-2.5 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-purple-950 font-black text-xs rounded-xl shadow-lg transition-all flex items-center gap-2 active:scale-95"
                              >
                                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                                  <polygon points="5 3 19 12 5 21 5 3"/>
                                </svg>
                                <span>Watch Official Trailer</span>
                              </button>

                              <button
                                onClick={() => toggleLike(exactMatch)}
                                className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all border flex items-center gap-1.5 ${
                                  exactMatch.is_liked
                                    ? 'bg-rose-500 text-white border-rose-400 shadow-sm'
                                    : 'bg-white/10 hover:bg-white/20 text-white border-white/20'
                                }`}
                              >
                                <span>♥</span>
                                <span>{exactMatch.is_liked ? 'Favorited' : 'Add to Favorites'}</span>
                              </button>

                              {/* Quick Rate */}
                              <div className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-xs">
                                <span className="text-purple-300 font-medium">Rate:</span>
                                <div className="flex items-center gap-0.5">
                                  {[1, 2, 3, 4, 5].map(star => (
                                    <button
                                      key={star}
                                      onClick={() => handleRateItem(exactMatch, star)}
                                      className={`text-sm hover:scale-125 transition-transform ${
                                        star <= (exactMatch.user_rating || 0) ? 'text-amber-400' : 'text-gray-400 hover:text-amber-300'
                                      }`}
                                      title={`Rate ${star} stars`}
                                    >
                                      ★
                                    </button>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Recommendations Cards Grid (Figure 1 Top 4 or Full RAG List) */}
                  <div className={`grid grid-cols-1 sm:grid-cols-2 ${(categoryFilter !== 'All' || isExpandedView || searchQuery) ? 'lg:grid-cols-3 xl:grid-cols-4' : 'lg:grid-cols-4'} gap-4`}>
                    {(
                      (categoryFilter === 'All' && !searchQuery && !isExpandedView)
                        ? recommendations.slice(0, 4)
                        : recommendations.slice(0, visibleCount)
                    ).map(item => (
                      <div
                        key={item.id}
                        className="bg-white rounded-2xl overflow-hidden shadow-sm border border-purple-100 flex flex-col justify-between card-hover-effect group relative"
                      >
                        {/* Poster Image with Match % Badge */}
                        <div
                          className="relative aspect-[16/11] overflow-hidden bg-purple-950 cursor-pointer"
                          onClick={() => openItemDetail(item)}
                        >
                          <img
                            src={item.poster_url}
                            alt={item.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                          {/* Match % Badge (Figure 1 Style) */}
                          <div className="absolute top-2.5 right-2.5 match-badge px-2.5 py-0.5 rounded-full text-amber-400 font-extrabold text-[11px] flex items-center gap-1 border border-white/10 shadow-sm">
                            <span>★</span>
                            <span>{item.match_score || 95}% Match</span>
                          </div>

                          {/* Category Tag on Poster */}
                          {item.category?.name && (
                            <div className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-md bg-black/60 backdrop-blur-xs text-white text-[10px] font-semibold border border-white/10">
                              {item.category.name}
                            </div>
                          )}
                        </div>

                        {/* Card Content */}
                        <div className="p-3.5 flex flex-col flex-1 justify-between">
                          <div className="cursor-pointer" onClick={() => openItemDetail(item)}>
                            <h3 className="font-bold text-sm text-gray-900 tracking-tight truncate hover:text-purple-700">
                              {item.title}
                            </h3>

                            {/* Genre Badges */}
                            <div className="flex flex-wrap gap-1 mt-1.5 mb-2">
                              {(item.genres || []).slice(0, 3).map((g, idx) => (
                                <span
                                  key={idx}
                                  className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-purple-50 text-purple-700 border border-purple-100/60"
                                >
                                  {g.name || g}
                                </span>
                              ))}
                            </div>

                            {/* Tagline */}
                            <p className="text-[11px] text-gray-500 font-medium line-clamp-1 italic mb-2">
                              "{item.tagline || 'A journey beyond stars...'}"
                            </p>

                            {/* RAG Explanation Snippet if present */}
                            {item.explanation && (
                              <div className="mb-2.5 px-2 py-1 rounded-lg bg-purple-50/80 border border-purple-100/80 text-[10px] text-purple-900 font-medium line-clamp-2">
                                <span className="font-bold text-purple-700">✨ AI:</span> {item.explanation}
                              </div>
                            )}
                          </div>

                          {/* Card Footer Actions: Watch Trailer + Like Heart + Rating */}
                          <div className="space-y-2 pt-2 border-t border-purple-50">
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => openTrailerModal(item)}
                                className="flex-1 flex items-center justify-center gap-1.5 py-1.5 bg-[#703bf7] hover:bg-[#5e22e2] text-white rounded-xl text-xs font-bold shadow-sm shadow-purple-500/20 transition-all active:scale-95"
                              >
                                <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24">
                                  <polygon points="5 3 19 12 5 21 5 3"/>
                                </svg>
                                <span>Watch Trailer</span>
                              </button>

                              <button
                                onClick={() => toggleLike(item)}
                                className={`p-2 rounded-xl border transition-all ${
                                  item.is_liked
                                    ? 'bg-rose-50 border-rose-200 text-rose-500'
                                    : 'bg-white border-purple-100 text-gray-400 hover:text-rose-500 hover:border-purple-200'
                                }`}
                                title={item.is_liked ? 'Liked' : 'Like'}
                              >
                                <svg className={`w-3.5 h-3.5 ${item.is_liked ? 'fill-current' : 'fill-none stroke-current'}`} viewBox="0 0 24 24" strokeWidth="2">
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                                </svg>
                              </button>
                            </div>

                            {/* Quick Star Rating on Expanded Card */}
                            {(categoryFilter !== 'All' || isExpandedView || searchQuery) && (
                              <div className="flex items-center justify-between px-1 text-[11px] text-gray-500 pt-0.5">
                                <span>Your Rating:</span>
                                <div className="flex items-center gap-1">
                                  {[1, 2, 3, 4, 5].map(star => (
                                    <button
                                      key={star}
                                      onClick={() => handleRateItem(item, star)}
                                      className={`text-sm hover:scale-125 transition-transform ${
                                        star <= (item.user_rating || 0) ? 'text-amber-400' : 'text-gray-300 hover:text-amber-300'
                                      }`}
                                      title={`Rate ${star} star`}
                                    >
                                      ★
                                    </button>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Load More & Show All Controls when 100+ recommendations are available */}
                  {(categoryFilter !== 'All' || isExpandedView || searchQuery) && recommendations.length > visibleCount && (
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-3 pb-2 animate-fadeIn">
                      <button
                        onClick={() => setVisibleCount(prev => Math.min(prev + 24, recommendations.length))}
                        className="px-6 py-2.5 bg-gradient-to-r from-[#703bf7] to-[#5e22e2] hover:from-[#5e22e2] hover:to-[#4d16c9] text-white font-bold text-xs rounded-full shadow-md shadow-purple-600/25 transition-all flex items-center gap-2 group active:scale-95"
                      >
                        <span>Load More Recommendations</span>
                        <span className="text-purple-200">({Math.min(visibleCount, recommendations.length)} of {recommendations.length})</span>
                        <span className="group-hover:translate-y-0.5 transition-transform">▾</span>
                      </button>
                      <button
                        onClick={() => setVisibleCount(recommendations.length)}
                        className="px-5 py-2.5 bg-white text-purple-700 hover:bg-purple-50 font-bold text-xs rounded-full border border-purple-200 shadow-xs transition-all active:scale-95"
                      >
                        Show All ({recommendations.length} items) ⚡
                      </button>
                    </div>
                  )}

                  {/* Bottom Row Widgets: "Not sure what to watch?" (Surprise Me) + "Filter by Category" */}
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-4 pt-2">
                    {/* Surprise Me Card (Col 5) */}
                    <div className="md:col-span-5 bg-gradient-to-r from-purple-100/70 to-indigo-50/70 rounded-3xl p-5 border border-purple-200/60 shadow-sm flex items-center justify-between">
                      <div>
                        <h4 className="text-xs font-bold text-purple-900 flex items-center gap-1.5">
                          <span>✨</span>
                          Not sure what to watch?
                        </h4>
                        <p className="text-[11px] text-purple-700/80 mt-0.5">Let our AI decide for you!</p>
                        <button
                          onClick={triggerSurpriseMe}
                          className="mt-3 px-4 py-1.5 bg-[#703bf7] hover:bg-[#5e22e2] text-white font-bold text-xs rounded-full shadow-md shadow-purple-600/20 transition-all"
                        >
                          Surprise Me
                        </button>
                      </div>
                      <div className="w-16 h-16 flex items-center justify-center bg-white/70 rounded-2xl shadow-sm text-2xl">
                        🎬
                      </div>
                    </div>

                    {/* Filter by Category Card (Col 7) */}
                    <div className="md:col-span-7 bg-white rounded-3xl p-5 border border-purple-100 shadow-sm flex flex-col justify-between relative">
                      <div className="flex items-center justify-between mb-2.5">
                        <div className="flex items-center gap-1.5">
                          <svg className="w-3.5 h-3.5 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/>
                          </svg>
                          <span className="text-xs font-bold text-gray-900">Filter by Category</span>
                          {isRagLoading && <span className="text-[10px] text-purple-600 animate-pulse font-medium ml-1">AI RAG retrieval...</span>}
                        </div>
                        {categoryFilter !== 'All' && (
                          <button
                            onClick={() => {
                              setCategoryFilter('All');
                              setIsExpandedView(false);
                              fetchRecommendations('All', searchQuery);
                            }}
                            className="text-[11px] font-bold text-purple-600 hover:text-purple-800"
                          >
                            Clear filter ✕
                          </button>
                        )}
                      </div>

                      <div className="flex flex-wrap items-center gap-1.5 relative">
                        {['All', 'Movies', 'Series', 'Anime', 'Documentaries'].map(cat => {
                          const isActive = categoryFilter === cat;
                          return (
                            <button
                              key={cat}
                              onClick={() => {
                                setCategoryFilter(cat);
                                setIsExpandedView(cat !== 'All');
                                fetchRecommendations(cat, searchQuery);
                              }}
                              className={`px-3 py-1 rounded-full text-xs font-semibold transition-all ${
                                isActive
                                  ? 'bg-[#5e22e2] text-white shadow-sm'
                                  : 'bg-purple-50 text-gray-700 hover:bg-purple-100'
                              }`}
                            >
                              {cat}
                            </button>
                          );
                        })}

                        {/* "More ▾" Button with Dropdown for remaining categories */}
                        <div className="relative inline-block">
                          <button
                            onClick={() => setShowCategoryMore(!showCategoryMore)}
                            className={`px-3 py-1 rounded-full text-xs font-semibold transition-all flex items-center gap-1 ${
                              ['Technology', 'Books', 'Games', 'Travel', 'Music'].includes(categoryFilter)
                                ? 'bg-[#5e22e2] text-white shadow-sm'
                                : 'bg-purple-50 text-gray-700 hover:bg-purple-100'
                            }`}
                          >
                            <span>{['Technology', 'Books', 'Games', 'Travel', 'Music'].includes(categoryFilter) ? categoryFilter : 'More'}</span>
                            <span>▾</span>
                          </button>

                          {showCategoryMore && (
                            <div className="absolute right-0 bottom-full mb-2 bg-white rounded-2xl shadow-xl border border-purple-100 p-2 z-30 flex flex-col gap-1 min-w-[150px] animate-fadeIn">
                              {['Technology', 'Books', 'Games', 'Travel', 'Music'].map(moreCat => (
                                <button
                                  key={moreCat}
                                  onClick={() => {
                                    setCategoryFilter(moreCat);
                                    setShowCategoryMore(false);
                                    setIsExpandedView(true);
                                    fetchRecommendations(moreCat, searchQuery);
                                  }}
                                  className={`text-left px-3 py-1.5 rounded-xl text-xs font-medium transition-colors ${
                                    categoryFilter === moreCat ? 'bg-purple-100 text-purple-800 font-bold' : 'text-gray-700 hover:bg-purple-50'
                                  }`}
                                >
                                  {moreCat}
                                </button>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Column (Span 4 cols): Recent Activity + Rate Your Recommendations */}
                <div className="lg:col-span-4 space-y-5">

                  {/* 1. Recent Activity Card */}
                  <div className="bg-white rounded-3xl p-5 border border-purple-100 shadow-sm card-shadow">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-bold text-sm text-gray-900 flex items-center gap-2">
                        <svg className="w-4 h-4 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                          <circle cx="12" cy="12" r="10"/>
                          <polyline points="12 6 12 12 16 14"/>
                        </svg>
                        Recent Activity
                      </h3>
                      <button onClick={() => setCurrentRoute('history')} className="text-[11px] font-bold text-purple-600 hover:underline">
                        View All
                      </button>
                    </div>

                    <div className="space-y-3">
                      {(summaryData.recent_activity || []).slice(0, 3).map((act, index) => (
                        <div key={index} className="flex items-center gap-3 p-2 rounded-2xl hover:bg-purple-50/60 transition-colors">
                          <img
                            src={act.item_poster || 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=100&auto=format&fit=crop&q=80'}
                            alt={act.item_title}
                            className="w-11 h-11 rounded-xl object-cover shadow-xs border border-purple-100 shrink-0"
                          />
                          <div className="flex-1 min-w-0">
                            <h4 className="text-xs font-bold text-gray-900 truncate">{act.item_title}</h4>
                            <p className="text-[11px] text-gray-500 font-medium mt-0.5">
                              {act.activity_type === 'viewed' || act.activity_type === 'view' ? 'Viewed' : 'Recommended'} · {act.time_ago || '2h ago'}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* 2. Rate Your Recommendations Card */}
                  <div className="bg-white rounded-3xl p-5 border border-purple-100 shadow-sm text-center card-shadow">
                    <div className="flex items-center justify-center gap-1.5 text-rose-500 mb-1">
                      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                      </svg>
                      <h4 className="text-xs font-bold text-gray-900 tracking-tight">Rate Your Recommendations</h4>
                    </div>
                    <p className="text-[11px] text-gray-500 mb-4">
                      Help us improve your experience!
                    </p>

                    <div className="flex items-center justify-center gap-4">
                      {/* Thumbs Up Button (Filled Purple) */}
                      <button
                        onClick={() => handleRateRecommendations(true)}
                        className="w-10 h-10 rounded-full bg-[#703bf7] hover:bg-[#5e22e2] text-white flex items-center justify-center shadow-md shadow-purple-500/20 active:scale-95 transition-all"
                        title="Good recommendations"
                      >
                        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                          <path d="M2 20h2c.55 0 1-.45 1-1v-9c0-.55-.45-1-1-1H2v11zm19.83-7.12c.11-.25.17-.52.17-.8V11c0-1.1-.9-2-2-2h-5.5l.92-4.65c.05-.22.02-.46-.08-.66-.23-.45-.52-.86-.88-1.22L14 2 7.59 8.41C7.22 8.79 7 9.3 7 9.83v7.34C7 18.27 7.73 19 8.63 19h8.48c.83 0 1.54-.5 1.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73 0-.04-.02-.08-.02-.12z"/>
                        </svg>
                      </button>

                      {/* Thumbs Down Button (Purple Outline) */}
                      <button
                        onClick={() => handleRateRecommendations(false)}
                        className="w-10 h-10 rounded-full border border-purple-300 bg-white hover:bg-purple-50 text-purple-600 flex items-center justify-center active:scale-95 transition-all"
                        title="Needs improvement"
                      >
                        <svg className="w-4 h-4 fill-none stroke-current" strokeWidth="2" viewBox="0 0 24 24">
                          <path d="M22 4h-2c-.55 0-1 .45-1 1v9c0 .55.45 1 1 1h2V4zM2.17 11.12c-.11.25-.17.52-.17.8V13c0 1.1.9 2 2 2h5.5l-.92 4.65c-.05.22-.02.46.08.66.23.45.52.86.88 1.22L10 22l6.41-6.41c.37-.38.59-.89.59-1.42V6.83C17 5.73 16.27 5 15.37 5H6.89c-.83 0-1.54.5-1.84 1.22l-3.02 7.05c-.09.23-.14.47-.14.73 0 .04.02.08.02.12z"/>
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* -------------------- 2. EXPLORE VIEW -------------------- */}
          {currentRoute === 'explore' && (
            <div className="space-y-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h1 className="text-2xl font-extrabold text-gray-900 font-display">Explore Catalogue</h1>
                  <p className="text-xs text-gray-500 mt-1">Browse, filter and discover across movies, anime, tech, books and travel.</p>
                </div>
                {/* Category Pills */}
                <div className="flex flex-wrap gap-2">
                  {['All', 'Movies & Series', 'Technology', 'Anime', 'Books', 'Games', 'Travel'].map(c => (
                    <button
                      key={c}
                      onClick={() => setCategoryFilter(c)}
                      className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                        categoryFilter === c ? 'bg-[#703bf7] text-white' : 'bg-white text-gray-700 border border-purple-200 hover:bg-purple-50'
                      }`}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>

              {/* Items Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                {exploreItems.map(item => (
                  <div key={item.id} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-purple-100 flex flex-col justify-between card-hover-effect">
                    <div
                      className="relative aspect-[16/11] bg-purple-900 cursor-pointer"
                      onClick={() => openItemDetail(item)}
                    >
                      <img src={item.poster_url} alt={item.title} className="w-full h-full object-cover" />
                      <div className="absolute top-2 right-2 match-badge px-2.5 py-0.5 rounded-full text-amber-400 font-extrabold text-[11px] flex items-center gap-1 border border-white/10">
                        <span>★</span>
                        <span>{item.avg_rating}</span>
                      </div>
                    </div>
                    <div className="p-4 flex flex-col flex-1 justify-between">
                      <div className="cursor-pointer" onClick={() => openItemDetail(item)}>
                        <span className="text-[10px] font-bold text-purple-600 uppercase tracking-wider">{item.category?.name}</span>
                        <h3 className="font-bold text-sm text-gray-900 mt-0.5 truncate hover:text-purple-700">{item.title}</h3>
                        <p className="text-xs text-gray-500 mt-1 line-clamp-2">{item.description}</p>
                      </div>
                      <div className="flex items-center gap-2 mt-4 pt-3 border-t border-purple-50">
                        <button
                          onClick={() => openTrailerModal(item)}
                          className="flex-1 py-1.5 bg-[#703bf7] hover:bg-[#5e22e2] text-white rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5"
                        >
                          ▶ Watch Trailer
                        </button>
                        <button
                          onClick={() => toggleLike(item)}
                          className={`p-2 rounded-xl border ${item.is_liked ? 'text-rose-500 bg-rose-50 border-rose-200' : 'text-gray-400 hover:text-rose-500 border-purple-100'}`}
                        >
                          ♥
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* -------------------- 3. RECOMMENDATIONS (SEE ALL) VIEW -------------------- */}
          {currentRoute === 'recommendations' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-2xl font-extrabold text-gray-900 font-display">All Personalized Recommendations</h1>
                  <p className="text-xs text-gray-500 mt-1">Ranked by your Hybrid AI model match score (Content 50% + Collab 35% + Popularity 15%).</p>
                </div>
                <button
                  onClick={() => setCurrentRoute('home')}
                  className="px-4 py-2 bg-white rounded-full text-xs font-bold text-purple-700 border border-purple-200 hover:bg-purple-50"
                >
                  ← Back to Dashboard
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {recommendations.map(item => (
                  <div key={item.id} className="bg-white rounded-2xl p-4 border border-purple-100 shadow-sm flex gap-4 card-hover-effect">
                    <img
                      src={item.poster_url}
                      alt={item.title}
                      className="w-24 h-32 rounded-xl object-cover shrink-0 cursor-pointer"
                      onClick={() => openItemDetail(item)}
                    />
                    <div className="flex flex-col justify-between flex-1 min-w-0">
                      <div>
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-extrabold px-2 py-0.5 rounded-full bg-purple-100 text-purple-800">
                            ★ {item.match_score || 92}% Match
                          </span>
                          <button onClick={() => toggleLike(item)} className={item.is_liked ? 'text-rose-500' : 'text-gray-300 hover:text-rose-500'}>
                            ♥
                          </button>
                        </div>
                        <h3
                          className="font-bold text-sm text-gray-900 mt-1.5 truncate cursor-pointer hover:text-purple-700"
                          onClick={() => openItemDetail(item)}
                        >
                          {item.title}
                        </h3>
                        <p className="text-[11px] text-purple-600 font-medium italic mt-0.5 truncate">
                          {item.explanation || `Because you like ${item.genres?.[0]?.name || 'Sci-Fi'}`}
                        </p>
                        <p className="text-xs text-gray-500 mt-1 line-clamp-2">{item.description}</p>
                      </div>
                      <button
                        onClick={() => openTrailerModal(item)}
                        className="mt-2 py-1.5 px-3 bg-[#703bf7] hover:bg-[#5e22e2] text-white rounded-xl text-xs font-bold transition-all text-center"
                      >
                        ▶ Watch Trailer
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* -------------------- 4. LIKED ITEMS VIEW -------------------- */}
          {currentRoute === 'liked' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-2xl font-extrabold text-gray-900 font-display">Liked & Favorites</h1>
                  <p className="text-xs text-gray-500 mt-1">Items you marked with a heart. Used by the collaborative filtering engine.</p>
                </div>
              </div>

              {likedItems.length === 0 ? (
                <div className="p-12 text-center bg-white rounded-3xl border border-purple-100">
                  <div className="text-4xl mb-2">❤️</div>
                  <h3 className="font-bold text-gray-900">No Liked Items Yet</h3>
                  <p className="text-xs text-gray-500 mt-1">Explore recommendations and tap the heart icon on any card!</p>
                  <button onClick={() => setCurrentRoute('home')} className="mt-4 px-5 py-2 bg-[#703bf7] text-white text-xs font-bold rounded-full">
                    Go to Recommendations
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5">
                  {likedItems.map(entry => {
                    const item = entry.item;
                    return (
                      <div key={entry.id} className="bg-white rounded-2xl overflow-hidden border border-purple-100 shadow-sm flex flex-col justify-between">
                        <img
                          src={item.poster_url}
                          alt={item.title}
                          className="w-full aspect-[16/11] object-cover cursor-pointer"
                          onClick={() => openItemDetail(item)}
                        />
                        <div className="p-4 flex flex-col flex-1 justify-between">
                          <div className="cursor-pointer" onClick={() => openItemDetail(item)}>
                            <h3 className="font-bold text-sm text-gray-900 truncate hover:text-purple-700">{item.title}</h3>
                            <p className="text-xs text-purple-600 mt-0.5">{item.category?.name}</p>
                          </div>
                          <div className="flex items-center gap-2 mt-4 pt-3 border-t border-purple-50">
                            <button
                              onClick={() => openTrailerModal(item)}
                              className="flex-1 py-1.5 bg-[#703bf7] text-white text-xs font-bold rounded-xl"
                            >
                              ▶ Trailer
                            </button>
                            <button
                              onClick={() => toggleLike(item)}
                              className="p-2 rounded-xl text-rose-500 bg-rose-50 hover:bg-rose-100"
                              title="Remove from favorites"
                            >
                              ✕
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {/* -------------------- 5. HISTORY VIEW -------------------- */}
          {currentRoute === 'history' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-2xl font-extrabold text-gray-900 font-display">Activity & Discovery History</h1>
                  <p className="text-xs text-gray-500 mt-1">Complete timeline of recommendations, trailer plays, views and interactions.</p>
                </div>
                <button
                  onClick={handleClearHistory}
                  className="px-4 py-2 bg-red-50 text-red-600 hover:bg-red-100 border border-red-200 rounded-full text-xs font-bold transition-all"
                >
                  Clear History
                </button>
              </div>

              <div className="bg-white rounded-3xl p-6 border border-purple-100 shadow-sm space-y-3">
                {historyItems.length === 0 ? (
                  <p className="text-xs text-gray-500 text-center py-8">Your history is clean.</p>
                ) : (
                  historyItems.map(act => (
                    <div key={act.id} className="flex items-center justify-between p-3 rounded-2xl hover:bg-purple-50/50 transition-colors border-b border-purple-50 last:border-none">
                      <div className="flex items-center gap-3">
                        <img
                          src={act.item_poster || 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=100&auto=format&fit=crop&q=80'}
                          alt={act.item_title}
                          className="w-10 h-10 rounded-xl object-cover"
                        />
                        <div>
                          <p className="text-sm font-bold text-gray-900">{act.item_title || act.meta?.query || 'Search'}</p>
                          <p className="text-xs text-purple-600 font-medium capitalize">
                            Action: {act.activity_type}
                          </p>
                        </div>
                      </div>
                      <span className="text-xs text-gray-400 font-medium">{act.time_ago}</span>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {/* -------------------- 6. MY PROFILE VIEW -------------------- */}
          {currentRoute === 'profile' && (
            <div className="space-y-6 max-w-4xl mx-auto">
              <div className="bg-white rounded-3xl p-8 border border-purple-100 shadow-sm card-shadow">
                <div className="flex flex-col md:flex-row items-center gap-6 pb-6 border-b border-purple-100">
                  <img
                    src={currentUser.avatar}
                    alt={currentUser.full_name}
                    className="w-24 h-24 rounded-full object-cover ring-4 ring-purple-500/20 shadow-md"
                  />
                  <div className="text-center md:text-left">
                    <h2 className="text-xl font-bold text-gray-900">{currentUser.full_name} (@{currentUser.username})</h2>
                    <p className="text-xs text-purple-600 font-medium mt-1">{currentUser.bio || 'AI explorer on MindRec 🚀'}</p>
                    <div className="flex flex-wrap gap-2 mt-3">
                      <span className="px-3 py-1 rounded-full bg-purple-100 text-purple-800 text-xs font-bold">
                        ⭐ {summaryData.points} Explorer Points
                      </span>
                      <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-bold">
                        🏆 AI Pioneer Badge
                      </span>
                      <span className="px-3 py-1 rounded-full bg-indigo-100 text-indigo-800 text-xs font-bold">
                        🎬 Cinema Enthusiast
                      </span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase mb-1.5">Full Name</label>
                    <input
                      type="text"
                      value={currentUser.full_name}
                      onChange={(e) => setCurrentUser({ ...currentUser, full_name: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-purple-200 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase mb-1.5">Bio Tagline</label>
                    <input
                      type="text"
                      value={currentUser.bio || ''}
                      onChange={(e) => setCurrentUser({ ...currentUser, bio: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-purple-200 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                </div>

                <button
                  onClick={() => showToast('Profile details updated successfully! ✨')}
                  className="mt-6 px-6 py-2.5 bg-[#703bf7] hover:bg-[#5e22e2] text-white text-xs font-bold rounded-full transition-all shadow-md"
                >
                  Save Profile Changes
                </button>
              </div>
            </div>
          )}

          {/* -------------------- 7. SETTINGS VIEW -------------------- */}
          {currentRoute === 'settings' && (
            <div className="space-y-6 max-w-3xl mx-auto">
              <h1 className="text-2xl font-extrabold text-gray-900 font-display">Account Settings</h1>
              <div className="bg-white rounded-3xl p-6 border border-purple-100 shadow-sm space-y-5">
                <div className="flex items-center justify-between pb-4 border-b border-purple-50">
                  <div>
                    <h4 className="text-sm font-bold text-gray-900">Personalized AI Engine</h4>
                    <p className="text-xs text-gray-500">Collect viewing history and explicit likes to refine recommendations.</p>
                  </div>
                  <input type="checkbox" defaultChecked className="w-5 h-5 accent-purple-600 rounded cursor-pointer" />
                </div>
                <div className="flex items-center justify-between pb-4 border-b border-purple-50">
                  <div>
                    <h4 className="text-sm font-bold text-gray-900">New High-Match Notifications</h4>
                    <p className="text-xs text-gray-500">Notify when an item matches &gt; 90% of your interest profile.</p>
                  </div>
                  <input type="checkbox" defaultChecked className="w-5 h-5 accent-purple-600 rounded cursor-pointer" />
                </div>
                <div className="pt-2">
                  <h4 className="text-sm font-bold text-gray-900 mb-2">Change Password</h4>
                  <div className="space-y-3">
                    <input type="password" placeholder="Current Password" className="w-full px-4 py-2 rounded-xl border border-purple-200 text-xs" />
                    <input type="password" placeholder="New Password (min 8 characters)" className="w-full px-4 py-2 rounded-xl border border-purple-200 text-xs" />
                    <button onClick={() => showToast('Password updated.')} className="px-5 py-2 bg-[#703bf7] text-white text-xs font-bold rounded-full">
                      Update Password
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* -------------------- 8. ADMIN CONSOLE VIEW -------------------- */}
          {currentRoute === 'admin' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h1 className="text-2xl font-extrabold text-gray-900 font-display">MindRec Admin & AI Engine Console</h1>
                  <p className="text-xs text-gray-500 mt-1">Monitor real-time recommender health, adjust hybrid weights, manage items & users.</p>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setShowAdminAddModal(true)}
                    className="px-4 py-2 bg-purple-100 hover:bg-purple-200 text-purple-900 text-xs font-bold rounded-full transition-all"
                  >
                    + Add New Item
                  </button>
                  <button
                    onClick={handleRetrainModel}
                    className="px-5 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white text-xs font-bold rounded-full shadow-lg transition-all"
                  >
                    ⚡ Trigger Retrain Now
                  </button>
                </div>
              </div>

              {/* Analytics Metrics Cards */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-white rounded-2xl p-4 border border-purple-100 shadow-sm">
                  <span className="text-[11px] font-bold text-gray-500 uppercase">Avg Match Score</span>
                  <div className="text-2xl font-extrabold text-purple-700 mt-1">
                    {adminMetrics?.average_match_score || '91.8%'}
                  </div>
                  <span className="text-[10px] text-green-600 font-medium">↑ High Precision@10</span>
                </div>
                <div className="bg-white rounded-2xl p-4 border border-purple-100 shadow-sm">
                  <span className="text-[11px] font-bold text-gray-500 uppercase">Click-Through Rate (CTR)</span>
                  <div className="text-2xl font-extrabold text-indigo-700 mt-1">
                    {adminMetrics?.click_through_rate || '48.5%'}
                  </div>
                  <span className="text-[10px] text-purple-600 font-medium">Trailers + Likes / Views</span>
                </div>
                <div className="bg-white rounded-2xl p-4 border border-purple-100 shadow-sm">
                  <span className="text-[11px] font-bold text-gray-500 uppercase">Feedback Satisfaction</span>
                  <div className="text-2xl font-extrabold text-amber-600 mt-1">
                    {adminMetrics?.feedback_satisfaction || '94.2%'}
                  </div>
                  <span className="text-[10px] text-gray-500 font-medium">Thumbs-up ratio</span>
                </div>
                <div className="bg-white rounded-2xl p-4 border border-purple-100 shadow-sm">
                  <span className="text-[11px] font-bold text-gray-500 uppercase">Engine Status</span>
                  <div className="text-base font-extrabold text-green-600 mt-1 flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-green-500 animate-ping"></span>
                    Online & Active
                  </div>
                  <span className="text-[10px] text-gray-400 font-medium">Version: MindRec-Hybrid-v1.4</span>
                </div>
              </div>

              {/* Recommender Hyperparameter Sliders */}
              <div className="bg-white rounded-3xl p-6 border border-purple-100 shadow-sm card-shadow">
                <h3 className="font-bold text-base text-gray-900 mb-2">Recommender Hybrid Weight Allocator</h3>
                <p className="text-xs text-gray-500 mb-6">SRS ER-2: Content Score + Collaborative Score + Popularity/Recency = 100%.</p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <div className="flex justify-between text-xs font-bold text-gray-700 mb-1">
                      <span>Content-Based Weight (Metadata/Tags)</span>
                      <span className="text-purple-600">{Math.round(adminWeights.content * 100)}%</span>
                    </div>
                    <input
                      type="range" min="0" max="1" step="0.05"
                      value={adminWeights.content}
                      onChange={(e) => setAdminWeights({ ...adminWeights, content: parseFloat(e.target.value) })}
                      className="w-full accent-purple-600"
                    />
                  </div>
                  <div>
                    <div className="flex justify-between text-xs font-bold text-gray-700 mb-1">
                      <span>Collaborative Filtering Weight</span>
                      <span className="text-purple-600">{Math.round(adminWeights.collaborative * 100)}%</span>
                    </div>
                    <input
                      type="range" min="0" max="1" step="0.05"
                      value={adminWeights.collaborative}
                      onChange={(e) => setAdminWeights({ ...adminWeights, collaborative: parseFloat(e.target.value) })}
                      className="w-full accent-purple-600"
                    />
                  </div>
                  <div>
                    <div className="flex justify-between text-xs font-bold text-gray-700 mb-1">
                      <span>Popularity & Recency Weight</span>
                      <span className="text-purple-600">{Math.round(adminWeights.popularity * 100)}%</span>
                    </div>
                    <input
                      type="range" min="0" max="1" step="0.05"
                      value={adminWeights.popularity}
                      onChange={(e) => setAdminWeights({ ...adminWeights, popularity: parseFloat(e.target.value) })}
                      className="w-full accent-purple-600"
                    />
                  </div>
                </div>

                <div className="mt-6 flex justify-end">
                  <button
                    onClick={handleRetrainModel}
                    className="px-6 py-2 bg-[#703bf7] text-white text-xs font-bold rounded-full shadow-md hover:bg-[#5e22e2]"
                  >
                    Save Weights & Apply
                  </button>
                </div>
              </div>

              {/* User Accounts Management Table */}
              <div className="bg-white rounded-3xl p-6 border border-purple-100 shadow-sm card-shadow">
                <h3 className="font-bold text-base text-gray-900 mb-3">User Accounts & Access Control (FR-8.3)</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-purple-100 text-gray-500 uppercase tracking-wider">
                        <th className="py-2.5 px-3">User</th>
                        <th className="py-2.5 px-3">Email</th>
                        <th className="py-2.5 px-3">Role</th>
                        <th className="py-2.5 px-3">Points</th>
                        <th className="py-2.5 px-3">Status</th>
                        <th className="py-2.5 px-3 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-purple-50">
                      {adminUsersList.map(u => (
                        <tr key={u.id} className="hover:bg-purple-50/50">
                          <td className="py-2.5 px-3 font-bold text-gray-900 flex items-center gap-2">
                            <img src={u.avatar} alt={u.username} className="w-6 h-6 rounded-full object-cover" />
                            {u.full_name || u.username}
                          </td>
                          <td className="py-2.5 px-3 text-gray-600">{u.email}</td>
                          <td className="py-2.5 px-3">
                            <span className={`px-2 py-0.5 rounded-full font-bold uppercase text-[10px] ${u.role === 'admin' ? 'bg-purple-100 text-purple-700' : 'bg-gray-100 text-gray-700'}`}>
                              {u.role}
                            </span>
                          </td>
                          <td className="py-2.5 px-3 font-semibold text-amber-600">{u.points} ⭐</td>
                          <td className="py-2.5 px-3">
                            <span className={`px-2 py-0.5 rounded-full font-semibold text-[10px] ${u.is_active ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                              {u.is_active ? 'Active' : 'Disabled'}
                            </span>
                          </td>
                          <td className="py-2.5 px-3 text-right">
                            <button
                              onClick={() => handleToggleUserActive(u)}
                              className="px-2.5 py-1 text-[11px] font-bold text-purple-700 hover:bg-purple-100 rounded-lg transition-colors"
                            >
                              {u.is_active ? 'Deactivate' : 'Activate'}
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

            </div>
          )}

        </main>
      </div>

      {/* ===================== 3. TRAILER VIDEO MODAL ===================== */}
      {trailerModalItem && (
        <div className="fixed inset-y-0 inset-x-0 z-50 flex items-center justify-center p-4 modal-overlay animate-fadeIn">
          <div className="bg-[#140c2e] text-white rounded-3xl overflow-hidden max-w-3xl w-full border border-purple-500/30 shadow-2xl relative">
            {/* Header */}
            <div className="px-6 py-4 flex items-center justify-between border-b border-purple-500/20">
              <div className="flex items-center gap-2.5">
                <span className="text-xs font-extrabold px-2.5 py-0.5 rounded-full bg-purple-600/40 text-purple-300 border border-purple-400/30">
                  ★ {trailerModalItem.match_score || 95}% Match
                </span>
                <h3 className="font-bold text-base text-white truncate">{trailerModalItem.title} - Official Trailer</h3>
              </div>
              <button
                onClick={() => setTrailerModalItem(null)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center text-sm font-bold transition-all"
              >
                ✕
              </button>
            </div>

            {/* Embedded YouTube Player */}
            <div className="relative aspect-video w-full bg-black">
              <iframe
                src={`https://www.youtube.com/embed/${trailerModalItem.trailer_url || 'zSWdZVtXT7E'}?autoplay=1&rel=0`}
                title={`${trailerModalItem.title} Trailer`}
                className="w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>

            {/* Trailer Footer Info */}
            <div className="p-6 bg-[#1a0f3d] flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <p className="text-xs text-purple-300 font-semibold italic">"{trailerModalItem.tagline || 'Discover the journey.'}"</p>
                <p className="text-xs text-gray-300 mt-1 line-clamp-2 max-w-xl">{trailerModalItem.description}</p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => toggleLike(trailerModalItem)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                    trailerModalItem.is_liked ? 'bg-rose-600 text-white' : 'bg-white/10 hover:bg-white/20 text-white'
                  }`}
                >
                  {trailerModalItem.is_liked ? '❤️ Favorited' : '🤍 Add to Favorites'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ===================== 4. SURPRISE ME MODAL ===================== */}
      {surpriseModalItem && (
        <div className="fixed inset-y-0 inset-x-0 z-50 flex items-center justify-center p-4 modal-overlay animate-fadeIn">
          <div className="bg-white rounded-3xl overflow-hidden max-w-lg w-full border border-purple-200 shadow-2xl p-6 text-center space-y-4">
            <div className="w-16 h-16 mx-auto rounded-full bg-purple-100 flex items-center justify-center text-3xl animate-bounce">
              🎉
            </div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-purple-600 bg-purple-50 px-3 py-1 rounded-full">
              Your AI Surprise Discovery!
            </span>
            <img
              src={surpriseModalItem.poster_url}
              alt={surpriseModalItem.title}
              className="w-full h-52 object-cover rounded-2xl shadow-md"
            />
            <h3 className="text-xl font-extrabold text-gray-900 font-display">{surpriseModalItem.title}</h3>
            <p className="text-xs text-purple-600 font-semibold italic">"{surpriseModalItem.tagline}"</p>
            <p className="text-xs text-gray-600 line-clamp-3">{surpriseModalItem.description}</p>

            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                onClick={() => {
                  const it = surpriseModalItem;
                  setSurpriseModalItem(null);
                  openTrailerModal(it);
                }}
                className="px-6 py-2.5 bg-[#703bf7] hover:bg-[#5e22e2] text-white text-xs font-bold rounded-full shadow-md"
              >
                ▶ Watch Trailer
              </button>
              <button
                onClick={() => setSurpriseModalItem(null)}
                className="px-5 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-bold rounded-full"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ===================== 5. ITEM DETAIL MODAL (With Rating & Similar Items) ===================== */}
      {itemDetailModal && (
        <div className="fixed inset-y-0 inset-x-0 z-50 flex items-center justify-center p-4 modal-overlay animate-fadeIn">
          <div className="bg-white rounded-3xl overflow-hidden max-w-2xl w-full border border-purple-200 shadow-2xl p-6 space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-start">
              <span className="text-xs font-bold text-purple-600 uppercase tracking-wider">{itemDetailModal.category?.name}</span>
              <button onClick={() => setItemDetailModal(null)} className="text-gray-400 hover:text-gray-600 text-sm">✕</button>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-5">
              <img src={itemDetailModal.poster_url} alt={itemDetailModal.title} className="w-full sm:w-36 h-48 rounded-2xl object-cover shadow-sm shrink-0" />
              <div className="flex-1">
                <h3 className="text-xl font-bold text-gray-900 font-display">{itemDetailModal.title}</h3>
                <p className="text-xs text-purple-700 font-medium italic mt-0.5">"{itemDetailModal.tagline}"</p>
                <p className="text-xs text-gray-600 mt-2 leading-relaxed">{itemDetailModal.description}</p>
                
                <div className="flex flex-wrap items-center gap-2 mt-3">
                  <span className="text-xs font-bold px-2 py-0.5 rounded bg-amber-50 text-amber-700 border border-amber-200">
                    ★ {itemDetailModal.avg_rating} Rating
                  </span>
                  <span className="text-xs text-gray-400">Release: {itemDetailModal.release_year}</span>
                  <span className="text-xs text-purple-600">By: {itemDetailModal.creator || 'MindRec'}</span>
                </div>

                {/* 1-5 Star Interactive Rating Widget (FR-5.3) */}
                <div className="mt-4 pt-3 border-t border-purple-50 flex items-center gap-2">
                  <span className="text-xs font-bold text-gray-800">Your Rating:</span>
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map(star => (
                      <button
                        key={star}
                        onClick={() => handleRateItem(itemDetailModal, star)}
                        className={`text-xl transition-transform hover:scale-125 ${star <= userStarRating ? 'text-amber-400' : 'text-gray-300'}`}
                      >
                        ★
                      </button>
                    ))}
                  </div>
                  {userStarRating > 0 && (
                    <span className="text-xs font-extrabold text-purple-700 ml-1">({userStarRating}/5 ⭐)</span>
                  )}
                </div>
              </div>
            </div>

            {/* Similar Items (FR-5.2) */}
            {similarItems.length > 0 && (
              <div className="mt-4 pt-3 border-t border-purple-50">
                <h4 className="text-xs font-bold text-gray-900 mb-2">Similar Items (Content & Collaborative Match):</h4>
                <div className="flex gap-3 overflow-x-auto pb-2">
                  {similarItems.slice(0, 4).map(sim => (
                    <div
                      key={sim.id}
                      onClick={() => openItemDetail(sim)}
                      className="w-28 shrink-0 cursor-pointer group"
                    >
                      <img src={sim.poster_url} alt={sim.title} className="w-28 h-20 rounded-xl object-cover group-hover:opacity-80 transition-opacity" />
                      <p className="text-[11px] font-bold text-gray-800 truncate mt-1">{sim.title}</p>
                      <p className="text-[10px] text-purple-600 font-semibold">{sim.category?.name}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-purple-50">
              <button
                onClick={() => {
                  const it = itemDetailModal;
                  setItemDetailModal(null);
                  openTrailerModal(it);
                }}
                className="px-5 py-2 bg-[#703bf7] text-white text-xs font-bold rounded-full hover:bg-[#5e22e2]"
              >
                ▶ Watch Trailer
              </button>
              <button
                onClick={() => setItemDetailModal(null)}
                className="px-4 py-2 bg-gray-100 text-gray-700 text-xs font-bold rounded-full"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ===================== 6. ONBOARDING PREFERENCES MODAL ===================== */}
      {showOnboardingModal && (
        <div className="fixed inset-y-0 inset-x-0 z-50 flex items-center justify-center p-4 modal-overlay animate-fadeIn">
          <div className="bg-white rounded-3xl overflow-hidden max-w-lg w-full border border-purple-200 shadow-2xl p-6 space-y-4">
            <div className="text-center space-y-1">
              <span className="text-2xl">🪄</span>
              <h3 className="text-lg font-bold text-gray-900 font-display">Cold Start Onboarding (FR-2.1)</h3>
              <p className="text-xs text-gray-500">Pick your favorite categories so our AI recommender can personalize your feed instantly!</p>
            </div>

            <div className="grid grid-cols-2 gap-2 pt-2">
              {allCategories.map(cat => {
                const isSelected = selectedInterests.includes(cat.name);
                return (
                  <button
                    key={cat.name}
                    onClick={() => toggleInterest(cat.name)}
                    className={`p-3 rounded-2xl text-left border text-xs font-bold transition-all flex items-center justify-between ${
                      isSelected
                        ? 'bg-[#703bf7] text-white border-purple-600 shadow-sm'
                        : 'bg-purple-50/50 text-gray-800 border-purple-100 hover:bg-purple-50'
                    }`}
                  >
                    <span>{cat.icon} {cat.name}</span>
                    {isSelected && <span>✓</span>}
                  </button>
                );
              })}
            </div>

            <div className="flex items-center justify-end gap-2 pt-4 border-t border-purple-50">
              <button
                onClick={() => handleCompleteOnboarding(selectedInterests)}
                className="w-full py-2.5 bg-[#703bf7] hover:bg-[#5e22e2] text-white text-xs font-bold rounded-full shadow-md"
              >
                Save Preferences & Earn +10 Points ⭐
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ===================== 7. AUTH SWITCH & LOGIN MODAL ===================== */}
      {showAuthModal && (
        <div className="fixed inset-y-0 inset-x-0 z-50 flex items-center justify-center p-4 modal-overlay animate-fadeIn">
          <div className="bg-white rounded-3xl overflow-hidden max-w-md w-full border border-purple-200 shadow-2xl p-6 space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-base font-bold text-gray-900">Account Access</h3>
              <button onClick={() => setShowAuthModal(false)} className="text-gray-400 hover:text-gray-600 text-sm">✕</button>
            </div>

            {/* Quick Demo Switchers */}
            <div className="p-3 bg-purple-50 rounded-2xl border border-purple-100 space-y-2">
              <p className="text-[11px] font-bold text-purple-900 uppercase tracking-wider">Quick Demo Login (One-Click):</p>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => handleQuickSwitchUser('dharsitha')}
                  className="py-2 px-3 bg-white hover:bg-purple-100 border border-purple-200 rounded-xl text-xs font-bold text-purple-900 text-left"
                >
                  👤 Dharsitha (User)
                  <span className="block text-[10px] text-gray-500 font-normal">120 pts, 8 likes</span>
                </button>
                <button
                  onClick={() => handleQuickSwitchUser('admin')}
                  className="py-2 px-3 bg-white hover:bg-purple-100 border border-purple-200 rounded-xl text-xs font-bold text-purple-900 text-left"
                >
                  🛡️ Admin Account
                  <span className="block text-[10px] text-gray-500 font-normal">Full AI Console</span>
                </button>
              </div>
            </div>

            <div className="text-center pt-2">
              <p className="text-xs text-gray-500">Currently logged in as: <strong className="text-purple-700">{currentUser.full_name} ({currentUser.role})</strong></p>
            </div>
          </div>
        </div>
      )}

      {/* ===================== 8. ADMIN ADD ITEM MODAL ===================== */}
      {showAdminAddModal && (
        <div className="fixed inset-y-0 inset-x-0 z-50 flex items-center justify-center p-4 modal-overlay animate-fadeIn">
          <div className="bg-white rounded-3xl overflow-hidden max-w-lg w-full border border-purple-200 shadow-2xl p-6 space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-base font-bold text-gray-900">Add Catalogue Item (FR-8.2)</h3>
              <button onClick={() => setShowAdminAddModal(false)} className="text-gray-400 hover:text-gray-600 text-sm">✕</button>
            </div>

            <form onSubmit={handleAdminCreateItem} className="space-y-3">
              <div>
                <label className="block text-[11px] font-bold text-gray-700 uppercase">Title</label>
                <input
                  type="text" required
                  value={newItemForm.title}
                  onChange={(e) => setNewItemForm({ ...newItemForm, title: e.target.value })}
                  placeholder="e.g. Blade Runner 2049"
                  className="w-full px-3 py-2 text-xs rounded-xl border border-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-gray-700 uppercase">Category</label>
                  <select
                    value={newItemForm.category_id}
                    onChange={(e) => setNewItemForm({ ...newItemForm, category_id: parseInt(e.target.value) })}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-purple-200"
                  >
                    <option value={1}>Movies & Series</option>
                    <option value={2}>Technology</option>
                    <option value={3}>Music</option>
                    <option value={4}>Books</option>
                    <option value={5}>Anime</option>
                    <option value={6}>Games</option>
                    <option value={7}>Travel</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-gray-700 uppercase">YouTube Video ID</label>
                  <input
                    type="text"
                    value={newItemForm.trailer_url}
                    onChange={(e) => setNewItemForm({ ...newItemForm, trailer_url: e.target.value })}
                    placeholder="e.g. gCcx85zbxz4"
                    className="w-full px-3 py-2 text-xs rounded-xl border border-purple-200"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-gray-700 uppercase">Tagline</label>
                <input
                  type="text"
                  value={newItemForm.tagline}
                  onChange={(e) => setNewItemForm({ ...newItemForm, tagline: e.target.value })}
                  placeholder="e.g. More human than human."
                  className="w-full px-3 py-2 text-xs rounded-xl border border-purple-200"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-gray-700 uppercase">Description</label>
                <textarea
                  rows="2"
                  value={newItemForm.description}
                  onChange={(e) => setNewItemForm({ ...newItemForm, description: e.target.value })}
                  placeholder="Item synopsis..."
                  className="w-full px-3 py-2 text-xs rounded-xl border border-purple-200"
                ></textarea>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button" onClick={() => setShowAdminAddModal(false)}
                  className="px-4 py-2 bg-gray-100 text-gray-700 text-xs font-bold rounded-full"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#703bf7] text-white text-xs font-bold rounded-full hover:bg-[#5e22e2]"
                >
                  Create Item
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}

// Mount the React Application
const rootElement = document.getElementById('root');
const root = ReactDOM.createRoot(rootElement);
root.render(<App />);
