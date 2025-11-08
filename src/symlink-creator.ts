import {
    path, fs,
}  from "./node-api.js";

export type CSType = {
    destinationDirPath: string,
    symlinkName:        string,
    targetFullPath:     string,
    relative:           boolean,
};

export async function createSymlink({
    destinationDirPath,
    symlinkName,
    targetFullPath,
    relative,
}: CSType) {
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

export async function getZoneIdentifier(filepath: string): Promise<string> {
    try {
        const data = await fs.readFile(`${filepath}:Zone.Identifier`);
        return data.toString();
    } catch (e) {
        console.error(e);
        return Promise.resolve("");
    }
}

