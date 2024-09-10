import { readPosts } from "../../api/post/read";
import { authGuard } from "../../utilities/authGuard";
authGuard();
readPosts();
