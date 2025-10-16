
function parseDateSafe(dateString) {
    if (!dateString) return null;

    // If dateString is already a Date object, return it
    if (dateString instanceof Date) return dateString;

    // If dateString matches YYYY-MM-DD format, add T00:00:00
    if (/^\d{4}-\d{2}-\d{2}$/.test(dateString)) {
        dateString = dateString + "T00:00:00";
    }

    // If dateString has space instead of T, replace it
    if (dateString.includes(' ') && !dateString.includes('T')) {
        dateString = dateString.replace(' ', 'T');
    }

    // Try parsing
    let parsedDate = new Date(dateString);

    // If invalid, try replacing '-' with '/'
    if (isNaN(parsedDate.getTime())) {
        parsedDate = new Date(dateString.replace(/-/g, '/'));
    }

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
        month: "short",
        year: "numeric",
    };

    try {
        // Use browser default locale for better compatibility
        return date.toLocaleDateString(undefined, options);
    } catch {
        // Fallback for browsers that don't support options
        return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
    }
}