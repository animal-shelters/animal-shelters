export default interface LandingPageDto {
    banner: Promise<File | undefined>;
    about: [string, string, string];
    contact: {
        name: string;
        addressFirstLine: string;
        addressSecondLine: string;
        nip: string;
        krs: string;
        email: string;
    };
}
