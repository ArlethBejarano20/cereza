import { initRouter } from "./router/router.js";
import "./modules/auth/auth.controller.js";
import "./modules/pacientes/pacientes.controller.js";
import "./modules/psicologos/psicologos.controller.js";
import "./modules/citas/citas.controller.js";
import "./modules/admin/admin.controller.js";

window.addEventListener("DOMContentLoaded", () => {
  initRouter();
});
