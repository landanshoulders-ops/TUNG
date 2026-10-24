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
    if(url) {
        frame.src = url;
    } else {
        frame.src = "about:blank";
    }
}
