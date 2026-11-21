import os
import django
from datetime import timedelta
from django.utils import timezone

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'mindrec.settings')
django.setup()

from apps.authentication.models import User, AuthToken
from apps.catalogue.models import Category, Genre, Item
from apps.recommendations.models import UserPreference, Recommendation, RecommendationFeedback
from apps.activity.models import Like, Rating, Activity
from apps.notifications.models import Notification

def seed():
    print("🚀 Seeding MindRec database with expanded catalogue & RAG dataset...")

    # 1. Categories
    categories_data = [
        {'name': 'Movies & Series', 'slug': 'movies-series', 'icon': 'Clapperboard'},
        {'name': 'Movies', 'slug': 'movies', 'icon': 'Film'},
        {'name': 'Series', 'slug': 'series', 'icon': 'Tv'},
        {'name': 'Documentaries', 'slug': 'documentaries', 'icon': 'Video'},
        {'name': 'Technology', 'slug': 'technology', 'icon': 'Laptop'},
        {'name': 'Music', 'slug': 'music', 'icon': 'Music'},
        {'name': 'Books', 'slug': 'books', 'icon': 'BookOpen'},
        {'name': 'Anime', 'slug': 'anime', 'icon': 'Sparkles'},
        {'name': 'Games', 'slug': 'games', 'icon': 'Gamepad2'},
        {'name': 'Travel', 'slug': 'travel', 'icon': 'Plane'},
    ]

    cat_map = {}
    for c in categories_data:
        cat_obj, _ = Category.objects.get_or_create(name=c['name'], defaults={'slug': c['slug'], 'icon': c['icon']})
        cat_map[c['name']] = cat_obj

    # 2. Genres
    genres_data = [
        'Sci-Fi', 'Drama', 'Adventure', 'Fantasy', 'Action', 'Crime',
        'Anime', 'Romance', 'Comedy', 'Thriller', 'Animation', 'Horror',
        'AI & Data', 'Cyberpunk', 'Ambient', 'Non-Fiction', 'RPG',
        'Open World', 'Cultural', 'Documentaries', 'Space & Nature', 'Mystery'
    ]
    genre_map = {}
    for g in genres_data:
        g_obj, _ = Genre.objects.get_or_create(name=g, defaults={'slug': g.lower().replace(' ', '-').replace('&', 'and')})
        genre_map[g] = g_obj

    # 3. Items Dataset (50+ Rich Items)
    items_data = [
        # --- Featured on Figure 1 ---
        {
            'title': 'Interstellar',
            'category': cat_map['Movies & Series'],
            'genres': ['Sci-Fi', 'Drama', 'Adventure'],
            'tagline': 'A journey beyond stars...',
            'description': 'When Earth becomes uninhabitable in the future, a farmer and ex-NASA pilot, Joseph Cooper, is tasked to pilot a spacecraft to find a new planet for humanity.',
            'poster_url': 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&auto=format&fit=crop&q=80',
            'trailer_url': 'zSWdZVtXT7E',
            'release_year': 2014,
            'creator': 'Christopher Nolan',
            'avg_rating': 8.7,
            'popularity': 98.0,
        },
        {
            'title': 'Harry Potter Series',
            'category': cat_map['Movies & Series'],
            'genres': ['Fantasy', 'Adventure'],
            'tagline': 'Magic, friendship, forever.',
            'description': 'An orphaned boy enrolls in a school of wizardry, where he learns the truth about himself, his family and the terrible evil that haunts the magical world.',
            'poster_url': 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=600&auto=format&fit=crop&q=80',
            'trailer_url': 'VyHV0BRtdxo',
            'release_year': 2001,
            'creator': 'J.K. Rowling / Chris Columbus',
            'avg_rating': 8.5,
            'popularity': 95.0,
        },
        {
            'title': 'The Dark Knight',
            'category': cat_map['Movies & Series'],
            'genres': ['Action', 'Crime', 'Drama'],
            'tagline': 'Why so serious?',
            'description': 'When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests.',
            'poster_url': 'https://images.unsplash.com/photo-1509281373149-e957c6296406?w=600&auto=format&fit=crop&q=80',
            'trailer_url': 'EXeTwQWrcwY',
            'release_year': 2008,
            'creator': 'Christopher Nolan',
            'avg_rating': 9.0,
            'popularity': 97.0,
        },
        {
            'title': 'Your Name',
            'category': cat_map['Anime'],
            'genres': ['Anime', 'Romance', 'Drama'],
            'tagline': 'A story across time.',
            'description': 'Two teenagers share a profound, magical connection upon discovering they are swapping bodies across time and distance.',
            'poster_url': 'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=600&auto=format&fit=crop&q=80',
            'trailer_url': 'xU47nhruN-Q',
            'release_year': 2016,
            'creator': 'Makoto Shinkai',
            'avg_rating': 8.4,
            'popularity': 94.0,
        },
        {
            'title': 'K-Dramas',
            'category': cat_map['Series'],
            'genres': ['Romance', 'Drama'],
            'tagline': 'Heartwarming stories across borders.',
            'description': 'A paragliding mishap drops a South Korean heiress into North Korea - and into the life of an army officer, who decides he will help her hide.',
            'poster_url': 'https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?w=600&auto=format&fit=crop&q=80',
            'trailer_url': 'eXMjTXL2Vks',
            'release_year': 2020,
            'creator': 'Studio Dragon',
            'avg_rating': 8.8,
            'popularity': 92.0,
        },
        {
            'title': 'Anime Picks',
            'category': cat_map['Anime'],
            'genres': ['Anime', 'Action', 'Fantasy'],
            'tagline': 'Epic battles and unforgettable bonds.',
            'description': 'Young Eren Jaeger vows to cleanse the earth of the giant humanoid Titans that have brought humanity to the brink of extinction.',
            'poster_url': 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=600&auto=format&fit=crop&q=80',
            'trailer_url': 'M_OauHnAFc8',
            'release_year': 2022,
            'creator': 'Hajime Isayama',
            'avg_rating': 9.1,
            'popularity': 96.0,
        },

        # --- Movies ---
        {
            'title': 'Inception',
            'category': cat_map['Movies'],
            'genres': ['Sci-Fi', 'Action', 'Thriller'],
            'tagline': 'Your mind is the scene of the crime.',
            'description': 'A skilled extractor steals secrets through subconscious dream infiltration and takes on a seemingly impossible task: inception.',
            'poster_url': 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=600&auto=format&fit=crop&q=80',
            'trailer_url': 'YoHD9XEInc0',
            'release_year': 2010,
            'creator': 'Christopher Nolan',
            'avg_rating': 8.8,
            'popularity': 96.5,
        },
        {
            'title': 'Dune: Part Two',
            'category': cat_map['Movies'],
            'genres': ['Sci-Fi', 'Adventure', 'Drama'],
            'tagline': 'Long live the fighters.',
            'description': 'Paul Atreides unites with Chani and the Fremen to avenge the fallen House Atreides on the desert world of Arrakis.',
            'poster_url': 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=600&auto=format&fit=crop&q=80',
            'trailer_url': 'Way9Dexny3w',
            'release_year': 2024,
            'creator': 'Denis Villeneuve',
            'avg_rating': 8.9,
            'popularity': 97.5,
        },
        {
            'title': 'Oppenheimer',
            'category': cat_map['Movies'],
            'genres': ['Drama', 'Thriller'],
            'tagline': 'The story of American Prometheus.',
            'description': 'The historical journey of J. Robert Oppenheimer leading the Manhattan Project during World War II.',
            'poster_url': 'https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=600&auto=format&fit=crop&q=80',
            'trailer_url': 'uYPbbksJxIg',
            'release_year': 2023,
            'creator': 'Christopher Nolan',
            'avg_rating': 8.9,
            'popularity': 96.0,
        },
        {
            'title': 'Blade Runner 2049',
            'category': cat_map['Movies'],
            'genres': ['Sci-Fi', 'Cyberpunk', 'Mystery'],
            'tagline': 'More human than human.',
            'description': 'Officer K discovers a long-buried secret that leads him on a quest to find former blade runner Rick Deckard.',
            'poster_url': 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=600&auto=format&fit=crop&q=80',
            'trailer_url': 'gCcx85zbxz4',
            'release_year': 2017,
            'creator': 'Denis Villeneuve',
            'avg_rating': 8.7,
            'popularity': 93.0,
        },
        {
            'title': 'Everything Everywhere All at Once',
            'category': cat_map['Movies'],
            'genres': ['Sci-Fi', 'Comedy', 'Action'],
            'tagline': 'Across parallel dimensions, family matters most.',
            'description': 'A Chinese immigrant laundromat owner is swept up in an insane adventure where she alone can save existence.',
            'poster_url': 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?w=600&auto=format&fit=crop&q=80',
            'trailer_url': 'wxN1T1uxQ2g',
            'release_year': 2022,
            'creator': 'Daniels',
            'avg_rating': 8.8,
            'popularity': 94.0,
        },
        {
            'title': 'Arrival',
            'category': cat_map['Movies'],
            'genres': ['Sci-Fi', 'Drama', 'Mystery'],
            'tagline': 'Language is the universal key.',
            'description': 'Linguistics professor Louise Banks leads an elite team to communicate with extraterrestrial spacecraft.',
            'poster_url': 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=600&auto=format&fit=crop&q=80',
            'trailer_url': 'tFMo3UJ4B4g',
            'release_year': 2016,
            'creator': 'Denis Villeneuve',
            'avg_rating': 8.5,
            'popularity': 91.0,
        },

        # --- Series ---
        {
            'title': 'Stranger Things',
            'category': cat_map['Series'],
            'genres': ['Sci-Fi', 'Horror', 'Drama'],
            'tagline': 'One summer can change everything.',
            'description': 'In a small 1980s Indiana town, secret government experiments uncover supernatural mysteries and an alternate dimension.',
            'poster_url': 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=600&auto=format&fit=crop&q=80',
            'trailer_url': 'b9EkMc79ZSU',
            'release_year': 2022,
            'creator': 'The Duffer Brothers',
            'avg_rating': 8.7,
            'popularity': 97.0,
        },
        {
            'title': 'Severance',
            'category': cat_map['Series'],
            'genres': ['Sci-Fi', 'Thriller', 'Drama'],
            'tagline': 'Please do not attempt to remember your outside life.',
            'description': 'Mark leads a team of office workers whose memories have been surgically divided between their work and personal lives.',
            'poster_url': 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&auto=format&fit=crop&q=80',
            'trailer_url': 'xEQP4VVuyrY',
            'release_year': 2022,
            'creator': 'Dan Erickson / Ben Stiller',
            'avg_rating': 8.9,
            'popularity': 95.5,
        },
        {
            'title': 'Arcane: League of Legends',
            'category': cat_map['Series'],
            'genres': ['Animation', 'Action', 'Sci-Fi'],
            'tagline': 'The delicate balance between rich Piltover and underground Zaun.',
            'description': 'Sisters Jinx and Vi find themselves on rival sides of a brewing war between utopian technology and chemtech weapons.',
            'poster_url': 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=600&auto=format&fit=crop&q=80',
            'trailer_url': 'fXmAurh012s',
            'release_year': 2024,
            'creator': 'Christian Linke / Riot Games',
            'avg_rating': 9.2,
            'popularity': 98.5,
        },
        {
            'title': 'Chernobyl',
            'category': cat_map['Series'],
            'genres': ['Drama', 'Thriller'],
            'tagline': 'What is the cost of lies?',
            'description': 'In April 1986, an explosion at the Chernobyl nuclear power plant causes one of the greatest human-made catastrophes.',
            'poster_url': 'https://images.unsplash.com/photo-1498084393753-b411b2d26b34?w=600&auto=format&fit=crop&q=80',
            'trailer_url': 's9APLXM9Ei8',
            'release_year': 2019,
            'creator': 'Craig Mazin',
            'avg_rating': 9.4,
            'popularity': 96.0,
        },
        {
            'title': 'Black Mirror',
            'category': cat_map['Series'],
            'genres': ['Sci-Fi', 'Thriller', 'Drama'],
            'tagline': 'A dark, satirical exploration of near-future technology.',
            'description': 'An anthology series tapping into the collective unease about the modern digital world and AI innovations.',
            'poster_url': 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=600&auto=format&fit=crop&q=80',
            'trailer_url': 'V0UcLsVd12c',
            'release_year': 2023,
            'creator': 'Charlie Brooker',
            'avg_rating': 8.8,
            'popularity': 93.5,
        },

        # --- Documentaries ---
        {
            'title': 'Our Planet',
            'category': cat_map['Documentaries'],
            'genres': ['Documentaries', 'Space & Nature'],
            'tagline': 'Experience our planet\'s natural beauty in high definition.',
            'description': 'Sir David Attenborough narrates this breathtaking journey across Earth’s rarest animals and endangered ecosystems.',
            'poster_url': 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=600&auto=format&fit=crop&q=80',
            'trailer_url': 'aETNYyrqNYE',
            'release_year': 2019,
            'creator': 'Alastair Fothergill / David Attenborough',
            'avg_rating': 9.3,
            'popularity': 94.0,
        },
        {
            'title': 'The Social Dilemma',
            'category': cat_map['Documentaries'],
            'genres': ['Documentaries', 'AI & Data'],
            'tagline': 'The tech design behind algorithmic addiction.',
            'description': 'Tech experts and insiders sound the alarm on the dangerous human impact of social networking and surveillance capitalism.',
            'poster_url': 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&auto=format&fit=crop&q=80',
            'trailer_url': 'uaaC57tcci4',
            'release_year': 2020,
            'creator': 'Jeff Orlowski',
            'avg_rating': 8.6,
            'popularity': 91.0,
        },
        {
            'title': 'AlphaGo: The DeepMind Journey',
            'category': cat_map['Documentaries'],
            'genres': ['Documentaries', 'AI & Data'],
            'tagline': 'Can artificial intelligence beat a human master?',
            'description': 'The story of DeepMind creating an AI program to compete against Lee Sedol in the ancient Chinese game of Go.',
            'poster_url': 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=600&auto=format&fit=crop&q=80',
            'trailer_url': 'WXuK6gekU1Y',
            'release_year': 2017,
            'creator': 'Greg Kohs / Google DeepMind',
            'avg_rating': 8.9,
            'popularity': 92.5,
        },
        {
            'title': 'Apollo 11',
            'category': cat_map['Documentaries'],
            'genres': ['Documentaries', 'Sci-Fi'],
            'tagline': 'Mankind\'s giant leap, presented from newly discovered 70mm footage.',
            'description': 'A cinematic look at the 1969 Apollo 11 mission to land the first humans on the Moon, told entirely with archival audio and film.',
            'poster_url': 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=600&auto=format&fit=crop&q=80',
            'trailer_url': '3Co8Z8BQgWc',
            'release_year': 2019,
            'creator': 'Todd Douglas Miller',
            'avg_rating': 8.8,
            'popularity': 89.0,
        },

        # --- Technology & AI ---
        {
            'title': 'Generative AI Revolution',
            'category': cat_map['Technology'],
            'genres': ['AI & Data', 'Non-Fiction'],
            'tagline': 'From neural foundations to autonomous agents.',
            'description': 'Master large language models, multimodal reasoning architectures, and next-generation cognitive systems.',
            'poster_url': 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=600&auto=format&fit=crop&q=80',
            'trailer_url': 'aircAruvnKk',
            'release_year': 2025,
            'creator': 'Dr. Elena Vance',
            'avg_rating': 9.2,
            'popularity': 95.0,
        },
        {
            'title': 'Building LLM Agents with RAG',
            'category': cat_map['Technology'],
            'genres': ['AI & Data', 'Non-Fiction'],
            'tagline': 'Retrieval-Augmented Generation from theory to deployment.',
            'description': 'Hands-on guide to building production RAG applications with vector embeddings, semantic search, and tool-augmented agent loops.',
            'poster_url': 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=600&auto=format&fit=crop&q=80',
            'trailer_url': 'T-D1OfcDW1M',
            'release_year': 2025,
            'creator': 'MindRec AI Lab',
            'avg_rating': 9.4,
            'popularity': 97.0,
        },
        {
            'title': 'Quantum Horizons',
            'category': cat_map['Technology'],
            'genres': ['AI & Data', 'Sci-Fi'],
            'tagline': 'Unlocking quantum supremacy and fault-tolerant qubits.',
            'description': 'Explore how quantum computing hardware is redefining cryptography, molecular simulation, and global optimization.',
            'poster_url': 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=600&auto=format&fit=crop&q=80',
            'trailer_url': 'JhHMJCUmq28',
            'release_year': 2024,
            'creator': 'Quantum Labs Institute',
            'avg_rating': 8.7,
            'popularity': 87.0,
        },
        {
            'title': 'Autonomous Robotics & ROS2',
            'category': cat_map['Technology'],
            'genres': ['AI & Data', 'Non-Fiction'],
            'tagline': 'Perception, SLAM, and control for embodied AI.',
            'description': 'Deep engineering dive into spatial computing, real-time kinematics, and end-to-end neural motion planning.',
            'poster_url': 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=600&auto=format&fit=crop&q=80',
            'trailer_url': 'j1X9L19kMps',
            'release_year': 2024,
            'creator': 'Robotics Consortium',
            'avg_rating': 9.0,
            'popularity': 91.0,
        },

        # --- Anime ---
        {
            'title': 'Attack on Titan: The Final Season',
            'category': cat_map['Anime'],
            'genres': ['Anime', 'Action', 'Fantasy'],
            'tagline': 'Dedicate your heart.',
            'description': 'The boundary between enemy and ally shatters as the truths of the world outside the walls of Paradis are revealed.',
            'poster_url': 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=600&auto=format&fit=crop&q=80',
            'trailer_url': 'M_OauHnAFc8',
            'release_year': 2023,
            'creator': 'MAPPA / Hajime Isayama',
            'avg_rating': 9.2,
            'popularity': 98.0,
        },
        {
            'title': 'Spirited Away',
            'category': cat_map['Anime'],
            'genres': ['Anime', 'Fantasy', 'Animation'],
            'tagline': 'Never forget who you are.',
            'description': 'During her family\'s move to the suburbs, a sullen 10-year-old girl wanders into a world ruled by gods and spirits.',
            'poster_url': 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?w=600&auto=format&fit=crop&q=80',
            'trailer_url': 'ByXuk9QqQkk',
            'release_year': 2001,
            'creator': 'Hayao Miyazaki / Studio Ghibli',
            'avg_rating': 9.1,
            'popularity': 95.0,
        },
        {
            'title': 'Cyberpunk: Edgerunners',
            'category': cat_map['Anime'],
            'genres': ['Anime', 'Cyberpunk', 'Action'],
            'tagline': 'Stay human in a city obsessed with chrome.',
            'description': 'A street kid trying to survive in a technology and body modification-obsessed city of the future becomes an edgerunner.',
            'poster_url': 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=600&auto=format&fit=crop&q=80',
            'trailer_url': 'JtqIas3bYhg',
            'release_year': 2022,
            'creator': 'Studio Trigger / CD PROJEKT RED',
            'avg_rating': 8.9,
            'popularity': 94.0,
        },
        {
            'title': 'Jujutsu Kaisen',
            'category': cat_map['Anime'],
            'genres': ['Anime', 'Action', 'Fantasy'],
            'tagline': 'Unleash cursed energy.',
            'description': 'A boy swallows a cursed talisman - the finger of a demon - and joins a secret school of Jujutsu Sorcerers.',
            'poster_url': 'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=600&auto=format&fit=crop&q=80',
            'trailer_url': 'pkZXflMmU1Y',
            'release_year': 2023,
            'creator': 'Gege Akutami / MAPPA',
            'avg_rating': 8.8,
            'popularity': 96.0,
        },

        # --- Books ---
        {
            'title': 'Project Hail Mary',
            'category': cat_map['Books'],
            'genres': ['Sci-Fi', 'Adventure'],
            'tagline': 'A lone astronaut on a desperate cosmic mission.',
            'description': 'Ryland Grace is the sole survivor on a desperate last-chance mission to save Earth from an extinction-level solar anomaly.',
            'poster_url': 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=600&auto=format&fit=crop&q=80',
            'trailer_url': '1zN1p6aW7p4',
            'release_year': 2021,
            'creator': 'Andy Weir',
            'avg_rating': 9.3,
            'popularity': 93.0,
        },
        {
            'title': 'Atomic Habits',
            'category': cat_map['Books'],
            'genres': ['Non-Fiction', 'Cultural'],
            'tagline': 'An easy & proven way to build good habits.',
            'description': 'Tiny changes that lead to remarkable results. Learn how 1% improvements accumulate into profound transformation.',
            'poster_url': 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=600&auto=format&fit=crop&q=80',
            'trailer_url': 'U_nzqnXWvSo',
            'release_year': 2018,
            'creator': 'James Clear',
            'avg_rating': 9.2,
            'popularity': 95.0,
        },
        {
            'title': 'Designing Data-Intensive Applications',
            'category': cat_map['Books'],
            'genres': ['Non-Fiction', 'AI & Data'],
            'tagline': 'The definitive architecture bible for distributed systems.',
            'description': 'Fundamental principles of scalability, consistency, and reliability across modern data engineering and databases.',
            'poster_url': 'https://images.unsplash.com/photo-1532012164546-f432f2e3777f?w=600&auto=format&fit=crop&q=80',
            'trailer_url': '2ZlQd7o2QcI',
            'release_year': 2020,
            'creator': 'Martin Kleppmann',
            'avg_rating': 9.5,
            'popularity': 96.0,
        },
        {
            'title': 'Dune (The Masterpiece Novel)',
            'category': cat_map['Books'],
            'genres': ['Sci-Fi', 'Fantasy'],
            'tagline': 'The spice must flow.',
            'description': 'Frank Herbert’s sweeping epic of politics, ecology, and prophecy set upon the harsh desert world of Dune.',
            'poster_url': 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=600&auto=format&fit=crop&q=80',
            'trailer_url': 'Way9Dexny3w',
            'release_year': 2021,
            'creator': 'Frank Herbert',
            'avg_rating': 9.1,
            'popularity': 94.0,
        },

        # --- Games ---
        {
            'title': 'Elden Ring',
            'category': cat_map['Games'],
            'genres': ['RPG', 'Open World', 'Fantasy'],
            'tagline': 'Rise, Tarnished, and be guided by grace.',
            'description': 'An expansive action-RPG fantasy set within a world created by Hidetaka Miyazaki and George R. R. Martin.',
            'poster_url': 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=600&auto=format&fit=crop&q=80',
            'trailer_url': 'E3Huy2cdih0',
            'release_year': 2022,
            'creator': 'FromSoftware',
            'avg_rating': 9.4,
            'popularity': 99.0,
        },
        {
            'title': 'Cyberpunk 2077: Phantom Liberty',
            'category': cat_map['Games'],
            'genres': ['RPG', 'Cyberpunk', 'Action'],
            'tagline': 'Freedom always comes at a price.',
            'description': 'A spy-thriller expansion for Cyberpunk 2077. Return as cyber-enhanced mercenary V on a dangerous mission in Dogtown.',
            'poster_url': 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=600&auto=format&fit=crop&q=80',
            'trailer_url': 'kfZZmD0m7m0',
            'release_year': 2023,
            'creator': 'CD PROJEKT RED',
            'avg_rating': 9.0,
            'popularity': 94.5,
        },
        {
            'title': 'Baldur\'s Gate 3',
            'category': cat_map['Games'],
            'genres': ['RPG', 'Fantasy', 'Adventure'],
            'tagline': 'Gather your party and venture forth.',
            'description': 'A next-generation RPG set in the world of Dungeons & Dragons, offering unmatched player freedom and narrative depth.',
            'poster_url': 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=600&auto=format&fit=crop&q=80',
            'trailer_url': '1T22wN1LGXM',
            'release_year': 2023,
            'creator': 'Larian Studios',
            'avg_rating': 9.5,
            'popularity': 98.0,
        },
        {
            'title': 'The Legend of Zelda: Tears of the Kingdom',
            'category': cat_map['Games'],
            'genres': ['Adventure', 'Open World', 'Fantasy'],
            'tagline': 'An epic adventure across the land and skies of Hyrule.',
            'description': 'Link journeys across Hyrule and into the clouds, harnessing newfound building and rewinding abilities.',
            'poster_url': 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=600&auto=format&fit=crop&q=80',
            'trailer_url': 'uHGShqcAHlQ',
            'release_year': 2023,
            'creator': 'Nintendo',
            'avg_rating': 9.3,
            'popularity': 97.0,
        },

        # --- Music ---
        {
            'title': 'Midnight Synthwave Odyssey',
            'category': cat_map['Music'],
            'genres': ['Ambient', 'Cyberpunk'],
            'tagline': 'Retro-futuristic electronic journeys through neon highways.',
            'description': 'Deep analog synth pads, punchy 80s drums, and melodic neon soundscapes designed for focus and late-night flow.',
            'poster_url': 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=600&auto=format&fit=crop&q=80',
            'trailer_url': '4xDzrJKXOOY',
            'release_year': 2024,
            'creator': 'Kavinsky & The Midnight',
            'avg_rating': 8.9,
            'popularity': 90.0,
        },
        {
            'title': 'Hans Zimmer: Interstellar Live Suite',
            'category': cat_map['Music'],
            'genres': ['Ambient', 'Drama'],
            'tagline': 'The majestic organ score that touches the cosmos.',
            'description': 'Hans Zimmer’s soaring live orchestral performance of the Interstellar soundtrack, featuring pipe organ and strings.',
            'poster_url': 'https://images.unsplash.com/photo-1465847899084-d164df4dedc6?w=600&auto=format&fit=crop&q=80',
            'trailer_url': 'N9eO_5N62u0',
            'release_year': 2023,
            'creator': 'Hans Zimmer Orchestra',
            'avg_rating': 9.6,
            'popularity': 97.0,
        },

        # --- Travel ---
        {
            'title': 'Amalfi Coast & Positano Expedition',
            'category': cat_map['Travel'],
            'genres': ['Cultural', 'Adventure'],
            'tagline': 'Sun-drenched cliffs and pastel cliffside villages.',
            'description': 'Complete travel discovery guide to the cliffside roads, crystal blue Tyrrhenian waters, and lemon groves of Southern Italy.',
            'poster_url': 'https://images.unsplash.com/photo-1533105079780-92b9be482077?w=600&auto=format&fit=crop&q=80',
            'trailer_url': '1F37Xf_lWbE',
            'release_year': 2024,
            'creator': 'Wanderlust Travel Co',
            'avg_rating': 9.1,
            'popularity': 89.0,
        },
        {
            'title': 'Kyoto Serenity: Ancient Temples',
            'category': cat_map['Travel'],
            'genres': ['Cultural', 'Adventure'],
            'tagline': 'Walk through timeless torii gates and bamboo groves.',
            'description': 'Discover the cultural capital of Japan with historic zen gardens, Arashiyama bamboo forests, and centuries-old teahouses.',
            'poster_url': 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=600&auto=format&fit=crop&q=80',
            'trailer_url': 'WLIv7h6Z22Y',
            'release_year': 2023,
            'creator': 'Japan Tourism Bureau',
            'avg_rating': 9.2,
            'popularity': 91.5,
        },
        {
            'title': 'Aurora Borealis in Tromsø, Norway',
            'category': cat_map['Travel'],
            'genres': ['Space & Nature', 'Adventure'],
            'tagline': 'Dance under the green celestial ribbons of the Arctic.',
            'description': 'An Arctic winter expedition to the fjords of Northern Norway to witness the Northern Lights and dog-sledding.',
            'poster_url': 'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=600&auto=format&fit=crop&q=80',
            'trailer_url': 'fVsONlc3OUY',
            'release_year': 2024,
            'creator': 'Nordic Discovery',
            'avg_rating': 9.4,
            'popularity': 93.0,
        }
    ]

    item_objs = []
    for it_data in items_data:
        genres_list = it_data.pop('genres', [])
        it, created = Item.objects.get_or_create(title=it_data['title'], defaults=it_data)
        # Update fields if existed
        if not created:
            for k, v in it_data.items():
                setattr(it, k, v)
            it.save()

        for g_name in genres_list:
            if g_name in genre_map:
                it.genres.add(genre_map[g_name])
        item_objs.append(it)

    print(f"✅ Successfully seeded {len(item_objs)} catalogue items across all categories.")

    # 4. User: Dharsitha & Admin
    user, created = User.objects.get_or_create(
        username='dharsitha',
        defaults={
            'email': 'dharsitha@mindrec.ai',
            'full_name': 'Dharsitha',
            'avatar': 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
            'bio': 'Passionate explorer of cinema, AI tech, and immersive anime stories ✨',
            'points': 120,
            'is_verified': True,
            'role': 'user'
        }
    )
    user.set_password('MindRec@2026')
    user.points = 120
    user.save()
    token = AuthToken.objects.filter(user=user).first()
    if not token:
        AuthToken.objects.create(user=user, key='dharsitha-session-token-mindrec-2026', expires_at=timezone.now() + timedelta(days=365))
    else:
        token.key = 'dharsitha-session-token-mindrec-2026'
        token.expires_at = timezone.now() + timedelta(days=365)
        token.save()

    # Admin
    admin_user, _ = User.objects.get_or_create(
        username='admin',
        defaults={
            'email': 'admin@mindrec.ai',
            'full_name': 'MindRec Admin',
            'is_staff': True,
            'is_superuser': True,
            'role': 'admin',
            'points': 500
        }
    )
    admin_user.set_password('Admin@2026')
    admin_user.save()
    admin_token = AuthToken.objects.filter(user=admin_user).first()
    if not admin_token:
        AuthToken.objects.create(user=admin_user, key='admin-session-token-mindrec-2026', expires_at=timezone.now() + timedelta(days=365))
    else:
        admin_token.key = 'admin-session-token-mindrec-2026'
        admin_token.expires_at = timezone.now() + timedelta(days=365)
        admin_token.save()

    # Preferences
    UserPreference.objects.get_or_create(user=user, category=cat_map['Movies & Series'], weight=1.0)
    UserPreference.objects.get_or_create(user=user, category=cat_map['Technology'], weight=0.85)
    UserPreference.objects.get_or_create(user=user, category=cat_map['Anime'], weight=0.90)

    # 8 Likes
    for lt in ['Interstellar', 'Harry Potter Series', 'The Dark Knight', 'Your Name', 'Inception', 'Cyberpunk 2077: Phantom Liberty', 'Dune: Part Two', 'Elden Ring']:
        matching_it = Item.objects.filter(title=lt).first()
        if matching_it:
            Like.objects.get_or_create(user=user, item=matching_it)

    print("🎉 MindRec Database Refresh & Expanded Catalogue Complete!")

if __name__ == '__main__':
    seed()
