import { htmlToElement } from "../../utils/domUtils.js";

export function getAuthView() {
  const html = `
    <section class="card">
      <div class="card-header">
        <h2 class="card-title">Acceso a CAICH</h2>
      </div>
      <p>Inicia sesión para gestionar citas, pacientes y psicólogos.</p>

      <form id="auth-login-form" class="form-row" autocomplete="on">
        <input
          type="email"
          name="email"
          class="input"
          required
          placeholder="Correo electrónico"
        />
        <input
          type="password"
          name="password"
          class="input"
          required
          placeholder="Contraseña"
        />
        <button type="submit" class="button-primary">
          Iniciar sesión
        </button>
      </form>

      <div id="auth-login-message" class="alert" style="display:none;"></div>
    </section>
  `;
  return htmlToElement(html);
}
