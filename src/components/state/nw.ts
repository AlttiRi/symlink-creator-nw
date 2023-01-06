export const isNW: boolean = typeof nw !== "undefined" && nw["process"]?.["__nwjs"] === 1;
export const isNwSdk: boolean = isNW && typeof process !== "undefined" && process.versions?.["nw-flavor"] === "sdk";
