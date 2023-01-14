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

export async function getZoneIdentifier(filepath) {
    try {
        const data = await fs.readFile(`${filepath}:Zone.Identifier`);
        return data.toString();
    } catch (e) {
        console.error(e);
        return null;
    }
}

