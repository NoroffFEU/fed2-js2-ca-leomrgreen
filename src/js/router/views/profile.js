import { authGuard } from "../../utilities/authGuard";
import { readProfile, readProfilePosts } from "../../ui/profile/read";
import { onUpdateProfile } from "../../ui/profile/update";
import updatePlaceholder from "../../utilities/custom-placeholder";

const form = document.forms.updateProfile;

form.addEventListener("submit", onUpdateProfile);

authGuard();
readProfile();
updatePlaceholder();
readProfilePosts();
