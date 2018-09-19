import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'primeraMayuscula'
})
export class PrimeraMayusculaPipe implements PipeTransform {

  transform(mes: string): any {
    const primera = mes.substring(0, 1).toUpperCase();
    const resto = mes.substring(1, mes.length);
    return primera + resto;
  }

}
