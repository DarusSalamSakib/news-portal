const userId = localStorage.getItem("userId");
if (!userId) location.href = "index.html";

fetch("http://localhost:3000/users/" + userId)
  .then(r => r.json())
  .then(u => document.getElementById("user").innerText = u.name);

fetch("http://localhost:3000/news")
  .then(res => res.json())
  .then(news => {
    const div = document.getElementById("newsList");
    const currentUserId = Number(userId);
    news.forEach(n => {
      div.innerHTML += `
        <div class="news-card">
          <div class="news-meta">
            <div>${n.author_id ? 'Author ID: ' + n.author_id : ''}</div>
            <div class="news-actions">
              <a href="detail.html?id=${n.id}">View</a>
              ${n.author_id === currentUserId ? `<a href="edit.html?id=${n.id}">Edit</a><button onclick="del(${n.id})">Delete</button>` : ''}
            </div>
          </div>
          <h3>${n.title}</h3>
          <p class="muted">${(n.body || '').slice(0, 160)}${(n.body && n.body.length > 160) ? '...' : ''}</p>
        </div>
      `;
    });
  });

function del(id) {
  fetch(`http://localhost:3000/news/${id}`, { method: "DELETE" })
    .then(() => location.reload());
}

function goCreate() {
  location.href = "create.html";
}
