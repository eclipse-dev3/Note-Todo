function parseDateSafe(dateString) {
    if (!dateString) return null;

    // If dateString is already a Date object, return it
    if (dateString instanceof Date) return dateString;

    // Remove any commas
    dateString = dateString.replace(/,/g, '');

    // Handle MM/DD/YYYY format
    const usFormat = /^(\d{1,2})\/(\d{1,2})\/(\d{4})[ T]?(\d{1,2}:\d{2}:\d{2} ?[APMapm]{2})?$/;
    const match = dateString.match(usFormat);
    if (match) {
        const month = match[1].padStart(2, '0');
        const day = match[2].padStart(2, '0');
        const year = match[3];
        let isoString = `${year}-${month}-${day}`;
        if (match[4]) {
            // Convert time to 24-hour format
            let time = match[4].replace(/ /g, '');
            const ampmMatch = time.match(/([APMapm]{2})$/);
            let hour = time.split(':')[0];
            let min = time.split(':')[1];
            let sec = time.split(':')[2].replace(/[APMapm]{2}/, '');
            if (ampmMatch) {
                let ampm = ampmMatch[1].toUpperCase();
                hour = parseInt(hour, 10);
                if (ampm === 'PM' && hour < 12) hour += 12;
                if (ampm === 'AM' && hour === 12) hour = 0;
            }
            time = `${hour.toString().padStart(2, '0')}:${min}:${sec}`;
            isoString += 'T' + time;
        } else {
            isoString += 'T00:00:00';
        }
        dateString = isoString;
    }

    // Handle ISO with AM/PM (like your error)
    const isoAmPm = /^(\d{4}-\d{2}-\d{2})T(\d{1,2}):(\d{2}):(\d{2}) ([APMapm]{2})$/;
    const isoMatch = dateString.match(isoAmPm);
    if (isoMatch) {
        let [_, ymd, hour, min, sec, ampm] = isoMatch;
        hour = parseInt(hour, 10);
        ampm = ampm.toUpperCase();
        if (ampm === 'PM' && hour < 12) hour += 12;
        if (ampm === 'AM' && hour === 12) hour = 0;
        dateString = `${ymd}T${hour.toString().padStart(2, '0')}:${min}:${sec}`;
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