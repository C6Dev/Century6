document.addEventListener('DOMContentLoaded', () => {
    const mainNav = document.getElementById('main-nav');
    const contentSections = document.querySelectorAll('.content-section');
    const navLinks = mainNav.querySelectorAll('a');

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
        const sectionId = target.getAttribute('href').substring(1) + '-section'; // Remove '#' and add '-section'

        showSection(sectionId);
        window.location.hash = target.getAttribute('href'); // Update URL hash
    };

    navLinks.forEach(link => {
        link.addEventListener('click', handleTabClick);
    });

    // Initial setup based on URL hash or default to 'games'
    const initialSection = window.location.hash ? window.location.hash.substring(1) + '-section' : 'news-section';
    showSection(initialSection);
});
