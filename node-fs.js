let fs;

if (typeof require !== "undefined") {
    fs = require("node:fs/promises");
} else {
    fs = {
        async stat(filepath) {
            console.log("[dummy] fs.stat:", filepath);
            return {
                dummy: "fs.stat",
                size: 1234567890
            };
        },
        async symlink(target, path, type = null) {
            console.log("[dummy] fs.symlink:", target, path);
        }
    }
}

export default fs;
