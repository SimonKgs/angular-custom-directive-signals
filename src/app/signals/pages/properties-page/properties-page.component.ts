import { Component, computed, effect, OnInit, signal } from '@angular/core';
import { User } from '../../interfaces/user-request.interface';

@Component({
  selector: 'properties-page',
  templateUrl: './properties-page.component.html',
  styleUrl: './properties-page.component.css'
})
export class PropertiesPageComponent  implements OnInit{

  ngOnInit(): void {
    setInterval(() => {
      this.counter.update( current => current + 1)


      if ( this.counter() == 15) 
        this.userChangeEffect.destroy()
    }, 1000)
  }

  public counter = signal(10);

  public user = signal<User>({
    id: 2,
    email: "janet.weaver@reqres.in",
    first_name: "Janet",
    last_name: "Weaver",
    avatar: "https://reqres.in/img/faces/2-image.jpg"
  })

  public fullName = computed( () => `${this.user().first_name} ${this.user().last_name}`)

  // this is similar to useEffect in React but much better
  // this will recognise its dependencies, so only will trigger when one of them changes
  // dependencies user and counter for the example
  // will also clean itself automatically to prevent build-up 
  public userChangeEffect = effect( () => {
    console.log("User change effect triggered");
    console.log(`${this.user().first_name} - ${this.counter()}`);
  })

  

  increaseBy( value: number) {
    this.counter.update( current => current + value)
  }


  onFieldUpdated(field: keyof User, value: string) {
    // common old way
    // this.user.set({
    //   ...this.user(),
    //   [field]: value,
    // });
    // using update for signals but equal to previous
    // this.user.update( current => ({
    //   ...current,
    //   [field]: value
    // }))
    // another way for mutate the object

    this.user.update( current => {

      switch(field) {
        case 'email':
          current.email = value;
          break;  
        case 'avatar':
          current.avatar = value;
          break; 
        case 'first_name':
          current.first_name = value;
          break; 
        case 'last_name':
          current.last_name = value;
          break; 
        case 'id':
          current.id = Number(value);
          break; 
      }
      // to triggert an effect change the object is needed
      return { ...current };
    })

  }
}
