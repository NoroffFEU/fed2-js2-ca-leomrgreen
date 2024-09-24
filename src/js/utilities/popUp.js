export function viewUsers(user) {
  const popUp = document.createElement("div");
  const container = document.getElementById("infoContainer");

  user.forEach((u) => {
    const flexBox = document.createElement("div");
    const avatar = document.createElement("img");
    avatar.src = u.avatar.url;
    avatar.alt = u.avatar.alt;

    const username = document.createElement("span");
    username.textContent = `@${u.name}`;
    username.addEventListener("click", () => {
      window.location.href = `/user/?id=${u.name}`;
    });
    flexBox.append(avatar, username);
    popUp.append(flexBox);
    popUp.className = "follow-popup";
  });

  // Create and append the close button
  const closeBtn = document.createElement("button");
  closeBtn.textContent = "X";
  closeBtn.className = "close-btn"; // Optional: Add a class for styling
  popUp.appendChild(closeBtn); // Append the button to the popUp instead of container

  // Close the popup when the close button is clicked
  closeBtn.addEventListener("click", () => {
    popUp.remove(); // Remove the popUp from the DOM
  });

  container.append(popUp);

  return;
}
