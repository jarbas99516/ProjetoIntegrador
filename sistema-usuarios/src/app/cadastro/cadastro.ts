import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-cadastro',
  imports: [CommonModule],
  templateUrl: './cadastro.html',
  styleUrl: './cadastro.css',
})
export class Cadastro {
regraMinimoCaractere: Boolean = false;
regraMaximocaractere: Boolean = false;
regraLetraMaiuscula: Boolean=false;
regraCaractereEspecial: boolean=false;
regraNumerosLetras: Boolean = false;

validarSenha ( senha:string):void{

  //Regex das regras

  const rxmin8= /^.{8,}$/;
  const rxMax16 = /^.{0,16}$/;
  const rxMaiuscula= /[A-Z]/;
  const rxEspecial = /[^a-zA-Z0-9]/;
  const rxNumero = /\d/;
  const rxLetra =/[A-Za-z]/;

  this.regraMinimoCaractere=rxmin8.test(senha);
  this.regraMaximocaractere=rxMax16.test(senha);
  this.regraLetraMaiuscula=rxMaiuscula.test(senha);
  this.regraCaractereEspecial=rxEspecial.test(senha);
  this.regraNumerosLetras=rxNumero.test(senha) && rxLetra.test(senha);
}


}
