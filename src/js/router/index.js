import setThemeListener from "../theme/index.js";
import setLogoutListener from "../ui/global/logout.js";
import { onSearch } from "../ui/profile/search.js";
import { setDropDownListener, setSearchBarListener } from "../utilities/nav";
const form = document.forms.search;

export default async function router(pathname = window.location.pathname) {
  setLogoutListener();
  setSearchBarListener();
  setThemeListener();
  setDropDownListener();
  form.addEventListener("submit", onSearch);

  switch (pathname) {
    case "/":
      await import("./views/home.js");
      break;
    case "/auth/":
      await import("./views/auth.js");
      break;
    case "/auth/login/":
      await import("./views/login.js");
      break;
    case "/auth/register/":
      await import("./views/register.js");
      break;
    case "/post/":
      await import("./views/post.js");
      break;
    case "/post/edit/":
      await import("./views/postEdit.js");
      break;
    case "/post/create/":
      await import("./views/postCreate.js");
      break;
    case "/profile/":
      await import("./views/profile.js");
      break;
    case "/user/":
      await import("./views/user.js");
      break;
    default:
      await import("./views/notFound.js");
  }
}
