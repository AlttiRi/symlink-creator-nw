import fs from "/node-fs.js";
import path from "/node-path.js";

export async function createSymlink({
    destinationDirPath,
    symlinkName,
    targetFullPath,
}) {
    console.log("createSymlink", {
        destinationDirPath,
        symlinkName,
        targetFullPath,
    });
    console.log(await fs.stat(targetFullPath));

    const symlinkFullPath = path.join(destinationDirPath, symlinkName);
    const targetRelPath = path.relative(destinationDirPath, targetFullPath);
    console.log({symlinkFullPath, targetRelPath});

    await fs.symlink(targetRelPath, symlinkFullPath);
}
