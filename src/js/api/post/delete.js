import SocialAPI from "./index";

const api = new SocialAPI();

// using our post.delte from the SocialAPI class
export async function deletePost(id) {
  await api.post.delete(id);
  alert("Post successfully deleted");
  location.reload();
}
