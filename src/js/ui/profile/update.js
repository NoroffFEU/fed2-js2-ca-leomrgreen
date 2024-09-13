import * as storage from "../../utilities/storage";
import ProfileAPI from "../../api/profile/index";
import updatePlaceholder from "../../utilities/custom-placeholder";

const api = new ProfileAPI();
const user = storage.load("user");
const username = user.name;

export async function onUpdateProfile(e) {
  e.preventDefault();

  const formData = new FormData(e.target);

  const bio = formData.get("bio");
  const avatarUrl = formData.get("avatar-url");
  const avatarAlt = formData.get("avatar-alt");

  // Create the update object
  const updateData = { bio };

  // Only add avatar if the URL is provided
  if (avatarUrl) {
    updateData.avatar = {
      url: avatarUrl,
      alt: avatarAlt || "", // Fallback to empty string if alt is not provided
    };
  }

  try {
    await api.profile.update(username, updateData);
    alert("Profile has been updated");
    window.location.reload();
  } catch (error) {
    console.log("Error updating profile:", error);
  }
}
