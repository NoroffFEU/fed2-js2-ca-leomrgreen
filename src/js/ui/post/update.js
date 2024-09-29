import SocialAPI from "../../api/post";
import { postId } from "../../api/constants";
const api = new SocialAPI();

export async function populateForm(id) {
  try {
    const res = await api.post.readSinglePost(id);
    const post = res.data;
    // sets default value on the form inputs based on the post id found in the URL
    document.getElementById("title").value = post.title;
    document.getElementById("body").value = post.body || "";
    document.getElementById("tags").value = post.tags
      ? post.tags.join(", ")
      : "";
    if (post.media) {
      document.getElementById("media-url").value = post.media.url || "";
      document.getElementById("media-alt").value = post.media.alt || "";
    }
  } catch (error) {
    console.error("Error fetching post:", error);
  }
}

export async function OnUpdatePost(e) {
  e.preventDefault();
  const formData = new FormData(e.target);

  const postData = {
    title: formData.get("title"),
    body: formData.get("body"),
    tags: formData
      .get("tags")
      .split(/[\s,]+/) // regex for " " ","
      .map((tag) => tag.trim())
      .filter((tag) => tag),
    media: formData.get("media-url")
      ? {
          url: formData.get("media-url"),
          alt: formData.get("media-alt"),
        }
      : null,
  };

  try {
    await api.post.update(postId, postData);
    alert("Post successfully updated!");
    window.location.href = `/post/?id=${postId}`;
  } catch (error) {
    console.log(error);
  }
}
