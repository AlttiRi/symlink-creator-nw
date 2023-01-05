import fs   from "./node-api/node-fs.js";
import path from "./node-api/node-path.js";

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
    console.log(await fs.stat(targetFullPath));

    const symlinkFullPath = path.join(destinationDirPath, symlinkName);
    const targetRelPath = path.relative(destinationDirPath, targetFullPath);
    console.log({symlinkFullPath, targetRelPath});

    const symlinkContent = relative ? targetRelPath : targetFullPath;
    console.log(`fs.symlink("${symlinkContent}", "${symlinkFullPath}")`);
    await fs.symlink(symlinkContent, symlinkFullPath);
}
