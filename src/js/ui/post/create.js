import SocialAPI from "../../api/post";
const api = new SocialAPI();

export async function onCreatePost(e) {
  e.preventDefault();
  const formData = new FormData(e.target);
  const title = formData.get("title");
  const body = formData.get("body");
  const url = formData.get("media-url");
  const alt = formData.get("media-alt");
  const tags = formData.get("tags");
  const tagArray = tags.split(/[\s,]+/).map((tag) => tag.trim()); //RegExp for " " and ","
  const media = {
    url,
    alt,
  };

  const postData = { title, body, tags: tagArray, media };

  try {
    await api.post.create(postData);
    alert("Post sucessfully created!");
    window.location.href = "/";
  } catch (error) {
    console.log(error);
  }
}
