const loginForm = document.getElementById("login-form"); 
const usernameInput = document.getElementById("username");
const passwordInput = document.getElementById("password");

loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const username = usernameInput.value;
    const password = passwordInput.value;

    try {
        const response = await fetch("http://localhost:5001/api/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ username, password }),
        });

        const data = await response.json();

        if (response.ok) {
            // Save the new token to localStorage
            localStorage.setItem("token", data.token);

            // Redirect to a protected page or dashboard
            window.location.href = "/home";  // Example redirect
        } else {
            alert(data.message);
        }
    } catch (error) {
        console.error("Error logging in:", error);
        alert("An error occurred while logging in.");
    }
});
