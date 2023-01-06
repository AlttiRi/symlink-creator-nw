export const isNW: boolean = typeof nw !== "undefined" && nw["process"]?.["__nwjs"] === 1;

if (isNW) {
    if (typeof process !== "undefined" && process.versions?.["nw-flavor"] === "sdk") {
        nw.Window.get().showDevTools();
    }
}
