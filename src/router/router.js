import { renderInRoot } from "../utils/domUtils.js";
import { getAuthView } from "../modules/auth/auth.view.js";
import { getPacientesView } from "../modules/pacientes/pacientes.view.js";
import { getPsicologosView } from "../modules/psicologos/psicologos.view.js";
import { getCitasView } from "../modules/citas/citas.view.js";
import { getAdminView } from "../modules/admin/admin.view.js";
import { APP_CONFIG } from "../config/config.js";

const routes = {
  auth: getAuthView,
  pacientes: getPacientesView,
  psicologos: getPsicologosView,
  citas: getCitasView,
  admin: getAdminView
};

export function navigateTo(routeName) {
  const route = routes[routeName] ? routeName : APP_CONFIG.defaultRoute;
  const viewFactory = routes[route];
  const view = viewFactory();
  renderInRoot(view);
  window.history.pushState({ route }, "", `#${route}`);
}

export function initRouter() {
  const initialRoute =
    window.location.hash.replace("#", "") || APP_CONFIG.defaultRoute;
  navigateTo(initialRoute);

  window.addEventListener("popstate", (event) => {
    const route = event.state?.route || APP_CONFIG.defaultRoute;
    const viewFactory = routes[route];
    if (viewFactory) {
      renderInRoot(viewFactory());
    }
  });

  document.addEventListener("click", (event) => {
    const target = event.target;
    if (target.matches("[data-route]")) {
      const route = target.getAttribute("data-route");
      event.preventDefault();
      navigateTo(route);
    }
  });
}
