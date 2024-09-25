import { postId } from "../../api/constants";
import { readPost } from "../../ui/post/read";
import { onComment } from "../../ui/post/comment";
import { authGuard } from "../../utilities/authGuard";

authGuard();
readPost(postId);

const form = document.forms.commentPost;

form.addEventListener("submit", onComment);
