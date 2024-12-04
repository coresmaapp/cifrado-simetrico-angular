import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule, FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';

import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-simetricov2',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './simetricov2.component.html',
  styleUrl: './simetricov2.component.css'
})
export class Simetricov2Component {

  public formControlCifrar: FormGroup;
  public formControlDescifrar: FormGroup;

  public stringCifrado: string = ""
  public stringDescifrado: string = ""

  constructor(
    private formBuilder: FormBuilder
  ) {
    this.formControlCifrar = this.formBuilder.group({
      key: ['', [Validators.required, Validators.minLength(16), Validators.maxLength(16)]],
      string: ['', [Validators.required]],
    })

    this.formControlDescifrar = this.formBuilder.group({
      key: ['', [Validators.required, Validators.minLength(16), Validators.maxLength(16)]],
      string: ['', [Validators.required]],
    })
  }

  cifrar(): void {
    if (this.formControlCifrar.value.key.length !== 16) {
      throw new Error('La clave debe tener 16 caracteres para AES-128');
    }

    if (this.formControlCifrar.valid) {
      console.log("Ciframos");


      let secretKey = this.formControlCifrar.value.key
      let string = this.formControlCifrar.value.string

      console.log(secretKey);
      console.log(string);

      const encrypted = CryptoJS.AES.encrypt(string, CryptoJS.enc.Utf8.parse(secretKey), {
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7
      });

      this.stringCifrado = encrypted.toString();

    }
  }

  descifrar(): void {
    if (this.formControlDescifrar.value.key.length !== 16) {
      throw new Error('La clave debe tener 16 caracteres para AES-128');
    }

    if (this.formControlDescifrar.valid) {
      console.log("Desciframos");

      let secretKey = this.formControlDescifrar.value.key
      let string = this.formControlDescifrar.value.string

      try {
        // Desencriptar el mensaje en AES
        const decrypted = CryptoJS.AES.decrypt(string, CryptoJS.enc.Utf8.parse(secretKey), {
          mode: CryptoJS.mode.ECB,
          padding: CryptoJS.pad.Pkcs7,
        });

        // Convertir de texto plano
        this.stringDescifrado = decrypted.toString(CryptoJS.enc.Utf8);
        console.log(this.stringDescifrado);
        
      } catch (error) {
        throw new Error('No se pudo desencriptar el mensaje. Verifica la clave y el mensaje.');
      }
    }





  }

}
