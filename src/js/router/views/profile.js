import { authGuard } from "../../utilities/authGuard";
import { readProfile } from "../../api/profile/read";
import { onUpdateProfile } from "../../ui/profile/update";
import updatePlaceholder from "../../utilities/custom-placeholder";

const form = document.forms.updateProfile;

form.addEventListener("submit", onUpdateProfile);

authGuard();
readProfile();
updatePlaceholder();
