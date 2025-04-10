document.addEventListener('DOMContentLoaded', async () => {
    const mainNav = document.getElementById('main-nav');
    const contentSections = document.querySelectorAll('.content-section');
    const navLinks = mainNav.querySelectorAll('a');
    const newsItems = document.querySelectorAll('.news-item');
    
    // Game devlog navigation
    const gameCards = document.querySelectorAll('.game-card');
    const devlogSection = document.getElementById('devlog-section');
    const backToGamesBtn = document.querySelector('.back-button');

    // Load news data
    const loadNews = async () => {
        try {
            const response = await fetch('news.json');
            const data = await response.json();
            return data.news;
        } catch (error) {
            console.error('Error loading news:', error);
            return [];
        }
    };

    const createNewsCard = (newsItem) => {
        const card = document.createElement('div');
        card.className = 'news-card';
        card.dataset.category = newsItem.category;
        
        card.innerHTML = `
            <div class="news-icon">${newsItem.icon}</div>
            <span class="news-tag">${newsItem.tag}</span>
            <h4>${newsItem.title}</h4>
            <p>${newsItem.content}</p>
            <span class="news-date">${newsItem.date}</span>
        `;

        card.addEventListener('click', () => {
            createExpandedView(card);
        });

        return card;
    };

    // Initialize news grid
    const newsGrid = document.querySelector('.news-grid');
    const news = await loadNews();
    news.forEach(newsItem => {
        newsGrid.appendChild(createNewsCard(newsItem));
    });

    const showSection = (sectionId) => {
        contentSections.forEach(section => {
            section.style.display = 'none';
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
        });

        const sectionToShow = document.getElementById(sectionId);
        const activeNavLink = mainNav.querySelector(`a[href="#${sectionId.replace('-section', '')}"]`);

        if (sectionToShow) {
            sectionToShow.style.display = 'block';
        }
        if (activeNavLink) {
            activeNavLink.classList.add('active');
        }
    };

    const handleTabClick = (event) => {
        event.preventDefault();
        const target = event.target;
        const href = target.getAttribute('href');
        
        // Check if it's the Game Hub link
        if (href === '#hub') {
            window.location.href = 'game-hub.html';
            return;
        }
        
        const sectionId = href.substring(1) + '-section';
        showSection(sectionId);
        window.location.hash = href;
    };

    navLinks.forEach(link => {
        link.addEventListener('click', handleTabClick);
    });

    // Game devlog navigation handlers
    gameCards.forEach(card => {
    });

    function createExpandedView(content) {
        // Create overlay
        const overlay = document.createElement('div');
        overlay.className = 'modal-overlay';
        document.body.appendChild(overlay);

        const expandedView = document.createElement('div');
        expandedView.className = 'expanded-view';
        
        const closeButton = document.createElement('button');
        closeButton.className = 'close-button';
        closeButton.innerHTML = '×';
        
        const closeModal = () => {
            expandedView.remove();
            overlay.remove();
            document.body.style.overflow = 'auto';
        };

        closeButton.addEventListener('click', closeModal);
        overlay.addEventListener('click', closeModal);

        const expandedContent = document.createElement('div');
        expandedContent.className = 'expanded-content';
        expandedContent.innerHTML = content.innerHTML;

        expandedView.appendChild(closeButton);
        expandedView.appendChild(expandedContent);
        document.body.appendChild(expandedView);
        document.body.style.overflow = 'hidden';
    }

    // Enhanced card interaction
    gameCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'scale(1.02)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'scale(1)';
        });
    });

    const newsCards = document.querySelectorAll('.news-card');

    // News category filtering
    const categoryButtons = document.querySelectorAll('.category-btn');

    categoryButtons.forEach(button => {
        button.addEventListener('click', () => {
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const category = button.dataset.category;
            
            newsCards.forEach(card => {
                if (category === 'all' || card.dataset.category === category) {
                    card.style.display = 'block';
                    card.style.animation = 'fadeIn 0.5s ease-in forwards';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    const initialSection = window.location.hash ? window.location.hash.substring(1) + '-section' : 'news-section';
    showSection(initialSection);
});
