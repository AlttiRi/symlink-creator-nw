declare enum WebFileEntryType {
    file = "file",
    folder = "folder",
}

interface IWebFileEntryOpts {
    file?: File,
    parent?: WebFileEntry,
    type: WebFileEntryType,
    name?: string
}

export declare class WebFileEntry implements Iterable<WebFileEntry> {
    public type?:     WebFileEntryType
    public file?:     File
    public parent?:   WebFileEntry
    public children?: WebFileEntry[]

    private _name:        string
    private _contentSize: number

    constructor(opts: IWebFileEntryOpts)
    get nativePath(): string | undefined
    get name(): string | undefined
    private addChild(entry: WebFileEntry)
    private increaseContentSize(size: number)
    get size(): number
    get mtime(): number
    get path(): WebFileEntry[]

    [Symbol.iterator](): Iterator<WebFileEntry>;
    flat(): WebFileEntry[]

    static flat(entries: WebFileEntry[]): WebFileEntry[]

    static fromDataTransfer(dt: DataTransfer, recursive: boolean): Promise<WebFileEntry[]>
    static fromFiles(files: File[], type?: WebFileEntryType): WebFileEntry[]
}
