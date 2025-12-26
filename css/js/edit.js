const id = new URLSearchParams(location.search).get("id");

fetch(`http://localhost:3000/news/${id}`)
  .then(r => r.json())
  .then(n => {
    title.value = n.title;
    body.value = n.body;
  });

function update() {
  fetch(`http://localhost:3000/news/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      title: title.value,
      body: body.value
    })
  }).then(() => location.href = "news.html");
}
