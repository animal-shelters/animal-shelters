export function urlToFile(url: string, fileName: string): Promise<File | undefined> {
    const fileType = url.substring(url.search(':') + 1, url.search(';'));
    return fetch(url)
        .then(res => res.blob())
        .then(blob => {
            const file = new File([blob], fileName + '.' + fileType.substring(fileType.search('/') + 1), { type: fileType });
            return file;
        })
        .catch((error) => {
            console.error(error);
            return undefined;
        });

}

export function urlToFileName(url: string) {
    let name = url.substring(url.search(';')+6);
    name = name.substring(0, name.search(';'));
    return name;
}

export function mapResponseToUrls(response: any) {
    const urls: string[] = [];
    if (response.data["hydra:member"].length == 0) {
        return [];
    }
    response.data["hydra:member"].map((member: any) => {
        urls.push(member.contentUrl);
    });
    return urls;
}
