import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'mkjTextTransform'
})
export class MkjTextTransformPipe implements PipeTransform {

    transform(text: string): string {
        if (text && text.length) {
            let textArr = text.split(' ');
            for (var i = 0; i < textArr.length; i++) {
                textArr[i] = textArr[i].charAt(0).toUpperCase() + textArr[i].slice(1);

            }
            text = textArr.join(' ');
            return text.replace(/ue/g, 'ü').replace(/ae/g, 'ä').replace(/oe/g, 'ö');
        }
        else return '';
    }

}
