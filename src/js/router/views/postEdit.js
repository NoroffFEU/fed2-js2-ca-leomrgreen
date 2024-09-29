import { postId } from "../../api/constants";
import { OnUpdatePost, populateForm } from "../../ui/post/update";
import { authGuard } from "../../utilities/authGuard";

authGuard();
populateForm(postId);

const form = document.forms.editPost;

form.addEventListener("submit", OnUpdatePost);
