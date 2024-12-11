export interface FileData {
    type: string;
    name: string;
    added: string;
    files?: FileData[];
}