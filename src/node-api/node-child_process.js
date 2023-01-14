let child_process;

if (typeof require !== "undefined") {
    child_process = require("node:child_process");
} else {
    child_process = {
        spawnSync(command, args) {
            console.log("[dummy] child_process.spawnSync:", command, args);
            return {
                error: undefined,
                stderr: {
                    toString() {
                        return "";
                    }
                },
                stdout: {
                    toString() {
                        return "[ZoneTransfer] \n" +
                            "ZoneId=3\n" +
                            "HostUrl=about:internet";
                    }
                }
            };
        }
    }
}

export default child_process;
