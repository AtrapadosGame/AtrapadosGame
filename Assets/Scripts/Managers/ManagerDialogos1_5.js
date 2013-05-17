#pragma strict

private var dialogosActivos : boolean;
private var enOpcion: boolean = false;
private var conversacionActual : ArbolConversacion;
private var conversacionDiana : ArbolConversacion;
private var conversacionFabio : ArbolConversacion;
private var conversacionFrancisco : ArbolConversacion;
private var conversacionMario : ArbolConversacion;
private var conversacionCristina : ArbolConversacion;

var texturaDiana : Texture2D;
var texturaCristina : Texture2D;
var texturaDario: Texture2D;
var texturaMario: Texture2D;
var texturaFrancisco: Texture2D;
var texturaFabio: Texture2D;

public static final var CONVERSACION_DIANA  :int= 0;
public static final var CONVERSACION_FABIO :int = 1;
public static final var CONVERSACION_DARIO :int = 2;
public static final var CONVERSACION_MARIO : int = 3;
public static final var CONVERSACION_CRISTINA :int = 4;
public static final var CONVERSACION_FRANCISCO  :int= 5;


// ================================================================================
// OnCreate
// ================================================================================

function Start(){
 print("Start");
 inicializarConversacionDiana();
 inicializarConversacionCristina();
 inicializarConversacionFabio();
 inicializarConversacionFrancisco();
 inicializarConversacionMario();
}



// ================================================================================
// OnMouseDown
// ================================================================================
function Update(){

if(dialogosActivos && Input.GetKeyDown(KeyCode.Mouse0) && !enOpcion){

	print("OnMouseDown");
		
	print("Tiene hijos?: " +conversacionActual.getNodoActual().tieneHijos());
	
	if(!conversacionActual.getNodoActual().estaTerminado()){
	print("Dialogo:");
		dibujarDialogo();
	}
	else if(conversacionActual.getNodoActual().estaTerminado()&&conversacionActual.getNodoActual().tieneHijos()){
		print("Opciones:");
		enOpcion = true;
		dibujarOpcion();
	}
	else if(conversacionActual.getNodoActual().estaTerminado() && !conversacionActual.getNodoActual().tieneHijos()){
		print("Fin dialogo");
		dialogosActivos = false;
	}
}

//ESTA EN LAS OPCIONES Y APACHURRA LA 1, como prueba se usa boton izq del mouse
else if(dialogosActivos && Input.GetKeyDown(KeyCode.Mouse0) && enOpcion){
	print("Escogio Opcion 1:");
	conversacionActual.setNodoActual(conversacionActual.getNodoActual().getHijo1());
	dibujarDialogo();
	enOpcion = false;
}

//ESTA EN LAS OPCIONES Y APACHURRA LA 2, como prueba se usa boton der del mouse
else if(dialogosActivos && Input.GetKeyDown(KeyCode.Mouse1) && enOpcion){
	print("Escogio Opcion 2:");
	conversacionActual.setNodoActual(conversacionActual.getNodoActual().getHijo2());
	dibujarDialogo();
	enOpcion = false;
}


}

// ================================================================================
// Metodos
// ================================================================================


function empezarDialogos(idConversacion:int ){
print("empezarDialogos");

switch(idConversacion){

case CONVERSACION_DIANA:

conversacionActual = conversacionDiana;



break;
case CONVERSACION_FABIO:

break;
case CONVERSACION_DARIO:

break;
case CONVERSACION_MARIO:

break;
case CONVERSACION_CRISTINA:

break;
case CONVERSACION_FRANCISCO:

break;

}

//Frezze de pantalla 
//Quitar el movimiento por medio de mouse
dialogosActivos = true;


}

function dibujarDialogo(){
print(conversacionActual.getNodoActual().getTextoLinea());

}

