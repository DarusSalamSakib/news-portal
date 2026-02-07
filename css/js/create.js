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

  const token = localStorage.getItem("token");
  if (!token) {
    alert("You must be logged in to create news.");
    window.location.href = "index.html";
    return;
  }

  fetch("http://localhost:3000/api/news", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify({
      title,
      body,
      author_id: Number(localStorage.getItem("userId")),
      comments: []
    })
  }).then(async (res) => {
    if (res.status === 401 || res.status === 403) {
      alert("Session expired. Please login again.");
      window.location.href = "index.html";
      return;
    }
    if (!res.ok) {
      alert("Failed to create news");
      return;
    }
    location.href = "news.html";
  });
}
