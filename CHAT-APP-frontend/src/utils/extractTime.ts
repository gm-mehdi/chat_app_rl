export function extractTime(dateString: string): string {
    const date: Date = new Date(dateString);
    const hours: string = padZero(date.getHours());
    const minutes: string = padZero(date.getMinutes());
    return `${hours}:${minutes}`;
}

// Helper function to pad single-digit numbers with a leading zero
function padZero(number: number): string {
    return number.toString().padStart(2, "0");
}
