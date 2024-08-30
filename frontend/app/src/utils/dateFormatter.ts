

export function dayAndTimeDateFormat(date: string) {
    return (new Date(date).toLocaleString('en-US', {
        // year: 'numeric',
        // month: 'long',
        weekday: 'long',
        hour: 'numeric',
        minute: 'numeric',
        hour12: true,
    }))
}

export function monthAndDayAndTimeDateFormat(date: string) {
    return (new Date(date).toLocaleString('en-US', {
        // year: 'numeric',
        month: 'long',
        weekday: 'long',
        hour: 'numeric',
        minute: 'numeric',
        hour12: true,
    }))
}

export function    getFormattedTime(time: string) {
    const formattedTime = new Date(time).toLocaleString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
    });

    return (formattedTime);
}