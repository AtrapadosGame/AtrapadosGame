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
private var conversacionTrabajadoreTercoConserje4 : ArbolConversacion;
private var conversacionBarricadaPuertaJefe1 : ArbolConversacion;
private var conversacionBarricadaPuertaJefe2 : ArbolConversacion;
private var conversacionBarricadaPuertaJefe3 : ArbolConversacion;
private var conversacionBarricadaPuertaJefe4 : ArbolConversacion;
private var conversacionArmarioTubos1 : ArbolConversacion;
private var conversacionArmarioTubos2 : ArbolConversacion;
private var conversacionArmarioTubos3 : ArbolConversacion;
private var conversacionRejaJefe1 : ArbolConversacion;
private var conversacionRejaJefe2 : ArbolConversacion;
private var conversacionRejaJefe3 : ArbolConversacion;
private var conversacionRejaJefe4 : ArbolConversacion;
private var conversacionRejaMario : ArbolConversacion;
private var conversacionArmariosSeguetas1 : ArbolConversacion;
private var conversacionArmariosSeguetas2 : ArbolConversacion;
private var conversacionArmariosFusibles : ArbolConversacion;
private var conversacionPuertaJefe1 : ArbolConversacion;
private var conversacionPuertaJefeMario : ArbolConversacion;
private var conversacionPuertaJefe2 : ArbolConversacion;
private var conversacionPuertaJefe3 : ArbolConversacion;
private var conversacionCajaFuerteMario : ArbolConversacion;
private var conversacionCajaExito : ArbolConversacion;
private var conversacionJefe : ArbolConversacion;
private var conversacionTrabajadorEnPeligroLLamas : ArbolConversacion;
private var conversacionTrabajadorEnPeligroLLamasExtintor : ArbolConversacion;
private var conversacionTrabajadorEnPeligroLLamasCurar : ArbolConversacion;
private var conversacionTrabajadorEnPeligroLLamasNoDiana : ArbolConversacion;
private var conversacionTrabajadorEnPeligroLLamasNoBotiquin : ArbolConversacion;
private var conversacionTrabajadorEnPeligroLLamasDianaEnParty : ArbolConversacion;
private var conversacionBotiquinLocker : ArbolConversacion;
private var conversacionBotiquinLockerNoFrancisco : ArbolConversacion;
private var conversacionBotiquinLockerFranciscoEnParty : ArbolConversacion;
private var conversacionTrabajadorEnPeligroHerido : ArbolConversacion;
private var conversacionTrabajadorEnPeligroHeridoNoDianaNoToalla : ArbolConversacion;
private var conversacionTrabajadorEnPeligroHeridoDiana : ArbolConversacion;
private var conversacionTrabajadorEnPeligroHeridoDianaEnParty : ArbolConversacion;
private var conversacionTrabajadorEnPeligroHeridoToalla : ArbolConversacion;
private var conversacionToallaArmarioFrancisco : ArbolConversacion;
private var conversacionToallaArmarioNoFrancisco : ArbolConversacion;
private var conversacionToallaArmarioFranciscoEnParty : ArbolConversacion;
private var conversacionTrabajadorEnPeligroDesmayado : ArbolConversacion;
private var conversacionTrabajadorEnPeligroDesmayadoDiana : ArbolConversacion;
private var conversacionTrabajadorEnPeligroDesmayadoDianaEnParty : ArbolConversacion;
private var conversacionTrabajadorEnPeligroDesmayadoMario : ArbolConversacion;
private var conversacionTrabajadorEnPeligroDesmayadoInhalador : ArbolConversacion;
private var conversacionLockerInhalador : ArbolConversacion;
private var conversacionLockerInhaladorNoFrancisco : ArbolConversacion;
private var conversacionLockerInhaladorFranciscoEnParty : ArbolConversacion;
private var conversacionSalidaJefe : ArbolConversacion;
private var conversacionSalidaTrabajadores : ArbolConversacion;
private var conversacionSalidaSolo : ArbolConversacion;


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
var texturaJefe: Texture2D;
var texturaOficinista: Texture2D;

var texturaDianaSombreada : Texture2D;
var texturaDarioSombreada: Texture2D;
var texturaMarioSombreada: Texture2D;
var texturaFranciscoSombreada: Texture2D;
var texturaJefeSombreada: Texture2D;
var texturaOficinistaSombreada: Texture2D;


public static final var CONVERSACION_TRABAJADOR_TUBO_NORMAL  :int= 0;
public static final var CONVERSACION_TRABAJADOR_TUBO_DESPUES_BARRICADA :int = 1;
public static final var CONVERSACION_TRABAJADOR_TUBO_LIBERADO :int = 2;
public static final var CONVERSACION_TRABAJADOR_LLAVE_NORMAL : int = 3;
public static final var CONVERSACION_TRABAJADOR_LLAVE_DESPUES_PUERTA :int = 4;
public static final var CONVERSACION_TRABAJADOR_LLAVE_LIBERADO  :int= 5;
public static final var CONVERSACION_TRABAJADOR_CONSERJE_NORMAL  :int= 6;
public static final var CONVERSACION_TRABAJADOR_CONSERJE_DESPUES_CAJA  :int= 7;
public static final var CONVERSACION_TRABAJADOR_CONSERJE_LIBERADO  :int= 8;
public static final var CONVERSACION_TRABAJADOR_CONSERJE_DESPUES_PUERTA  :int= 9;
public static final var CONVERSACION_BARRICADA_PALA  :int= 10;
public static final var CONVERSACION_BARRICADA_MARIO  :int= 11;
public static final var CONVERSACION_BARRICADA_TUBO  :int= 12;
public static final var CONVERSACION_BARRICADA_NO_MARIO  :int= 13;
public static final var CONVERSACION_ARMARIO_TUBO_FRANCISCO_EN_PARTY  :int= 14;
public static final var CONVERSACION_ARMARIO_TUBO_SIN_FRANCISCO  :int= 15;
public static final var CONVERSACION_ARMARIO_TUBO_FRANCISCO  :int= 16;
public static final var CONVERSACION_REJA_SIN_SEGUETA  :int= 17;
public static final var CONVERSACION_REJA_SIN_3_PERSONAS  :int= 18;
public static final var CONVERSACION_REJA_ABRIR  :int= 19;
public static final var CONVERSACION_REJA_MARIO  :int= 20;
public static final var CONVERSACION_ARMARIO_SEGUETAS_SI  :int= 21;
public static final var CONVERSACION_ARMARIO_SEGUETAS_NO  :int= 22;
public static final var CONVERSACION_ARMARIO_FUSIBLES  :int= 23;
public static final var CONVERSACION_PUERTA_JEFE_1  :int= 24;
public static final var CONVERSACION_PUERTA_JEFE_MARIO  :int= 25;
public static final var CONVERSACION_PUERTA_JEFE_2  :int= 26;
public static final var CONVERSACION_CAJA_FUERTE_MARIO  :int= 27;
public static final var CONVERSACION_JEFE  :int= 28;
public static final var CONVERSACION_PUERTA_JEFE_3  :int= 29;
public static final var CONVERSACION_TRABAJADOR_LLAMAS  :int= 30;
public static final var CONVERSACION_TRABAJADOR_LLAMAS_EXTINTOR  :int= 31;
public static final var CONVERSACION_TRABAJADOR_LLAMAS_CURAR  :int= 32;
public static final var CONVERSACION_TRABAJADOR_LLAMAS_NO_DIANA  :int= 33;
public static final var CONVERSACION_TRABAJADOR_LLAMAS_NO_BOTIQUIN  :int= 34;
public static final var CONVERSACION_TRABAJADOR_LLAMAS_DIANA_EN_PARTY  :int= 35;
public static final var CONVERSACION_BOTIQUIN_LOCKER  :int= 36;
public static final var CONVERSACION_BOTIQUIN_LOCKER_NO_FRANCISCO  :int= 37;
public static final var CONVERSACION_BOTIQUIN_LOCKER_FRANCISCO_EN_PARTY  :int= 38;
public static final var CONVERSACION_TRABAJADOR_HERIDO  :int= 39;
public static final var CONVERSACION_TRABAJADOR_HERIDO_NO_TOALLA_NO_DIANA  :int= 40;
public static final var CONVERSACION_TRABAJADOR_HERIDO_DIANA_EN_PARTY  :int= 41;
public static final var CONVERSACION_TRABAJADOR_HERIDO_CURAR  :int= 42;
public static final var CONVERSACION_TRABAJADOR_HERIDO_TOALLA  :int= 43;
public static final var CONVERSACION_TRABAJADOR_DESMAYADO  :int= 44;
public static final var CONVERSACION_TRABAJADOR_DESMAYADO_MARIO  :int= 45;
public static final var CONVERSACION_TRABAJADOR_DESMAYADO_DIANA  :int= 46;
public static final var CONVERSACION_TRABAJADOR_DESMAYADO_DIANA_EN_PARTY  :int= 47;
public static final var CONVERSACION_INHALADOR_FRANCISCO  :int= 48;
public static final var CONVERSACION_INHALADOR_FRANCISCO_EN_PARTY  :int= 49;
public static final var CONVERSACION_INHALADOR_NO_FRANCISCO  :int= 50;
public static final var CONVERSACION_TRABAJADOR_DESMAYADO_INHALADOR  :int= 51;
public static final var CONVERSACION_SALIDA_JEFE  :int= 52;
public static final var CONVERSACION_SALIDA_TRABAJADORES :int= 53;
public static final var CONVERSACION_SALIDA_SOLO  :int= 54;
public static final var CONVERSACION_CAJA_EXITO  :int= 55;

public static final var FLAG_TRABAJADOR_TUBO = 0;

public static final var FLAG_BARRICADA_TUBO = 1;

public static final var FLAG_REJA_SEGUETA = 2;

public static final var FLAG_BARRICADA_TUBO1 = 3;

public static final var DIALOGO_ARMARIO1 = 4;

public static final var DIALOGO_ARMARIO2 = 5;

public static final var FUSIBLES = 6;

public static final var FINAL_JEFE = 7;

