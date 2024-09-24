export default function timeSince(date) {
  const now = new Date();
  const postDate = new Date(date);
  const diffInMs = now - postDate; // Difference in milliseconds
  const diffInMinutes = Math.floor(diffInMs / (1000 * 60)); // Convert to minutes
  const diffInHours = Math.floor(diffInMinutes / 60); // Convert to hours

  if (diffInMinutes < 60) {
    return `${diffInMinutes} min`;
  } else if (diffInHours < 24) {
    return `${diffInHours} hrs`;
  } else if (diffInHours < 168) {
    // Less than 7 days
    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays} d`;
  } else {
    const diffInWeeks = Math.floor(diffInHours / 168);
    return `${diffInWeeks} w`;
  }
}
