#pragma strict

private var dialogosActivos : boolean;
private var enOpcion: boolean = false;
private var conversacionActual : ArbolConversacion;
private var conversacionTrabajadoreTercoTubo1 : ArbolConversacion;
private var conversacionTrabajadoreTercoTubo2 : ArbolConversacion;
private var conversacionTrabajadoreTercoTubo3 : ArbolConversacion;
private var conversacionTrabajadoreTercoLlave1 : ArbolConversacion;
private var conversacionTrabajadoreTercoLlave2 : ArbolConversacion;
private var conversacionTrabajadoreTercoLlave3 : ArbolConversacion;
private var conversacionTrabajadoreTercoConserje1 : ArbolConversacion;
private var conversacionTrabajadoreTercoConserje2 : ArbolConversacion;
private var conversacionTrabajadoreTercoConserje3 : ArbolConversacion;
private var conversacionTrabajadoreTercoOtro2 : ArbolConversacion;
private var conversacionTrabajadoresAtrapados : ArbolConversacion;
private var conversacionBarricadaPuertaJefe1 : ArbolConversacion;
private var conversacionBarricadaPuertaJefe2 : ArbolConversacion;
private var conversacionBarricadaPuertaJefe3 : ArbolConversacion;
private var conversacionTrabajadorTubos : ArbolConversacion;
private var conversacionArmarioTubos1 : ArbolConversacion;
private var conversacionArmarioTubos2 : ArbolConversacion;
private var conversacionArmarioTubos3 : ArbolConversacion;
private var conversacionArmarioTubos4 : ArbolConversacion;
private var conversacionRejaJefe1 : ArbolConversacion;
private var conversacionRejaJefe2 : ArbolConversacion;
private var conversacionRejaJefe3 : ArbolConversacion;
private var conversacionArmariosSeguetas1 : ArbolConversacion;
private var conversacionArmariosSeguetas2 : ArbolConversacion;
private var conversacionArmariosFusibles : ArbolConversacion;
private var conversacionPuertaJefe1 : ArbolConversacion;
private var conversacionPuertaJefeMario : ArbolConversacion;
private var conversacionPuertaJefe2 : ArbolConversacion;
private var conversacionCajaFuerteMario : ArbolConversacion;
private var conversacionJefe : ArbolConversacion;
private var conversacionTrabajadorEnPeligroLLamas : ArbolConversacion;
private var conversacionTrabajadorEnPeligroLLamasUsarExtintor : ArbolConversacion;
private var conversacionTrabajadorEnPeligroLLamasCurarConDiana : ArbolConversacion;
private var conversacionTrabajadorEnPeligroLLamasCurarSinDiana : ArbolConversacion;
private var conversacionTrabajadorEnPeligroLLamasCurarSinBotiquin : ArbolConversacion;
private var conversacionTrabajadorEnPeligroLLamasBotiquinLocker : ArbolConversacion;
private var conversacionTrabajadorEnPeligroLLamasBotiquinLockerNoFran : ArbolConversacion;
private var conversacionTrabajadorEnPeligroHerida : ArbolConversacion;
private var conversacionTrabajadorEnPeligroHeridaDiana : ArbolConversacion;
private var conversacionTrabajadorEnPeligroHeridaToalla : ArbolConversacion;
private var conversacionToallaArmario1 : ArbolConversacion;
private var conversacionToallaArmario2 : ArbolConversacion;
//private var conversacionTrabajadorEnPeligroHeridaToalla : ArbolConversacion;
private var conversacionTrabajadorEnPeligroDesmayado : ArbolConversacion;
private var conversacionTrabajadorEnPeligroDesmayadoMario : ArbolConversacion;
private var conversacionFransiscoLockerInhalador : ArbolConversacion;
private var conversacionNoFransiscoLockerInhalador : ArbolConversacion;
private var conversacionSalidaJefe : ArbolConversacion;
private var conversacionSalidaTrabajadores : ArbolConversacion;
private var conversacionSalidaNadie : ArbolConversacion;


private var ventana : Rect = Rect(0,(Screen.height/2)+50, Screen.width,(Screen.height/3));
private var textoActivo: String;
private var textoOpcion1: String;
private var textoOpcion2: String;
private var textoOpcion3: String;

private var texturaActual1 : Texture2D;
private var texturaActual2 : Texture2D;


//Conexión con el LevelManager
var manager : GameObject;


var customSkin: GUISkin;
var texturaDiana : Texture2D;
var texturaDario: Texture2D;
var texturaMario: Texture2D;
var texturaFrancisco: Texture2D;