public static final var TRABAJADOR_FUEGO = 8;



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
GetComponent(MenuManager).setBotonesHabilitado(false);
var texturaPlayer:Texture2D;
var texturaPlayerSombreada:Texture2D;
switch(idConversacion){

	case CONVERSACION_TRABAJADOR_TUBO_NORMAL:
		if(GetComponent(Player_Manager).getCurrentPlayer().getId() == Player_Manager.DARIO)
		{
			texturaPlayer=texturaDario;
		}
		else if(GetComponent(Player_Manager).getCurrentPlayer().getId() == Player_Manager.DIANA)
		{
			texturaPlayer=texturaDiana;
		}
		else if(GetComponent(Player_Manager).getCurrentPlayer().getId() == Player_Manager.FRANCISCO)
		{
			texturaPlayer=texturaFrancisco;
		}
		else if(GetComponent(Player_Manager).getCurrentPlayer().getId() == Player_Manager.MARIO)
		{
			texturaPlayer=texturaMario;
		}
		inicializarConversacionTrabajadoreTercoTubo1(texturaPlayer);
		conversacionActual = conversacionTrabajadoreTercoTubo1;
	break;
	
	case CONVERSACION_TRABAJADOR_TUBO_DESPUES_BARRICADA:
		if(GetComponent(Player_Manager).getCurrentPlayer().getId() == Player_Manager.DARIO)
		{
			texturaPlayer=texturaDario;
		}
		else if(GetComponent(Player_Manager).getCurrentPlayer().getId() == Player_Manager.DIANA)
		{
			texturaPlayer=texturaDiana;
		}
		else if(GetComponent(Player_Manager).getCurrentPlayer().getId() == Player_Manager.FRANCISCO)
		{
			texturaPlayer=texturaFrancisco;
		}
		else if(GetComponent(Player_Manager).getCurrentPlayer().getId() == Player_Manager.MARIO)
		{
			texturaPlayer=texturaMario;
		}
		inicializarConversacionTrabajadoreTercoTubo2(texturaPlayer);
		conversacionActual = conversacionTrabajadoreTercoTubo2;
	break;
	
	case CONVERSACION_TRABAJADOR_TUBO_LIBERADO:
		if(GetComponent(Player_Manager).getCurrentPlayer().getId() == Player_Manager.DARIO)
		{
			texturaPlayer=texturaDario;
		}
		else if(GetComponent(Player_Manager).getCurrentPlayer().getId() == Player_Manager.DIANA)
		{
			texturaPlayer=texturaDiana;
		}
		else if(GetComponent(Player_Manager).getCurrentPlayer().getId() == Player_Manager.FRANCISCO)
		{
			texturaPlayer=texturaFrancisco;
		}
		else if(GetComponent(Player_Manager).getCurrentPlayer().getId() == Player_Manager.MARIO)
		{
			texturaPlayer=texturaMario;
		}
		inicializarConversacionTrabajadoreTercoTubo3(texturaPlayer);
		conversacionActual = conversacionTrabajadoreTercoTubo3;
	break;
	
	case CONVERSACION_TRABAJADOR_LLAVE_NORMAL:
		if(GetComponent(Player_Manager).getCurrentPlayer().getId() == Player_Manager.DARIO)
		{
			texturaPlayer=texturaDario;
		}
		else if(GetComponent(Player_Manager).getCurrentPlayer().getId() == Player_Manager.DIANA)
		{
			texturaPlayer=texturaDiana;
		}
		else if(GetComponent(Player_Manager).getCurrentPlayer().getId() == Player_Manager.FRANCISCO)
		{
			texturaPlayer=texturaFrancisco;
		}
		else if(GetComponent(Player_Manager).getCurrentPlayer().getId() == Player_Manager.MARIO)
		{
			texturaPlayer=texturaMario;
		}
		inicializarConversacionTrabajadoreTercoLlave1(texturaPlayer);
		conversacionActual = conversacionTrabajadoreTercoLlave1;
	break;
	
	case CONVERSACION_TRABAJADOR_LLAVE_DESPUES_PUERTA:
		if(GetComponent(Player_Manager).getCurrentPlayer().getId() == Player_Manager.DARIO)
		{
			texturaPlayer=texturaDario;
		}
		else if(GetComponent(Player_Manager).getCurrentPlayer().getId() == Player_Manager.DIANA)
		{
			texturaPlayer=texturaDiana;
		}
		else if(GetComponent(Player_Manager).getCurrentPlayer().getId() == Player_Manager.FRANCISCO)
		{
			texturaPlayer=texturaFrancisco;
		}
		else if(GetComponent(Player_Manager).getCurrentPlayer().getId() == Player_Manager.MARIO)
		{
			texturaPlayer=texturaMario;
		}
		inicializarConversacionTrabajadoreTercoLlave1(texturaPlayer);
		conversacionActual = conversacionTrabajadoreTercoLlave2;
	break;
	
	case CONVERSACION_TRABAJADOR_LLAVE_LIBERADO:
		if(GetComponent(Player_Manager).getCurrentPlayer().getId() == Player_Manager.DARIO)
		{
			texturaPlayer=texturaDario;
		}
		else if(GetComponent(Player_Manager).getCurrentPlayer().getId() == Player_Manager.DIANA)
		{
			texturaPlayer=texturaDiana;
		}
		else if(GetComponent(Player_Manager).getCurrentPlayer().getId() == Player_Manager.FRANCISCO)
		{
			texturaPlayer=texturaFrancisco;
		}
		else if(GetComponent(Player_Manager).getCurrentPlayer().getId() == Player_Manager.MARIO)
		{
			texturaPlayer=texturaMario;
		}
		inicializarConversacionTrabajadoreTercoLlave1(texturaPlayer);
		conversacionActual = conversacionTrabajadoreTercoLlave3;
	break;
	
	case CONVERSACION_TRABAJADOR_CONSERJE_NORMAL:
		if(GetComponent(Player_Manager).getCurrentPlayer().getId() == Player_Manager.DARIO)
		{
			texturaPlayer=texturaDario;
		}
		else if(GetComponent(Player_Manager).getCurrentPlayer().getId() == Player_Manager.DIANA)
		{
			texturaPlayer=texturaDiana;
		}
		else if(GetComponent(Player_Manager).getCurrentPlayer().getId() == Player_Manager.FRANCISCO)
		{
			texturaPlayer=texturaFrancisco;
		}
		else if(GetComponent(Player_Manager).getCurrentPlayer().getId() == Player_Manager.MARIO)
		{
			texturaPlayer=texturaMario;
		}
		inicializarConversacionTrabajadoreTercoConserje1(texturaPlayer);
		conversacionActual = conversacionTrabajadoreTercoConserje1;
	break;
	
	case CONVERSACION_TRABAJADOR_CONSERJE_DESPUES_CAJA:
		if(GetComponent(Player_Manager).getCurrentPlayer().getId() == Player_Manager.DARIO)
		{
			texturaPlayer=texturaDario;
		}
		else if(GetComponent(Player_Manager).getCurrentPlayer().getId() == Player_Manager.DIANA)
		{
			texturaPlayer=texturaDiana;
		}
		else if(GetComponent(Player_Manager).getCurrentPlayer().getId() == Player_Manager.FRANCISCO)
		{
			texturaPlayer=texturaFrancisco;
		}
		else if(GetComponent(Player_Manager).getCurrentPlayer().getId() == Player_Manager.MARIO)
		{
			texturaPlayer=texturaMario;
		}
		inicializarConversacionTrabajadoreTercoConserje2(texturaPlayer);
		conversacionActual = conversacionTrabajadoreTercoConserje2;
	break;
	
	case CONVERSACION_TRABAJADOR_CONSERJE_LIBERADO:
		if(GetComponent(Player_Manager).getCurrentPlayer().getId() == Player_Manager.DARIO)
		{
			texturaPlayer=texturaDario;
		}
		else if(GetComponent(Player_Manager).getCurrentPlayer().getId() == Player_Manager.DIANA)
		{
			texturaPlayer=texturaDiana;
		}
		else if(GetComponent(Player_Manager).getCurrentPlayer().getId() == Player_Manager.FRANCISCO)
		{
			texturaPlayer=texturaFrancisco;
		}
		else if(GetComponent(Player_Manager).getCurrentPlayer().getId() == Player_Manager.MARIO)
		{
			texturaPlayer=texturaMario;
		}
		inicializarConversacionTrabajadoreTercoConserje3(texturaPlayer);
		conversacionActual = conversacionTrabajadoreTercoConserje3;
	break;
	
	case CONVERSACION_TRABAJADOR_CONSERJE_DESPUES_PUERTA:
		if(GetComponent(Player_Manager).getCurrentPlayer().getId() == Player_Manager.DARIO)
		{
			texturaPlayer=texturaDario;
		}
		else if(GetComponent(Player_Manager).getCurrentPlayer().getId() == Player_Manager.DIANA)
		{
			texturaPlayer=texturaDiana;
		}
		else if(GetComponent(Player_Manager).getCurrentPlayer().getId() == Player_Manager.FRANCISCO)
		{
			texturaPlayer=texturaFrancisco;
		}
		else if(GetComponent(Player_Manager).getCurrentPlayer().getId() == Player_Manager.MARIO)
		{
			texturaPlayer=texturaMario;
		}
		inicializarConversacionTrabajadoreTercoConserje4(texturaPlayer);
		conversacionActual = conversacionTrabajadoreTercoConserje4;
	break;
	
	case CONVERSACION_BARRICADA_PALA:
		if(GetComponent(Player_Manager).getCurrentPlayer().getId() == Player_Manager.DARIO)
		{
			texturaPlayer=texturaDario;
			
		}
		else if(GetComponent(Player_Manager).getCurrentPlayer().getId() == Player_Manager.DIANA)
		{
			texturaPlayer=texturaDiana;
				
		}
		else if(GetComponent(Player_Manager).getCurrentPlayer().getId() == Player_Manager.FRANCISCO)
		{
			texturaPlayer=texturaFrancisco;
			
		}
		else if(GetComponent(Player_Manager).getCurrentPlayer().getId() == Player_Manager.MARIO)
		{
			texturaPlayer=texturaMario;
			
		}
		inicializarConversacionBarricadaPuertaJefe1(texturaPlayer);
		conversacionActual = conversacionBarricadaPuertaJefe1;
		
	break;
	

	case CONVERSACION_BARRICADA_TUBO:
		if(GetComponent(Player_Manager).getCurrentPlayer().getId() == Player_Manager.DARIO)
		{
			texturaPlayer=texturaDario;
		}
		else if(GetComponent(Player_Manager).getCurrentPlayer().getId() == Player_Manager.DIANA)
		{
			texturaPlayer=texturaDiana;
		}
		else if(GetComponent(Player_Manager).getCurrentPlayer().getId() == Player_Manager.FRANCISCO)
		{
			texturaPlayer=texturaFrancisco;
		}
		else if(GetComponent(Player_Manager).getCurrentPlayer().getId() == Player_Manager.MARIO)
		{
			texturaPlayer=texturaMario;
		}
		inicializarConversacionBarricadaPuertaJefe3(texturaPlayer);
		conversacionActual = conversacionBarricadaPuertaJefe3;
	break;
	
	
	case CONVERSACION_BARRICADA_NO_MARIO:
		if(GetComponent(Player_Manager).getCurrentPlayer().getId() == Player_Manager.DARIO)
		{
			texturaPlayer=texturaDario;
			
		}
		else if(GetComponent(Player_Manager).getCurrentPlayer().getId() == Player_Manager.DIANA)
		{
			texturaPlayer=texturaDiana;
			
		}
		else if(GetComponent(Player_Manager).getCurrentPlayer().getId() == Player_Manager.FRANCISCO)
		{
			texturaPlayer=texturaFrancisco;
		
		}
		else if(GetComponent(Player_Manager).getCurrentPlayer().getId() == Player_Manager.MARIO)
		{
			texturaPlayer=texturaMario;
		}
		inicializarConversacionBarricadaPuertaJefe4(texturaPlayer);
		conversacionActual = conversacionBarricadaPuertaJefe4;
	break;
	
	case CONVERSACION_BARRICADA_MARIO:
		inicializarConversacionBarricadaPuertaJefe2();
		conversacionActual = conversacionBarricadaPuertaJefe2;
	break;
	
	case CONVERSACION_ARMARIO_TUBO_FRANCISCO_EN_PARTY:
		if(GetComponent(Player_Manager).getCurrentPlayer().getId() == Player_Manager.DARIO)
		{
			texturaPlayer=texturaDario;
			
		}
		else if(GetComponent(Player_Manager).getCurrentPlayer().getId() == Player_Manager.DIANA)
		{
			texturaPlayer=texturaDiana;
			
		}
		else if(GetComponent(Player_Manager).getCurrentPlayer().getId() == Player_Manager.MARIO)
		{
			texturaPlayer=texturaMario;
			
		}
		else if(GetComponent(Player_Manager).getCurrentPlayer().getId() == Player_Manager.FRANCISCO)
		{
			texturaPlayer=texturaFrancisco;
			
		}
		inicializarConversacionArmarioTubos1(texturaPlayer);
		conversacionActual = conversacionArmarioTubos1;
	break;
	
	case CONVERSACION_ARMARIO_TUBO_SIN_FRANCISCO:
		if(GetComponent(Player_Manager).getCurrentPlayer().getId() == Player_Manager.DARIO)
		{
			texturaPlayer=texturaDario;
		}
		else if(GetComponent(Player_Manager).getCurrentPlayer().getId() == Player_Manager.DIANA)
		{
			texturaPlayer=texturaDiana;
		}
		else if(GetComponent(Player_Manager).getCurrentPlayer().getId() == Player_Manager.MARIO)
		{
			texturaPlayer=texturaMario;
		}
		inicializarConversacionArmarioTubos2(texturaPlayer);
		conversacionActual = conversacionArmarioTubos2;
	break;
	
	case CONVERSACION_ARMARIO_TUBO_FRANCISCO:
		inicializarConversacionArmarioTubos3();
		conversacionActual = conversacionArmarioTubos3;
	break;
	
	
	case CONVERSACION_REJA_SIN_SEGUETA:
		if(GetComponent(Player_Manager).getCurrentPlayer().getId() == Player_Manager.DARIO)
		{
			texturaPlayer=texturaDario;	
		}
		else if(GetComponent(Player_Manager).getCurrentPlayer().getId() == Player_Manager.DIANA)
		{
			texturaPlayer=texturaDiana;
		}
		else if(GetComponent(Player_Manager).getCurrentPlayer().getId() == Player_Manager.FRANCISCO)
		{
			texturaPlayer=texturaFrancisco;
		}
		else if(GetComponent(Player_Manager).getCurrentPlayer().getId() == Player_Manager.MARIO)
		{
			texturaPlayer=texturaMario;
		}
		inicializarConversacionRejaJefe4(texturaPlayer);
		conversacionActual = conversacionRejaJefe4;
		
	break;
	
	case CONVERSACION_REJA_SIN_3_PERSONAS:
		if(GetComponent(Player_Manager).getCurrentPlayer().getId() == Player_Manager.DARIO)
		{
			texturaPlayer=texturaDario;
		}
		else if(GetComponent(Player_Manager).getCurrentPlayer().getId() == Player_Manager.DIANA)
		{
			texturaPlayer=texturaDiana;
		}
		else if(GetComponent(Player_Manager).getCurrentPlayer().getId() == Player_Manager.FRANCISCO)
		{
			texturaPlayer=texturaFrancisco;
		}
		else if(GetComponent(Player_Manager).getCurrentPlayer().getId() == Player_Manager.MARIO)
		{
			texturaPlayer=texturaMario;
		}
		inicializarConversacionRejaJefe2(texturaPlayer);
		conversacionActual = conversacionRejaJefe2;
	break;
	
	case CONVERSACION_REJA_ABRIR:
		if(GetComponent(Player_Manager).getCurrentPlayer().getId() == Player_Manager.DARIO)
		{
			texturaPlayer=texturaDario;
		}
		else if(GetComponent(Player_Manager).getCurrentPlayer().getId() == Player_Manager.DIANA)
		{
			texturaPlayer=texturaDiana;
		}
		else if(GetComponent(Player_Manager).getCurrentPlayer().getId() == Player_Manager.FRANCISCO)
		{
			texturaPlayer=texturaFrancisco;
		}
		else if(GetComponent(Player_Manager).getCurrentPlayer().getId() == Player_Manager.MARIO)
		{
			texturaPlayer=texturaMario;
		}
		inicializarConversacionRejaJefe3(texturaPlayer);
		conversacionActual = conversacionRejaJefe3;
	break;
	
	case CONVERSACION_REJA_MARIO:
		inicializarConversacionRejaMario();
		conversacionActual = conversacionRejaMario;
	break;
	
	
	case CONVERSACION_ARMARIO_SEGUETAS_SI:
		if(GetComponent(Player_Manager).getCurrentPlayer().getId() == Player_Manager.DARIO)
		{
			texturaPlayer=texturaDario;
		}
		else if(GetComponent(Player_Manager).getCurrentPlayer().getId() == Player_Manager.DIANA)
		{
			texturaPlayer=texturaDiana;
		}
		else if(GetComponent(Player_Manager).getCurrentPlayer().getId() == Player_Manager.FRANCISCO)
		{
			texturaPlayer=texturaFrancisco;
		}
		else if(GetComponent(Player_Manager).getCurrentPlayer().getId() == Player_Manager.MARIO)
		{
			texturaPlayer=texturaMario;
		}
		inicializarConversacionArmariosSeguetas1(texturaPlayer);
		conversacionActual = conversacionArmariosSeguetas1;
	break;
	
	case CONVERSACION_ARMARIO_SEGUETAS_NO:
		if(GetComponent(Player_Manager).getCurrentPlayer().getId() == Player_Manager.DARIO)
		{
			texturaPlayer=texturaDario;
		}
		else if(GetComponent(Player_Manager).getCurrentPlayer().getId() == Player_Manager.DIANA)
		{
			texturaPlayer=texturaDiana;
		}
		else if(GetComponent(Player_Manager).getCurrentPlayer().getId() == Player_Manager.FRANCISCO)
		{
			texturaPlayer=texturaFrancisco;
		}
		else if(GetComponent(Player_Manager).getCurrentPlayer().getId() == Player_Manager.MARIO)
		{
			texturaPlayer=texturaMario;
		}
		inicializarConversacionArmariosSeguetas2(texturaPlayer);
		conversacionActual = conversacionArmariosSeguetas2;
	break;
	
	case CONVERSACION_ARMARIO_FUSIBLES:
		if(GetComponent(Player_Manager).getCurrentPlayer().getId() == Player_Manager.DARIO)
		{
			texturaPlayer=texturaDario;
		}
		else if(GetComponent(Player_Manager).getCurrentPlayer().getId() == Player_Manager.DIANA)
		{
			texturaPlayer=texturaDiana;
		}
		else if(GetComponent(Player_Manager).getCurrentPlayer().getId() == Player_Manager.FRANCISCO)
		{
			texturaPlayer=texturaFrancisco;
		}
		else if(GetComponent(Player_Manager).getCurrentPlayer().getId() == Player_Manager.MARIO)
		{
			texturaPlayer=texturaMario;
		}
		inicializarConversacionArmariosFusibles(texturaPlayer);
		conversacionActual = conversacionArmariosFusibles;
	break;
	
	case CONVERSACION_PUERTA_JEFE_1:
		if(GetComponent(Player_Manager).getCurrentPlayer().getId() == Player_Manager.DARIO)
		{
			texturaPlayer=texturaDario;
		}
		else if(GetComponent(Player_Manager).getCurrentPlayer().getId() == Player_Manager.DIANA)
		{
			texturaPlayer=texturaDiana;
		}
		else if(GetComponent(Player_Manager).getCurrentPlayer().getId() == Player_Manager.FRANCISCO)
		{
			texturaPlayer=texturaFrancisco;
		}
		else if(GetComponent(Player_Manager).getCurrentPlayer().getId() == Player_Manager.MARIO)
		{
			texturaPlayer=texturaMario;
		}
		inicializarConversacionPuertaJefe1(texturaPlayer);
		conversacionActual = conversacionPuertaJefe1;

	break;
	

	case CONVERSACION_PUERTA_JEFE_2:
		if(GetComponent(Player_Manager).getCurrentPlayer().getId() == Player_Manager.DARIO)
		{
			texturaPlayer=texturaDario;
		}
		else if(GetComponent(Player_Manager).getCurrentPlayer().getId() == Player_Manager.DIANA)
		{
			texturaPlayer=texturaDiana;
		}
		else if(GetComponent(Player_Manager).getCurrentPlayer().getId() == Player_Manager.FRANCISCO)
		{
			texturaPlayer=texturaFrancisco;
		}
		else if(GetComponent(Player_Manager).getCurrentPlayer().getId() == Player_Manager.MARIO)
		{
			texturaPlayer=texturaMario;
		}
		inicializarConversacionPuertaJefe2(texturaPlayer);
		conversacionActual = conversacionPuertaJefe2;
	break;
	
	///Deprecated
	case CONVERSACION_PUERTA_JEFE_3:
	
		if(GetComponent(Player_Manager).getCurrentPlayer().getId() == Player_Manager.DARIO)
		{
			texturaPlayer=texturaDario;
		}
		else if(GetComponent(Player_Manager).getCurrentPlayer().getId() == Player_Manager.DIANA)
		{
			texturaPlayer=texturaDiana;
		}
		else if(GetComponent(Player_Manager).getCurrentPlayer().getId() == Player_Manager.FRANCISCO)
		{
			texturaPlayer=texturaFrancisco;
		}
		else if(GetComponent(Player_Manager).getCurrentPlayer().getId() == Player_Manager.MARIO)
		{
			texturaPlayer=texturaMario;
		}
		inicializarConversacionPuertaJefe3(texturaPlayer);
		conversacionActual = conversacionPuertaJefe3;
	break;
	
	case CONVERSACION_PUERTA_JEFE_MARIO:
	
		inicializarConversacionPuertaJefeMario();
		conversacionActual = conversacionPuertaJefeMario;
	break;
	
	case CONVERSACION_JEFE:
		inicializarConversacionJefe();
		conversacionActual = conversacionJefe;
	break;
	
	case CONVERSACION_CAJA_FUERTE_MARIO:
		inicializarConversacionCajaFuerteMario();
		conversacionActual = conversacionCajaFuerteMario;
	break;
	
	case CONVERSACION_CAJA_EXITO:
		if(GetComponent(Player_Manager).getCurrentPlayer().getId() == Player_Manager.DARIO)
		{
			texturaPlayer=texturaDario;
		}
		else if(GetComponent(Player_Manager).getCurrentPlayer().getId() == Player_Manager.DIANA)
		{
			texturaPlayer=texturaDiana;
		}
		else if(GetComponent(Player_Manager).getCurrentPlayer().getId() == Player_Manager.FRANCISCO)
		{
			texturaPlayer=texturaFrancisco;
		}
		else if(GetComponent(Player_Manager).getCurrentPlayer().getId() == Player_Manager.MARIO)
		{
			texturaPlayer=texturaMario;
		}
		inicializarConversacionCajaExito(texturaPlayer);
		conversacionActual = conversacionCajaExito;
	break;
	
	case CONVERSACION_TRABAJADOR_LLAMAS:
		if(GetComponent(Player_Manager).getCurrentPlayer().getId() == Player_Manager.DARIO)
		{
			texturaPlayer=texturaDario;
			texturaPlayerSombreada = texturaDarioSombreada;
		}
		else if(GetComponent(Player_Manager).getCurrentPlayer().getId() == Player_Manager.DIANA)
		{
			texturaPlayer=texturaDiana;
			texturaPlayerSombreada = texturaDianaSombreada;
		}
		else if(GetComponent(Player_Manager).getCurrentPlayer().getId() == Player_Manager.FRANCISCO)
		{
			texturaPlayer=texturaFrancisco;
			texturaPlayerSombreada = texturaFranciscoSombreada;
		}
		else if(GetComponent(Player_Manager).getCurrentPlayer().getId() == Player_Manager.MARIO)
		{
			texturaPlayer=texturaMario;
			texturaPlayerSombreada = texturaMarioSombreada;
		}
		inicializarConversacionTrabajadorEnPeligroLLamas(texturaPlayer, texturaPlayerSombreada);
		conversacionActual = conversacionTrabajadorEnPeligroLLamas;
	break;
	
	case CONVERSACION_TRABAJADOR_LLAMAS_EXTINTOR:
		if(GetComponent(Player_Manager).getCurrentPlayer().getId() == Player_Manager.DARIO)
		{
			texturaPlayer=texturaDario;
			texturaPlayerSombreada = texturaDarioSombreada;
		}
		else if(GetComponent(Player_Manager).getCurrentPlayer().getId() == Player_Manager.DIANA)
		{
			texturaPlayer=texturaDiana;
			texturaPlayerSombreada = texturaDianaSombreada;
		}
		else if(GetComponent(Player_Manager).getCurrentPlayer().getId() == Player_Manager.FRANCISCO)
		{
			texturaPlayer=texturaFrancisco;
			texturaPlayerSombreada = texturaFranciscoSombreada;
		}
		else if(GetComponent(Player_Manager).getCurrentPlayer().getId() == Player_Manager.MARIO)
		{
			texturaPlayer=texturaMario;
			texturaPlayerSombreada = texturaMarioSombreada;
		}
		inicializarConversacionTrabajadorEnPeligroLLamasExtintor(texturaPlayer, texturaPlayerSombreada);
		conversacionActual = conversacionTrabajadorEnPeligroLLamasExtintor;
	break;
	
	case CONVERSACION_TRABAJADOR_LLAMAS_CURAR:
		inicializarConversacionTrabajadorEnPeligroLLamasCurar();
		conversacionActual = conversacionTrabajadorEnPeligroLLamasCurar;
	break;
	
	case CONVERSACION_TRABAJADOR_LLAMAS_NO_DIANA:
		if(GetComponent(Player_Manager).getCurrentPlayer().getId() == Player_Manager.DARIO)
		{
			texturaPlayer=texturaDario;
			texturaPlayerSombreada = texturaDarioSombreada;
		}
		else if(GetComponent(Player_Manager).getCurrentPlayer().getId() == Player_Manager.FRANCISCO)
		{
			texturaPlayer=texturaFrancisco;
			texturaPlayerSombreada = texturaFranciscoSombreada;
		}
		else if(GetComponent(Player_Manager).getCurrentPlayer().getId() == Player_Manager.MARIO)
		{
			texturaPlayer=texturaMario;
			texturaPlayerSombreada = texturaMarioSombreada;
		}
		inicializarConversacionTrabajadorEnPeligroLLamasNoDiana(texturaPlayer, texturaPlayerSombreada);
		conversacionActual = conversacionTrabajadorEnPeligroLLamasNoDiana;
	break;
	
	case CONVERSACION_TRABAJADOR_LLAMAS_NO_BOTIQUIN:
		if(GetComponent(Player_Manager).getCurrentPlayer().getId() == Player_Manager.DARIO)
		{
			texturaPlayer=texturaDario;
			texturaPlayerSombreada = texturaDarioSombreada;
		}
		else if(GetComponent(Player_Manager).getCurrentPlayer().getId() == Player_Manager.DIANA)
		{
			texturaPlayer=texturaDiana;
			texturaPlayerSombreada = texturaDianaSombreada;
		}
		else if(GetComponent(Player_Manager).getCurrentPlayer().getId() == Player_Manager.FRANCISCO)
		{
			texturaPlayer=texturaFrancisco;
			texturaPlayerSombreada = texturaFranciscoSombreada;
		}
		else if(GetComponent(Player_Manager).getCurrentPlayer().getId() == Player_Manager.MARIO)
		{
			texturaPlayer=texturaMario;
			texturaPlayerSombreada = texturaMarioSombreada;
		}
		InicializarConversacionTrabajadorEnPeligroLLamasNoBotiquin(texturaPlayer, texturaPlayerSombreada);
		conversacionActual = conversacionTrabajadorEnPeligroLLamasNoBotiquin;
	break;
	
	case CONVERSACION_TRABAJADOR_LLAMAS_DIANA_EN_PARTY:
		if(GetComponent(Player_Manager).getCurrentPlayer().getId() == Player_Manager.DARIO)
		{
			texturaPlayer=texturaDario;
			inicializarConversacionTrabajadorEnPeligroLLamasDianaEnParty(texturaPlayer);
			conversacionActual = conversacionTrabajadorEnPeligroLLamasDianaEnParty;
		}
		else if(GetComponent(Player_Manager).getCurrentPlayer().getId() == Player_Manager.FRANCISCO)
		{
			texturaPlayer=texturaFrancisco;
			inicializarConversacionTrabajadorEnPeligroLLamasDianaEnParty(texturaPlayer);
			conversacionActual = conversacionTrabajadorEnPeligroLLamasDianaEnParty;
		}
		else if(GetComponent(Player_Manager).getCurrentPlayer().getId() == Player_Manager.MARIO)
		{
			texturaPlayer=texturaMario;
			inicializarConversacionTrabajadorEnPeligroLLamasDianaEnParty(texturaPlayer);
			conversacionActual = conversacionTrabajadorEnPeligroLLamasDianaEnParty;
		}
		else if(GetComponent(Player_Manager).getCurrentPlayer().getId() == Player_Manager.DIANA)
		{
			texturaPlayer=texturaDiana;
			inicializarConversacionTrabajadorEnPeligroLLamasCurar();
			conversacionActual = conversacionTrabajadorEnPeligroLLamasCurar;
		}

	break;
	

	case CONVERSACION_BOTIQUIN_LOCKER_NO_FRANCISCO:
		if(GetComponent(Player_Manager).getCurrentPlayer().getId() == Player_Manager.DARIO)
		{
			texturaPlayer=texturaDario;
		}
		else if(GetComponent(Player_Manager).getCurrentPlayer().getId() == Player_Manager.DIANA)
		{
			texturaPlayer=texturaDiana;
		}
		else if(GetComponent(Player_Manager).getCurrentPlayer().getId() == Player_Manager.MARIO)
		{
			texturaPlayer=texturaMario;
		}
		inicializarConversacionBotiquinLockerNoFrancisco(texturaPlayer);
		conversacionActual = conversacionBotiquinLockerNoFrancisco;
	break;
	
	case CONVERSACION_BOTIQUIN_LOCKER_FRANCISCO_EN_PARTY:
		if(GetComponent(Player_Manager).getCurrentPlayer().getId() == Player_Manager.DARIO)
		{
			texturaPlayer=texturaDario;
		}
		else if(GetComponent(Player_Manager).getCurrentPlayer().getId() == Player_Manager.DIANA)
		{
			texturaPlayer=texturaDiana;
		}
		else if(GetComponent(Player_Manager).getCurrentPlayer().getId() == Player_Manager.MARIO)
		{
			texturaPlayer=texturaMario;
		}
		else if(GetComponent(Player_Manager).getCurrentPlayer().getId() == Player_Manager.FRANCISCO)
		{
			texturaPlayer=texturaFrancisco;
		}
		inicializarConversacionBotiquinLockerFranciscoEnParty(texturaPlayer);
		conversacionActual = conversacionBotiquinLockerFranciscoEnParty;

	break;
	
	case CONVERSACION_BOTIQUIN_LOCKER:
		inicializarConversacionBotiquinLocker();
		conversacionActual = conversacionBotiquinLocker;
	break;
	
	case CONVERSACION_TRABAJADOR_HERIDO:
		if(GetComponent(Player_Manager).getCurrentPlayer().getId() == Player_Manager.DARIO)
		{
			texturaPlayer=texturaDario;
		}
		else if(GetComponent(Player_Manager).getCurrentPlayer().getId() == Player_Manager.DIANA)
		{
			texturaPlayer=texturaDiana;
		}
		else if(GetComponent(Player_Manager).getCurrentPlayer().getId() == Player_Manager.FRANCISCO)
		{
			texturaPlayer=texturaFrancisco;
		}
		else if(GetComponent(Player_Manager).getCurrentPlayer().getId() == Player_Manager.MARIO)
		{
			texturaPlayer=texturaMario;
		}
		inicializarConversacionTrabajadorEnPeligroHerido(texturaPlayer);
		conversacionActual = conversacionTrabajadorEnPeligroHerido;
	break;
	
	case CONVERSACION_TRABAJADOR_HERIDO_NO_TOALLA_NO_DIANA:
		if(GetComponent(Player_Manager).getCurrentPlayer().getId() == Player_Manager.DARIO)
		{
			texturaPlayer=texturaDario;
		}
		else if(GetComponent(Player_Manager).getCurrentPlayer().getId() == Player_Manager.FRANCISCO)
		{
			texturaPlayer=texturaFrancisco;
		}
		else if(GetComponent(Player_Manager).getCurrentPlayer().getId() == Player_Manager.MARIO)
		{
			texturaPlayer=texturaMario;
		}
		inicializarConversacionTrabajadorEnPeligroHeridoNoDianaNoToalla(texturaPlayer);
		conversacionActual = conversacionTrabajadorEnPeligroHeridoNoDianaNoToalla;
	break;
	
	case CONVERSACION_TRABAJADOR_HERIDO_DIANA_EN_PARTY:
		if(GetComponent(Player_Manager).getCurrentPlayer().getId() == Player_Manager.DARIO)
		{
			texturaPlayer=texturaDario;
			inicializarConversacionTrabajadorEnPeligroHeridoDianaEnParty(texturaPlayer);
			conversacionActual = conversacionTrabajadorEnPeligroHeridoDianaEnParty;
		}
		else if(GetComponent(Player_Manager).getCurrentPlayer().getId() == Player_Manager.FRANCISCO)
		{
			texturaPlayer=texturaFrancisco;
			inicializarConversacionTrabajadorEnPeligroHeridoDianaEnParty(texturaPlayer);
			conversacionActual = conversacionTrabajadorEnPeligroHeridoDianaEnParty;
		}
		else if(GetComponent(Player_Manager).getCurrentPlayer().getId() == Player_Manager.MARIO)
		{
			texturaPlayer=texturaMario;
			inicializarConversacionTrabajadorEnPeligroHeridoDianaEnParty(texturaPlayer);
			conversacionActual = conversacionTrabajadorEnPeligroHeridoDianaEnParty;
		}
		else if(GetComponent(Player_Manager).getCurrentPlayer().getId() == Player_Manager.DIANA)
		{
			texturaPlayer=texturaDiana;
			inicializarConversacionTrabajadorEnPeligroHeridoDiana(texturaPlayer);
			conversacionActual = conversacionTrabajadorEnPeligroHeridoDiana;
		}

	break;
	
	
	
	case CONVERSACION_TRABAJADOR_HERIDO_TOALLA:
		if(GetComponent(Player_Manager).getCurrentPlayer().getId() == Player_Manager.DARIO)
		{
			texturaPlayer=texturaDario;
		}
		else if(GetComponent(Player_Manager).getCurrentPlayer().getId() == Player_Manager.FRANCISCO)
		{
			texturaPlayer=texturaFrancisco;
		}
		else if(GetComponent(Player_Manager).getCurrentPlayer().getId() == Player_Manager.MARIO)
		{
			texturaPlayer=texturaMario;
		}
		else if(GetComponent(Player_Manager).getCurrentPlayer().getId() == Player_Manager.DIANA)
		{
			texturaPlayer=texturaDiana;
		}
		inicializarConversacionTrabajadorEnPeligroHeridoToalla(texturaPlayer);
		conversacionActual = conversacionTrabajadorEnPeligroHeridoToalla;
	break;
	
	case CONVERSACION_TRABAJADOR_DESMAYADO:
		if(GetComponent(Player_Manager).getCurrentPlayer().getId() == Player_Manager.DARIO)
		{
			texturaPlayer=texturaDario;
			inicializarConversacionTrabajadorEnPeligroDesmayado(texturaPlayer);
			conversacionActual = conversacionTrabajadorEnPeligroDesmayado;
		}
		else if(GetComponent(Player_Manager).getCurrentPlayer().getId() == Player_Manager.DIANA)
		{
			texturaPlayer=texturaDiana;
			inicializarConversacionTrabajadorEnPeligroDesmayadoDiana(texturaPlayer);
			conversacionActual = conversacionTrabajadorEnPeligroDesmayadoDiana;
		}
		else if(GetComponent(Player_Manager).getCurrentPlayer().getId() == Player_Manager.FRANCISCO)
		{
			texturaPlayer=texturaFrancisco;
			inicializarConversacionTrabajadorEnPeligroDesmayado(texturaPlayer);
			conversacionActual = conversacionTrabajadorEnPeligroDesmayado;
		}
		else if(GetComponent(Player_Manager).getCurrentPlayer().getId() == Player_Manager.MARIO)
		{
			texturaPlayer=texturaMario;
			inicializarConversacionTrabajadorEnPeligroDesmayadoMario(texturaPlayer);
			conversacionActual = conversacionTrabajadorEnPeligroDesmayadoMario;
		}

	break;
	
	
	case CONVERSACION_TRABAJADOR_DESMAYADO_DIANA_EN_PARTY:
		if(GetComponent(Player_Manager).getCurrentPlayer().getId() == Player_Manager.DARIO)
		{
			texturaPlayer=texturaDario;
			inicializarConversacionTrabajadorEnPeligroDesmayadoDianaEnParty(texturaPlayer);
			conversacionActual = conversacionTrabajadorEnPeligroDesmayadoDianaEnParty;
		}
		else if(GetComponent(Player_Manager).getCurrentPlayer().getId() == Player_Manager.FRANCISCO)
		{
			texturaPlayer=texturaFrancisco;
			inicializarConversacionTrabajadorEnPeligroDesmayadoDianaEnParty(texturaPlayer);
			conversacionActual = conversacionTrabajadorEnPeligroDesmayadoDianaEnParty;
		}
		else if(GetComponent(Player_Manager).getCurrentPlayer().getId() == Player_Manager.MARIO)
		{
			texturaPlayer=texturaMario;
			inicializarConversacionTrabajadorEnPeligroDesmayadoDianaEnParty(texturaPlayer);
			conversacionActual = conversacionTrabajadorEnPeligroDesmayadoDianaEnParty;
		}
		else if(GetComponent(Player_Manager).getCurrentPlayer().getId() == Player_Manager.DIANA)
		{
			texturaPlayer=texturaDiana;
			inicializarConversacionTrabajadorEnPeligroDesmayadoDiana(texturaPlayer);
			conversacionActual = conversacionTrabajadorEnPeligroDesmayadoDiana;
		}
		
	break;
	
	case CONVERSACION_TRABAJADOR_DESMAYADO_INHALADOR:
		if(GetComponent(Player_Manager).getCurrentPlayer().getId() == Player_Manager.DARIO)
		{
			texturaPlayer=texturaDario;
		}
		else if(GetComponent(Player_Manager).getCurrentPlayer().getId() == Player_Manager.DIANA)
		{
			texturaPlayer=texturaDiana;
		}
		else if(GetComponent(Player_Manager).getCurrentPlayer().getId() == Player_Manager.FRANCISCO)
		{
			texturaPlayer=texturaFrancisco;
		}
		else if(GetComponent(Player_Manager).getCurrentPlayer().getId() == Player_Manager.MARIO)
		{
			texturaPlayer=texturaMario;
		}
		inicializarConversacionTrabajadorEnPeligroDesmayadoInhalador(texturaPlayer);
		conversacionActual = conversacionTrabajadorEnPeligroDesmayadoInhalador;
	break;
	
	
	case CONVERSACION_INHALADOR_FRANCISCO_EN_PARTY:
		if(GetComponent(Player_Manager).getCurrentPlayer().getId() == Player_Manager.DARIO)
		{
			texturaPlayer=texturaDario;
			inicializarConversacionLockerInhaladorFranciscoEnParty(texturaPlayer);
			conversacionActual = conversacionLockerInhaladorFranciscoEnParty;
		}
		else if(GetComponent(Player_Manager).getCurrentPlayer().getId() == Player_Manager.DIANA)
		{
			texturaPlayer=texturaDiana;
			inicializarConversacionLockerInhaladorFranciscoEnParty(texturaPlayer);
			conversacionActual = conversacionLockerInhaladorFranciscoEnParty;
		}
		else if(GetComponent(Player_Manager).getCurrentPlayer().getId() == Player_Manager.MARIO)
		{
			texturaPlayer=texturaMario;
			inicializarConversacionLockerInhaladorFranciscoEnParty(texturaPlayer);
			conversacionActual = conversacionLockerInhaladorFranciscoEnParty;
		}
		else if(GetComponent(Player_Manager).getCurrentPlayer().getId() == Player_Manager.FRANCISCO)
		{
			texturaPlayer=texturaFrancisco;
			inicializarConversacionLockerInhalador(texturaPlayer);
			conversacionActual = conversacionLockerInhalador;
		}

	break;
	
	case CONVERSACION_INHALADOR_NO_FRANCISCO:
		if(GetComponent(Player_Manager).getCurrentPlayer().getId() == Player_Manager.DARIO)
		{
			texturaPlayer=texturaDario;
		}
		else if(GetComponent(Player_Manager).getCurrentPlayer().getId() == Player_Manager.DIANA)
		{
			texturaPlayer=texturaDiana;
		}
		else if(GetComponent(Player_Manager).getCurrentPlayer().getId() == Player_Manager.MARIO)
		{
			texturaPlayer=texturaMario;
		}
		inicializarConversacionLockerInhaladorNoFrancisco(texturaPlayer);
		conversacionActual = conversacionLockerInhaladorNoFrancisco;
	break;
	
	case CONVERSACION_SALIDA_JEFE:
		if(GetComponent(Player_Manager).getCurrentPlayer().getId() == Player_Manager.DARIO)
		{
			texturaPlayer=texturaDario;
		}
		else if(GetComponent(Player_Manager).getCurrentPlayer().getId() == Player_Manager.DIANA)
		{
			texturaPlayer=texturaDiana;
		}
		else if(GetComponent(Player_Manager).getCurrentPlayer().getId() == Player_Manager.FRANCISCO)
		{
			texturaPlayer=texturaFrancisco;
		}
		else if(GetComponent(Player_Manager).getCurrentPlayer().getId() == Player_Manager.MARIO)
		{
			texturaPlayer=texturaMario;
		}
		inicializarConversacionSalidaJefe(texturaPlayer);
		conversacionActual = conversacionSalidaJefe;
	break;
	
	case CONVERSACION_SALIDA_TRABAJADORES:
		if(GetComponent(Player_Manager).getCurrentPlayer().getId() == Player_Manager.DARIO)
		{
			texturaPlayer=texturaDario;
		}
		else if(GetComponent(Player_Manager).getCurrentPlayer().getId() == Player_Manager.DIANA)
		{
			texturaPlayer=texturaDiana;
		}
		else if(GetComponent(Player_Manager).getCurrentPlayer().getId() == Player_Manager.FRANCISCO)
		{
			texturaPlayer=texturaFrancisco;
		}
		else if(GetComponent(Player_Manager).getCurrentPlayer().getId() == Player_Manager.MARIO)
		{
			texturaPlayer=texturaMario;
		}
		inicializarConversacionSalidaTrabajadores(texturaPlayer);
		conversacionActual = conversacionSalidaTrabajadores;
	break;
	
	case CONVERSACION_SALIDA_SOLO:
		if(GetComponent(Player_Manager).getCurrentPlayer().getId() == Player_Manager.DARIO)
		{
			texturaPlayer=texturaDario;
		}
		else if(GetComponent(Player_Manager).getCurrentPlayer().getId() == Player_Manager.DIANA)
		{
			texturaPlayer=texturaDiana;
		}
		else if(GetComponent(Player_Manager).getCurrentPlayer().getId() == Player_Manager.FRANCISCO)
		{
			texturaPlayer=texturaFrancisco;
		}
		else if(GetComponent(Player_Manager).getCurrentPlayer().getId() == Player_Manager.MARIO)
		{
			texturaPlayer=texturaMario;
		}
		inicializarConversacionSalidaSolo(texturaPlayer);
		conversacionActual = conversacionSalidaSolo;
	break;
	
   }	
 
   GetComponent(Player_Manager).getCurrentPlayer().getGameObject().GetComponent(MoverClick).MoverOff();
	dialogosActivos = true;
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



