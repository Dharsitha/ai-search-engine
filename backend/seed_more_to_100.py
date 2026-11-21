import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'mindrec.settings')
django.setup()

from apps.catalogue.models import Category, Genre, Item

def seed_to_100():
    print("🌱 Adding 55+ rich items to reach over 100 total recommendations...")

    # Categories
    cat_map = {}
    for name, slug, icon in [
        ('Movies', 'movies', '🎬'),
        ('Series', 'series', '📺'),
        ('Anime', 'anime', '🎌'),
        ('Documentaries', 'documentaries', '🌍'),
        ('Technology', 'technology', '💻'),
        ('Games', 'games', '🎮'),
        ('Books', 'books', '📚'),
        ('Music', 'music', '🎵'),
        ('Travel', 'travel', '✈️'),
    ]:
        c, _ = Category.objects.get_or_create(name=name, defaults={'slug': slug, 'icon': icon, 'description': f'Top curated {name}'})
        cat_map[name] = c

    # Genres helper
    def get_genres(names):
        res = []
        for n in names:
            slug = n.lower().replace(' ', '-').replace('&', 'and')
            g, _ = Genre.objects.get_or_create(name=n, defaults={'slug': slug})
            res.append(g)
        return res

    NEW_ITEMS = [
        # --- MOVIES (15 new) ---
        {
            'category': 'Movies',
            'title': 'Pulp Fiction',
            'release_year': 1994,
            'creator': 'Quentin Tarantino',
            'avg_rating': 8.9,
            'popularity': 98.0,
            'tagline': 'You won\'t know the facts until you\'ve seen the fiction.',
            'description': 'The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of diner bandits intertwine in four tales of violence and redemption.',
            'genres': ['Crime', 'Drama'],
            'trailer_url': 's7EdQ4FqbhY',
            'poster_url': 'https://images.unsplash.com/photo-1594909122845-11baa439b7bf?w=700&auto=format&fit=crop&q=80'
        },
        {
            'category': 'Movies',
            'title': 'The Matrix',
            'release_year': 1999,
            'creator': 'The Wachowskis',
            'avg_rating': 8.7,
            'popularity': 97.5,
            'tagline': 'Welcome to the Real World.',
            'description': 'When a beautiful stranger leads computer hacker Neo to a forbidding underworld, he discovers the shocking truth--the life he knows is the elaborate deception of an evil cyber-intelligence.',
            'genres': ['Sci-Fi', 'Action'],
            'trailer_url': 'vKQi3bBAJ34',
            'poster_url': 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=700&auto=format&fit=crop&q=80'
        },
        {
            'category': 'Movies',
            'title': 'Fight Club',
            'release_year': 1999,
            'creator': 'David Fincher',
            'avg_rating': 8.8,
            'popularity': 97.0,
            'tagline': 'Mischief. Mayhem. Soap.',
            'description': 'An insomniac office worker and a devil-may-care soap maker form an underground fight club that evolves into much more.',
            'genres': ['Drama', 'Thriller'],
            'trailer_url': 'qtRKDV93JU8',
            'poster_url': 'https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?w=700&auto=format&fit=crop&q=80'
        },
        {
            'category': 'Movies',
            'title': 'Goodfellas',
            'release_year': 1990,
            'creator': 'Martin Scorsese',
            'avg_rating': 8.7,
            'popularity': 96.0,
            'tagline': 'Three decades of life in the mafia.',
            'description': 'The story of Henry Hill and his life in the mafia, covering his relationship with his wife Karen and his mob partners Jimmy Conway and Tommy DeVito.',
            'genres': ['Crime', 'Biography', 'Drama'],
            'trailer_url': 'qo5jJpHtTX8',
            'poster_url': 'https://images.unsplash.com/photo-1485846234645-a62644f84728?w=700&auto=format&fit=crop&q=80'
        },
        {
            'category': 'Movies',
            'title': 'Forrest Gump',
            'release_year': 1994,
            'creator': 'Robert Zemeckis',
            'avg_rating': 8.8,
            'popularity': 98.5,
            'tagline': 'Life is like a box of chocolates.',
            'description': 'The history of the United States from the 1950s to the \'70s unfolds from the perspective of an Alabama man with an IQ of 75, who yearns to be reunited with his childhood sweetheart.',
            'genres': ['Drama', 'Romance'],
            'trailer_url': 'bLvqoHBptjg',
            'poster_url': 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=700&auto=format&fit=crop&q=80'
        },
        {
            'category': 'Movies',
            'title': 'The Silence of the Lambs',
            'release_year': 1991,
            'creator': 'Jonathan Demme',
            'avg_rating': 8.6,
            'popularity': 96.5,
            'tagline': 'To enter the mind of a killer she must challenge the mind of a madman.',
            'description': 'A young F.B.I. cadet must receive the help of an incarcerated and manipulative cannibal killer to help catch another serial killer.',
            'genres': ['Crime', 'Drama', 'Thriller'],
            'trailer_url': 'W6Mm8Sbe__o',
            'poster_url': 'https://images.unsplash.com/photo-1509248961158-e54f6934749c?w=700&auto=format&fit=crop&q=80'
        },
        {
            'category': 'Movies',
            'title': 'Gladiator',
            'release_year': 2000,
            'creator': 'Ridley Scott',
            'avg_rating': 8.5,
            'popularity': 96.0,
            'tagline': 'What we do in life echoes in eternity.',
            'description': 'A former Roman General sets out to exact vengeance against the corrupt emperor who murdered his family and sent him into slavery.',
            'genres': ['Action', 'Adventure', 'Drama'],
            'trailer_url': 'P5ieIbInFpg',
            'poster_url': 'https://images.unsplash.com/photo-1533488765986-dfa2a9939acd?w=700&auto=format&fit=crop&q=80'
        },
        {
            'category': 'Movies',
            'title': 'Whiplash',
            'release_year': 2014,
            'creator': 'Damien Chazelle',
            'avg_rating': 8.5,
            'popularity': 95.0,
            'tagline': 'The road to greatness can take you to the edge.',
            'description': 'A promising young drummer enrolls at a cut-throat music conservatory where his dreams of greatness are mentored by an instructor who will stop at nothing to realize a student\'s potential.',
            'genres': ['Drama', 'Music'],
            'trailer_url': '7d_jQycdQGo',
            'poster_url': 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=700&auto=format&fit=crop&q=80'
        },
        {
            'category': 'Movies',
            'title': 'Parasite',
            'release_year': 2019,
            'creator': 'Bong Joon-ho',
            'avg_rating': 8.5,
            'popularity': 97.0,
            'tagline': 'Act like you own the place.',
            'description': 'Greed and class discrimination threaten the newly formed symbiotic relationship between the wealthy Park family and the destitute Kim clan.',
            'genres': ['Drama', 'Thriller'],
            'trailer_url': '5xH0R_uie1U',
            'poster_url': 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=700&auto=format&fit=crop&q=80'
        },
        {
            'category': 'Movies',
            'title': 'Mad Max: Fury Road',
            'release_year': 2015,
            'creator': 'George Miller',
            'avg_rating': 8.1,
            'popularity': 94.5,
            'tagline': 'What a lovely day.',
            'description': 'In a post-apocalyptic wasteland, a woman rebels against a tyrannical ruler in search for her homeland with the aid of a group of female prisoners, a psychotic worshiper and an ex-drifter named Max.',
            'genres': ['Action', 'Adventure', 'Sci-Fi'],
            'trailer_url': 'hEJnMQG938g',
            'poster_url': 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=700&auto=format&fit=crop&q=80'
        },
        {
            'category': 'Movies',
            'title': 'Blade Runner 2049',
            'release_year': 2017,
            'creator': 'Denis Villeneuve',
            'avg_rating': 8.0,
            'popularity': 95.0,
            'tagline': 'The key to the future is finally unearthed.',
            'description': 'Young Blade Runner K\'s discovery of a long-buried secret leads him to track down former Blade Runner Rick Deckard, who\'s been missing for thirty years.',
            'genres': ['Sci-Fi', 'Mystery', 'Drama'],
            'trailer_url': 'gCcx85zbxz4',
            'poster_url': 'https://images.unsplash.com/photo-1514306191717-452ec28c7814?w=700&auto=format&fit=crop&q=80'
        },
        {
            'category': 'Movies',
            'title': 'Spider-Man: Into the Spider-Verse',
            'release_year': 2018,
            'creator': 'Bob Persichetti & Peter Ramsey',
            'avg_rating': 8.4,
            'popularity': 96.0,
            'tagline': 'More than one wears the mask.',
            'description': 'Teen Miles Morales becomes the new Spider-Man and joins other Spider-Heroes from parallel dimensions to stop a threat to all reality.',
            'genres': ['Animation', 'Action', 'Adventure'],
            'trailer_url': 'tg52up16eq0',
            'poster_url': 'https://images.unsplash.com/photo-1635805737707-575885ab0820?w=700&auto=format&fit=crop&q=80'
        },
        {
            'category': 'Movies',
            'title': 'Se7en',
            'release_year': 1995,
            'creator': 'David Fincher',
            'avg_rating': 8.6,
            'popularity': 96.5,
            'tagline': 'Seven deadly sins. Seven ways to die.',
            'description': 'Two detectives, a rookie and a veteran, hunt a serial killer who uses the seven deadly sins as his motives.',
            'genres': ['Crime', 'Drama', 'Mystery'],
            'trailer_url': 'znmZoVkCjpI',
            'poster_url': 'https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?w=700&auto=format&fit=crop&q=80'
        },

        # --- SERIES (10 new) ---
        {
            'category': 'Series',
            'title': 'Game of Thrones',
            'release_year': 2011,
            'creator': 'David Benioff & D.B. Weiss',
            'avg_rating': 9.2,
            'popularity': 99.0,
            'tagline': 'Winter is Coming.',
            'description': 'Nine noble families fight for control over the lands of Westeros, while an ancient enemy returns after being dormant for millennia.',
            'genres': ['Action', 'Adventure', 'Drama', 'Fantasy'],
            'trailer_url': 'KPLWWIOCOOQ',
            'poster_url': 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=700&auto=format&fit=crop&q=80'
        },
        {
            'category': 'Series',
            'title': 'Better Call Saul',
            'release_year': 2015,
            'creator': 'Vince Gilligan & Peter Gould',
            'avg_rating': 9.0,
            'popularity': 96.5,
            'tagline': 'Criminal lawyer.',
            'description': 'The trials and tribulations of criminal lawyer Jimmy McGill in the years leading up to his fateful run-in with Walter White and Jesse Pinkman.',
            'genres': ['Crime', 'Drama'],
            'trailer_url': 'HN4oyhmgopQ',
            'poster_url': 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=700&auto=format&fit=crop&q=80'
        },
        {
            'category': 'Series',
            'title': 'The Wire',
            'release_year': 2002,
            'creator': 'David Simon',
            'avg_rating': 9.3,
            'popularity': 97.0,
            'tagline': 'Listen carefully.',
            'description': 'The Baltimore drug scene, as seen through the eyes of drug dealers and law enforcement.',
            'genres': ['Crime', 'Drama', 'Thriller'],
            'trailer_url': '9qK-VGjMr8g',
            'poster_url': 'https://images.unsplash.com/photo-1485846234645-a62644f84728?w=700&auto=format&fit=crop&q=80'
        },
        {
            'category': 'Series',
            'title': 'Dark',
            'release_year': 2017,
            'creator': 'Baran bo Odar & Jantje Friese',
            'avg_rating': 8.7,
            'popularity': 95.5,
            'tagline': 'The question is not where, but when.',
            'description': 'A family saga with a supernatural twist, set in a German town where the disappearance of two young children exposes the relationships among four families across multiple timelines.',
            'genres': ['Crime', 'Drama', 'Mystery', 'Sci-Fi'],
            'trailer_url': 'rrwycJ08PSA',
            'poster_url': 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=700&auto=format&fit=crop&q=80'
        },
        {
            'category': 'Series',
            'title': 'True Detective',
            'release_year': 2014,
            'creator': 'Nic Pizzolatto',
            'avg_rating': 8.9,
            'popularity': 96.0,
            'tagline': 'Touch darkness and darkness touches you back.',
            'description': 'Seasonal anthology series in which police investigations unearth the personal and professional secrets of those involved, both within and outside the law.',
            'genres': ['Crime', 'Drama', 'Mystery'],
            'trailer_url': 'fVQUcaO4AvE',
            'poster_url': 'https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?w=700&auto=format&fit=crop&q=80'
        },
        {
            'category': 'Series',
            'title': 'Mindhunter',
            'release_year': 2017,
            'creator': 'Joe Penhall',
            'avg_rating': 8.6,
            'popularity': 94.0,
            'tagline': 'In the late 1970s two FBI agents expand criminal science.',
            'description': 'Set in the late 1970s, two FBI agents are tasked with interviewing incarcerated serial killers to solve open cases.',
            'genres': ['Crime', 'Drama', 'Mystery', 'Thriller'],
            'trailer_url': '7gZCfRD_zWE',
            'poster_url': 'https://images.unsplash.com/photo-1509248961158-e54f6934749c?w=700&auto=format&fit=crop&q=80'
        },
        {
            'category': 'Series',
            'title': 'Peaky Blinders',
            'release_year': 2013,
            'creator': 'Steven Knight',
            'avg_rating': 8.8,
            'popularity': 97.5,
            'tagline': 'By order of the Peaky Blinders.',
            'description': 'A gangster family epic set in 1900s England, centering on a gang who sew razor blades in the peaks of their caps, and their fierce boss Tommy Shelby.',
            'genres': ['Crime', 'Drama'],
            'trailer_url': 'oVzVdvGIC7U',
            'poster_url': 'https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?w=700&auto=format&fit=crop&q=80'
        },
        {
            'category': 'Series',
            'title': 'The Mandalorian',
            'release_year': 2019,
            'creator': 'Jon Favreau',
            'avg_rating': 8.6,
            'popularity': 96.0,
            'tagline': 'Bounty hunting is a complicated profession.',
            'description': 'The travels of a lone bounty hunter in the outer reaches of the galaxy, far from the authority of the New Republic.',
            'genres': ['Action', 'Adventure', 'Sci-Fi'],
            'trailer_url': 'aOC8E8R_N5c',
            'poster_url': 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=700&auto=format&fit=crop&q=80'
        },

        # --- ANIME (8 new) ---
        {
            'category': 'Anime',
            'title': 'Death Note',
            'release_year': 2006,
            'creator': 'Tetsuro Araki & Tsugumi Ohba',
            'avg_rating': 9.0,
            'popularity': 98.0,
            'tagline': 'I will become the God of the New World.',
            'description': 'An intelligent high school student goes on a secret crusade to eliminate criminals from the world after discovering a notebook capable of killing anyone whose name is written into it.',
            'genres': ['Animation', 'Crime', 'Drama', 'Fantasy', 'Mystery'],
            'trailer_url': 'NlJZ-YgAt-c',
            'poster_url': 'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=700&auto=format&fit=crop&q=80'
        },
        {
            'category': 'Anime',
            'title': 'Fullmetal Alchemist: Brotherhood',
            'release_year': 2009,
            'creator': 'Yasuhiro Irie & Hiromu Arakawa',
            'avg_rating': 9.1,
            'popularity': 98.5,
            'tagline': 'In order to obtain something, something of equal value must be lost.',
            'description': 'Two brothers search for a Philosopher\'s Stone after an attempt to revive their deceased mother goes awry and leaves them in damaged physical forms.',
            'genres': ['Animation', 'Action', 'Adventure', 'Fantasy'],
            'trailer_url': '--IcmZkvL0Q',
            'poster_url': 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=700&auto=format&fit=crop&q=80'
        },
        {
            'category': 'Anime',
            'title': 'Steins;Gate',
            'release_year': 2011,
            'creator': 'Hiroshi Hamasaki & Takuya Sato',
            'avg_rating': 8.8,
            'popularity': 95.0,
            'tagline': 'Deceive your other self. Deceive the world.',
            'description': 'After discovering time travel, a university student and his colleagues must find a way to stop an evil organization and their evil plots.',
            'genres': ['Animation', 'Comedy', 'Drama', 'Sci-Fi'],
            'trailer_url': '27OZcZ_aA2E',
            'poster_url': 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=700&auto=format&fit=crop&q=80'
        },
        {
            'category': 'Anime',
            'title': 'Hunter x Hunter',
            'release_year': 2011,
            'creator': 'Yoshihiro Togashi',
            'avg_rating': 9.0,
            'popularity': 97.0,
            'tagline': 'You should enjoy the little detours to the fullest.',
            'description': 'Gon Freecss aspires to become a Hunter, an exceptional being capable of greatness. With his friends and his potential, he seeks out his father, who left him when he was younger.',
            'genres': ['Animation', 'Action', 'Adventure'],
            'trailer_url': 'd6kBeJjTGnY',
            'poster_url': 'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=700&auto=format&fit=crop&q=80'
        },
        {
            'category': 'Anime',
            'title': 'Cowboy Bebop',
            'release_year': 1998,
            'creator': 'Shinichiro Watanabe',
            'avg_rating': 8.9,
            'popularity': 96.5,
            'tagline': 'See you space cowboy...',
            'description': 'The easygoing bounty hunter Spike Spiegel and his ragtag crew travel through the solar system searching for high-value targets while confronting shadows from his past.',
            'genres': ['Animation', 'Action', 'Adventure', 'Sci-Fi'],
            'trailer_url': 'qig4KOK2R2g',
            'poster_url': 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=700&auto=format&fit=crop&q=80'
        },
        {
            'category': 'Anime',
            'title': 'Chainsaw Man',
            'release_year': 2022,
            'creator': 'Tatsuki Fujimoto',
            'avg_rating': 8.5,
            'popularity': 96.0,
            'tagline': 'Rip and tear through the devilish underworld.',
            'description': 'Following a betrayal, a young man who merges with his pet devil Pochita becomes the chainsaw-wielding hero of Tokyo\'s Public Safety devil hunters.',
            'genres': ['Animation', 'Action', 'Horror', 'Supernatural'],
            'trailer_url': 'v4yLeNt-kCU',
            'poster_url': 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=700&auto=format&fit=crop&q=80'
        },

        # --- TECHNOLOGY (6 new) ---
        {
            'category': 'Technology',
            'title': 'Transformers and Attention Mechanisms',
            'release_year': 2025,
            'creator': 'Deep Learning Research Institute',
            'avg_rating': 4.9,
            'popularity': 95.0,
            'tagline': 'Attention is all you need.',
            'description': 'A deep-dive technical masterclass into Multi-Head Attention, Rotary Position Embeddings (RoPE), KV Caching, and FlashAttention 3 in modern LLMs.',
            'genres': ['AI & Data', 'Machine Learning', 'Computer Science'],
            'trailer_url': 'SZorAJ4I-sA',
            'poster_url': 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=700&auto=format&fit=crop&q=80'
        },
        {
            'category': 'Technology',
            'title': 'Reinforcement Learning from Human Feedback (RLHF)',
            'release_year': 2025,
            'creator': 'Frontier AI Labs',
            'avg_rating': 4.8,
            'popularity': 94.0,
            'tagline': 'Aligning foundation models with human intent.',
            'description': 'Master Proximal Policy Optimization (PPO), Direct Preference Optimization (DPO), reward modeling, and constitutional AI safety guardrails.',
            'genres': ['AI & Data', 'Machine Learning'],
            'trailer_url': '2MBJOuVq380',
            'poster_url': 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=700&auto=format&fit=crop&q=80'
        },
        {
            'category': 'Technology',
            'title': 'Kubernetes & Cloud-Native Architectures',
            'release_year': 2024,
            'creator': 'Cloud Native Academy',
            'avg_rating': 4.7,
            'popularity': 93.0,
            'tagline': 'Production resilience at planet scale.',
            'description': 'Container orchestration, Service Meshes with Istio, GitOps with ArgoCD, and automated canary deployments for hyper-scale infrastructure.',
            'genres': ['DevOps', 'Cloud', 'Infrastructure'],
            'trailer_url': 'X48VuDVv0do',
            'poster_url': 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=700&auto=format&fit=crop&q=80'
        },
        {
            'category': 'Technology',
            'title': 'Full-Stack Next.js 15 & React Server Components',
            'release_year': 2025,
            'creator': 'Vercel Ecosystem Labs',
            'avg_rating': 4.9,
            'popularity': 96.0,
            'tagline': 'The ultimate guide to production React.',
            'description': 'Architect blazing-fast modern web applications using App Router, Server Actions, streaming SSR, Tailwind CSS, and edge caching.',
            'genres': ['Web Development', 'React', 'Frontend'],
            'trailer_url': 'wm5gMKuwSYk',
            'poster_url': 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=700&auto=format&fit=crop&q=80'
        },
        {
            'category': 'Technology',
            'title': 'Cybersecurity Defense & Ethical Hacking 2026',
            'release_year': 2026,
            'creator': 'Offensive Security Guild',
            'avg_rating': 4.8,
            'popularity': 95.0,
            'tagline': 'Securing modern digital infrastructure.',
            'description': 'Zero-trust architecture, red-team penetration testing, cryptographic protocols, cloud security posture management, and kernel exploitation defense.',
            'genres': ['Cybersecurity', 'Networks', 'Systems'],
            'trailer_url': '3Kq1MIfTWCE',
            'poster_url': 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=700&auto=format&fit=crop&q=80'
        },

        # --- DOCUMENTARIES (5 new) ---
        {
            'category': 'Documentaries',
            'title': 'Cosmos: Possible Worlds',
            'release_year': 2020,
            'creator': 'Ann Druyan & Neil deGrasse Tyson',
            'avg_rating': 9.1,
            'popularity': 96.0,
            'tagline': 'The ship of the imagination takes flight once more.',
            'description': 'Embark on a breathtaking journey across 13.8 billion years of cosmic evolution and into the astonishing, unexplored future worlds of our universe.',
            'genres': ['Documentary', 'Science', 'Space'],
            'trailer_url': 'mXab_Y9bKVs',
            'poster_url': 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=700&auto=format&fit=crop&q=80'
        },
        {
            'category': 'Documentaries',
            'title': 'Free Solo',
            'release_year': 2018,
            'creator': 'Elizabeth Chai Vasarhelyi & Jimmy Chin',
            'avg_rating': 8.8,
            'popularity': 95.0,
            'tagline': 'Live your dreams without a safety net.',
            'description': 'Follow Alex Honnold as he attempts to become the first person to ever free solo climb Yosemite\'s 3,000-foot El Capitan wall without ropes or safety gear.',
            'genres': ['Documentary', 'Adventure', 'Sports'],
            'trailer_url': 'urRVZ4SW7WU',
            'poster_url': 'https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99?w=700&auto=format&fit=crop&q=80'
        },
        {
            'category': 'Documentaries',
            'title': 'The Last Dance',
            'release_year': 2020,
            'creator': 'Jason Hehir',
            'avg_rating': 9.1,
            'popularity': 98.0,
            'tagline': 'It was more than a team. It was an obsession.',
            'description': 'Charting the rise of the 1990s Chicago Bulls, led by Michael Jordan, one of the most notable dynasties in sports history.',
            'genres': ['Documentary', 'Biography', 'Sports'],
            'trailer_url': 'Peh9Yqf1GX8',
            'poster_url': 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=700&auto=format&fit=crop&q=80'
        },
        {
            'category': 'Documentaries',
            'title': 'Planet Earth III',
            'release_year': 2023,
            'creator': 'David Attenborough & BBC Studios',
            'avg_rating': 9.2,
            'popularity': 97.0,
            'tagline': 'Witness the greatest wildlife spectacles on Earth.',
            'description': 'Journey to extraordinary lands and witness astonishing animal behavior across every corner of our rapidly changing planet.',
            'genres': ['Documentary', 'Nature', 'Science'],
            'trailer_url': '7C_Z_QJ_e-8',
            'poster_url': 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=700&auto=format&fit=crop&q=80'
        },

        # --- GAMES (6 new) ---
        {
            'category': 'Games',
            'title': 'The Witcher 3: Wild Hunt',
            'release_year': 2015,
            'creator': 'CD Projekt Red',
            'avg_rating': 9.3,
            'popularity': 99.0,
            'tagline': 'The world doesn\'t need a hero. It needs a professional.',
            'description': 'Geralt of Rivia, a mutated monster hunter, travels the war-ravaged Northern Kingdoms tracking his adopted daughter, pursued by the otherworldly Wild Hunt.',
            'genres': ['Action RPG', 'Open World', 'Fantasy'],
            'trailer_url': 'c0i88t0K_5g',
            'poster_url': 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=700&auto=format&fit=crop&q=80'
        },
        {
            'category': 'Games',
            'title': 'Red Dead Redemption 2',
            'release_year': 2018,
            'creator': 'Rockstar Games',
            'avg_rating': 9.4,
            'popularity': 99.5,
            'tagline': 'Outlaws for life.',
            'description': 'Set in 1899 America, Arthur Morgan and the Van der Linde gang must rob, steal and fight their way across the rugged heartland of America to survive.',
            'genres': ['Action', 'Adventure', 'Open World'],
            'trailer_url': 'eaW0tYpxyp0',
            'poster_url': 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=700&auto=format&fit=crop&q=80'
        },
        {
            'category': 'Games',
            'title': 'God of War Ragnarök',
            'release_year': 2022,
            'creator': 'Santa Monica Studio',
            'avg_rating': 9.2,
            'popularity': 97.0,
            'tagline': 'Fate only binds you if you let it.',
            'description': 'Kratos and Atreus embark on a mythic journey for answers before Ragnarök arrives, facing Norse gods and monsters in the Nine Realms.',
            'genres': ['Action', 'Adventure', 'Mythology'],
            'trailer_url': 'hfJ4Km46A-0',
            'poster_url': 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=700&auto=format&fit=crop&q=80'
        },
        {
            'category': 'Games',
            'title': 'Ghost of Tsushima',
            'release_year': 2020,
            'creator': 'Sucker Punch Productions',
            'avg_rating': 9.0,
            'popularity': 96.5,
            'tagline': 'A storm is coming.',
            'description': 'In 1274, the warrior Jin Sakai must set aside samurai tradition to forge a new path--the path of the Ghost--and wage an unconventional war for the freedom of Tsushima.',
            'genres': ['Action', 'Open World', 'Historical'],
            'trailer_url': 'b_4I8k70fR4',
            'poster_url': 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=700&auto=format&fit=crop&q=80'
        },

        # --- BOOKS (6 new) ---
        {
            'category': 'Books',
            'title': 'Clean Code: A Handbook of Agile Software',
            'release_year': 2008,
            'creator': 'Robert C. Martin',
            'avg_rating': 4.8,
            'popularity': 95.0,
            'tagline': 'Even bad code can function. But if code isn\'t clean, it can bring a company to its knees.',
            'description': 'The definitive software craftsmanship guide teaching readability, refactoring, meaningful naming, robust error handling, and unit testing mastery.',
            'genres': ['Software Engineering', 'Computer Science'],
            'trailer_url': 'YoHD9XEInc0',
            'poster_url': 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=700&auto=format&fit=crop&q=80'
        },
        {
            'category': 'Books',
            'title': 'Sapiens: A Brief History of Humankind',
            'release_year': 2014,
            'creator': 'Yuval Noah Harari',
            'avg_rating': 4.9,
            'popularity': 98.0,
            'tagline': 'How an insignificant ape became the ruler of planet Earth.',
            'description': 'From the Cognitive Revolution seventy thousand years ago to the Scientific Revolution, explore how biology and history define us.',
            'genres': ['History', 'Philosophy', 'Science'],
            'trailer_url': 'YoHD9XEInc0',
            'poster_url': 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=700&auto=format&fit=crop&q=80'
        },
        {
            'category': 'Books',
            'title': 'Thinking, Fast and Slow',
            'release_year': 2011,
            'creator': 'Daniel Kahneman',
            'avg_rating': 4.8,
            'popularity': 96.0,
            'tagline': 'Two systems drive the way we think and make decisions.',
            'description': 'Nobel laureate Daniel Kahneman takes us on a groundbreaking tour of the mind and explains the two systems that drive the way we think.',
            'genres': ['Psychology', 'Science', 'Economics'],
            'trailer_url': 'YoHD9XEInc0',
            'poster_url': 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=700&auto=format&fit=crop&q=80'
        },
        {
            'category': 'Books',
            'title': 'The Lord of the Rings: The Fellowship of the Ring',
            'release_year': 1954,
            'creator': 'J.R.R. Tolkien',
            'avg_rating': 4.9,
            'popularity': 99.0,
            'tagline': 'One Ring to rule them all.',
            'description': 'Frodo Baggins inherits the Master Ring and begins an epic quest across Middle-earth to destroy it in the fires of Mount Doom.',
            'genres': ['Fantasy', 'Adventure', 'Literature'],
            'trailer_url': 'V75dMMIW2B4',
            'poster_url': 'https://images.unsplash.com/photo-1506466010722-395aa2bef877?w=700&auto=format&fit=crop&q=80'
        },

        # --- TRAVEL (4 new) ---
        {
            'category': 'Travel',
            'title': 'Santorini Sunset & Volcanic Caldera, Greece',
            'release_year': 2024,
            'creator': 'Aegean Expeditions',
            'avg_rating': 4.9,
            'popularity': 96.0,
            'tagline': 'Whitewashed cliffs above the sapphire Aegean Sea.',
            'description': 'Explore the iconic blue-domed churches of Oia, hike the volcanic rim of Thera, and witness the world\'s most celebrated golden sunsets.',
            'genres': ['Travel', 'Scenic', 'Mediterranean'],
            'trailer_url': 'lM02vNMRXFU',
            'poster_url': 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=700&auto=format&fit=crop&q=80'
        },
        {
            'category': 'Travel',
            'title': 'Banff National Park & Lake Louise, Canada',
            'release_year': 2024,
            'creator': 'Rocky Mountain Explorers',
            'avg_rating': 4.9,
            'popularity': 97.0,
            'tagline': 'Turquoise glacial lakes amidst towering alpine peaks.',
            'description': 'Canoe across emerald-colored waters of Lake Moraine, scale the majestic Canadian Rockies, and encounter pristine wildlife.',
            'genres': ['Travel', 'Nature', 'Mountains'],
            'trailer_url': 'Ie4Z9N3Xk8I',
            'poster_url': 'https://images.unsplash.com/photo-1503614472-8c93d56e92ce?w=700&auto=format&fit=crop&q=80'
        },
        {
            'category': 'Travel',
            'title': 'Machu Picchu & The Sacred Valley, Peru',
            'release_year': 2024,
            'creator': 'Andean Heritage Guild',
            'avg_rating': 4.9,
            'popularity': 98.0,
            'tagline': 'The enigmatic Incan citadel among cloud-shrouded peaks.',
            'description': 'Traverse the ancient stone steps of the Inca Trail, discover astronomical wonders in Cusco, and watch the morning mist lift over Machu Picchu.',
            'genres': ['Travel', 'History', 'Adventure'],
            'trailer_url': 'Zk9J5xlKAk8',
            'poster_url': 'https://images.unsplash.com/photo-1526392060635-9d6019884377?w=700&auto=format&fit=crop&q=80'
        },

        # --- MUSIC (4 new) ---
        {
            'category': 'Music',
            'title': 'Ludwig Göransson: Oppenheimer Original Score',
            'release_year': 2023,
            'creator': 'Ludwig Göransson',
            'avg_rating': 4.9,
            'popularity': 96.0,
            'tagline': 'Can you hear the music?',
            'description': 'Academy Award-winning masterpiece combining restless violin tempos with sweeping atmospheric synths and the fission tempo of Can You Hear The Music.',
            'genres': ['Soundtrack', 'Orchestral', 'Instrumental'],
            'trailer_url': 'uYPbbksJxIg',
            'poster_url': 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=700&auto=format&fit=crop&q=80'
        },
        {
            'category': 'Music',
            'title': 'Daft Punk: Alive 2007 Legendary Concert',
            'release_year': 2007,
            'creator': 'Daft Punk',
            'avg_rating': 4.9,
            'popularity': 97.0,
            'tagline': 'The greatest live electronic performance in history.',
            'description': 'The iconic French duo atop their luminous pyramid mixing Harder Better Faster Stronger, Around the World, and Television Rules the Nation.',
            'genres': ['Electronic', 'Dance', 'Live'],
            'trailer_url': 'sFZjqVnWBhc',
            'poster_url': 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=700&auto=format&fit=crop&q=80'
        },
        {
            'category': 'Music',
            'title': 'ChilledCow / Lofi Girl: Beats to Relax/Study to',
            'release_year': 2024,
            'creator': 'Lofi Girl Collective',
            'avg_rating': 4.8,
            'popularity': 98.0,
            'tagline': 'Endless soothing melodies for focus and calm.',
            'description': 'The global standard for ambient chillhop, soulful Rhodes chords, warm vinyl crackle, and relaxing jazz instrumentals.',
            'genres': ['Lo-Fi', 'Instrumental', 'Ambient'],
            'trailer_url': 'jfKfPfyJRdk',
            'poster_url': 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=700&auto=format&fit=crop&q=80'
        }
    ]

    added_count = 0
    for data in NEW_ITEMS:
        cat = cat_map.get(data['category'], cat_map['Movies'])
        item, created = Item.objects.get_or_create(
            title=data['title'],
            defaults={
                'category': cat,
                'release_year': data['release_year'],
                'creator': data['creator'],
                'avg_rating': data['avg_rating'],
                'popularity': data['popularity'],
                'tagline': data['tagline'],
                'description': data['description'],
                'trailer_url': data['trailer_url'],
                'poster_url': data['poster_url']
            }
        )
        # Add genres
        genres = get_genres(data.get('genres', []))
        item.genres.set(genres)
        if created:
            added_count += 1

    total = Item.objects.count()
    print(f"✅ Added {added_count} brand-new items! Total catalogue is now: {total} items! 🎉")

if __name__ == '__main__':
    seed_to_100()
