import { readPosts } from "../../api/post/read";
import { authGuard } from "../../utilities/authGuard";
import { carousel } from "../../utilities/carousel";

authGuard();
carousel();
readPosts();
