import { Directive, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { FileItem } from '../models/file-item';
// eventemmiter es para escuchar los eventos en el padre
// elementref es para mantener comunicacion con el elemento html que contiene la directiva
// hostlistener crea eventos para cuando algo suceda ejm click o mouse encima
// input para escuchar informacion del padre
// output para emitir info al padre

@Directive({
  selector: '[appNgDrpoFiles]'
})
export class NgDropFilesDirective {

  // recibimos los archivos que arrastra para validarlos
  @Input() files: FileItem[] = [];

  // emitimos un booleano que dira si el mause esta con un archivo sobe el div
  @Output() mouseOn: EventEmitter<boolean> = new EventEmitter();

  constructor() { }

  // escuchamos cuando se emita el evento de pasar sobre el area arrastrando algo
  // le informamos al padre con output
  @HostListener('dragover', ['$event'])
  public onDragOver(event: any) {

    // indicamos que el mouse esta sobre el elemento
    this.mouseOn.emit(true);

    // prevenimos que el navegador abra los archivos
    this._preventLoadInNavegator(event);
  }

  @HostListener('dragleave', ['$event'])
  public onDragLeave(event: any) {

    // indicamos que el mouse se va del elemento
    this.mouseOn.emit(false);
  }

  // escuchamos el evento de drop
  @HostListener('drop', ['$event'])
  public onDrop(event: any) {

    // obtenemos el modo de transferencia del navegador
    // aqui se guarda la info del archivo soltado
    const transfer = this._getTransfer(event);

    // si no hay transferencias nos salimos de aqui
    if (!transfer) {
      return;
    }

    // los archivos se encuentran en transfer.files
    this._extractFiles(transfer.files);

    // prevenimos que el navegador abra los archivos
    this._preventLoadInNavegator(event);

    // indicamos que el mouse ya solto el elemento
    this.mouseOn.emit(false);
  }

  // algunos navegadores usan diferentes modos de tranferencia,
  // por lo que obtendremos el modo de trabsferencia del que estamos
  private _getTransfer(event: any) {
    return event.dataTransfer ? event.dataTransfer : event.originalEvent.datatransfer;
  }

  // funcion para sacar la informacion de los archivos que cargaron
  // en el object fileList estan todos los archivos a los que le hicimos drag and drop
  private _extractFiles(fileList: FileList) {
    // console.log(fileList);

    // los archivos vienen en un objeto se sabe porque inicia con llaves {}
    // extraeremos la info del obj a un arreglo []

    // Object.getOwnPropertyNames(fileList) se usa para obtener el nombre de las propiedades 
    // para convertirlo en arreglo
    for(const property in Object.getOwnPropertyNames(fileList)){
      const fileTemp =  fileList[property];

      // verificamos si el archivo que extragimos es valido para subirlo
      if(this._fileIsValid(fileTemp)){

        // creamos un nuevo elemento de tipo fileItem y toma las propiedades y las asigna
        // segun el constructor que declaramos en el modelo FileItem.
        const newFile = new FileItem(fileTemp);

        // lo agregamos al arreglo de files a subir.
        this.files.push(newFile);
      }
    }
    console.log(this.files);
  }

  // validaciones

  // uniendo validaciones
  private _fileIsValid(file: File): boolean {
    if (!this._fileIsDropeaded(file.name) && this._isImage(file.type)) {
      return true;
    } else {
      return false;
    }
  }

  // previniendo que el navegador abra la imagen
  private _preventLoadInNavegator(event: any) {
    event.preventDefault();
    event.stopPropagation();
  }

  // revisamos si el archivo ya lo agregaron para subir
  private _fileIsDropeaded(fileName: string): boolean {
    for (const file of this.files) {
      if (file.archiveName == fileName) {
        console.log('The file ' + fileName + 'is added.');
        return true;
      }
    }
    return false;
  }

  // aceptando solo imagenes
  private _isImage(typeFile: string): boolean {
    if (typeFile === '' || typeFile === undefined) {
      return false;
    } else {
      return typeFile.startsWith('image');
      // retorna un -1 si es false 0 1 si es true
    }
  }

}
