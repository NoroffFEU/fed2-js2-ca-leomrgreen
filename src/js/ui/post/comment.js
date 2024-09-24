import SocialAPI from "../../api/post";
const api = new SocialAPI();
import { postId } from "../../api/constants";

export async function onComment(e) {
  e.preventDefault();
  const formData = new FormData(e.target);
  const postData = {
    body: formData.get("comment"),
  };

  await api.post.comment(postId, postData);
  window.location.reload();
}
