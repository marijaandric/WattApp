import { Component } from '@angular/core';
import { StadardTemplateComponent } from '../../layout-components/standard-template/stadard-template.component';

import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  display: boolean = false;
  menageUserForm! : FormGroup;
  
  showDialog() {
      this.display = true;
  }
}
