#pragma strict
private static final var NUM_DIALOGOS : int = 39; //Constante para el numero de dialogos del nivel
// Constantes para los globos de dialogo
public static final var GLOBO_DIALOGO : int = 1;
public static final var GLOBO_PENSAMIENTO : int = 2;
public static final var GLOBO_DIALOGO_OPUESTO : int = 3;
public static final var GLOBO_DIALOGO_INVERSO : int = 4;
public static final var CUADRO_TEXTO : int = 5;
public static final var POS_PERSONAJE_ACTUAL : int[] = new int[4];

private var dialogos : String[]; //Arreglo de dialogos
// Flags para mostrar los globos de dialogo
private var gd : boolean = false;//Globo de dialogo
private var gp : boolean = false;//Globo de pensamiento
private var gdOp : boolean = false;//Globo de dialogo opuesto
private var gdIn : boolean = false;//Globo de dialogo inverso
private var ct : boolean = false;//Cuadro de texto
//Variables que modelan la posición del globo actual con su texto
private var textoActual : String;
private var posX : int; // Posicion del globo
private var posY : int;
private var textoX : int;// Posición del texto
private var textoY : int;
private var globoActual : int;
private var fuente : GUIStyle;// Fuente del texto

// Texturas GUI
var globoPens : Texture2D;
var globoDial : Texture2D;
var globoDialOp : Texture2D;
var globoDialIn : Texture2D;
var cuadroTxt : Texture2D;
var myFont : Font;

// Inicializa el arreglo con los dialogos del nivel
function Start () {
	POS_PERSONAJE_ACTUAL[0] = Screen.width/2 + 30;
	POS_PERSONAJE_ACTUAL[1] = Screen.height/2 - 250;
	POS_PERSONAJE_ACTUAL[2] = Screen.width/2 + 40;
	POS_PERSONAJE_ACTUAL[3] = Screen.height/2 - 220;
	dialogos = new String[NUM_DIALOGOS];
	fuente = new GUIStyle();
	fuente.font = myFont;
	dialogos[0] = "¡El hospital se está\n derrumbando, hay que\n salir pronto de aquí!";
	dialogos[1] = "¡Esta cerrada,\n debe haber una llave\n para abrir la puerta!";
	dialogos[2] = "¡Aquí debe estar\n la llave de la puerta!";
	dialogos[3] = "¡Esta debe ser!";
	dialogos[4] = "AUXILIOOOOOO";
	dialogos[5] = "¡No puedo ayudar\n a esta persona, no puedo\n levantar los escombros!";
	dialogos[6] = "¡Aquí hay alguien\n atrapado, seguramente\n Fabio podrá ayudar!";
	dialogos[7] = "AYUDENMEEEEEE";
	dialogos[8] = "¡Hay una chica\n bajo este armario!\n ¡Pero no puedo moverlo!";
	dialogos[9] = "¡Aquí hay alguien\n atrapado, seguramente Fabio\n podrá ayudar!";
	dialogos[10] = "¡Señor!\n  ¿Se encuentra bien?";
	dialogos[11] = "Si doctor,\n estoy bien…";
	dialogos[12] = "¡Otro derrumbe!\n ¿Ahora que hacemos?";
	dialogos[13] = "No se preocupe Doctor,\n Yo puedo mover eso…";
	dialogos[14] = "¡FABIO SE HA UNIDO\n A TU GRUPO!";
	dialogos[15] = "Listo, ya podemos salir.";
	dialogos[16] = "¡Pero hay\n más personas, debemos\n ir por ellas!";
	dialogos[17] = "Listo";
	dialogos[18] = "¡Encontramos el botiquín!\n Ya podemos continuar.";
	dialogos[19] = "¡Gracias. Creí que\n iba a morir! Pero me\nduele mucho la\npierna…";
	dialogos[20] = "¡Gracias por ayudarme!\n Hay gente herida,\n deberíamos buscar\n un botiquín.";
	dialogos[21] = "¡Ya esta!\n Ya podemos irnos.";
	dialogos[22] = "¡Es la salida!\n Pero no, aun hay\n gente atrapada.";
	dialogos[23] = "Obvio, el ascensor no\n funciona. Hay que buscar\n otra salida.";
	dialogos[24] = "¡No podremos salir\n por aquí, hay que buscar\n otra salida!";
	dialogos[25] = "¡Esta es una escalera de\n incendios pero la\n chapa esta rota!";
	dialogos[26] = "¡Cristina puede\ntrepar por esa\n ventanilla y abrirla\n desde el otro lado!";
	dialogos[27] = "Puedo usar la\n llave que encontré\n para abrir la puerta";
	dialogos[28] = "Fabio dijo que él\n podia mover esto.";
	dialogos[29] = "Un botiquin,\n podria llegar a ser útil";
	dialogos[30] = "Perfecto,\n una salida.";
	dialogos[31] = "Aqui hay un\nbotiquin,Diana puede\nsacarlo.";
	dialogos[32] = "Solo las enfermeras\n pueden abrir estos\n cajones.";
	dialogos[33] = "DIANA SE HA UNIDO\n A TU GRUPO.";
	dialogos[34] = "CRISTINA SE HA UNIDO\n A TU GRUPO.";
	dialogos[35] = "Necesitamos la\n asistencia de\n una enfermera";
	dialogos[36] = "Voy a necesitar\n un botiquin";
	dialogos[37] = "¿Pero qué...?";
	dialogos[38] = "Puedo usar\n el botiquin";
}

