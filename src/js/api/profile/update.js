import * as storage from "../../utilities/storage";
import ProfileAPI from ".";

const api = new ProfileAPI();

const user = storage.load("user");

const username = user.name;

export async function updateProfile(username, { avatar, banner }) {}
