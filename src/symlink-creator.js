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
    console.log(symlinkFullPath);

    await fs.symlink(targetFullPath, symlinkFullPath);
}
