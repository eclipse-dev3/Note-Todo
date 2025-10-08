

export function FormatDate(dateString) {
    if (!dateString) return "No date";

    const date = new Date(dateString);

    const options = {
        day: "numeric",
        month: "short", // 👈 gives 'Oct' instead of 'October'
        year: "numeric",
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
    };

    // Use `toLocaleString` for English (India or UK)
    return date.toLocaleString("en-GB", options).replace(" ", ",");
}


export function FormatDateShort(dateString) {
    if (!dateString) return "No date";

    const date = new Date(dateString);

    const options = {
        day: "numeric",
        month: "short", // Gives "Oct"
        year: "numeric",
    };

    return date.toLocaleDateString("en-GB", options).replace(",", "");
}
