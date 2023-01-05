let path;

if (typeof require !== "undefined") {
    path = require("node:path");
} else {
    path = {
        join(...paths) {
            console.log("[dummy] path.join:", ...paths);
            return paths.join("/");
        },
        relative(from, to) {
            console.log("[dummy] path.relative:", from, to);
            return "rel:" + "../../" + to;
        }
    }
}

export default path;
