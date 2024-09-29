import NoroffAPI from "../../api/auth";

const api = new NoroffAPI();

export async function onLogin(e) {
  e.preventDefault();
  const formData = new FormData(e.target);

  const user = {
    email: formData.get("email"),
    password: formData.get("password"),
  };

  try {
    const response = await api.auth.login(user);
    console.log("Login successful:", response);
    e.target.reset();
    alert(`Login successful for ${response.data.name}`);
    window.location.href = "/";
  } catch (error) {
    console.error("Login failed:", error);
    alert(error);
  }
}
