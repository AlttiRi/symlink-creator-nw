let fs;

if (typeof require !== "undefined") {
    fs = require("node:fs/promises");
} else {
    function isSymbolicLink() {
        console.log("[dummy] isSymbolicLink");
        return false;
    }
    fs = {
        async stat(filepath) {
            console.log("[dummy] fs.stat:", filepath);
            return {
                dummy: "fs.stat",
                size: 1234567890,
                isSymbolicLink
            };
        },
        async lstat(filepath) {
            console.log("[dummy] fs.lstat:", filepath);
            return {
                dummy: "fs.lstat",
                size: 1234,
                isSymbolicLink
            };
        },
        async symlink(target, path, type = null) {
            console.log("[dummy] fs.symlink:", {target, path});
        },
        async readlink(path, options) {
            console.log("[dummy] fs.readlink:", path);
            return {
                toString() {
                    return "???$$$???";
                }
            };
        },
        async readFile(path, options) {
            console.log("[dummy] fs.readFile:", path);
            return {
                toString() {
                    return "???$$$???";
                }
            };
        },
    }
}

export default fs;
