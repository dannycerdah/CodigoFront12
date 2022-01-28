 function ejerciciosdos(){
let notas =[0,0,0,0];
notas[0] = Number(prompt("Ingresar primera nota"));
notas[1] = Number(prompt("Ingresar segunda nota"))
notas[2] = Number(prompt("Ingresar tercera nota"));
notas[3] = Number(prompt("Ingresar cuarta nota"));
 
 let suma=notas[0]+notas[1]+notas[2]+notas[3];
 let promedio = suma / notas.length;
console.log("El promedio de las notas es", promedio );

 }

 function rectangulo() {
    let base =   Number(prompt("Ingresar base"));
    let altura =   Number(prompt("Ingresar altura"));
   
    console.log("el area del rectangulo es ", base * altura );
   }
    

function triangulo() {
 let base =   Number(prompt("Ingresar base"));
 let altura =   Number(prompt("Ingresar altura"));

 console.log("el area del triangulo es ", base * altura /2 );
}

function circumferencia() {
    let radio =   Number(prompt("Ingresar radio"));
   
   
    console.log("el area del circumferencia es ", Math.PI * Math.pow(radio,2));
   }
   circumferencia();