import SocialAPI from "./index";

const api = new SocialAPI();

export async function deletePost(id) {
  await api.post.delete(id);
  alert("Post successfully deleted");
  location.reload();
}
