function login() {
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;

  if (!email || !password) {
    alert("Please enter email and password");
    return;
  }

  fetch("http://localhost:3000/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password })
  })
    .then(async (res) => {
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Login failed");
      }
      return data;
    })
    .then((data) => {
      localStorage.setItem("userId", data.user.id);
      localStorage.setItem("userName", data.user.name);
      localStorage.setItem("token", data.token);
      window.location.href = "news.html";
    })
    .catch((err) => {
      alert("Error: " + err.message);
    });
}
