/**
 * Quick and simple implementation.
 * @param {String} filename
 * @return {String}
 */
export function windowsFilename(filename: string): string {
    return filename
        .replaceAll("\n", "")
        .replaceAll(/[/\\|<>:"?*]+/g, "")
        .replaceAll(/^\s+/g, "")
        .replaceAll(/[.\s]+$/g, "");
}