function dibujarOpcion(){

print(conversacionActual.getNodoActual().getHijo1().getTextoLinea());
print(conversacionActual.getNodoActual().getHijo2().getTextoLinea());
//print(conversacionActual.getNodoActual().getHijo3().getTextoLinea());
}



// ================================================================================
// Inicializacion de Arboles
// ================================================================================

function inicializarConversacionDiana(){
print("Inicializa la conversacion");
conversacionDiana = new ArbolConversacion(texturaDario,texturaDiana);

/**
* Nodo Raiz
* 
*/
var dialogos : Array = new Array();
var l: LineaDialogo = new LineaDialogo("La situación en todo el edificio parece muy delicada",1);
dialogos.Push(l);
l = new LineaDialogo("Si, lo que nos informan los dos hombres es terrible.",2);
dialogos.Push(l);
l = new LineaDialogo("Su ayuda ha sido providencial, se ve que sabe mucho para estos casos.",1);
dialogos.Push(l);
l = new LineaDialogo("Me halaga doctor, en realidad es lo que cualquier otra enfermera podría hacer.",2);
dialogos.Push(l);
l = new LineaDialogo("La verdad no lo creo, usted conoce muy bien dónde quedan los medicamentos y se ve que tiene experiencia en la atención de heridos.",1);
dialogos.Push(l);
l = new LineaDialogo("Ah, eso es porque fui enfermera jefe durante varios años.",2);
dialogos.Push(l);
l = new LineaDialogo("¡Pero usted se ve muy joven!",1);
dialogos.Push(l);
l = new LineaDialogo("De cualquier modo, yo creo que usted debería acompañarme al piso de arriba para tratar de salvar a esa gente.",2);
dialogos.Push(l);
  
var nodoRaiz:NodoDialogo = new NodoDialogo(dialogos);

conversacionDiana.setRaiz(nodoRaiz);

/**
* Nodo Opcion 1
* 
**/
dialogos = new Array();
l = new LineaDialogo("¿Qué dice Diana, me acompaña?",1);
dialogos.Push(l);
l = new LineaDialogo("¿La verdad doc, es que estoy de acuerdo con Fabio, es mejor bajar y pedir auxilio a profesionales que ya deben estar listos para ayudar.?",2);
dialogos.Push(l);

var nodo1: NodoDialogo = new NodoDialogo(dialogos);

nodoRaiz.setHijo1(nodo1);



/**
* Nodo Opcion 2
* 
*/

dialogos = new Array();
l = new LineaDialogo("¿Debe acompañarme?",1);
dialogos.Push(l);
l = new LineaDialogo("La verdad, no sé qué decirle...",2);
dialogos.Push(l);

var nodo2: NodoDialogo = new NodoDialogo(dialogos);

nodoRaiz.setHijo2(nodo2);




/**
* Nodo Opcion 2.1
* 
*/

dialogos = new Array();
l = new LineaDialogo("Mire que usted es valiosa en estos casos, insisto en que será de gran ayuda ¿que dice?",1);
dialogos.Push(l);
l = new LineaDialogo("No doctor, mejor bajamos a pedir ayuda, somos muy pocos para tanta gente que hay arriba.",2);
dialogos.Push(l);

var nodo21 : NodoDialogo= new NodoDialogo(dialogos);

nodo2.setHijo1(nodo21);


/**
* Nodo Opcion 2.2
* 
*/

dialogos = new Array();
l = new LineaDialogo("Sé que no soy su superior, pero entonces no me queda más remedio que ordenarle como médico y en virtud de nuestro juramento que suba conmigo.",1);
dialogos.Push(l);
l = new LineaDialogo("Si lo pone en esos términos doctor, entonces que se haga lo que usted dice.",2);
dialogos.Push(l);

var nodo22: NodoDialogo = new NodoDialogo(dialogos);

nodo2.setHijo2(nodo22);


}




function inicializarConversacionFabio(){

}

function inicializarConversacionFrancisco(){

}

function inicializarConversacionMario(){

}

function inicializarConversacionCristina(){

}



