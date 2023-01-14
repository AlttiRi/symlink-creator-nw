import fs    from "./node-api/node-fs.js";
import path  from "./node-api/node-path.js";
import ch_pr from "./node-api/node-child_process.js";

export async function createSymlink({
    destinationDirPath,
    symlinkName,
    targetFullPath,
    relative,
}) {
    console.log("createSymlink", {
        destinationDirPath,
        symlinkName,
        targetFullPath,
        relative,
    });

    const symlinkFullPath = path.join(destinationDirPath, symlinkName);
    const targetRelPath = path.relative(destinationDirPath, targetFullPath) || ".";
    console.log({symlinkFullPath, targetRelPath});

    const symlinkContent = relative ? targetRelPath : targetFullPath;
    console.log(`fs.symlink("${symlinkContent}", "${symlinkFullPath}")`);
    await fs.symlink(symlinkContent, symlinkFullPath);
}

export function getZoneIdentifier(file) {
    const child = ch_pr.spawnSync("cmd", ["/c", "more", "<", `${file}:Zone.Identifier`]);
    const error = child.error || child.stderr?.toString();
    if (error) {
        console.error("error", error);
        throw error;
    }
    return child.stdout?.toString();
}

