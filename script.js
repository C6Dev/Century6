document.addEventListener('DOMContentLoaded', () => {
    const mainNav = document.getElementById('main-nav');
    const contentSections = document.querySelectorAll('.content-section');
    const navLinks = mainNav.querySelectorAll('a');
    const newsItems = document.querySelectorAll('.news-item');
    
    // Game devlog navigation
    const gameCards = document.querySelectorAll('.game-card');
    const devlogSection = document.getElementById('devlog-section');
    const backToGamesBtn = document.querySelector('.back-button');

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
        const sectionId = target.getAttribute('href').substring(1) + '-section';
        showSection(sectionId);
        window.location.hash = target.getAttribute('href');
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

    newsItems.forEach(item => {
        item.addEventListener('click', () => {
            createExpandedView(item);
        });
    });

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
    newsCards.forEach(card => {
        card.addEventListener('click', () => {
            createExpandedView(card);
        });
    });

    const initialSection = window.location.hash ? window.location.hash.substring(1) + '-section' : 'news-section';
    showSection(initialSection);
});
