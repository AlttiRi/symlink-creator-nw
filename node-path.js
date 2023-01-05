let path;

if (typeof require !== "undefined") {
    path = require("node:path");
} else {
    path = {
        join(a, b) {
            console.log("[dummy] path.join:", a, b);
            return a + "/" + b;
        },
        relative() {

        }
    }
}

export default path;
