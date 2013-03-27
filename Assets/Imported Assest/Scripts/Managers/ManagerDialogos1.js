#pragma strict
private static final var NUM_DIALOGOS : int = 35;
public static final var GLOBO_DIALOGO : int = 1;
public static final var GLOBO_PENSAMIENTO : int = 2;
public static final var GLOBO_DIALOGO_OPUESTO : int = 3;
public static final var GLOBO_DIALOGO_INVERSO : int = 4;

private var dialogos : String[];
private var gd : boolean = false;//Globo de dialogo
private var gp : boolean = false;//Globo de pensamiento
private var gdOp : boolean = false;//Globo de dialogo opuesto
private var gdIn : boolean = false;//Globo de dialogo inverso
private var textoActual : String;
private var posX : int;
private var posY : int;
private var globoActual : int;
private var fuente : GUIStyle;

var globoPens : Texture2D;
var globoDial : Texture2D;
var globoDialOp : Texture2D;
var globoDialIn : Texture2D;
var cuadradroTxt : Texture2D;
var myFont : Font;


function Start () {
	dialogos = new String[NUM_DIALOGOS];
	fuente = new GUIStyle();
	fuente.font = myFont;
	dialogos[0] = "¡El hospital se está\n derrumbando, hay que\n salir pronto de aquí!";
	dialogos[1] = "¡Esta cerrada,\n debe haber una llave\n para abrir la puerta!";
	dialogos[2] = "¡Aquí debe estar\n la llave de la puerta!";
	dialogos[3] = "¡Esta debe ser!";
	dialogos[4] = "AUXILIOOOOOO";
	dialogos[5] = "¡No puedo ayudar\n a esta persona, no puedo\n levantar los escombros!";
	dialogos[6] = "¡Aquí hay alguien\n atrapado, seguramente Fabio\n podrá ayudar!";
	dialogos[7] = "AYUDENMEEEEEE";
	dialogos[8] = "¡Hay una chica\n bajo este armario!\n ¡Pero no puedo moverlo!";
	dialogos[9] = "¡Aquí hay alguien\n atrapado, seguramente Fabio\n podrá ayudar!";
	dialogos[10] = "¡Señor!\n  ¿Se encuentra bien?";
	dialogos[11] = "Si doctor,\n estoy bien…";
	dialogos[12] = "¡Otro derrumbe!\n ¿Ahora que hacemos?";
	dialogos[13] = "No se preocupe Doctor,\n Yo puedo mover eso…";
	dialogos[14] = "¡FABIO SE HA UNIDO\n A TU GRUPO!";
	dialogos[15] = "Listo, ya podemos salir.";
	dialogos[16] = "¡Si, pero hay\n más personas, debemos\n ir por ellas!";
	dialogos[17] = "Listo";
	dialogos[18] = "¡Encontramos el botiquín!\n Ya podemos continuar.";
	dialogos[19] = "¡Gracias. Creí que\n iba a morir! Pero me duele\n mucho la pierna…";
	dialogos[20] = "¡Gracias por ayudarme!\n Hay gente herida,\n deberíamos buscar\n un botiquín.";
	dialogos[21] = "¡Ya esta!\n Ya podemos irnos.";
	dialogos[22] = "¡Es la salida!\n Pero no, aun hay\n gente atrapada.";
	dialogos[23] = "Obvio, el ascensor no\n funciona. Hay que buscar\n otra salida.";
	dialogos[24] = "¡No podremos salir\n por aquí, hay que buscar\n otra salida!";
	dialogos[25] = "¡Esta es una escalera de\n incendios pero la\n chapa esta rota!";
	dialogos[26] = "¡Yo puedo trepar por\n esa ventanilla y abrirla\n desde el otro lado!";
	dialogos[27] = "Puedo usar la\n llave que encontré\n para abrir la puerta";
	dialogos[28] = "Fabio dijo que él\n podia mover esto.";
	dialogos[29] = "Un botiquin,\n podria llegar a ser útil";
	dialogos[30] = "Fin del juego,\n gracias por jugar.";
	dialogos[31] = "Aqui hay un botiquin,\n Diana puede sacarlo.";
	dialogos[32] = "Solo las enfermeras\n pueden abrir estos cajones.";
	dialogos[33] = "DIANA SE HA UNIDO\n A TU GRUPO.";
	dialogos[34] = "CRISTINA SE HA UNIDO\n A TU GRUPO.";
}

function OnGUI(){
	if(gp){
		GUI.Label (Rect (posX, posY, 200, 200), new GUIContent(globoPens));
		GUI.Label (Rect (posX + 10, posY + 32, 50, 50), textoActual,fuente);
	}
		
	if(gd){
		GUI.Label (Rect (posX, posY, 200, 200), new GUIContent(globoDial));
		GUI.Label (Rect (posX + 10, posY + 32, 50, 50), textoActual,fuente);
	}
	
	if(gdOp){
		GUI.Label (Rect (posX, posY, 200, 200), new GUIContent(globoDialOp));
		GUI.Label (Rect (posX + 10, posY + 32, 50, 50), textoActual,fuente);
	}
	
	if(gdIn){
		GUI.Label (Rect (posX, posY, 200, 200), new GUIContent(globoDialIn));
		GUI.Label (Rect (posX + 10, posY + 32, 50, 50), textoActual,fuente);
	}
	
}

function mostrarDialogo(numDialogo : int, tipo : int, pX : int, pY : int){
	textoActual = dialogos[numDialogo];
	posX = pX;
	posY = pY;
	
	if( tipo == GLOBO_DIALOGO){
			print("1");
			gd = true;
			globoActual = 1;
	}
	else if (tipo == GLOBO_PENSAMIENTO){
			print("2");
			gp = true;
			globoActual = 2;
	}
	else if (tipo == GLOBO_DIALOGO_OPUESTO){
			print("3");
			gdOp = true;
			globoActual = 3;
	}
		
	else if(tipo == GLOBO_DIALOGO_INVERSO){
			print("4");
			gdIn = true;
			globoActual = 4;
	}
}

function apagarDialogo(){
	if( globoActual == 1){
			print("1");
			gd = false;
	}
	else if( globoActual == 2){
			print("2");
			gp = false;
	}
	if( globoActual == 3){
			print("3");
			gdOp = false;
	}
		
	if( globoActual == 4){
			print("4");
			gdIn = false;
	}
}