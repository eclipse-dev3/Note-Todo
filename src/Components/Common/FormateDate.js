
export function FormatDate(dateString) {
    if (!dateString) return "No date";

    const parsedDate = new Date(dateString);
    if (isNaN(parsedDate)) {
        console.warn("⚠️ Invalid date:", dateString);
        return "Invalid date";
    }

    const options = {
        day: "numeric",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
    };

    return parsedDate.toLocaleString("en-GB", options);
}

export function FormatDateShort(dateString) {
    if (!dateString) return "No date";

    const parsedDate = new Date(dateString);
    if (isNaN(parsedDate)) {
        console.warn("⚠️ Invalid date:", dateString);
        return "Invalid date";
    }

    const options = {
        day: "numeric",
        month: "short",
        year: "numeric",
    };

    return parsedDate.toLocaleDateString("en-GB", options);
}
