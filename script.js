// 1. Dynamic Tab Customization Function
function applyCustomTab(profile) {
    var config = {
        title: "Google",
        icon: "https://google.com"
    };

    if (profile === 'drive') {
        config.title = "Google Drive - My Drive";
        config.icon = "https://gstatic.com";
    } else if (profile === 'classroom') {
        config.title = "Classes";
        config.icon = "https://gstatic.com";
    } else if (profile === 'clever') {
        config.title = "Clever | Portal";
        config.icon = "https://clever.com";
    } else if (profile === 'mcgraw') {
        config.title = "McGraw Hill Log In";
        config.icon = "https://mheducation.com";
    } else if (profile === 'flocabulary') {
        config.title = "Flocabulary - Educational Hip-Hop";
        config.icon = "https://flocabulary.com";
    } else if (profile === 'lexia') {
        config.title = "Lexia Core5 Reading";
        config.icon = "https://lexiacore5.com";
    } else if (profile === 'zoom') {
        config.title = "Zoom Video Communications";
        config.icon = "https://zoom.us";
    } else if (profile === 'wikipedia') {
        config.title = "Wikipedia, the free encyclopedia";
        config.icon = "https://wikipedia.org";
    }

    window.parent.document.title = config.title;
    
    var faviconNode = window.parent.document.querySelector("link[rel*='icon']") || window.parent.document.createElement('link');
    faviconNode.type = 'image/x-icon';
    faviconNode.rel = 'shortcut icon';
    faviconNode.href = config.icon;
    window.parent.document.getElementsByTagName('head').appendChild(faviconNode);
}

// 2. Dynamic URL Masking/Cloaking Function
function executeUrlCloak() {
    var rawUrl = document.getElementById('targetUrlInput').value.trim();
    if (!rawUrl) return alert("Please enter a valid URL.");
    
    if (!rawUrl.startsWith('http://') && !rawUrl.startsWith('https://')) {
        rawUrl = 'https://' + rawUrl;
    }
    
    var secureWindow = window.open('about:blank', '_blank');
    secureWindow.document.body.style.margin = "0";
    secureWindow.document.body.style.height = "100vh";
    secureWindow.document.body.style.overflow = "hidden";
    
    var viewNode = secureWindow.document.createElement('iframe');
    viewNode.style.width = "100%";
    viewNode.style.height = "100%";
    viewNode.style.border = "none";
    viewNode.src = rawUrl;
    
    secureWindow.document.body.appendChild(viewNode);
}

// 3. Navigation Grid Category Switching
function showCategory(category, buttonElement) {
    var buttons = document.getElementsByClassName('nav-btn');
    for (var i = 0; i < buttons.length; i++) { buttons[i].classList.remove('active'); }
    buttonElement.classList.add('active');

    var items = document.getElementsByClassName('category-item');
    for (var j = 0; j < items.length; j++) { items[j].style.display = 'none'; }

    if (category === 'games' || category === 'media') {
        document.getElementById('mainHubGrid').style.display = 'grid';
        var selectedItems = document.getElementsByClassName(category);
        for (var k = 0; k < selectedItems.length; k++) { selectedItems[k].style.display = 'block'; }
    } else if (category === 'settings') {
        document.getElementById('mainHubGrid').style.display = 'none';
        document.getElementById('settingsPanel').style.display = 'block';
    }
}

// Toggles Season/Episode input boxes if TV Series is selected
function toggleMediaInputs() {
    var type = document.getElementById('mediaType').value;
    var displayStyle = (type === 'tv') ? 'inline-block' : 'none';
    document.getElementById('mediaSeason').style.display = displayStyle;
    document.getElementById('mediaEpisode').style.display = displayStyle;
}

// Logic to compile the user parameters and stream from selected public servers
function loadStreamPlayer() {
    var type = document.getElementById('mediaType').value;
    var id = document.getElementById('mediaId').value.trim();
    var server = document.getElementById('streamServer').value;
    var frame = document.getElementById('cinemaIframe');

    if (!id) {
        alert("Please enter a valid IMDb ID first!");
        return;
    }

    var season = document.getElementById('mediaSeason').value;
    var episode = document.getElementById('mediaEpisode').value;
    var finalSrc = "";

    // Server API link selector
    if (server === 'vidsrc_xyz') {
        finalSrc = (type === 'movie') 
            ? "https://vidsrc.xyz" + id 
            : "https://vidsrc.xyz" + id + "&season=" + season + "&episode=" + episode;
    } else if (server === 'vidsrc_me') {
        finalSrc = (type === 'movie') 
            ? "https://vidsrc.me" + id 
            : "https://vidsrc.me" + id + "/" + season + "/" + episode;
    } else if (server === 'embed_su') {
        finalSrc = (type === 'movie') 
            ? "https://embed.su" + id 
            : "https://embed.su" + id + "/" + season + "/" + episode;
    }

    // Load the constructed URL into the player card
    frame.src = finalSrc;
}

