export type WebFileEntryType = "file" | "folder";

export interface FileWithPath extends File {
    readonly path?: string;
}

export class WebFileEntry implements Iterable<WebFileEntry> {
    readonly type:    WebFileEntryType
    readonly file:    File | FileWithPath
    readonly _name?:  string
    readonly parent?: WebFileEntry

    children?: WebFileEntry[]
    _contentSize: number

    constructor(opts: {
        type:    WebFileEntryType,
        file:    File | FileWithPath,
        name?:   string,
        parent?: WebFileEntry,
    })

    get nativePath(): string | undefined
    get name(): string
    addChild(entry: WebFileEntry): void
    increaseContentSize(size: number): void
    get size(): number
    get mtime(): number
    get path(): WebFileEntry[]

    [Symbol.iterator](): Iterator<WebFileEntry>;
    flat(): WebFileEntry[]

    static flat(entries: WebFileEntry[]): WebFileEntry[]

    static fromDataTransfer(dt: DataTransfer, recursive: boolean): Promise<WebFileEntry[]>
    static fromFiles(files: File[], type?: WebFileEntryType): WebFileEntry[]
}

declare function fromFileSystemEntry(
    fsEntry: FileSystemEntry,
    parent: WebFileEntry | null,
    recursive: boolean,
    file?: File
): Promise<WebFileEntry | null>

declare function toFile(fsFileEntry: FileSystemFileEntry): Promise<File>

declare function readFileSystemDirectoryEntry(fsDirEntry: FileSystemDirectoryEntry): AsyncGenerator<FileSystemEntry>

declare function dtItemsToFileSystemEntries(dtItems: DataTransferItem[]): Promise<FileSystemEntry[]>

declare function dtItemToFileSystemEntry(entry: DataTransferItem): Promise<FileSystemEntry>
