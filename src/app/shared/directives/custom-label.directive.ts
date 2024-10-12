import { Directive, ElementRef, Input, OnInit } from '@angular/core';
import { ValidationErrors } from '@angular/forms';

@Directive({
  selector: '[customLabel]',
})
export class CustomLabelDirective implements OnInit {
  
  private htmlElement?: ElementRef<HTMLElement>
  private _color: string = "red";
  private _errors?: ValidationErrors | null = null;

  // adding this I will be able to use
  // [color] on the html elements which have the 
  // directive, customLabel
  @Input() set color(value: string) {
    this._color = value;
    this.setStyle();
  }

  // Here I will manage the errors of the inputs
  @Input() set errors(errors: ValidationErrors | null | undefined ) {
    this._errors = errors;
    this.setErrorMessage();
  }


  // this will receive the HTML ELEMENT
  constructor( private el: ElementRef<HTMLElement>) {
    this.htmlElement = el;
  }

  // to apply the first color I need to call the method on the onInit
  ngOnInit(): void {
    console.log("NG ON INIT FROM DIRECTIVE");
    this.setStyle();
  }

  // method to change the color
  setStyle():void {
    if ( !this.htmlElement ) return;
    this.htmlElement!.nativeElement.style.color = this._color;
  }

  setErrorMessage():void {
    if (!this.htmlElement ) return;
    if (!this._errors ) {
      this.htmlElement.nativeElement.innerHTML = "";
      return;
    }

    const errors = Object.keys(this._errors);

    if (errors.includes('required')) {
      this.htmlElement.nativeElement.innerHTML = "This field is required";
      return;
    }

    if (errors.includes('minlength')) {
      const currentLength = this._errors['minlength']['actualLength'];
      const minLength = this._errors['minlength']['requiredLength'];
      
      this.htmlElement.nativeElement.innerHTML = `Min number of characters ${currentLength}/${minLength}`;
      return;
    }

    if (errors.includes('email')){
      this.htmlElement.nativeElement.innerHTML = "This field must be a valid email";
      return;
    }

    this.htmlElement.nativeElement.innerHTML = "";
    
  }

}
