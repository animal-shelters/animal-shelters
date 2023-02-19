export function dateToInputFormat(date: Date): string {
    const dateArray = new Date(date).toLocaleString("en-GB").substring(0,10).split('/');
    return `${dateArray[2]}-${dateArray[1]}-${dateArray[0]}`;
}

export function stringDateToInputFormat(date: string): string {
    const dateArray = date.split('.');
    return `${dateArray[2]}-${dateArray[1]}-${dateArray[0]}`;
}
