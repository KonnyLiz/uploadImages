import { Directive, EventEmitter, HostListener, Output } from '@angular/core';
// eventemmiter es para escuchar los eventos en el padre
// elementref es para mantener comunicacion con el elemento html que contiene la directiva
// hostlistener crea eventos para cuando algo suceda ejm click o mouse encima
// input para escuchar informacion del padre
// output para emitir info al padre

@Directive({
  selector: '[appNgDrpoFiles]'
})
export class NgDropFilesDirective {
  
  // emitimos un booleano que dira si el mause esta con un archivo sobe el div
  @Output() mouseOn: EventEmitter<boolean> = new EventEmitter();

  constructor() { }

  // escuchamos cuando se emita el evento de pasar sobre el area arrastrando algo
  // le informamos al padre con output
  @HostListener('dragover', ['$event'])
  public onDragOver(event: any) {

    // indicamos que el mouse esta sobre el elemento
    this.mouseOn.emit(true);
  }

  @HostListener('dragleave', ['$event'])
  public onDragLeave(event: any) {

    // indicamos que el mouse se va del elemento
    this.mouseOn.emit(false);
  }

  // validaciones
  

}