var texturaDianaSombreada : Texture2D;
var texturaDarioSombreada: Texture2D;
var texturaMarioSombreada: Texture2D;
var texturaFranciscoSombreada: Texture2D;




public static final var CONVERSACION_TRABAJADOR_TUBO_NORMAL  :int= 0;
public static final var CONVERSACION_TRABAJADOR_TUBO_DESPUES_BRRICADA :int = 1;
public static final var CONVERSACION_TRABAJADOR_TUBO_LIBERADA :int = 2;
public static final var CONVERSACION_TRABAJADOR_LLAVE_NORMAL : int = 3;
public static final var CONVERSACION_TRABAJADOR_LLAVE_DESPUES_PUERTA :int = 4;
public static final var CONVERSACION_TRABAJADOR_LLAVE_LIBERAD  :int= 5;
public static final var CONVERSACION_TRABAJADOR_CONSERJE_NORMAL  :int= 6;
public static final var CONVERSACION_TRABAJADOR_CONSERJE_DESPUES_CAJA  :int= 7;
public static final var CONVERSACION_TRABAJADOR_CONSERJE_LIBERADA  :int= 8;
public static final var CONVERSACION_TRABAJADOR_CONSERJE_DESPUES_PUERTA  :int= 9;
public static final var CONVERSACION_BARRICADA_PALA  :int= 10;
public static final var CONVERSACION_BARRICADA_MARIO_INFO_REMPLAZO  :int= 11;
public static final var CONVERSACION_BARRICADA_TUBO  :int= 12;
public static final var CONVERSACION_TRABAJADORES_INFO_TUBO  :int= 13;
public static final var CONVERSACION_ARMARIO_TUBO_FRANSISCO_EN_PARTY  :int= 14;
public static final var CONVERSACION_ARMARIO_TUBO_SIN_FRANSISCO  :int= 15;
public static final var CONVERSACION_ARMARIO_TUBO_FRANSISCO  :int= 16;
public static final var CONVERSACION_REJA_SIN_SEGUETA  :int= 17;
public static final var CONVERSACION_REJA_SIN_3_PERSONAS  :int= 18;
public static final var CONVERSACION_REJA_ABRIR  :int= 19;
public static final var CONVERSACION_REJA_MARIO  :int= 19;
public static final var CONVERSACION_ARMARIO_SEGUETAS_SI  :int= 20;
public static final var CONVERSACION_ARMARIO_SEGUETAS_NO  :int= 21;
public static final var CONVERSACION_ARMARIO_FUSIBLES  :int= 22;
public static final var CONVERSACION_PUERTA_JEFE_1  :int= 23;
public static final var CONVERSACION_PUERTA_JEFE_MARIO  :int= 24;
public static final var CONVERSACION_PUERTA_JEFE_2  :int= 25;
public static final var CONVERSACION_CAJA_FUERTE_MARIO  :int= 26;
public static final var CONVERSACION_JEFE  :int= 27;
public static final var CONVERSACION_PUERTA_JEFE_3  :int= 28;
public static final var CONVERSACION_TRABAJADOR_LLAMAS  :int= 29;
public static final var CONVERSACION_TRABAJADOR_LLAMAS_EXTINTOR  :int= 30;
public static final var CONVERSACION_TRABAJADOR_LLAMAS_CURAR  :int= 31;
public static final var CONVERSACION_TRABAJADOR_LLAMAS_NO_DIANA  :int= 32;
public static final var CONVERSACION_TRABAJADOR_LLAMAS_NO_BOTIQUIN  :int= 33;
public static final var CONVERSACION_BOTIQUIN_LOCKER  :int= 34;
public static final var CONVERSACION_BOTIQUIN_LOCKER_NO_FRAN  :int= 35;
public static final var CONVERSACION_TRABAJADOR_HERIDO  :int= 36;
public static final var CONVERSACION_TRABAJADOR_HERIDO_CURAR  :int= 37;
public static final var CONVERSACION_TRABAJADOR_HERIDO_TOALLA  :int= 38;
public static final var CONVERSACION_TOALLA_FRANSISCO :int= 39;
public static final var CONVERSACION_TOALLA :int= 40;
public static final var CONVERSACION_TRABAJADOR_DESMAYADO  :int= 41;
public static final var CONVERSACION_TRABAJADOR_DESMAYADO_MARIO  :int= 42;
public static final var CONVERSACION_TRABAJADOR_DESMAYADO_DIANA  :int= 43;
public static final var CONVERSACION_INHALADOR_FRANSISCO  :int= 44;
public static final var CONVERSACION_INHALADOR_NO_FRANSISCO  :int= 45;
public static final var CONVERSACION_TRABAJADOR_DESMAYADO_INHALADOR  :int= 46;
public static final var CONVERSACION_SALIDA_JEFE  :int= 47;
public static final var CONVERSACION_SALIDA_TRABAJADORES :int= 48;
public static final var CONVERSACION_SALIDA_SOLO  :int= 49;


