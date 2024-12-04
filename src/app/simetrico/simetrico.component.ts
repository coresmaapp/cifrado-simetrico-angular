import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule, FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';

import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-simetrico',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './simetrico.component.html',
  styleUrl: './simetrico.component.css'
})
export class SimetricoComponent {

  public formControlCifrar: FormGroup;
  public formControlDescifrar: FormGroup;

  public stringCifrado: string = ""
  public stringDescifrado: string = ""

  constructor(
    private formBuilder: FormBuilder
  ) {
    this.formControlCifrar = this.formBuilder.group({
      key: ['', [Validators.required]],
      string: ['', [Validators.required]],
    })

    this.formControlDescifrar = this.formBuilder.group({
      key: ['', [Validators.required]],
      string: ['', [Validators.required]],
    })
  }

  cifrar(): void {
    if (this.formControlCifrar.valid) {
      console.log("Ciframos");


      let secretKey = this.formControlCifrar.value.key
      let string = this.formControlCifrar.value.string

      console.log(secretKey);
      console.log(string);

      this.stringCifrado = CryptoJS.AES.encrypt(string, secretKey).toString();
      
      
    }
  }

  descifrar(): void {
    if (this.formControlDescifrar.valid) {
      console.log("Desciframos");

      let secretKey = this.formControlDescifrar.value.key
      let string = this.formControlDescifrar.value.string

      console.log(secretKey);
      console.log(string);

      const bytes = CryptoJS.AES.decrypt(string, secretKey);
      this.stringDescifrado = bytes.toString(CryptoJS.enc.Utf8);
  

      
      
    }
  }

}
