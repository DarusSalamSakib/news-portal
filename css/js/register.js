function register() {
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;

    if (!name || !email || !password) {
        alert("Please fill in all fields.");
        return;
    }

    fetch("http://localhost:3000/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password })
    })
        .then(async (res) => {
            const data = await res.json();
            if (!res.ok) {
                throw new Error(data.error || "Registration failed");
            }
            return data;
        })
        .then((data) => {
            alert("Registration Successful!");
            // Save user info and token
            localStorage.setItem("userId", data.user.id);
            localStorage.setItem("userName", data.user.name);
            localStorage.setItem("token", data.token);

            // Redirect to news feed
            window.location.href = "news.html";
        })
        .catch((err) => {
            alert("Error: " + err.message);
        });
}
