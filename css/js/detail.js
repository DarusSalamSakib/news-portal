const id = new URLSearchParams(window.location.search).get("id");
let currentNews;

fetch(`http://localhost:3000/news/${id}`)
  .then(r => r.json())
  .then(n => {
    currentNews = n;
    document.getElementById("detail").innerHTML = `
      <h2>${n.title}</h2>
      <p>${n.body}</p>
      <h4>Comments:</h4>
      ${n.comments.map(c => `<p>${c.text}</p>`).join("")}
    `;
  });

function addComment() {
  const text = document.getElementById("comment").value;
  if (!text) return alert("Empty comment");

  currentNews.comments.push({
    id: Date.now(),
    text,
    user_id: Number(localStorage.getItem("userId"))
  });

  fetch(`http://localhost:3000/news/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ comments: currentNews.comments })
  }).then(() => location.reload());
}
