import { postId } from "../../api/constants";
import { readPost } from "../../api/post/read";
import { authGuard } from "../../utilities/authGuard";

authGuard();
readPost(postId);
