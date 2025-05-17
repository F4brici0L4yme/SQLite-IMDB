fetch('/api/movies')
    .then(r => {
        if (!r.ok) throw new Error(r.status);
        return r.json();
    })
    .then(data => {
        const movieList = document.querySelector('#movie-list');
        data.forEach(p => {
            const movieListItem = document.createElement('li');
            movieListItem.setAttribute('data-movie-id', p.MovieID);
            movieListItem.innerHTML = `
        <strong>${p.Title}</strong> (${p.Year}) - Score: ${p.Score}
        <div class="extra-text" style="display: none;">Cargando actores...</div>`;
            movieListItem.addEventListener('click', () => toggleCasting(movieListItem));
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

    if (extra.style.display === 'block') {
        extra.style.display = 'none';
        return;
    }

    extra.style.display = 'block';

    if (!extra.dataset.loaded) {
        const movieId = clickedLi.dataset.movieId;
        fetch(`/api/movies/${movieId}/actors`)
            .then(res => res.json())
            .then(actors => {
                if (actors.length === 0) {
                    extra.innerHTML = 'No hay actores registrados.';
                } else {
                    extra.innerHTML = '<ul>' +
                        actors.map(actor =>
                            `<li><a href="actor.html?id=${actor.ActorId}&name=${encodeURIComponent(actor.Name)}">${actor.Name}</a></li>`
                        ).join('') +
                        '</ul>';
                }
                extra.dataset.loaded = true;
            })
            .catch(err => {
                extra.innerHTML = 'Error al cargar actores';
                console.error(err);
            });
    }
}
