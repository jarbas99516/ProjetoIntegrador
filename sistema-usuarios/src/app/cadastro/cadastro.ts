import { Component, inject} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule,FormsModule, FormControl, FormGroup, Validators } from  '@angular/forms';
import { EnderecoService } from '../services/endereco.service';

@Component({
  selector: 'app-cadastro',
  imports: [CommonModule,ReactiveFormsModule,FormsModule],
  templateUrl: './cadastro.html',
  styleUrl: './cadastro.css',
})


export class Cadastro {
  private enderecoService=inject(EnderecoService);

  nomeRegex=/^[A-Za-zÀ-ÿ]+(?:\s[A-Za-zÀ-ÿ]+)+$/;

  passwordRegex=/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&._-])[A-Za-z\d@$!%*?&._-]{8,}$/;

  emailRegex=/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

form= new FormGroup({
nome: new FormControl ('', [Validators.required,Validators.pattern(this.nomeRegex)]), //campo referente nome
email:new FormControl ('', [Validators.required,Validators.pattern(this.emailRegex)]), //campo referente email
senha:  new FormControl ('', [Validators.required ,Validators.pattern(this.passwordRegex)]), //campo referente senha
cep: new FormControl(''),
logradouro: new FormControl (''),

})

onSubmit () {

if (this.form.valid)
  console.log  ("Formulario valido: ", this.form.value );
else
  console.log("Fomulario invalido:",  this.form.value);


}
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

get buscarCep (){
 const cep = this.form.get('cep')?.value ??'';
 this.enderecoService.getEndereco(cep).subscribe(endereco=>{
  this.form.get('logradouro')?.setValue(endereco.logradouro);
 })

 return true;
}


}
