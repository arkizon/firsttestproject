import {Validators, NG_VALIDATORS, AbstractControl} from "@angular/forms"
import { Directive, Input } from '@angular/core';

@Directive({
    selector: '[passwordConfirmValidator]',
    providers:[{
        provide: NG_VALIDATORS,
        useExisting: confirmValidatorDirective,
        multi: true
    }]
})
export class confirmValidatorDirective implements Validators {
    @Input() passwordConfirmValidator: string;
    validate(control:AbstractControl): {[key: string]: any} |  null{
     const controlToCompare = control.parent.get(this.passwordConfirmValidator)
     if(controlToCompare && controlToCompare.value !== control.value){
         return {'notEqual': true}
     }
     return null
    }

}