// Dibuja el globo con su texto correspondiente controlados por lof flags
function OnGUI(){
	if(gp){
		GUI.Label (Rect (posX, posY, 200, 200), new GUIContent(globoPens));
		GUI.Label (Rect (textoX, textoY, 50, 50), textoActual,fuente);
	}
		
	if(gd){
		GUI.Label (Rect (posX, posY, 200, 200), new GUIContent(globoDial));
		GUI.Label (Rect (textoX, textoY, 50, 50), textoActual,fuente);
	}
	
	if(gdOp){
		GUI.Label (Rect (posX, posY, 200, 200), new GUIContent(globoDialOp));
		GUI.Label (Rect (textoX, textoY, 50, 50), textoActual,fuente);
	}
	
	if(gdIn){
		GUI.Label (Rect (posX, posY, 200, 200), new GUIContent(globoDialIn));
		GUI.Label (Rect (textoX, textoY, 50, 50), textoActual,fuente);
	}
	if(ct){
		GUI.Label (Rect (posX, posY, 200, 200), new GUIContent(cuadroTxt));
		GUI.Label (Rect (textoX, textoY, 30, 50), textoActual,fuente);
	}
	
}

// Muestra el dialgo en pantalla con los flags.
// numDialog = posición en el arreglo del dialogo
// tipo = Constante del globo de comic
// px y pY = posición del globo comic
// tX y tY =posción del texto
function mostrarDialogo(numDialogo : int, tipo : int, pX : int, pY : int, tX : int, tY : int){
	textoActual = dialogos[numDialogo];
	posX = pX;
	posY = pY;
	textoX = tX;
	textoY = tY;
	
	if( tipo == GLOBO_DIALOGO){
			gd = true;
			globoActual = 1;
	}
	else if (tipo == GLOBO_PENSAMIENTO){
			gp = true;
			globoActual = 2;
	}
	else if (tipo == GLOBO_DIALOGO_OPUESTO){
			gdOp = true;
			globoActual = 3;
	}
		
	else if(tipo == GLOBO_DIALOGO_INVERSO){
			gdIn = true;
			globoActual = 4;
	}
	else if(tipo == CUADRO_TEXTO){
			ct = true;
			globoActual = 5;
	}
}

function apagarDialogo(){
	if( globoActual == 1){
			gd = false;
	}
	else if( globoActual == 2){
			gp = false;
	}
	if( globoActual == 3){
			gdOp = false;
	}
		
	if( globoActual == 4){
			gdIn = false;
	}
	
	if( globoActual == 5){
			ct = false;
	}
}