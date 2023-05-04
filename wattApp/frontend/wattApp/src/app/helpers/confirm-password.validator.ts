import { FormGroup } from "@angular/forms";

export function confirmPasswordValidator(controlName:string, matchcontrolName:string)
{
    return (formGroup:FormGroup) =>{
        const passwordControl = formGroup.controls[controlName];
        const confirmpasswordControl = formGroup.controls[matchcontrolName];

        if(confirmpasswordControl.errors && confirmpasswordControl.errors['ConfirmPasswordValidator']){
            return; 
        }

        if(passwordControl.value != confirmpasswordControl.value)
        {
            confirmpasswordControl.setErrors({confirmPasswordValidator:true})
        }
        else{
            confirmpasswordControl.setErrors(null)
        }
    }
}