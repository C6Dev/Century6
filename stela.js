// Fetch latest commit from GitHub
async function fetchLatestCommit() {
    try {
        const response = await fetch('https://api.github.com/repos/c6dev/StelaEngine/commits/main');
        const data = await response.json();
        
        const commitElement = document.getElementById('latest-commit');
        if (data.sha && data.commit) {
            const date = new Date(data.commit.author.date).toLocaleDateString();
            commitElement.innerHTML = `
                <p><strong>SHA:</strong> ${data.sha.substring(0, 7)}</p>
                <p><strong>Message:</strong> ${data.commit.message}</p>
                <p><strong>Date:</strong> ${date}</p>
            `;
        } else {
            commitElement.innerHTML = '<p>Unable to fetch latest commit</p>';
        }
    } catch (error) {
        console.error('Error fetching commit:', error);
        document.getElementById('latest-commit').innerHTML = '<p>Unable to fetch latest commit</p>';
    }
}

// Fetch Stela-specific news
async function fetchStelaNews() {
    try {
        const response = await fetch('./news.json');
        const data = await response.json();
        
        const stelaNews = data.news.filter(item => item.category === 'stela');
        const newsGrid = document.getElementById('stela-news');
        
        stelaNews.forEach(item => {
            const newsItem = document.createElement('div');
            newsItem.className = 'news-item';
            newsItem.innerHTML = `
                <div class="news-header">
                    <span class="news-icon">${item.icon}</span>
                    <span class="news-tag">${item.tag}</span>
                </div>
                <h3>${item.title}</h3>
                <p>${item.content}</p>
                <p class="news-date">${item.date}</p>
            `;
            newsGrid.appendChild(newsItem);
        });
    } catch (error) {
        console.error('Error fetching news:', error);
    }
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    fetchLatestCommit();
    fetchStelaNews();
});