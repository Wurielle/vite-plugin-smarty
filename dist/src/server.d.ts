type Options = {
    templateDir: string;
};
export declare const smartyServerPlugin: (options: Options) => {
    name: string;
    config(config: any): void;
};
export {};
