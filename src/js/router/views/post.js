import { readPost } from "../../api/post/read";
const params = new URLSearchParams(window.location.search);
const postId = params.get("id");

readPost(postId);