//Primera Hablada Con el primer trabajador terco donde se niega a dejar de trabajar
function inicializarConversacionTrabajadoreTercoTubo1(textura:Texture2D){
	conversacionTrabajadoreTercoTubo1 = new ArbolConversacion(textura,null,null,null);
	var dialogos : Array = new Array();
	var l: LineaDialogo = new LineaDialogo("Insistencia a sacar trabajador",1);
	dialogos.Push(l); 
	var nodoRaiz:NodoDialogo = new NodoDialogo(dialogos);
	conversacionTrabajadoreTercoTubo1.setRaiz(nodoRaiz);
	l = new LineaDialogo("negacion, debo trabajar",1);
	dialogos.Push(l);
}


//Segunda hablada con el segundo trabajdor terco despues de ver el derrumbe del jefe,
//busca informacion palanca pa mover elderrumbe, da ubicacion tubo
function inicializarConversacionTrabajadoreTercoTubo2(textura:Texture2D){
	conversacionTrabajadoreTercoTubo2 = new ArbolConversacion(textura,null,null,null);
	var dialogos : Array = new Array();
	var l: LineaDialogo = new LineaDialogo("Pregunta sobre algo como mover la barrera del jefe",1);
	dialogos.Push(l); 
	var nodoRaiz:NodoDialogo = new NodoDialogo(dialogos);
	conversacionTrabajadoreTercoTubo2.setRaiz(nodoRaiz);
	l = new LineaDialogo("indica armario tubos",1);
	dialogos.Push(l);
}


