#pragma strict
private static final var NUM_DIALOGOS : int = 39; //Constante para el numero de dialogos del nivel

private var dialogos : String[]; //Arreglo de dialogos
private var arbol : ArbolDialogos; //Arbol de dialogos
private var fuente : GUIStyle;// Fuente del texto
var myFont : Font;

// Inicializa el arreglo con los dialogos del nivel
function Start () {
	arbol = new ArbolDialogos(5);
	dialogos = new String[NUM_DIALOGOS];
	fuente = new GUIStyle();
	fuente.font = myFont;
	//Conversacion Fabio
	dialogos[0] = "¿Escuchó  a los hombres?";
	dialogos[1] = "Si, está muy claro ¿no?!";
	dialogos[2] = "Yo creo que debemos subir a ayudar a esa otra gente y usted puede ser de gran ayuda.";
	dialogos[3] = "De una vez se lo digo, doctor, no cuente conmigo, yo bajo en seguida.";
	//Conversacion francisco
	dialogos[4] = "No creía que la situación fuera tan grave";
	dialogos[5] = "Lo peor es que tenemos muy poco tiempo para salvarnos.";
	dialogos[6] = "Según el muchacho hay gente arriba que necesita de nosotros, entre todos, seguro que podríamos ayudar.";
		//Opcion 1
	dialogos[7] = "Se trata de un deber humanitario, no creo que haya alternativa, ¡acompáñeme usted!";
	dialogos[8] = "Está loco, amigo, no crea que por ser doctor puede darme órdenes, yo me voy ya, usted verá lo que hace.";
		//Opcion 2
	dialogos[9] = "Acabamos de salvarnos gracias a la colaboración de todos, seguro que usted podría ayudar arriba, acompáñeme, ¿si?";
	dialogos[10] = "No doctorcito que se encarguen de eso los que saben, yo voy a salvar mi pellejo.";
		//OPcion 2A
	dialogos[11] = "No hay tiempo para pedir ayuda abajo, debemos encargarnos nosotros mismos de la ayuda a los de arriba.";
	dialogos[12] = "Haga lo que quiera, yo me largo.";
	dialogos[13] = "Por favor, acompáñeme, es una cuestión puramente humanitaria";
	dialogos[14] = "Está bien, subo, pero le advierto: si a los 5 minutos veo que la cosa no funciona, bajo a salvar mi pellejo.";
	// Conversacion Diana
	
	var raiz : NodoDialogos = new NodoDialogos(dialogos[0]);
	arbol.agregarRaiz(raiz,0);
	print(raiz.darTexto());
}

//Retorna la linea de dialogo dependiendo de la posición
function darDialogo(pos : int){
	return dialogos[pos];
}