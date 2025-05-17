fetch('/api/movies')
    .then(r => {
        if (!r.ok) throw new Error(r.status);
        return r.json();
    })
    .then(data => {
        console.log(data);
        const tbody = document.querySelector('#tabla tbody');
        data.forEach(p => {
            const tr = document.createElement('tr');
            tr.innerHTML = `<td>${p.Title}</td><td>${p.Year}</td><td>${p.Score}</td>`;
            tbody.appendChild(tr);
        });
    })
    .catch(err => console.error('Fetch error:', err));