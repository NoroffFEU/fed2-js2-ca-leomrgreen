import { deletePost } from "../api/post/delete";
import timeSince from "./getDate";
import ProfileAPI from "../api/profile";
import modal from "./modal";
import * as storage from "./storage";
import SocialAPI from "../api/post";
import { authGuard } from "./authGuard";
import popUp from "./popUp";
import {
  commentSVG,
  deleteSVG,
  editSVG,
  hasLikedSVG,
  likeSVG,
  verifiedSVG,
} from "./svg";

authGuard();

const api = new ProfileAPI();
const socialApi = new SocialAPI();

const user = storage.load("user");

const loggedInUser = user.name;

/**
 * Function that generates a post card with different features
 * depending on the current URL (e.g., post page, home page, profile page)
 * @param {Object} post - The post object to generate the card for
 */

export function createPostCard(post) {
  const card = document.createElement("div");
  card.className = "post-card hidden";

  const title = document.createElement("h3");
  title.textContent = post.title;

  // create and set image (or fallback to placeholder image if media is === null)
  const image = document.createElement("img");
  if (post.media && post.media.url) {
    image.src = post.media.url;
    image.alt = post.media.alt || "Image not available";
  } else {
    image.src = "/images/placeholder.jpg";
    image.alt = "Place-holder image";
  }

  const date = document.createElement("span");
  date.textContent = timeSince(post.created);

  // Create and append body and tags if on post page
  if (location.pathname === "/post/") {
    const author = document.createElement("div");
    author.className = "author-container";
    const authorName = document.createElement("span");
    authorName.innerHTML = `@${post.author.name} ${verifiedSVG}`;
    const authorAvatar = document.createElement("img");
    authorAvatar.src = post.author.avatar.url;
    authorAvatar.alt = post.author.avatar.alt;

    author.addEventListener("click", () => {
      if (post.author.name === loggedInUser) {
        window.location.href = "/profile/";
      } else {
        window.location.href = `/user/?id=${post.author.name}`;
      }
    });

    const likeButton = document.createElement("span");

    likeButton.className = "like-btn";
    likeButton.addEventListener("click", async () => {
      await socialApi.post.like(post.id, "👍");
    });

    // check if user already has liked the post, and if true, change the svg to a heart-fill
    const userHasReacted = post.reactions.some(
      (reaction) =>
        Array.isArray(reaction.reactors) &&
        reaction.reactors.includes(loggedInUser)
    );

    if (userHasReacted) {
      likeButton.innerHTML = `${hasLikedSVG}${post._count.reactions} `;
    } else {
      likeButton.innerHTML = `${likeSVG}${post._count.reactions} `;
    }

    author.append(authorAvatar, authorName);

    const body = document.createElement("p");
    body.textContent = post.body;

    const tags = document.createElement("ul");
    tags.className = "tags";

    post.tags.forEach((tag) => {
      const li = document.createElement("li");
      li.textContent = `#${tag}`;
      tags.appendChild(li);
    });

    const commentSection = document.getElementById("comment-container");

    if (commentSection) {
      post.comments.sort((a, b) => new Date(a.created) - new Date(b.created));

      post.comments.forEach((comment) => {
        const commentSpan = document.createElement("span");
        commentSpan.className = "comment";
        const commentAuthor = document.createElement("img");
        commentAuthor.src = comment.author.avatar.url;
        commentAuthor.alt = comment.author.avatar.alt;

        const commentName = document.createElement("span");
        commentName.textContent = `@${comment.author.name}`;
        commentName.className = "comment-name";

        const commentBody = document.createElement("p");
        commentBody.textContent = comment.body;

        const commentDate = document.createElement("span");
        commentDate.textContent = timeSince(comment.created);

        const commentHeading = document.createElement("span");
        commentHeading.className = "comment-heading";

        commentHeading.addEventListener("click", () => {
          if (comment.author.name != loggedInUser) {
            window.location.href = `/user/?id=${comment.author.name}`;
          } else {
            window.location.href = "/profile/";
          }
        });

        commentHeading.append(commentAuthor, commentName, commentDate);

        commentSpan.append(commentHeading, commentBody);
        commentSection.appendChild(commentSpan);
      });
    }

    // Append body and tags after the image
    card.append(author, image, title, body, tags, date, likeButton);
  } else {
    // Append image, title, and date for other pages
    card.append(image, title, date);
  }

  // Add event listener for homepage and user page
  if (location.pathname === "/" || location.pathname === "/user/") {
    card.addEventListener("click", () => {
      window.location.href = `/post/?id=${post.id}`;
    });
    card.style.cursor = "pointer";
  }

  if (location.pathname === "/" || location.pathname === "/post/") {
    const comments = document.createElement("span");
    comments.className = "comments";
    comments.id = "commentBtn";
    comments.innerHTML = `${commentSVG} <span> ${post.comments.length} </span>`;

    card.append(comments);
  }

  if (location.pathname === "/") {
    const likeButton = document.createElement("span");

    likeButton.className = "like-btn";

    // check if user already has liked the post, and if true, change the svg to a heart-fill
    const userHasReacted = post.reactions.some(
      (reaction) =>
        Array.isArray(reaction.reactors) &&
        reaction.reactors.includes(loggedInUser)
    );

    if (userHasReacted) {
      likeButton.innerHTML = `${hasLikedSVG}${post._count.reactions} `;
    } else {
      likeButton.innerHTML = `${likeSVG}${post._count.reactions} `;
    }

    card.append(likeButton);
  }

  // Add delete and edit buttons if on profile page
  if (location.pathname === "/profile/") {
    const deleteBtn = document.createElement("button");
    deleteBtn.innerHTML = `Delete ${deleteSVG}`;
    deleteBtn.className = "destructive";
    deleteBtn.addEventListener("click", () => {
      const isConfirmed = confirm("Are you sure you want to delete this post?");
      if (isConfirmed) {
        deletePost(post.id);
      }
    });

    const editBtn = document.createElement("button");
    editBtn.innerHTML = `Edit ${editSVG} `;
    editBtn.className = "edit-btn";
    editBtn.addEventListener("click", () => {
      window.location.href = `/post/edit/?id=${post.id}`;
    });

    card.append(deleteBtn, editBtn);
  }

  return card;
}

