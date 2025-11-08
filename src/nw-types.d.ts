// --- extend d.ts --- //
declare global {
    namespace nw {
        type Callback = ((...args: any[]) => void);
        interface NwOn {
            addListener(event: string, callback: Callback);
            dispatch(event: string): void;
            dispatchNW(event: string): void;
            getListeners(event: string): Callback[];
            hasListener(callback: Callback): boolean;
            hasListeners(event: string): boolean;
            removeListener(event: string, callback: Callback): void;
        }
        interface NwBuffer {
            // ...
        }
        interface App {
            ComponentExtensions: { WIDEVINE: "WIDEVINE" };
            clearAppCache():   void;
            enableComponent(): void;
            getArgvSync():  string[];
            getDataPath():  string;
            getStartPath(): string;
            onOpen:   NwOn;
            onReopen: NwOn;
            once(event: string, callback: Callback): void;
            removeAllListeners(event: string): void;
            removeListener(event: string, callback: Callback): void;
            startPath: string;
            updateComponent(extension_id: nw.App.ComponentExtensions, callback: (success: boolean) => void): void;
        }

        /** "C:\\dev\\nwjs-app" */
        const __dirname:  string;

        /** "C:\\dev\\nwjs-app/index.html" */
        const __filename: string;

        const Buffer: NwBuffer;

        const process: {
            __nwjs: 1;
        } & NodeJS.Process
    }
}
export = nw;
export as namespace nw;


/*// --- //
let props = "";
for(const prop of Object.getOwnPropertyNames(nw.App).sort()) {
    props += `console.log(nw.App.${prop});\n`;
}
console.log(props)
// --- //*/

// --- new d.ts --- //

// declare global {
//     const nww: {
//         App: {
//             doSomething: function,
//             // ...
//         };
//     };
// }
//
// export = nww;
// export as namespace nww;
