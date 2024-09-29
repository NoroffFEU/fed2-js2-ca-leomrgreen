import SocialAPI from "../../api/post";
const api = new SocialAPI();

export async function onCreatePost(e) {
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
      : null, // ensures that create post is successful even though user does not provide any media property
  };

  try {
    await api.post.create(postData);
    alert("Post successfully created!");
  } catch (error) {
    console.log(error);
  }
}
