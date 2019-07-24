//console.log("Bienvenido Ingrese palabra a Analizar");
var palabra = document.getElementById("entradaTxt");
var abc=['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
var numeros=['0','1','2','3','4','5','6','7','8','9'];
var simbolos=['#','%','$'];//simbolos permitos
var filasFinales="";//para la fila de los resultados
var areaTabla=document.getElementById('tablas');
function Analizador() {//Esta funcion determina el primer caracter leido y lo clasificara segun su tipo
    var texto = palabra.value.split("");//separacion de caracteres
    var errores=0;
    for(var i=0; i< texto.length; i++){
        errores++;
        for(var j=0; j<abc.length;j++){
            if(texto[i]===abc[j]){//Si el primer caracter leido es una letra, lo manda a la funcion Identificador
                Identificador(texto,i);
                errores=0;
                break;
            }
        }for(var k=0; k<numeros.length;k++){
            if(texto[i] === numeros[k]){//si el primer caracter leido es un numero, lo manda a la funcion Numero
                Numero(texto,i);
                errores=0;
                break;
            }
        }for(var l=0; l<simbolos.length;l++){
            if(texto[i] === simbolos[l]){//si el primer caracter leido es un numero, lo manda a la funcion simbolo
                Simbolo(texto,i);
                errores=0;
                break;
            }
        }
        break;
    }if(errores>0){//si al final de recorrer todo, no es de ningun tipo entonces error
        error();
    }
    document.getElementById('entradaTxt').value="";
}
function Identificador(palabra,posicionLetra){//recibe como parametro el texto ingresado y la ultima posicion leida
    var errores=0;//contador de errores
    for(var i=posicionLetra+1; i<palabra.length;i++){
         for(var j=0; j<abc.length;j++){
             if(palabra[i]===abc[j]){//si el caracter leido coinside con un letra, resetea el contador
                errores=0;
                break;
             }
             errores++;
             for(var k=0; k<numeros.length;k++){
                 if(palabra[i]===numeros[k]){
                    errores=0;
                    break;
                 }
                 errores++;
             }
         }if(errores>0){//si al final de recorrer la cadena abc, no encontro el valor entonces error
             break;
         }
    }
   manejadorTipo(errores,"Identificador");
}
function Numero(cadena,posicionLetra){//funcion si es un simbolo
    var errores=0;
    for(var i=posicionLetra+1;i<cadena.length;i++){
        for(var j=0; j<numeros.length;j++){
            if(cadena[i]===numeros[j]){//si el caracter leido coinside con un numero, resetea el contador
                errores=0;
                break;
            }else{
                errores++;
            }
        }if(errores>0){//si al final de recorrer la cadena numero, no encontro el valor entonces error
            break;
        }
    }
   manejadorTipo(errores,"Numero");
}
function Simbolo(cadena,posicionLetra){//funcion si es un simbolo
    var errores=0;
    for(var i=posicionLetra+1;i<cadena.length;i++){
        for(var j=0; j<simbolos.length;j++){
            if(cadena[i]===simbolos[j]){//si el caracter leido coinside con un simbolo, resetea el contador
                errores=0;
                break;
            }else{//de lo contrario se suma
                errores++;
            }
        }if(errores>0){//si al final de recorrer la cadena simbolo, no encontro el valor entonces error
            break;
        }
    }
    manejadorTipo(errores,"Simbolo");
}
function manejadorTipo(errores,tipo){//detecta si el valor final es un error o un tipo de Identificador
    if(errores>0){
        error();
    }else{
        document.getElementById("tablas").innerHTML="";
        filasFinales+="<tr><td>"+palabra.value+"</td><td>"+tipo+"</td></tr>";
        var escribirHtml="<h2 style='text-align:center; color:white;'>"+"Resultados"+"</h2>"+
         "<table>"+"<tr>"+"<th>"+"Texto"+"</th>"+"<th>"+"Tipo"+"</th>"+"</tr>"+filasFinales+"</table>";
        areaTabla.innerHTML+=escribirHtml;//agrega el valor a la tabla de html
    }
}
function error(){//si entra en esta funcion es porque no complio la sintaxix establecida
    console.log(palabra.value +" --> Es un error");
    document.getElementById("tablas").innerHTML="";
    filasFinales+="<tr><td style='color:red'>"+palabra.value+"</td><td style='color:red'>Error</td></tr>"; //Ingresa la fila del error a la tabla
    var escribirHtml="<h2 style='text-align:center; color:white;'>"+"Resultados"+"</h2>"+                  //la guarda en una variable
    "<table>"+"<tr>"+"<th>"+"Texto"+"</th>"+"<th>"+"Tipo"+"</th>"+"</tr>"+filasFinales+"</table>";
    areaTabla.innerHTML+=escribirHtml; //agrega el valor a la tabla de html
}
function keyPress(event){//funcion para que al darle enter analize el texto
    if (event.keyCode == 13 || event.which == 13){
        Analizador();//llamda de funcion
    }
}