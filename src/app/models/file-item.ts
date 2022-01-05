export class FileItem {
    public archive!: File;
    public archiveName!: string;
    public url!: string;
    public isUploading!: boolean;
    public progress!: number;

    constructor (arch: File) {
        this.archive = arch;
        this.archiveName = arch.name;
        this.isUploading = false;
        this.progress = 0;
    }
}

// con el signo de admiracion podemos ignorar el error de inicializar las variables en el contructor