//Hablada luego de tener a 3 trabajadores rescatados donde acepta irse
function inicializarConversacionTrabajadoreTercoTubo3(textura:Texture2D){
	conversacionTrabajadoreTercoTubo3 = new ArbolConversacion(textura,null,null,null);
	var dialogos : Array = new Array();
	var l: LineaDialogo = new LineaDialogo("insistencia irse teniendo otros 3 trabajadores",1);
	dialogos.Push(l); 
	var nodoRaiz:NodoDialogo = new NodoDialogo(dialogos);
	conversacionTrabajadoreTercoTubo3.setRaiz(nodoRaiz);
	l = new LineaDialogo("acepta irse",1);
	dialogos.Push(l);
}


//Primera Hablada Con el segundo trabajador terco donde se niega a dejar de trabajar
function inicializarConversacionTrabajadoreTercoLlave1(textura:Texture2D){
	conversacionTrabajadoreTercoLlave1 = new ArbolConversacion(textura,null,null,null);
	var dialogos : Array = new Array();
	var l: LineaDialogo = new LineaDialogo("Insistencia a sacar trabajador",1);
	dialogos.Push(l); 
	var nodoRaiz:NodoDialogo = new NodoDialogo(dialogos);
	conversacionTrabajadoreTercoLlave1.setRaiz(nodoRaiz);
	l = new LineaDialogo("no acepta irse",1);
	dialogos.Push(l);
}


