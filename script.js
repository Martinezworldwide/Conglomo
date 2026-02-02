document.addEventListener('DOMContentLoaded', () => {
    const blogPostsContainer = document.getElementById('blog-posts');
    const articlesPath = './articles/'; // Path to your articles folder

    async function fetchArticle(filename) {
        try {
            const response = await fetch(articlesPath + filename);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return await response.text();
        } catch (error) {
            console.error(`Error fetching article ${filename}:`, error);
            return null;
        }
    }

    function renderArticle(title, date, content) {
        const postElement = document.createElement('article');
        postElement.className = 'blog-post';
        postElement.innerHTML = `
            <h3>${title}</h3>
            <div class="meta">Published on ${date}</div>
            <div class="content">${content}</div>
        `;
        blogPostsContainer.appendChild(postElement);
    }

    async function loadArticles() {
        blogPostsContainer.innerHTML = ''; // Clear "Loading Articles..."

        // In a real scenario, you'd fetch a manifest/list of articles
        // For now, let's hardcode a placeholder or assume names
        const articleFiles = ['example-article.md']; // Example: will be replaced with actual article names

        for (const file of articleFiles) {
            const content = await fetchArticle(file);
            if (content) {
                // Basic markdown to HTML conversion (you might use a library like marked.js for full markdown)
                const htmlContent = content.replace(/\n/g, '<br>'); // Simple line break conversion
                const title = file.replace('.md', '').replace(/-/g, ' ').split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
                const date = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }); // Placeholder date
                renderArticle(title, date, htmlContent);
            }
        }

        if (blogPostsContainer.innerHTML === '') {
            blogPostsContainer.innerHTML = '<h2>No articles found.</h2>';
        }
    }

    loadArticles();
});
