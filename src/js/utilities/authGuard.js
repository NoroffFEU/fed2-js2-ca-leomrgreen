export function authGuard() {
  if (!localStorage.token) {
    window.location.href = "/auth/";
  }
}
