fetch("http://localhost:3000/users")
  .then(res => res.json())
  .then(users => {
    const select = document.getElementById("userSelect");
    users.forEach(u => {
      const option = document.createElement("option");
      option.value = u.id;
      option.text = u.name;
      select.appendChild(option);
    });
  });

function login() {
  const userId = document.getElementById("userSelect").value;
  localStorage.setItem("userId", userId);
  window.location.href = "news.html";
}
