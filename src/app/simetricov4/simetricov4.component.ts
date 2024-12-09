import { CommonModule, JsonPipe } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule, FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';

import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-simetricov4',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './simetricov4.component.html',
  styleUrl: './simetricov4.component.css'
})
export class Simetricov4Component {

  public formControlCifrar: FormGroup;
  public formControlDescifrar: FormGroup;

  public stringCifrado: string = ""
  public b54iv: string = ""
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
      iv: ['', [Validators.required]],
      string: ['', [Validators.required]],
    })
  }

  cifrar(): void {
    if (this.formControlCifrar.value.key.length !== 16) {
      throw new Error('La clave debe tener 16 caracteres para AES-128');
    }

    if (this.formControlCifrar.valid) {
      console.log("Ciframos");

      const iv = CryptoJS.lib.WordArray.random(16);


      let secretKey = this.formControlCifrar.value.key
      let string = this.formControlCifrar.value.string

      console.log(secretKey);
      console.log(string);

      const encrypted = CryptoJS.AES.encrypt(string, CryptoJS.enc.Utf8.parse(secretKey), {
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7,
        iv: iv,
      });

      this.stringCifrado = encrypted.toString();

      this.b54iv = iv.toString(CryptoJS.enc.Base64)
      

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
      let iv = this.formControlDescifrar.value.iv

      console.log(iv);
      

      const ivde_code = CryptoJS.enc.Base64.parse(iv);

      // try {
        // Desencriptar el mensaje en AES
        const decrypted = CryptoJS.AES.decrypt(string, CryptoJS.enc.Utf8.parse(secretKey), {
          mode: CryptoJS.mode.CBC,
          padding: CryptoJS.pad.Pkcs7,
          iv: ivde_code,
        });

        // Convertir de texto plano


        console.log();
        this.stringDescifrado = decrypted.toString(CryptoJS.enc.Utf8)

        
      // } catch (error) {
      //   throw new Error('No se pudo desencriptar el mensaje. Verifica la clave y el mensaje.');
      // }
    }





  }

}