export function createProfileCard(profile) {
  const container = document.getElementById("profileContainer");
  const avatarContainer = document.createElement("div");
  avatarContainer.className = "avatar-container";
  const numbers = document.createElement("div");
  numbers.className = "info-container";
  numbers.id = "infoContainer";

  const infoContainer = document.createElement("div");
  infoContainer.className = "extras";

  const profileImage = document.createElement("img");
  profileImage.src = profile.avatar.url;
  profileImage.alt = profile.avatar.alt;

  const profileName = document.createElement("span");
  profileName.textContent = `@${profile.name}`;

  const totalPosts = document.createElement("span");
  totalPosts.textContent = `${profile._count.posts} posts`;

  const followers = document.createElement("span");
  followers.className = "cursor"; // styling
  followers.textContent = `${profile._count.followers} followers`;
  followers.addEventListener("click", () => {
    popUp(profile.followers);
  });

  const following = document.createElement("span");
  following.className = "cursor"; // styling
  following.textContent = `${profile._count.following} following`;
  following.addEventListener("click", () => {
    popUp(profile.following);
  });

  avatarContainer.append(profileImage, profileName);
  numbers.append(totalPosts, followers, following);

  // Kontrollera om vi är på profil-sidan och append editButton
  if (location.pathname === "/profile/") {
    const editButton = document.createElement("button");
    editButton.className = "outline";
    editButton.id = "editProfile";
    editButton.textContent = "Edit profile";
    editButton.addEventListener("click", () => {
      modal();
    });

    // Append editButton efter numbers
    infoContainer.append(numbers, editButton);
  }

  if (location.pathname === "/user/") {
    const followBtn = document.createElement("button");
    const isFollowing = profile.followers.some(
      (follower) => follower.name === loggedInUser
    );
    if (!isFollowing) {
      followBtn.className = "primary";
      followBtn.textContent = "Follow +";
      followBtn.addEventListener("click", async () => {
        await api.profile.follow(profile.name);
        window.location.reload();
      });
    } else {
      followBtn.className = "following";
      followBtn.textContent = "Following";
      followBtn.addEventListener("click", async () => {
        await api.profile.unfollow(profile.name);
        window.location.reload();
      });
    }

    infoContainer.append(numbers, followBtn);
  }

  container.append(avatarContainer, infoContainer);
}