//Segunda Hablada Con el segundo trabajador terco donde indica la ubicacion del a llave del jefe
function inicializarConversacionTrabajadoreTercoLlave2(textura:Texture2D){
	conversacionTrabajadoreTercoLlave2 = new ArbolConversacion(textura,null,null,null);
	var dialogos : Array = new Array();
	var l: LineaDialogo = new LineaDialogo("pregunta info despues ver puerta",1);
	dialogos.Push(l); 
	var nodoRaiz:NodoDialogo = new NodoDialogo(dialogos);
	conversacionTrabajadoreTercoLlave2.setRaiz(nodoRaiz);
	l = new LineaDialogo("da la info",1);
	dialogos.Push(l);
}


//tercera Hablada Con el segundo trabajador terco donde acepta irse si se han rescatado 3 o mas
function inicializarConversacionTrabajadoreTercoLlave3(textura:Texture2D){
	conversacionTrabajadoreTercoLlave3 = new ArbolConversacion(textura,null,null,null);
	var dialogos : Array = new Array();
	var l: LineaDialogo = new LineaDialogo("Insistencia a sacar trabajadorcon otros 3",1);
	dialogos.Push(l); 
	var nodoRaiz:NodoDialogo = new NodoDialogo(dialogos);
	conversacionTrabajadoreTercoLlave3.setRaiz(nodoRaiz);
	l = new LineaDialogo("acepta irse",1);
	dialogos.Push(l);
}


//Primera Hablada Con el tercer trabajador terco donde se niega a dejar de trabajar
function inicializarConversacionTrabajadoreTercoConserje1(textura:Texture2D){
	conversacionTrabajadoreTercoConserje1 = new ArbolConversacion(textura,null,null,null);
	var dialogos : Array = new Array();
	var l: LineaDialogo = new LineaDialogo("Insistencia a sacar trabajador",1);
	dialogos.Push(l); 
	var nodoRaiz:NodoDialogo = new NodoDialogo(dialogos);
	conversacionTrabajadoreTercoConserje1.setRaiz(nodoRaiz);
	l = new LineaDialogo("no acepta irse",1);
	dialogos.Push(l);
}


//Hablada con el tercer trabajador despues de la puerta, buscando info de la llave, 
//lo indica a el trabajador que sabe que estaen la caja
function inicializarConversacionTrabajadoreTercoConserje2(textura:Texture2D){
	conversacionTrabajadoreTercoConserje2 = new ArbolConversacion(textura,null,null,null);
	var dialogos : Array = new Array();
	var l: LineaDialogo = new LineaDialogo("Insistencia a sacar trabajador",1);
	dialogos.Push(l); 
	var nodoRaiz:NodoDialogo = new NodoDialogo(dialogos);
	conversacionTrabajadoreTercoConserje2.setRaiz(nodoRaiz);
	l = new LineaDialogo("no acepta irse",1);
	dialogos.Push(l);
}


//Hablada con el tercer trabajador despues recatar a otros 3, agrede a irse
function inicializarConversacionTrabajadoreTercoConserje3(textura:Texture2D){
	conversacionTrabajadoreTercoConserje3 = new ArbolConversacion(textura,null,null,null);
	var dialogos : Array = new Array();
	var l: LineaDialogo = new LineaDialogo("Insistencia a sacar trabajador",1);
	dialogos.Push(l); 
	var nodoRaiz:NodoDialogo = new NodoDialogo(dialogos);
	conversacionTrabajadoreTercoConserje3.setRaiz(nodoRaiz);
	l = new LineaDialogo("no acepta irse",1);
	dialogos.Push(l);
}


//Hablada con el tercer trabajador despues de ver la caja fuerte, da la ubicacion del conserje
function inicializarConversacionTrabajadoreTercoConserje4(textura:Texture2D){
	conversacionTrabajadoreTercoConserje4 = new ArbolConversacion(textura,null,null,null);
	var dialogos : Array = new Array();
	var l: LineaDialogo = new LineaDialogo("Insistencia a sacar trabajador",1);
	dialogos.Push(l); 
	var nodoRaiz:NodoDialogo = new NodoDialogo(dialogos);
	conversacionTrabajadoreTercoConserje4.setRaiz(nodoRaiz);
	l = new LineaDialogo("no acepta irse",1);
	dialogos.Push(l);
}


//Quita la barricada con la pala del 1.5
function inicializarConversacionBarricadaPuertaJefe1(textura:Texture2D){
	conversacionBarricadaPuertaJefe1 = new ArbolConversacion(textura,null,null,null);
	var dialogos : Array = new Array();
	var l: LineaDialogo = new LineaDialogo("Tenemos que aprovechar cualquier recurso, esta pala servirá para hacer palanca.",1);
	dialogos.Push(l); 
	var nodoRaiz:NodoDialogo = new NodoDialogo(dialogos);
	conversacionBarricadaPuertaJefe1.setRaiz(nodoRaiz);
}


