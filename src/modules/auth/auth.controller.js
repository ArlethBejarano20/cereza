import { signInWithEmail, signOut, getCurrentUser } from "./auth.service.js";

function handleLoginSubmit(event) {
  const form = event.target;
  if (form.id !== "auth-login-form") return;

  event.preventDefault();

  const formData = new FormData(form);
  const email = formData.get("email");
  const password = formData.get("password");
  const messageBox = document.getElementById("auth-login-message");

  if (!messageBox) return;

  messageBox.style.display = "none";

  signInWithEmail(email, password)
    .then(async () => {
      messageBox.textContent = "Inicio de sesión correcto.";
      messageBox.className = "alert alert-success";
      messageBox.style.display = "block";

      const user = await getCurrentUser();
      console.log("[Auth] Usuario conectado:", user?.email);
    })
    .catch((error) => {
      console.error(error);
      messageBox.textContent = error.message || "Error al iniciar sesión.";
      messageBox.className = "alert alert-error";
      messageBox.style.display = "block";
    });
}

document.addEventListener("submit", handleLoginSubmit);

export { signOut, getCurrentUser };
