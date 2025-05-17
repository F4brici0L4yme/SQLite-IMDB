fetch('/api/movies')
    .then(r => {
        if (!r.ok) throw new Error(r.status);
        return r.json();
    })
    .then(data => {
        console.log(data);
        const movieList = document.querySelector('#movie-list');
        data.forEach(p => {
            const movieListItem = document.createElement('li');
            movieListItem.innerHTML = `<li onclick= "toggleCasting(this)">${p.Title}
            <div class="extra-text" style="display: none;">Detalles de la película 1</div>
            </li>`;
            movieList.appendChild(movieListItem);
        });
    })
    .catch(err => console.error('Fetch error:', err));

function toggleCasting(clickedLi) {
    document.querySelectorAll('#movie-list .extra-text').forEach(div => {
        if (div !== clickedLi.querySelector('.extra-text')) {
            div.style.display = 'none';
        }
    });

    const extra = clickedLi.querySelector('.extra-text');
    extra.style.display = (extra.style.display === 'block') ? 'none' : 'block';
}