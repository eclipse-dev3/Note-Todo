// Utility to safely parse a date string
function parseDateSafe(dateString) {
    if (!dateString) return null;

    // Clean up the string: remove extra spaces
    const cleanDateString = dateString.trim();

    const parsedDate = new Date(cleanDateString);

    // Check if it's a valid date
    if (isNaN(parsedDate.getTime())) {
        console.warn("⚠️ Invalid date:", dateString);
        return null;
    }

    return parsedDate;
}

// Format full date + time
export function FormatDate(dateString) {
    const date = parseDateSafe(dateString);
    if (!date) return "Invalid date";

    const options = {
        day: "numeric",
        month: "short",  // e.g., "Oct"
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
    };

    return date.toLocaleString("en-GB", options);
}

// Format only short date (day, month, year)
export function FormatDateShort(dateString) {
    const date = parseDateSafe(dateString);
    if (!date) return "Invalid date";

    const options = {
        day: "numeric",
        month: "short", // e.g., "Oct"
        year: "numeric",
    };

    return date.toLocaleDateString("en-GB", options);
}
