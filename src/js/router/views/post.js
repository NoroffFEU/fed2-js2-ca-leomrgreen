import { readPost } from "../../api/post/read";
import { authGuard } from "../../utilities/authGuard";
const params = new URLSearchParams(window.location.search);
const postId = params.get("id");

authGuard();
readPost(postId);
