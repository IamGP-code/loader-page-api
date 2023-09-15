const loadingContainer = document.getElementById('loading-container');
const postsContainer = document.getElementById('posts-container');
const loader = document.querySelector('.loader');
let page = 1;
let loading = false;

async function fetchPosts() {
    if (loading) return;
    loading = true;
    loadingContainer.style.display = 'flex';

    try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=10`);
        const posts = await response.json();

        posts.forEach(post => {
            
            const postElement = document.createElement('div');
            postElement.classList.add('post');
            postElement.innerHTML = `
            <h2>${post.title}</h2>
            <p>${post.body}</p>
            `;
            postsContainer.appendChild(postElement);
        });
        setTimeout(function(){
            loading = false;
            loadingContainer.style.display = 'none';
            },3000);
            page++;
        clearTimeout(1000);
    } catch (error) {
        console.error('Error fetching posts:', error);
    }
}

fetchPosts();

window.addEventListener('scroll', () => {
            if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 100) {
            fetchPosts();
        }
    });
