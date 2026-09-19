/**
 * Time and Date Utilities for LearnStack
 */

export const DAYS_OF_WEEK = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

/**
 * Converts HH:mm (24h or 12h) to minutes from midnight for accurate comparison.
 */
export function timeToMinutes(timeStr) {
  if (!timeStr) return 0;
  
  // Check if format is "09:00 AM" or "1:30 PM"
  const ampmMatch = timeStr.match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/i);
  if (ampmMatch) {
    let hours = parseInt(ampmMatch[1], 10);
    const minutes = parseInt(ampmMatch[2], 10);
    const period = ampmMatch[3].toUpperCase();
    if (period === "PM" && hours < 12) hours += 12;
    if (period === "AM" && hours === 12) hours = 0;
    return hours * 60 + minutes;
  }

  // Standard "HH:mm" (24h)
  const parts = timeStr.split(":");
  if (parts.length >= 2) {
    const h = parseInt(parts[0], 10) || 0;
    const m = parseInt(parts[1], 10) || 0;
    return h * 60 + m;
  }

  return 0;
}

/**
 * Validates that endTime is strictly after startTime.
 */
export function isEndTimeAfterStartTime(startTime, endTime) {
  if (!startTime || !endTime) return false;
  return timeToMinutes(endTime) > timeToMinutes(startTime);
}

/**
 * Formats a 24-hour time "09:00" to "9:00 AM" or returns readable time string.
 */
export function formatTimeDisplay(timeStr) {
  if (!timeStr) return "";
  const totalMins = timeToMinutes(timeStr);
  const hours24 = Math.floor(totalMins / 60);
  const mins = totalMins % 60;
  const period = hours24 >= 12 ? "PM" : "AM";
  const hours12 = hours24 % 12 || 12;
  const paddedMins = mins.toString().padStart(2, "0");
  return `${hours12}:${paddedMins} ${period}`;
}

/**
 * Formats date string (YYYY-MM-DD) into readable date (e.g. "Sep 18, 2026").
 */
export function formatDateDisplay(dateStr) {
  if (!dateStr) return "";
  try {
    const parts = dateStr.split("-");
    if (parts.length === 3) {
      const year = parseInt(parts[0], 10);
      const month = parseInt(parts[1], 10) - 1;
      const day = parseInt(parts[2], 10);
      const date = new Date(year, month, day);
      return date.toLocaleDateString(undefined, {
        month: "short",
        day: "numeric",
        year: "numeric",
      });
    }
    const d = new Date(dateStr);
    return isNaN(d.getTime()) ? dateStr : d.toLocaleDateString(undefined, {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  } catch {
    return dateStr;
  }
}

/**
 * Sorts lectures chronologically by day of week then start time.
 * For dashboard upcoming lectures, prioritizes current day or upcoming days.
 */
export function sortLecturesChronologically(lectures) {
  const dayIndexMap = {
    Monday: 0,
    Tuesday: 1,
    Wednesday: 2,
    Thursday: 3,
    Friday: 4,
    Saturday: 5,
    Sunday: 6,
  };

  return [...lectures].sort((a, b) => {
    const dayDiff = (dayIndexMap[a.day] ?? 99) - (dayIndexMap[b.day] ?? 99);
    if (dayDiff !== 0) return dayDiff;
    return timeToMinutes(a.startTime) - timeToMinutes(b.startTime);
  });
}

/**
 * Gets upcoming lectures starting from today's day of week, wrapping around.
 */
export function getUpcomingLectures(lectures) {
  if (!lectures || lectures.length === 0) return [];
  
  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const todayName = days[new Date().getDay()];
  const dayIndexMap = {
    Monday: 0,
    Tuesday: 1,
    Wednesday: 2,
    Thursday: 3,
    Friday: 4,
    Saturday: 5,
    Sunday: 6,
  };
  
  const currentDayIndex = dayIndexMap[todayName] ?? 0;
  const currentMinutes = new Date().getHours() * 60 + new Date().getMinutes();

  return [...lectures].sort((a, b) => {
    const aDayIdx = dayIndexMap[a.day] ?? 0;
    const bDayIdx = dayIndexMap[b.day] ?? 0;
    
    // Relative days from today (0 to 6)
    let aOffset = (aDayIdx - currentDayIndex + 7) % 7;
    let bOffset = (bDayIdx - currentDayIndex + 7) % 7;

    // If it's today and lecture has already ended, treat as next week (+7)
    if (aOffset === 0 && timeToMinutes(a.endTime) < currentMinutes) {
      aOffset += 7;
    }
    if (bOffset === 0 && timeToMinutes(b.endTime) < currentMinutes) {
      bOffset += 7;
    }

    if (aOffset !== bOffset) return aOffset - bOffset;
    return timeToMinutes(a.startTime) - timeToMinutes(b.startTime);
  });
}
