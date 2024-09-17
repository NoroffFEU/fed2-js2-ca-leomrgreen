import { readPosts } from "../../api/post/read";
import animateOnScroll from "../../utilities/animateOnScroll";
import { authGuard } from "../../utilities/authGuard";
import { carousel } from "../../utilities/carousel";

authGuard();
carousel();
readPosts();
animateOnScroll();
