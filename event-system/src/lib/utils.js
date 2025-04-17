/**
 * Format a date for display in the UI
 * @param {string|Date} date - The date to format
 * @returns {string} Formatted date string
 */
export function formatDate(date) {
  const dateObj = new Date(date);

  // Format: "April 25, 2023 • 2:30 PM"
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  }).format(dateObj);
}

/**
 * Format a date in a relative way (e.g., "3 days from now", "Yesterday")
 * @param {string|Date} date - The date to format
 * @returns {string} Relative date string
 */
export function formatRelativeDate(date) {
  const dateObj = new Date(date);
  const now = new Date();

  // Calculate the difference in days
  const diffTime = dateObj - now;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 0) {
    return "Today";
  } else if (diffDays === 1) {
    return "Tomorrow";
  } else if (diffDays === -1) {
    return "Yesterday";
  } else if (diffDays > 0 && diffDays < 7) {
    return `In ${diffDays} days`;
  } else if (diffDays < 0 && diffDays > -7) {
    return `${Math.abs(diffDays)} days ago`;
  } else {
    // Format: "Apr 25"
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
    }).format(dateObj);
  }
}

/**
 * Format event time in a simple format
 * @param {string|Date} date - The date to format
 * @returns {string} Time string (e.g., "2:30 PM")
 */
export function formatTime(date) {
  const dateObj = new Date(date);

  return new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  }).format(dateObj);
}

/**
 * Truncate text to a specified length
 * @param {string} text - The text to truncate
 * @param {number} length - Maximum length
 * @returns {string} Truncated text
 */
export function truncateText(text, length = 100) {
  if (!text || text.length <= length) return text;
  return text.slice(0, length) + "...";
}
