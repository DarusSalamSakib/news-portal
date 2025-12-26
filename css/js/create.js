function create() {
  const titleEl = document.getElementById("title");
  const bodyEl = document.getElementById("body");
  if (!titleEl || !bodyEl) return alert("Form not loaded properly");

  // Debug: show raw values (helps detect caching or old script issues)
  console.log('[create] raw values', { titleRaw: titleEl.value, bodyRaw: bodyEl.value });

  const title = titleEl.value.trim();
  const body = bodyEl.value.trim();

  if (!title) {
    alert('[NewsPortal] Please enter a title.');
    titleEl.focus();
    return;
  }
  if (body.length < 20) {
    alert('[NewsPortal] Body must be at least 20 characters.');
    bodyEl.focus();
    return;
  }

  fetch("http://localhost:3000/news", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      title,
      body,
      author_id: Number(localStorage.getItem("userId")),
      comments: []
    })
  }).then(() => location.href = "news.html");
}
