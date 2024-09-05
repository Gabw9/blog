document.addEventListener('DOMContentLoaded', () => {
    const postForm = document.getElementById('postForm');
    const postFeed = document.getElementById('postFeed');
    const viewFeedBtn = document.getElementById('viewFeedBtn');
    const createPostBtn = document.getElementById('createPostBtn');

    // Função para salvar a postagem no localStorage
    function savePost(post) {
        const posts = JSON.parse(localStorage.getItem('posts')) || [];
        posts.push(post);
        localStorage.setItem('posts', JSON.stringify(posts));
    }

    // Função para mostrar as postagens no feed
    function renderFeed() {
        const posts = JSON.parse(localStorage.getItem('posts')) || [];
        postFeed.innerHTML = '';
        posts.forEach(post => {
            const postItem = document.createElement('div');
            postItem.className = 'post-item';
            postItem.innerHTML = `
                <h2>${post.title}</h2>
                <p>${post.content}</p>
                <p class="tags">${post.tags}</p>
            `;
            postFeed.appendChild(postItem);
        });
    }

    // Alterna para exibir o formulário de postagem
    createPostBtn.addEventListener('click', () => {
        postForm.classList.add('active');
        postFeed.classList.remove('active');
        createPostBtn.style.display = 'none';
        viewFeedBtn.style.display = 'inline-block';
    });

    // Alterna para exibir o feed de postagens
    viewFeedBtn.addEventListener('click', () => {
        postForm.classList.remove('active');
        postFeed.classList.add('active');
        createPostBtn.style.display = 'inline-block';
        viewFeedBtn.style.display = 'none';
        renderFeed();
    });

    // Evento de envio do formulário
    postForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const title = document.getElementById('titulo').value;
        const content = document.getElementById('conteudo').value;
        const tags = document.getElementById('tags').value;

        const post = { title, content, tags };
        savePost(post);

        // Limpa o formulário e alterna para o feed
        postForm.reset();
        postForm.classList.remove('active');
        postFeed.classList.add('active');
        createPostBtn.style.display = 'inline-block';
        viewFeedBtn.style.display = 'none';
        renderFeed();
    });
});
