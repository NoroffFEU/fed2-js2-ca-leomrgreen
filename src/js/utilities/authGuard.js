// util function  to check is allowed on certain pages

export function authGuard() {
  if (!localStorage.token) {
    window.location.href = "/auth/";
  }
}
