type Options = {
    templateDir: string;
};
export declare const smartyServerPlugin: ({ templateDir, }: Options) => {
    name: string;
    config(config: any): void;
};
export {};