// Loads selected Live TV Stream sources
function loadLiveTvPlayer(url) {
    var frame = document.getElementById('liveTvIframe');
    if(url) { function showCategory(category, buttonElement) {
    // 1. Reset button glow states
    var buttons = document.getElementsByClassName('nav-btn');
    for (var i = 0; i < buttons.length; i++) { buttons[i].classList.remove('active'); }
    buttonElement.classList.add('active');

    // 2. Hide all items inside the layout
    var items = document.getElementsByClassName('category-item');
    for (var j = 0; j < items.length; j++) { items[j].style.display = 'none'; }

    // 3. Toggle view matrices based on selection
    if (category === 'games' || category === 'media' || category === 'music') {
        document.getElementById('mainHubGrid').style.display = 'grid';
        var selectedItems = document.getElementsByClassName(category);
        for (var k = 0; k < selectedItems.length; k++) { selectedItems[k].style.display = 'block'; }
    } else if (category === 'settings') {
        document.getElementById('mainHubGrid').style.display = 'none';
        document.getElementById('settingsPanel').style.display = 'block';
    }
}

        frame.src = url;
    } else {
        frame.src = "about:blank";
    }
}
// Updates the input box placeholder text dynamically based on the selected server rules
function updateMusicPlaceholders() {
    var server = document.getElementById('audioServerSelect').value;
    var inputField = document.getElementById('audioIdInput');
    
    if (server === 'radio_garden') {
        inputField.placeholder = "Station City Name (e.g., huntsville)";
    } else if (server === 'internet_archive') {
        inputField.placeholder = "Archive Collection ID (e.g., 78rpm)";
    } else if (server === 'hearthis_at') {
        inputField.placeholder = "Genre Name (e.g., lofi, ambient)";
    }
}