//Mario Indica la existencia de un tubo para hacer palanca
function inicializarConversacionBarricadaPuertaJefe2(){
	conversacionBarricadaPuertaJefe2 = new ArbolConversacion(texturaMario,null,null,null);
	var dialogos : Array = new Array();
	var l: LineaDialogo = new LineaDialogo("Tendremos que hacer palanca para mover ese armario, algo largo y fuerte servira, como un tubo.",1);
	dialogos.Push(l);
	l = new LineaDialogo("Hay oficinistas aquí que diagraman tubos, seguro habrá alguno por ahí que podamos usar.",1);
	dialogos.Push(l); 
	var nodoRaiz:NodoDialogo = new NodoDialogo(dialogos);
	conversacionBarricadaPuertaJefe2.setRaiz(nodoRaiz);
}


//Se usa un tubo para hacer palanca
function inicializarConversacionBarricadaPuertaJefe3(textura:Texture2D){
	conversacionBarricadaPuertaJefe3 = new ArbolConversacion(textura,null,null,null);
	var dialogos : Array = new Array();
	var l: LineaDialogo = new LineaDialogo("Tenemos que aprovechar cualquier recurso, este tubo servirá para hacer palanca.",1);
	dialogos.Push(l); 
	var nodoRaiz:NodoDialogo = new NodoDialogo(dialogos);
	conversacionBarricadaPuertaJefe3.setRaiz(nodoRaiz);
}


//Se comenta sobre el posible uso de algun item para hacer palanca
function inicializarConversacionBarricadaPuertaJefe4(textura:Texture2D){
	conversacionBarricadaPuertaJefe4 = new ArbolConversacion(textura,null,null,null);
	var dialogos : Array = new Array();
	var l: LineaDialogo = new LineaDialogo("¿Es esto en serio? ¿Cómo vamos a levantar esta cosa sin la ayuda de Fabio?",1);
	dialogos.Push(l);
	l = new LineaDialogo("Hay que buscar algo que nos ayude para hacer palanca.",1);
	dialogos.Push(l); 
	var nodoRaiz:NodoDialogo = new NodoDialogo(dialogos);
	conversacionBarricadaPuertaJefe4.setRaiz(nodoRaiz);
}


//Si Fransisco esta en la party se indica que el puede abrir el armario
function inicializarConversacionArmarioTubos1(textura:Texture2D){
	conversacionArmarioTubos1 = new ArbolConversacion(textura,null,null,null);
	var dialogos : Array = new Array();
	var l: LineaDialogo = new LineaDialogo("El armario está sellado. Seguro Francisco sabe como lidiar con esto.",1);
	dialogos.Push(l); 
	var nodoRaiz:NodoDialogo = new NodoDialogo(dialogos);
	conversacionArmarioTubos1.setRaiz(nodoRaiz);
}


//Si Fransisco no esta en la party se indica que no se puede abrir el armario 
function inicializarConversacionArmarioTubos2(textura:Texture2D){
	conversacionArmarioTubos2 = new ArbolConversacion(textura,null,null,null);
	var dialogos : Array = new Array();
	var l: LineaDialogo = new LineaDialogo("Aquí guardan tubos, pero no podemos abrir el armario.",1);
	dialogos.Push(l); 
	var nodoRaiz:NodoDialogo = new NodoDialogo(dialogos);
	conversacionArmarioTubos2.setRaiz(nodoRaiz);
}


//Fransisco nabre el armario y se puede cojer el tubo 
function inicializarConversacionArmarioTubos3(){
	conversacionArmarioTubos3 = new ArbolConversacion(texturaFrancisco,null,null,null);
	var dialogos : Array = new Array();
	var l: LineaDialogo = new LineaDialogo("No creo que alguien extrañe estos tubos ¿O si?",1);
	dialogos.Push(l); 
	var nodoRaiz:NodoDialogo = new NodoDialogo(dialogos);
	conversacionArmarioTubos3.setRaiz(nodoRaiz);
}

//Trata abrir reja sin segueta
function inicializarConversacionRejaJefe1(textura:Texture2D){
	conversacionRejaJefe1 = new ArbolConversacion(textura,null,null,null);
	var dialogos : Array = new Array();
	var l: LineaDialogo = new LineaDialogo("Insistencia a sacar trabajador",1);
	dialogos.Push(l); 
	var nodoRaiz:NodoDialogo = new NodoDialogo(dialogos);
	conversacionRejaJefe1.setRaiz(nodoRaiz);
	l = new LineaDialogo("no acepta irse",1);
	dialogos.Push(l);
}

//Trata abrir reja sin 3 personas
function inicializarConversacionRejaJefe2(textura:Texture2D){
	conversacionRejaJefe2 = new ArbolConversacion(textura,null,null,null);
	var dialogos : Array = new Array();
	var l: LineaDialogo = new LineaDialogo("Esta reja es enorme. Vamos a tener problemas en abrirla si solo estamos nosotros.",1);
	dialogos.Push(l);
	l = new LineaDialogo("Necesitaremos por lo menos tres personas para esto, hay que buscar más ayuda.",1);
	dialogos.Push(l); 
	var nodoRaiz:NodoDialogo = new NodoDialogo(dialogos);
	conversacionRejaJefe2.setRaiz(nodoRaiz);
}


//Se abre la Reja
function inicializarConversacionRejaJefe3(textura:Texture2D){
	conversacionRejaJefe3 = new ArbolConversacion(textura,null,null,null);
	var dialogos : Array = new Array();
	var l: LineaDialogo = new LineaDialogo("Vamos todos, con fuerza, podemos abrir esto",1);
	dialogos.Push(l);
	l = new LineaDialogo("Listo con la reja, ahora a abrir la puerta de algua forma.",1);
	dialogos.Push(l); 
	var nodoRaiz:NodoDialogo = new NodoDialogo(dialogos);
	conversacionRejaJefe3.setRaiz(nodoRaiz);
}


//Mario da info sobre la existencia de una segueta en la oficina
function inicializarConversacionRejaJefe4(textura:Texture2D){
	conversacionRejaJefe4 = new ArbolConversacion(textura,null,null,null);
	var dialogos : Array = new Array();
	var l: LineaDialogo = new LineaDialogo("No puedo creerlo, hay una reja cubriendo la puerta ¿Qué clase de tipo es este jefe de sección?",1);
	dialogos.Push(l);
	l = new LineaDialogo("Hay que pasar esa reja de alguna forma. Tal vez haya algo aquí en las oficinas, uno nunca sabe.",1);
	dialogos.Push(l); 
	var nodoRaiz:NodoDialogo = new NodoDialogo(dialogos);
	conversacionRejaJefe4.setRaiz(nodoRaiz);
}


//Se encuentra la segueta en el armario
function inicializarConversacionArmariosSeguetas1(textura:Texture2D){
	conversacionArmariosSeguetas1 = new ArbolConversacion(textura,null,null,null);
	var dialogos : Array = new Array();
	var l: LineaDialogo = new LineaDialogo("Una segueta, esto es lo que necesitamos. Atravesaremos esa reja a las malas.",1);
	dialogos.Push(l); 
	var nodoRaiz:NodoDialogo = new NodoDialogo(dialogos);
	conversacionArmariosSeguetas1.setRaiz(nodoRaiz);
}


//no Se encuentra la segueta en el armario
function inicializarConversacionArmariosSeguetas2(textura:Texture2D){
	conversacionArmariosSeguetas2 = new ArbolConversacion(textura,null,null,null);
	var dialogos : Array = new Array();
	var l: LineaDialogo = new LineaDialogo("Insistencia a sacar trabajador",1);
	dialogos.Push(l); 
	var nodoRaiz:NodoDialogo = new NodoDialogo(dialogos);
	conversacionArmariosSeguetas2.setRaiz(nodoRaiz);
	l = new LineaDialogo("no acepta irse",1);
	dialogos.Push(l);
}


//Se encuentra el plano de fusibles en el armario
function inicializarConversacionArmariosFusibles(textura:Texture2D){
	conversacionArmariosFusibles = new ArbolConversacion(textura,null,null,null);
	var dialogos : Array = new Array();
	var l: LineaDialogo = new LineaDialogo("Hay algo raro en este armario ¿Qué es esto?",1);
	dialogos.Push(l); 
	var nodoRaiz:NodoDialogo = new NodoDialogo(dialogos, FUSIBLES);
	conversacionArmariosFusibles.setRaiz(nodoRaiz);
}


//No se puede abrir la puerta, no hay llave
function inicializarConversacionPuertaJefe1(textura:Texture2D){
	conversacionPuertaJefe1 = new ArbolConversacion(textura,null,null,null);
	var dialogos : Array = new Array();
	var l: LineaDialogo = new LineaDialogo("¿Por qué creí que iba a estar abierta?",1);
	dialogos.Push(l);
	l = new LineaDialogo("Esto no es una chapa cualquiera. No podemos forzar esta cerradura, se necesita la llave.",1);
	dialogos.Push(l); 
	var nodoRaiz:NodoDialogo = new NodoDialogo(dialogos);
	conversacionPuertaJefe1.setRaiz(nodoRaiz);
}


//Se la puerta con la llave abre 
function inicializarConversacionPuertaJefe2(textura:Texture2D){
	conversacionPuertaJefe2 = new ArbolConversacion(textura,null,null,null);
	var dialogos : Array = new Array();
	var l: LineaDialogo = new LineaDialogo("Bien, solo nos queda hablar con el Jefe.",1);
	dialogos.Push(l); 
	var nodoRaiz:NodoDialogo = new NodoDialogo(dialogos);
	conversacionPuertaJefe2.setRaiz(nodoRaiz);
}


//fransisco trata de abrir la puerta
function inicializarConversacionPuertaJefe3(textura:Texture2D){
	conversacionPuertaJefe3 = new ArbolConversacion(textura,null,null,null);
	var dialogos : Array = new Array();
	var l: LineaDialogo = new LineaDialogo("Insistencia a sacar trabajador",1);
	dialogos.Push(l); 
	var nodoRaiz:NodoDialogo = new NodoDialogo(dialogos);
	conversacionPuertaJefe3.setRaiz(nodoRaiz);
	l = new LineaDialogo("no acepta irse",1);
	dialogos.Push(l);
}


//Mario indica que uno de los trabajadores sabe donde esta la llave
function inicializarConversacionPuertaJefeMario(textura:Texture2D){
	conversacionPuertaJefe1 = new ArbolConversacion(textura,null,null,null);
	var dialogos : Array = new Array();
	var l: LineaDialogo = new LineaDialogo("Insistencia a sacar trabajador",1);
	dialogos.Push(l); 
	var nodoRaiz:NodoDialogo = new NodoDialogo(dialogos);
	conversacionPuertaJefe1.setRaiz(nodoRaiz);
	l = new LineaDialogo("no acepta irse",1);
	dialogos.Push(l);
}


//Conversacion jefe
function inicializarConversacionJefe(){
	conversacionJefe = new ArbolConversacion(texturaDario,texturaJefe,texturaDarioSombreada,texturaJefeSombreada);
	var dialogos : Array = new Array();
	var l: LineaDialogo = new LineaDialogo("Crei haber dejado muy claro que no queria que me interrumpieran\n ¡Vuelva a trabajar! ",2);
	dialogos.Push(l);
	l = new LineaDialogo("No soy empleado. Vengo a ayudarle a salir, y a todos los oficinistas del lugar",1);
	dialogos.Push(l);
	l = new LineaDialogo("¿Acaso está loco? Deje de hacerme perder el tiempo, estoy trabajando.",2);
	dialogos.Push(l);
	l = new LineaDialogo("¿No es conciente que el edificio está a punto de caer? Tiene que dar la orden de evacuación.",1);
	dialogos.Push(l);
	l = new LineaDialogo("¿Es algún tipo de broma? Usted es de la competencia, quiere hacerme perder dinero.",2);
	dialogos.Push(l);
	l = new LineaDialogo("¡Deje de decir estupideces! Si no me cree, salgo y mire por usted mismo.",1);
	dialogos.Push(l);
	l = new LineaDialogo("¡El edificio completo está en llamas! ¡Tengo que salir rápido de aquí!",2);
	dialogos.Push(l);
	l = new LineaDialogo("¡Espere un momento, dé la orden de evacuación!",1);
	dialogos.Push(l);
	l = new LineaDialogo("No hay tiempo, el helicoptero debe estar por irse",2);
	dialogos.Push(l);
	l = new LineaDialogo("¡No!...¡Espere!...¡Ese hombre nos acaba de matar a todos!",1);
	dialogos.Push(l); 
	var nodoRaiz:NodoDialogo = new NodoDialogo(dialogos, FINAL_JEFE);
	conversacionJefe.setRaiz(nodoRaiz);
}


