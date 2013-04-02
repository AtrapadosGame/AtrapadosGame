#pragma strict
private static final var NUM_DIALOGOS : int = 35; //Constante para el numero de dialogos del nivel
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
	POS_PERSONAJE_ACTUAL[0] = Screen.width/2;
	POS_PERSONAJE_ACTUAL[1] = Screen.height/2;
	POS_PERSONAJE_ACTUAL[2] = Screen.width/2 + 10;
	POS_PERSONAJE_ACTUAL[3] = Screen.height/2 + 30;
	dialogos = new String[NUM_DIALOGOS];
	fuente = new GUIStyle();
	fuente.font = myFont;
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