public static final var FLAG_TRABAJADOR_TUBO = 0;

public static final var FLAG_BARRICADA_TUBO = 1;

public static final var FLAG_REJA_SEGUETA = 2;

public static final var FLAG_BARRICADA_TUBO1 = 3;

public static final var DIALOGO_ARMARIO1 = 4;

public static final var DIALOGO_ARMARIO2 = 5;



// ================================================================================
// OnCreate
// ================================================================================

function Start(){

 
}


// ================================================================================
// OnGui
// ================================================================================

function OnGUI () {
var pausa : boolean = GetComponent(MenuManager).estaPausado();


if(!pausa){
GUI.skin = customSkin;
	if(dialogosActivos){
		ventana = GUI.Window(0,ventana , WindowFunction,"");
		GUI.Box(Rect(0,50,Screen.width/2,Screen.height/2),texturaActual1);
		GUI.Box(Rect(Screen.width/2,50,Screen.width/2,Screen.height/2),texturaActual2);		
	}
	
	}
}

function WindowFunction (windowID : int) {


	if(enOpcion){
	
	
	if(GUI.Button(Rect (10, 20, ventana.width, 75), textoOpcion1)){
	print("Escogio Opcion 1:");
	conversacionActual.setNodoActual(conversacionActual.getNodoActual().getHijo1());
	dibujarDialogo();
	enOpcion = false;
	textoOpcion1 = "";
	textoOpcion2 = "";
	
	}
	if(GUI.Button(Rect (10, 95, ventana.width, 75), textoOpcion2)){
		print("Escogio Opcion 2:");
	conversacionActual.setNodoActual(conversacionActual.getNodoActual().getHijo2());
	dibujarDialogo();
	enOpcion = false;
	textoOpcion1 = "";
	textoOpcion2 = "";
	}
	if(conversacionActual.getNodoActual().getHijo3()){
	
	if(GUI.Button(Rect (10, 170, ventana.width, 75), textoOpcion3)){
		print("Escogio Opcion 2:");
	conversacionActual.setNodoActual(conversacionActual.getNodoActual().getHijo3());
	dibujarDialogo();
	enOpcion = false;
	textoOpcion1 = "";
	textoOpcion2 = "";
	}
	
	
	
	}
	
	}
	else{
	GUI.Label (Rect (10, 30, ventana.width, ventana.height), textoActivo);
	}
}


// ================================================================================
// OnMouseDown
// ================================================================================
function Update(){
var pausa :boolean = GetComponent(MenuManager).estaPausado();
if(!pausa){
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
		GetComponent(MenuManager).setBotonesHabilitado(true);
		GetComponent(Player_Manager).getCurrentPlayer().getGameObject().GetComponent(MoverClick).MoverOn();
		manager.GetComponent(IEvent_manager).DialogSwitch(conversacionActual.getResultado());
		
	}
	}

}
}



// ================================================================================
// Metodos
// ================================================================================


function empezarDialogos(idConversacion:int ){
}

function dibujarDialogo(){


if(conversacionActual.getNodoActual().getQuienLinea() == 1){
texturaActual1 = conversacionActual.getTexturaPj1();
texturaActual2 = conversacionActual.getTexturaPj2Sombreada();
}
else if (conversacionActual.getNodoActual().getQuienLinea() == 2){
texturaActual1 = conversacionActual.getTexturaPj1Sombreada();
texturaActual2 = conversacionActual.getTexturaPj2();
}

textoActivo = conversacionActual.getNodoActual().getTextoLinea();



}


function dibujarOpcion(){
textoOpcion1 = conversacionActual.getNodoActual().getHijo1().getTextoLinea();
textoOpcion2 = conversacionActual.getNodoActual().getHijo2().getTextoLinea();
textoActivo = "";
if(conversacionActual.getNodoActual().getHijo3()){
	textoOpcion3 = conversacionActual.getNodoActual().getHijo3().getTextoLinea();
}


texturaActual1 = conversacionActual.getTexturaPj1();
texturaActual2 = conversacionActual.getTexturaPj2Sombreada();




}





// ================================================================================
// Inicializacion de Arboles
// ================================================================================