//Conversacion Caja Fuerte mario
function inicializarConversacionCajaFuerteMario(){
	conversacionCajaFuerteMario = new ArbolConversacion(texturaMario,null,null,null);
	var dialogos : Array = new Array();
	var l: LineaDialogo = new LineaDialogo("En esta caja se guardan algunas cosas importantes, por eso es electrónica.",1);
	dialogos.Push(l);
	l = new LineaDialogo("El concerje carga con el código de la caja ¿Dónde pordrá estar ese tipo?",1);
	dialogos.Push(l); 
	var nodoRaiz:NodoDialogo = new NodoDialogo(dialogos);
	conversacionCajaFuerteMario.setRaiz(nodoRaiz);
} 



//Conversacion Trabajador llamas
function inicializarConversacionTrabajadorEnPeligroLLamas(textura:Texture2D, texturaSombreada:Texture2D){
	conversacionTrabajadorEnPeligroLLamas = new ArbolConversacion(textura,texturaOficinista,texturaSombreada,texturaOficinistaSombreada);
	var dialogos : Array = new Array();
	var l: LineaDialogo = new LineaDialogo("¡¡AYUDA!! ¡¡FUEGO!! ¡¡ME QUÉMO!!",2);
	dialogos.Push(l);
	l = new LineaDialogo("Tranquilícece, no hay ningún peligro. Solo salte hacia aquí.",1);
	dialogos.Push(l);
	l = new LineaDialogo("¡¡¿ESTÁ LOCO?!!",2);
	dialogos.Push(l);
	l = new LineaDialogo("No se preocupe, lo recibiremos y nos ocuparemos de usted.\n¡Dese prisa o será muy tarde!",1);
	dialogos.Push(l);
	l = new LineaDialogo("¡¡MUY BIEN, AQUÍ VOY!!",2);
	dialogos.Push(l); 
	var nodoRaiz:NodoDialogo = new NodoDialogo(dialogos, TRABAJADOR_FUEGO);
	conversacionTrabajadorEnPeligroLLamas.setRaiz(nodoRaiz);
} 

//Conversacion Trabajador llamas Extintor
function inicializarConversacionTrabajadorEnPeligroLLamasExtintor(textura:Texture2D, texturaSombreada:Texture2D){
	conversacionTrabajadorEnPeligroLLamasExtintor = new ArbolConversacion(textura,texturaOficinista,texturaSombreada,texturaOficinistaSombreada);
	var dialogos : Array = new Array();
	var l: LineaDialogo = new LineaDialogo("¡¡AYUDA!! ¡¡FUEGO!! ¡¡ME QUÉMO!!",2);
	dialogos.Push(l);
	l = new LineaDialogo("Tranquilo, tranquilo. Apagaremos esto en un instante, no se desespere.",1);
	dialogos.Push(l); 
	var nodoRaiz:NodoDialogo = new NodoDialogo(dialogos);
	conversacionTrabajadorEnPeligroLLamasExtintor.setRaiz(nodoRaiz);
} 

//Conversacion Trabajador llamas Curar
function inicializarConversacionTrabajadorEnPeligroLLamasCurar(){
	conversacionTrabajadorEnPeligroLLamasCurar = new ArbolConversacion(texturaDiana,texturaOficinista,texturaDianaSombreada,texturaOficinistaSombreada);
	var dialogos : Array = new Array();
	var l: LineaDialogo = new LineaDialogo("Listo, no hubo mayor problema.",1);
	dialogos.Push(l);
	l = new LineaDialogo("Gracias, es usted un ángel.",2);
	dialogos.Push(l);
	l = new LineaDialogo("No se preocupe. Solo queda ayudar a sus compañeros.",1);
	dialogos.Push(l);
	l = new LineaDialogo("Claro. Si reune a más de nosotros, tal vez podamos convencer a los que no se \nquieren mover de aquí.",2);
	dialogos.Push(l);
	l = new LineaDialogo("Es una buena idea, buscaremos  más personas que necesiten ayuda.",1);
	dialogos.Push(l); 
	var nodoRaiz:NodoDialogo = new NodoDialogo(dialogos);
	conversacionTrabajadorEnPeligroLLamasCurar.setRaiz(nodoRaiz);
} 

//Conversacion Trabajador llamas Curar no diana
function inicializarConversacionTrabajadorEnPeligroLLamasNoDiana(textura:Texture2D, texturaSombreada:Texture2D){
	conversacionTrabajadorEnPeligroLLamasNoDiana = new ArbolConversacion(texturaDiana,texturaOficinista,texturaDianaSombreada,texturaOficinistaSombreada);
	var dialogos : Array = new Array();
	var l: LineaDialogo = new LineaDialogo("¡DIOS, DUELE MUCHO!",2);
	dialogos.Push(l);
	l = new LineaDialogo("(No tenemos nada con que curarlo)",1);
	dialogos.Push(l);
	l = new LineaDialogo("(Creo que debímos pensar esto mejor)",1);
	dialogos.Push(l); 
	var nodoRaiz:NodoDialogo = new NodoDialogo(dialogos);
	conversacionTrabajadorEnPeligroLLamasNoDiana.setRaiz(nodoRaiz);
} 


//Conversacion Trabajador llamas no botiquin
function InicializarConversacionTrabajadorEnPeligroLLamasNoBotiquin(textura:Texture2D, texturaSombreada:Texture2D){
	conversacionTrabajadorEnPeligroLLamasNoBotiquin = new ArbolConversacion(textura,texturaOficinista,texturaSombreada,texturaOficinistaSombreada);
	var dialogos : Array = new Array();
	var l: LineaDialogo = new LineaDialogo("Ya pasó lo peor, no se preocupe",1);
	dialogos.Push(l);
	l = new LineaDialogo("!DIOS, DUELE MUCHO!",2);
	dialogos.Push(l);
	l = new LineaDialogo("No se angustie. Conseguiremos un botiquin, y Diana lo ayudará en un santiamén.",1);
	dialogos.Push(l); 
	var nodoRaiz:NodoDialogo = new NodoDialogo(dialogos);
	conversacionTrabajadorEnPeligroLLamasNoBotiquin.setRaiz(nodoRaiz);
} 

//Conversacion Trabajador llamas Curar  dianaen party
function inicializarConversacionTrabajadorEnPeligroLLamasDianaEnParty(textura:Texture2D){
	conversacionTrabajadorEnPeligroLLamasDianaEnParty = new ArbolConversacion(textura,null,null,null);
	var dialogos : Array = new Array();
	var l: LineaDialogo = new LineaDialogo("Insistencia a sacar trabajador",1);
	dialogos.Push(l); 
	var nodoRaiz:NodoDialogo = new NodoDialogo(dialogos);
	conversacionTrabajadorEnPeligroLLamasDianaEnParty.setRaiz(nodoRaiz);
	l = new LineaDialogo("no acepta irse",1);
	dialogos.Push(l);
} 


//Conversacion locker botiquin
function InicializarConversacionBotiquinLocker(){
	conversacionBotiquinLocker = new ArbolConversacion(texturaMario,null,null,null);
	var dialogos : Array = new Array();
	var l: LineaDialogo = new LineaDialogo("Aquí hay material para primeros auxilios",1);
	dialogos.Push(l);
	l = new LineaDialogo("Alguien que sepa abrir cerraduras nos puede ayudar.",1);
	dialogos.Push(l); 
	var nodoRaiz:NodoDialogo = new NodoDialogo(dialogos);
	conversacionBotiquinLocker.setRaiz(nodoRaiz);
	
} 

//Conversacion locker botiquin sin fransisco
function inicializarConversacionBotiquinLockerNoFrancisco(textura:Texture2D){
	conversacionBotiquinLockerNoFrancisco = new ArbolConversacion(textura,null,null,null);
	var dialogos : Array = new Array();
	var l: LineaDialogo = new LineaDialogo("Creo que aquí hay primeros auxilios, pero ¿Cómo lo abro?",1);
	dialogos.Push(l); 
	var nodoRaiz:NodoDialogo = new NodoDialogo(dialogos);
	conversacionBotiquinLockerNoFrancisco.setRaiz(nodoRaiz);

} 



//Conversacion locker botiquin fransisco en party
function inicializarConversacionBotiquinLockerFranciscoEnParty(textura:Texture2D){
	conversacionBotiquinLockerFranciscoEnParty = new ArbolConversacion(textura,null,null,null);
	var dialogos : Array = new Array();
	var l: LineaDialogo = new LineaDialogo("Si un botiquin es lo que necesitan, un botiquin les consigo",1);
	dialogos.Push(l); 
	var nodoRaiz:NodoDialogo = new NodoDialogo(dialogos);
	conversacionBotiquinLockerFranciscoEnParty.setRaiz(nodoRaiz);
} 

//Conversacion trabajador herido
function inicializarConversacionTrabajadorEnPeligroHerido(textura:Texture2D){
	conversacionTrabajadorEnPeligroHerido = new ArbolConversacion(textura,null,null,null);
	var dialogos : Array = new Array();
	var l: LineaDialogo = new LineaDialogo("Insistencia a sacar trabajador",1);
	dialogos.Push(l); 
	var nodoRaiz:NodoDialogo = new NodoDialogo(dialogos);
	conversacionTrabajadorEnPeligroHerido.setRaiz(nodoRaiz);
	l = new LineaDialogo("no acepta irse",1);
	dialogos.Push(l);
}

//Conversacion trabajador herido no diana no toalla
function inicializarConversacionTrabajadorEnPeligroHeridoNoDianaNoToalla(textura:Texture2D){
	conversacionTrabajadorEnPeligroHeridoNoDianaNoToalla = new ArbolConversacion(textura,null,null,null);
	var dialogos : Array = new Array();
	var l: LineaDialogo = new LineaDialogo("Insistencia a sacar trabajador",1);
	dialogos.Push(l); 
	var nodoRaiz:NodoDialogo = new NodoDialogo(dialogos);
	conversacionTrabajadorEnPeligroHeridoNoDianaNoToalla.setRaiz(nodoRaiz);
	l = new LineaDialogo("no acepta irse",1);
	dialogos.Push(l);
} 

//Conversacion trabajador herido diana en party
function inicializarConversacionTrabajadorEnPeligroHeridoDianaEnParty(textura:Texture2D){
	conversacionTrabajadorEnPeligroHeridoDianaEnParty = new ArbolConversacion(textura,null,null,null);
	var dialogos : Array = new Array();
	var l: LineaDialogo = new LineaDialogo("Insistencia a sacar trabajador",1);
	dialogos.Push(l); 
	var nodoRaiz:NodoDialogo = new NodoDialogo(dialogos);
	conversacionTrabajadorEnPeligroHeridoDianaEnParty.setRaiz(nodoRaiz);
	l = new LineaDialogo("no acepta irse",1);
	dialogos.Push(l);
}

//Conversacion trabajador herido curar diana
function InicializarConversacionTrabajadorEnPeligroHeridoDiana(textura:Texture2D){
	conversacionTrabajadorEnPeligroHeridoDiana = new ArbolConversacion(textura,null,null,null);
	var dialogos : Array = new Array();
	var l: LineaDialogo = new LineaDialogo("Insistencia a sacar trabajador",1);
	dialogos.Push(l); 
	var nodoRaiz:NodoDialogo = new NodoDialogo(dialogos);
	conversacionTrabajadorEnPeligroHeridoDiana.setRaiz(nodoRaiz);
	l = new LineaDialogo("no acepta irse",1);
	dialogos.Push(l);
} 

//Conversacion trabajador herido curar toalla
function inicializarConversacionTrabajadorEnPeligroHeridoToalla(textura:Texture2D){
	conversacionTrabajadorEnPeligroHeridoToalla = new ArbolConversacion(textura,null,null,null);
	var dialogos : Array = new Array();
	var l: LineaDialogo = new LineaDialogo("Insistencia a sacar trabajador",1);
	dialogos.Push(l); 
	var nodoRaiz:NodoDialogo = new NodoDialogo(dialogos);
	conversacionTrabajadorEnPeligroHeridoToalla.setRaiz(nodoRaiz);
	l = new LineaDialogo("no acepta irse",1);
	dialogos.Push(l);
}

