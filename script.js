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