// Compiles the selections and hooks up the correct cloud server audio streams
function loadMusicServer() {
    var server = document.getElementById('audioServerSelect').value;
    var parameter = document.getElementById('audioIdInput').value.trim().toLowerCase();
    var playerFrame = document.getElementById('audioServerIframe');

    if (!parameter) {
        alert("Please enter a target city, genre, or archive ID tag first!");
        return;
    }

    var audioSourceUrl = "";

    // Open-source music routing logic based on selected cloud stream providers
    if (server === 'radio_garden') {
        // Directs to the interactive global radio map filtered by search query
        audioSourceUrl = "https://radio.garden" + encodeURIComponent(parameter);
    } else if (server === 'internet_archive') {
        // Loads historical, public domain open tracks directly from the web archive embeds
        audioSourceUrl = "https://archive.org" + encodeURIComponent(parameter) + "&playlist=1";
    } else if (server === 'hearthis_at') {
        // Pulls a stream index player page from the open music distribution platform
        audioSourceUrl = "https://hearthis.at" + encodeURIComponent(parameter) + "/";
    }

    // Inject the active source URL directly into the player frame
    playerFrame.src = audioSourceUrl;
}
function showCategory(category, buttonElement) {
    var buttons = document.getElementsByClassName('nav-btn');
    for (var i = 0; i < buttons.length; i++) { buttons[i].classList.remove('active'); }
    buttonElement.classList.add('active');

    var items = document.getElementsByClassName('category-item');
    for (var j = 0; j < items.length; j++) { items[j].style.display = 'none'; }

    // ADDED 'radio' TO THE ALLOWED GRID VIEW LIST BELOW
    if (category === 'games' || category === 'media' || category === 'music' || category === 'radio') {
        document.getElementById('mainHubGrid').style.display = 'grid';
        var selectedItems = document.getElementsByClassName(category);
        for (var k = 0; k < selectedItems.length; k++) { selectedItems[k].style.display = 'block'; }
    } else if (category === 'settings') {
        document.getElementById('mainHubGrid').style.display = 'none';
        document.getElementById('settingsPanel').style.display = 'block';
    }
}
function launchUnblocked() {
    var win = window.open();
    win.document.body.style.margin = '0';
    win.document.body.style.height = '100vh';
    var iframe = win.document.createElement('iframe');
    iframe.style.border = 'none';
    iframe.style.width = '100%';
    iframe.style.height = '100%';
    iframe.src = window.location.href; // Opens your website inside the blank tab
    win.document.body.appendChild(iframe);
    window.location.replace('https://google.com'); // Redirects original tab
}
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Google Drive - My Drive</title>
    <link rel="icon" type="image/x-icon" href="https://gstatic.com">
    <style>
        body {
            background-color: #0b0b0e;
            color: #ffffff;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            margin: 0;
            padding: 20px;
            display: flex;
            flex-direction: column;
            align-items: center;
            min-height: 100vh;
        }
        h1 { color: #00bcd4; margin: 10px 0 5px 0; font-size: 2.2rem; }
        .sub { color: #8c8c8c; margin-bottom: 20px; font-size: 13px; }
        .nav-link { color: #e50914; font-weight: bold; text-decoration: none; margin-bottom: 15px; font-size: 15px; }

        /* Massive Scaling Engine Styles */
        .search-container {
            width: 100%;
            max-width: 600px;
            margin-bottom: 20px;
        }
        .search-bar {
            width: 100%;
            padding: 14px 20px;
            font-size: 16px;
            border-radius: 30px;
            border: 2px solid #2a2a35;
            background-color: #16161d;
            color: white;
            outline: none;
            box-sizing: border-box;
            transition: 0.2s;
        }
        .search-bar:focus { border-color: #00bcd4; }

        /* Scrollable Dynamic Game List Grid */
        .game-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
            gap: 12px;
            width: 100%;
            max-width: 1100px;
            max-height: 350px;
            overflow-y: auto;
            padding: 15px;
            background: #121218;
            border-radius: 10px;
            border: 1px solid #1f1f27;
            box-sizing: border-box;
        }
        /* Custom Scrollbar for clean aesthetics */
        .game-grid::-webkit-scrollbar { width: 8px; }
        .game-grid::-webkit-scrollbar-track { background: #121218; }
        .game-grid::-webkit-scrollbar-thumb { background: #2a2a35; border-radius: 4px; }
        .game-grid::-webkit-scrollbar-thumb:hover { background: #00bcd4; }

        .game-card {
            background-color: #1c1c24;
            border: 1px solid #2d2d3d;
            padding: 15px 10px;
            font-size: 14px;
            font-weight: 600;
            border-radius: 6px;
            cursor: pointer;
            transition: all 0.2s ease;
            color: #e0e0e6;
            text-align: center;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }
        .game-card:hover {
            border-color: #00bcd4;
            background-color: #242433;
            transform: scale(1.03);
            color: white;
        }
        .game-card.active { background-color: #00bcd4; border-color: #00bcd4; color: black; }

        /* Live Play Viewport Frame */
        .game-container {
            width: 100%;
            max-width: 1100px;
            margin-top: 25px;
            background: #000;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 10px 30px rgba(0,0,0,0.8);
            border: 1px solid #1f1f27;
            position: relative;
        }
        iframe { width: 100%; height: 550px; border: none; display: block; }
        
        .frame-bar {
            background-color: #121218;
            padding: 8px 15px;
            display: flex;
            justify-content: flex-end;
            border-bottom: 1px solid #1f1f27;
        }
        .fs-btn {
            background: none;
            border: none;
            color: #8c8c8c;
            cursor: pointer;
            font-size: 13px;
            font-weight: bold;
        }
        .fs-btn:hover { color: #00bcd4; }
    </style>
</head>
<body>

    <h1>Massive Arcade System</h1>
    <div class="sub">Dynamic structural indexing built to handle extensive file counts cleanly.</div>
    <a href="index.html" class="nav-link">🎬 Switch to Movies Mode</a>

    <!-- Live Filtering Search Engine -->
    <div class="search-container">
        <input type="text" id="searchBar" class="search-bar" placeholder="Search across games database list..." onkeyup="filterGames()">
    </div>

    <!-- Scalable Grid Container (Populated automatically by JS database) -->
    <div class="game-grid" id="gameGrid"></div>

    <!-- Gameplay Environment -->
    <div class="game-container">
        <div class="frame-bar">
            <button class="fs-btn" onclick="toggleFullscreen()">Fullscreen Mode ⛶</button>
        </div>
        <iframe id="gameViewport" src="about:blank" allowfullscreen></iframe>
    </div>

    <script>
        // MASTER DATABASE REGISTRY
        // Simply add new items to this array to seamlessly scale up to thousands of entries
        const gamesDatabase = [
            { name: "Retro Bowl", url: "https://googleusercontent.com" },
            { name: "1v1.LOL", url: "https://github.io" },
            { name: "Slope", url: "https://github.io" },
            { name: "Drift Hunters", url: "https://github.io" },
            { name: "Cookie Clicker", url: "https://github.io" },
            { name: "Smash Karts", url: "https://github.io" },
            { name: "Subway Surfers", url: "https://github.io" },
            { name: "BitLife", url: "https://github.io" },
            { name: "Minecraft Classic", url: "https://github.io" },
            { name: "Tunnel Rush", url: "https://github.io" },
            { name: "Geometry Dash", url: "https://github.io" },
            { name: "Happy Wheels", url: "https://github.io" }
            // Future links drop directly below this line following the precise comma layout pattern
        ];

        // Generation Engine Initialization
        function buildArcadeGrid() {
            const grid = document.getElementById('gameGrid');
            grid.innerHTML = ''; // Reset frame layout clear

            gamesDatabase.sort((a, b) => a.name.localeCompare(b.name)); // Alphabetical sorting block

            gamesDatabase.forEach(game => {
                const element = document.createElement('div');
                element.className = 'game-card';
                element.textContent = game.name;
                element.setAttribute('onclick', `launchGame('${game.url}', this)`);
                grid.appendChild(element);
            });
        }

        // Live Real-Time Search Filtering
        function filterGames() {
            const query = document.getElementById('searchBar').value.toLowerCase();
            const cards = document.getElementsByClassName('game-card');

            for (let i = 0; i < cards.length; i++) {
                const title = cards[i].textContent.toLowerCase();
                if (title.includes(query)) {
                    cards[i].style.display = "block";
                } else {
                    cards[i].style.display = "none";
                }
            }
        }

        // Action Execution Launch Mechanics
        function launchGame(url, cardElement) {
            document.getElementById('gameViewport').src = url;
            
            const activeCards = document.querySelectorAll('.game-card');
            activeCards.forEach(c => c.classList.remove('active'));
            cardElement.classList.add('active');
        }

        // Feature Block: Target Container Request Elements Fullscreen View
        function toggleFullscreen() {
            const viewport = document.getElementById('gameViewport');
            if (viewport.requestFullscreen) { viewport.requestFullscreen(); }
            else if (viewport.webkitRequestFullscreen) { viewport.webkitRequestFullscreen(); }
            else if (viewport.msRequestFullscreen) { viewport.msRequestFullscreen(); }
        }

        // Keyboard Panic Switch Hook
        window.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') { window.location.replace('https://google.com'); }
        });

        // Run Deployment Core
        buildArcadeGrid();
    </script>
</body>
</html>
{ name: "Your Game Title Here", url: "https://github.io" },
// This dynamic script automatically pulls a massive index list from a public CDN
const publicDatabaseUrl = "https://githubusercontent.com";
let gamesDatabase = [];

async function initArcadeSystem() {
    try {
        // Fetch thousands of games all at once from the public database repo
        const response = await fetch(publicDatabaseUrl);
        const data = await response.json();
        
        // Convert the fetched object data into a clean, searchable array layout
        gamesDatabase = Object.keys(data).map(key => ({
            name: data[key].name,
            url: `https://github.io{key}/` // Formats the path to the game files
        }));

        buildArcadeGrid();
    } catch (error) {
        console.error("Failed to fetch public games list, loading local backups...", error);
        // Fallback backup array if the external link ever drops offline
        gamesDatabase = [
            { name: "Retro Bowl", url: "https://googleusercontent.com" },
            { name: "1v1.LOL", url: "https://github.io" },
            { name: "Slope", url: "https://github.io" }
        ];
        buildArcadeGrid();
    }
}

function buildArcadeGrid() {
    const grid = document.getElementById('gameGrid');
    grid.innerHTML = ''; 

    // Sort thousands of games alphabetically in milliseconds
    gamesDatabase.sort((a, b) => a.name.localeCompare(b.name)); 

    gamesDatabase.forEach(game => {
        const element = document.createElement('div');
        element.className = 'game-card';
        element.textContent = game.name;
        element.setAttribute('onclick', `launchGame('${game.url}', this)`);
        grid.appendChild(element);
    });
}

function filterGames() {
    const query = document.getElementById('searchBar').value.toLowerCase();
    const cards = document.getElementsByClassName('game-card');

    for (let i = 0; i < cards.length; i++) {
        const title = cards[i].textContent.toLowerCase();
        cards[i].style.display = title.includes(query) ? "block" : "none";
    }
}

function launchGame(url, cardElement) {
    document.getElementById('gameViewport').src = url;
    const activeCards = document.querySelectorAll('.game-card');
    activeCards.forEach(c => c.classList.remove('active'));
    cardElement.classList.add('active');
}

function toggleFullscreen() {
    const viewport = document.getElementById('gameViewport');
    if (viewport.requestFullscreen) { viewport.requestFullscreen(); }
    else if (viewport.webkitRequestFullscreen) { viewport.webkitRequestFullscreen(); }
}

window.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') { window.location.replace('https://google.com'); }
});

// Run the automated configuration on startup
initArcadeSystem();
let isCloaked = false;

function toggleCloak() {
    const button = document.getElementById('cloakBtn');
    
    if (!isCloaked) {
        // Change browser tab title
        document.title = "Google Drive - My Drive";
        
        // Dynamically locate and swap the shortcut favicon link
        let link = document.querySelector("link[rel*='icon']") || document.createElement('link');
        link.type = 'image/x-icon';
        link.rel = 'shortcut icon';
        link.href = 'https://gstatic.com';
        document.getElementsByTagName('head')[0].appendChild(link);
        
        // Update button visual feedback
        button.innerText = "Disable Tab Disguise 🔓";
        button.style.borderColor = "#00bcd4";
        isCloaked = true;
    } else {
        // Revert back to original tab settings
        document.title = "Unblocked Portal Dashboard";
        
        let link = document.querySelector("link[rel*='icon']");
        if (link) {
            link.href = ""; // Or add a custom logo link for your arcade hub here
        }
        
        button.innerText = "Enable Tab Disguise 🕵️‍♂️";
        button.style.borderColor = "#2a2a3d";
        isCloaked = false;
    }
}
const presets = {
    google: { 
        title: "Google", 
        icon: "https://google.com" 
    },
    drive: { 
        title: "Google Drive - My Drive", 
        icon: "https://gstatic.com" 
    },
    classroom: { 
        title: "Classes", 
        icon: "https://gstatic.com" 
    },
    clever: { 
        title: "Clever | Portal", 
        icon: "https://clever.com" 
    },
    mcgraw: { 
        title: "McGraw Hill Log In", 
        icon: "https://mheducation.com" 
    },
    flocab: { 
        title: "Flocabulary - Educational Hip-Hop", 
        icon: "https://flocabulary.com" 
    },
    wiki: { 
        title: "Wikipedia, the free encyclopedia", 
        icon: "https://wikipedia.org" 
    }
};
// Updated Live Database Registry Array
const gamesDatabase = [
    { name: "Retro Bowl", url: "https://googleusercontent.com" },
    { name: "1v1.LOL", url: "https://github.io" },
    { name: "Slope", url: "https://github.io" },
    { name: "Drift Hunters", url: "https://github.io" },
    { name: "Cookie Clicker", url: "https://github.io" },
    { name: "Smash Karts", url: "https://github.io" },
    { name: "Subway Surfers", url: "https://github.io" },
    { name: "BitLife", url: "https://github.io" },
    { name: "Tunnel Rush", url: "https://github.io" },
    { name: "Geometry Dash", url: "https://github.io" }
];
        const mediaDatabase = [
            // Row 1: Favorite Shows
            { id: "tt19734104", title: "Exploding Kittens", year: "2024", info: "9 Episodes", img: "https://media-amazon.com", type: "tv", row: "favShows" },
            { id: "tt10376812", title: "Sweet Tooth", year: "2021", info: "3 Seasons", img: "https://media-amazon.com", type: "tv", row: "favShows" },
            { id: "tt11196014", title: "Only Murders in the Building", year: "2021", info: "4 Seasons", img: "https://media-amazon.com", type: "tv", row: "favShows" },
            { id: "tt13443470", title: "Wednesday", year: "2022", info: "1 Season", img: "https://media-amazon.com", type: "tv", row: "favShows" },
            { id: "tt0111161", title: "Friends", year: "1994", info: "10 Seasons", img: "https://media-amazon.com", type: "tv", row: "favShows" },
            
            // Row 2: Movies
            { id: "tt2395695", title: "Greenland", year: "2020", info: "119 min", img: "https://media-amazon.com", type: "movie", row: "movies" },
            { id: "tt28087816", title: "Find Me Falling", year: "2024", info: "93 min", img: "https://media-amazon.com", type: "movie", row: "movies" },
            { id: "tt4411604", title: "Ford v Ferrari", year: "2019", info: "152 min", img: "https://media-amazon.com", type: "movie", row: "movies" },
            { id: "tt16366836", title: "Sonic the Hedgehog 3", year: "2024", info: "110 min", img: "https://media-amazon.com", type: "movie", row: "movies" },
            { id: "tt29605705", title: "The Union", year: "2024", info: "107 min", img: "https://media-amazon.com", type: "movie", row: "movies" },
            
            // Row 3: Favorite Movies
            { id: "tt22416706", title: "Moana 2", year: "2024", info: "100 min", img: "https://media-amazon.com", type: "movie", row: "favMovies" },
            { id: "tt1630029", title: "Avatar 3: Fire and Ash", year: "2025", info: "Coming Soon", img: "https://media-amazon.com", type: "movie", row: "favMovies" },
            { id: "tt634649", title: "Spider-Man: No Way Home", year: "2021", info: "148 min", img: "https://media-amazon.com", type: "movie", row: "favMovies" },
            { id: "tt0119116", title: "The Fifth Element", year: "1997", info: "126 min", img: "https://media-amazon.com", type: "movie", row: "favMovies" },
            { id: "tt0109830", title: "Forrest Gump", year: "1994", info: "142 min", img: "https://media-amazon.com", type: "movie", row: "favMovies" }
        ];
{ id: "IMDb_CODE", title: "Movie Name", year: "Year", info: "Length", img: "Poster_Image_URL", type: "movie", row: "movies" },
            // Row 4: Top 10 Rank Chart Registry Blocks
            { id: "tt22416706", title: "Moana 2", year: "2024", info: "100 min", img: "https://media-amazon.com", type: "movie", row: "topRanked" },
            { id: "tt16366836", title: "Sonic the Hedgehog 3", year: "2024", info: "110 min", img: "https://media-amazon.com", type: "movie", row: "topRanked" },
            { id: "tt4411604", title: "Ford v Ferrari", year: "2019", info: "152 min", img: "https://media-amazon.com", type: "movie", row: "topRanked" },
            { id: "tt28087816", title: "Find Me Falling", year: "2024", info: "93 min", img: "https://media-amazon.com", type: "movie", row: "topRanked" },
            { id: "tt2395695", title: "Greenland", year: "2020", info: "119 min", img: "https://media-amazon.com", type: "movie", row: "topRanked" }
        function buildMediaDashboardGrid() {
            let rankCounter = 1; // Initializer tracker counter for the rank list row

            mediaDatabase.forEach(item => {
                let targetRowId = "";
                if (item.row === "favShows") targetRowId = "favShowsRow";
                else if (item.row === "movies") targetRowId = "moviesRow";
                else if (item.row === "favMovies") targetRowId = "favMoviesRow";
                else if (item.row === "topRanked") targetRowId = "topRankedRow";
                
                const container = document.getElementById(targetRowId);
                if (container) {
                    const card = document.createElement('div');
                    
                    // Branching Logic check: Format differently if it maps to our top 10 row
                    if (item.row === "topRanked") {
                        card.className = 'rank-card-frame';
                        card.setAttribute('data-rank', rankCounter); // Injects rank number index variable attributes
                        card.onclick = () => openTheaterOverlay(item);
                        card.innerHTML = `<div class="rank-img-layer" style="background-image:url('${item.img}')"></div>`;
                        rankCounter++; // Step chart up sequentially (1, 2, 3...)
                    } else {
                        // Standard Netflix Card Rendering Pipeline
                        card.className = 'poster-card-frame';
                        card.onclick = () => openTheaterOverlay(item);
                        card.innerHTML = `
                            <div class="poster-image-render" style="background-image:url('${item.img}')"></div>
                            <div class="card-title-shield">
                                <h4 class="shield-text-title">${item.title}</h4>
                                <span class="shield-text-year">${item.year} • ${item.info}</span>
                            </div>
                        `;
                    }
                    container.appendChild(card);
                }
            });
        }
{ id: "tt_IMDB_ID", title: "Your Film Name", year: "2026", info: "120 min", img: "POSTER_URL", type: "movie", row: "movies" },
{ id: "tt22416706", title: "Moana 2", year: "2024", info: "100 min", mpaa: "PG", img: "https://media-amazon.com", type: "movie", row: "topRanked" },
{ id: "tt16366836", title: "Sonic the Hedgehog 3", year: "2024", info: "110 min", mpaa: "PG", img: "https://media-amazon.com", type: "movie", row: "topRanked" },
{ id: "tt4411604", title: "Ford v Ferrari", year: "2019", info: "152 min", mpaa: "PG-13", img: "https://media-amazon.com", type: "movie", row: "topRanked" },
{ id: "tt28087816", title: "Find Me Falling", year: "2024", info: "93 min", mpaa: "TV-MA", img: "https://media-amazon.com", type: "movie", row: "topRanked" },
{ id: "tt2395695", title: "Greenland", year: "2020", info: "119 min", mpaa: "PG-13", img: "https://media-amazon.com", type: "movie", row: "topRanked" },
{ id: "tt19734104", title: "Exploding Kittens", year: "2024", info: "9 Episodes", mpaa: "TV-MA", img: "https://media-amazon.com", type: "tv", row: "favShows" },
{ id: "tt10376812", title: "Sweet Tooth", year: "2021", info: "3 Seasons", mpaa: "TV-14", img: "https://media-amazon.com", type: "tv", row: "favShows" },
{ id: "tt11196014", title: "Only Murders in the Building", year: "2021", info: "4 Seasons", mpaa: "TV-MA", img: "https://media-amazon.com", type: "tv", row: "favShows" },
{ id: "tt13443470", title: "Wednesday", year: "2022", info: "1 Season", mpaa: "TV-14", img: "https://media-amazon.com", type: "tv", row: "favShows" },
{ id: "tt0111161", title: "Friends", year: "1994", info: "10 Seasons", mpaa: "TV-14", img: "https://media-amazon.com", type: "tv", row: "favShows" },
{ id: "tt2395695", title: "Greenland", year: "2020", info: "119 min", mpaa: "PG-13", img: "https://media-amazon.com", type: "movie", row: "movies" },
{ id: "tt28087816", title: "Find Me Falling", year: "2024", info: "93 min", mpaa: "TV-MA", img: "https://media-amazon.com", type: "movie", row: "movies" },
{ id: "tt4411604", title: "Ford v Ferrari", year: "2019", info: "152 min", mpaa: "PG-13", img: "https://media-amazon.com", type: "movie", row: "movies" },
{ id: "tt16366836", title: "Sonic the Hedgehog 3", year: "2024", info: "110 min", mpaa: "PG", img: "https://media-amazon.com", type: "movie", row: "movies" },
{ id: "tt29605705", title: "The Union", year: "2024", info: "107 min", mpaa: "PG-13", img: "https://media-amazon.com", type: "movie", row: "movies" },
{ id: "tt22416706", title: "Moana 2", year: "2024", info: "100 min", mpaa: "PG", img: "https://media-amazon.com", type: "movie", row: "favMovies" },
{ id: "tt1630029", title: "Avatar 3: Fire and Ash", year: "2025", info: "Coming Soon", mpaa: "PG-13", img: "https://media-amazon.com", type: "movie", row: "favMovies" },
{ id: "tt634649", title: "Spider-Man: No Way Home", year: "2021", info: "148 min", mpaa: "PG-13", img: "https://media-amazon.com", type: "movie", row: "favMovies" },
{ id: "tt0119116", title: "The Fifth Element", year: "1997", info: "126 min", mpaa: "PG-13", img: "https://media-amazon.com", type: "movie", row: "favMovies" },
{ id: "tt0109830", title: "Forrest Gump", year: "1994", info: "142 min", mpaa: "PG-13", img: "https://media-amazon.com", type: "movie", row: "favMovies" }
