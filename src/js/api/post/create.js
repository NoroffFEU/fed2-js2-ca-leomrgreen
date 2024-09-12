import socialAPI from "./index";

const api = new socialAPI();

export async function createPost(e) {
  e.preventDefault();
  const formData = new FormData(e.target);
  const postData = {
    title: formData.get("title"),
    body: formData.get("body"),
    media: {
      url: formData.get("media-url"),
      alt: formData.get("media-alt"),
    },
    tags: formData
      .get("tags")
      ?.split(",")
      .map((tag) => tag.trim()),
  };
  const res = await api.auth(postData);
  res.ok ? console.log("Post created:", res) : console.log("error");
}