//Conversacion trabajador desmayado
function inicializarConversacionTrabajadorEnPeligroDesmayado(textura:Texture2D){
	conversacionTrabajadorEnPeligroDesmayado = new ArbolConversacion(textura,null,null,null);
	var dialogos : Array = new Array();
	var l: LineaDialogo = new LineaDialogo("Insistencia a sacar trabajador",1);
	dialogos.Push(l); 
	var nodoRaiz:NodoDialogo = new NodoDialogo(dialogos);
	conversacionTrabajadorEnPeligroDesmayado.setRaiz(nodoRaiz);
	l = new LineaDialogo("no acepta irse",1);
	dialogos.Push(l);
} 

//Conversacion trabajador desmayado mario
function InicializarConversacionTrabajadorEnPeligroDesmayadoMario(textura:Texture2D){
	conversacionTrabajadorEnPeligroDesmayadoMario = new ArbolConversacion(textura,null,null,null);
	var dialogos : Array = new Array();
	var l: LineaDialogo = new LineaDialogo("Insistencia a sacar trabajador",1);
	dialogos.Push(l); 
	var nodoRaiz:NodoDialogo = new NodoDialogo(dialogos);
	conversacionTrabajadorEnPeligroDesmayadoMario.setRaiz(nodoRaiz);
	l = new LineaDialogo("no acepta irse",1);
	dialogos.Push(l);
}

//Conversacion trabajador desmayado diana
function InicializarConversacionTrabajadorEnPeligroDesmayadoDiana(textura:Texture2D){
	conversacionTrabajadorEnPeligroDesmayadoDiana = new ArbolConversacion(textura,null,null,null);
	var dialogos : Array = new Array();
	var l: LineaDialogo = new LineaDialogo("Insistencia a sacar trabajador",1);
	dialogos.Push(l); 
	var nodoRaiz:NodoDialogo = new NodoDialogo(dialogos);
	conversacionTrabajadorEnPeligroDesmayadoDiana.setRaiz(nodoRaiz);
	l = new LineaDialogo("no acepta irse",1);
	dialogos.Push(l);
} 

//Conversacion trabajador desmayado diana en party
function inicializarConversacionTrabajadorEnPeligroDesmayadoDianaEnParty(textura:Texture2D){
	conversacionTrabajadorEnPeligroDesmayadoDianaEnParty = new ArbolConversacion(textura,null,null,null);
	var dialogos : Array = new Array();
	var l: LineaDialogo = new LineaDialogo("Insistencia a sacar trabajador",1);
	dialogos.Push(l); 
	var nodoRaiz:NodoDialogo = new NodoDialogo(dialogos);
	conversacionTrabajadorEnPeligroDesmayadoDianaEnParty.setRaiz(nodoRaiz);
	l = new LineaDialogo("no acepta irse",1);
	dialogos.Push(l);
}

//Conversacion trabajador desmayado inhalador
function inicializarConversacionTrabajadorEnPeligroDesmayadoInhalador(textura:Texture2D){
	conversacionTrabajadorEnPeligroDesmayadoInhalador = new ArbolConversacion(textura,null,null,null);
	var dialogos : Array = new Array();
	var l: LineaDialogo = new LineaDialogo("Insistencia a sacar trabajador",1);
	dialogos.Push(l); 
	var nodoRaiz:NodoDialogo = new NodoDialogo(dialogos);
	conversacionTrabajadorEnPeligroDesmayadoInhalador.setRaiz(nodoRaiz);
	l = new LineaDialogo("no acepta irse",1);
	dialogos.Push(l);
} 

//Conversacion locker inhalador
function InicializarConversacionLockerInhalador(textura:Texture2D){
	conversacionLockerInhalador = new ArbolConversacion(textura,null,null,null);
	var dialogos : Array = new Array();
	var l: LineaDialogo = new LineaDialogo("Insistencia a sacar trabajador",1);
	dialogos.Push(l); 
	var nodoRaiz:NodoDialogo = new NodoDialogo(dialogos);
	conversacionLockerInhalador.setRaiz(nodoRaiz);
	l = new LineaDialogo("no acepta irse",1);
	dialogos.Push(l);
}

//Conversacion locker inhalador fransisco en party
function inicializarConversacionLockerInhaladorFranciscoEnParty(textura:Texture2D){
	conversacionLockerInhaladorFranciscoEnParty = new ArbolConversacion(textura,null,null,null);
	var dialogos : Array = new Array();
	var l: LineaDialogo = new LineaDialogo("Insistencia a sacar trabajador",1);
	dialogos.Push(l); 
	var nodoRaiz:NodoDialogo = new NodoDialogo(dialogos);
	conversacionLockerInhaladorFranciscoEnParty.setRaiz(nodoRaiz);
	l = new LineaDialogo("no acepta irse",1);
	dialogos.Push(l);
} 

//Conversacion locker inhalador no fransisco
function inicializarConversacionLockerInhaladorNoFrancisco(textura:Texture2D){
	conversacionLockerInhaladorNoFrancisco = new ArbolConversacion(textura,null,null,null);
	var dialogos : Array = new Array();
	var l: LineaDialogo = new LineaDialogo("Insistencia a sacar trabajador",1);
	dialogos.Push(l); 
	var nodoRaiz:NodoDialogo = new NodoDialogo(dialogos);
	conversacionLockerInhaladorNoFrancisco.setRaiz(nodoRaiz);
	l = new LineaDialogo("no acepta irse",1);
	dialogos.Push(l);
}

//Conversacion salida jefe
function inicializarConversacionSalidaJefe(textura:Texture2D){
	conversacionSalidaJefe = new ArbolConversacion(textura,null,null,null);
	var dialogos : Array = new Array();
	var l: LineaDialogo = new LineaDialogo("Insistencia a sacar trabajador",1);
	dialogos.Push(l); 
	var nodoRaiz:NodoDialogo = new NodoDialogo(dialogos);
	conversacionSalidaJefe.setRaiz(nodoRaiz);
	l = new LineaDialogo("no acepta irse",1);
	dialogos.Push(l);
} 

//Conversacion salida trabajadores
function inicializarConversacionSalidaTrabajadores(textura:Texture2D){
	conversacionSalidaTrabajadores = new ArbolConversacion(textura,null,null,null);
	var dialogos : Array = new Array();
	var l: LineaDialogo = new LineaDialogo("Insistencia a sacar trabajador",1);
	dialogos.Push(l); 
	var nodoRaiz:NodoDialogo = new NodoDialogo(dialogos);
	conversacionSalidaTrabajadores.setRaiz(nodoRaiz);
	l = new LineaDialogo("no acepta irse",1);
	dialogos.Push(l);
}


//Conversacion salida solo
function inicializarConversacionSalidaSolo(textura:Texture2D){
	conversacionSalidaSolo = new ArbolConversacion(textura,null,null,null);
	var dialogos : Array = new Array();
	var l: LineaDialogo = new LineaDialogo("Insistencia a sacar trabajador",1);
	dialogos.Push(l); 
	var nodoRaiz:NodoDialogo = new NodoDialogo(dialogos);
	conversacionSalidaSolo.setRaiz(nodoRaiz);
	l = new LineaDialogo("no acepta irse",1);
	dialogos.Push(l);
} 

//Conversacion teniendo a diana selecionada para el trabajador herido
function inicializarConversacionTrabajadorEnPeligroHeridoDiana(textura:Texture2D){
	conversacionTrabajadorEnPeligroHeridoDiana = new ArbolConversacion(textura,null,null,null);
	var dialogos : Array = new Array();
	var l: LineaDialogo = new LineaDialogo("Insistencia a sacar trabajador",1);
	dialogos.Push(l); 
	var nodoRaiz:NodoDialogo = new NodoDialogo(dialogos);
	conversacionTrabajadorEnPeligroHeridoDiana.setRaiz(nodoRaiz);
	l = new LineaDialogo("no acepta irse",1);
	dialogos.Push(l);
}


//Conversacion teniendo a Francisco selecionada para el botiquin
function inicializarConversacionBotiquinLocker(){
	conversacionBotiquinLocker = new ArbolConversacion(texturaMario,null,null,null);
	var dialogos : Array = new Array();
	var l: LineaDialogo = new LineaDialogo("Aquí hay primeros auxilios.",1);
	dialogos.Push(l);
	l = new LineaDialogo("Nos seria de mucha ayuda que alguien supiera abrir cerraduras.",1);
	dialogos.Push(l); 
	var nodoRaiz:NodoDialogo = new NodoDialogo(dialogos);
	conversacionBotiquinLocker.setRaiz(nodoRaiz);
} 

//Conversacion teniendo a diana selecionada para el trabajador desmayado
function inicializarConversacionTrabajadorEnPeligroDesmayadoDiana(textura:Texture2D){
	conversacionTrabajadorEnPeligroDesmayadoDiana = new ArbolConversacion(textura,null,null,null);
	var dialogos : Array = new Array();
	var l: LineaDialogo = new LineaDialogo("Insistencia a sacar trabajador",1);
	dialogos.Push(l); 
	var nodoRaiz:NodoDialogo = new NodoDialogo(dialogos);
	conversacionTrabajadorEnPeligroDesmayadoDiana.setRaiz(nodoRaiz);
	l = new LineaDialogo("no acepta irse",1);
	dialogos.Push(l);
}

//Conversacion teniendo a mario selecionada para el trabajador desmayado
function inicializarConversacionTrabajadorEnPeligroDesmayadoMario(textura:Texture2D){
	conversacionTrabajadorEnPeligroDesmayadoMario = new ArbolConversacion(textura,null,null,null);
	var dialogos : Array = new Array();
	var l: LineaDialogo = new LineaDialogo("Insistencia a sacar trabajador",1);
	dialogos.Push(l); 
	var nodoRaiz:NodoDialogo = new NodoDialogo(dialogos);
	conversacionTrabajadorEnPeligroDesmayadoMario.setRaiz(nodoRaiz);
	l = new LineaDialogo("no acepta irse",1);
	dialogos.Push(l);
}

//Conversacion en el locker teniendo a fransisco seleccionado
function inicializarConversacionLockerInhalador(textura:Texture2D){
	conversacionLockerInhalador = new ArbolConversacion(textura,null,null,null);
	var dialogos : Array = new Array();
	var l: LineaDialogo = new LineaDialogo("Insistencia a sacar trabajador",1);
	dialogos.Push(l); 
	var nodoRaiz:NodoDialogo = new NodoDialogo(dialogos);
	conversacionLockerInhalador.setRaiz(nodoRaiz);
	l = new LineaDialogo("no acepta irse",1);
	dialogos.Push(l);
}

// Información de Mario en la reja
function inicializarConversacionRejaMario(){
	conversacionRejaMario = new ArbolConversacion(texturaMario,null,null,null);
	var dialogos : Array = new Array();
	var l: LineaDialogo = new LineaDialogo("Esta reja no está tan gruesa, tal vez se pueda romper.",1);
	dialogos.Push(l);
	l = new LineaDialogo("Sé que hay gente que guarda seguetas en sus armarios de oficina, debemos de encontrar alguna si buscamos.",1);
	dialogos.Push(l); 
	var nodoRaiz:NodoDialogo = new NodoDialogo(dialogos);
	conversacionRejaMario.setRaiz(nodoRaiz);	
}

 // Exito al ingresar el codigo de la caja fuerte
function inicializarConversacionCajaExito(textura:Texture2D){
	conversacionCajaExito = new ArbolConversacion(textura,null,null,null);
	var dialogos : Array = new Array();
	var l: LineaDialogo = new LineaDialogo("Aquí está la llave, ya podemos hablar con ese jefe de una buena vez.",1);
	dialogos.Push(l); 
	var nodoRaiz:NodoDialogo = new NodoDialogo(dialogos);
	conversacionCajaExito.setRaiz(nodoRaiz);	
} 

// Información de mArio sobre la puerta con llave
function inicializarConversacionPuertaJefeMario(){
	conversacionPuertaJefeMario = new ArbolConversacion(texturaMario,null,null,null);
	var dialogos : Array = new Array();
	var l: LineaDialogo = new LineaDialogo("Esta puerta solo abre con la llave maestra del conserje.",1);
	dialogos.Push(l);
	l = new LineaDialogo("Esa llave debe estar escondida y asegurada en alguna parte de la oficina.",1);
	dialogos.Push(l);  
	var nodoRaiz:NodoDialogo = new NodoDialogo(dialogos);
	conversacionPuertaJefeMario.setRaiz(nodoRaiz);	
}   