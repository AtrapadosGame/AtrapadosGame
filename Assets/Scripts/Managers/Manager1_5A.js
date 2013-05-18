#pragma strict
//Ojo, para evitar problemas en el nivel 1.5:
// Dario --> Player1
private var act_Player : GameObject;
//Flags de control

//Texturas
var cinematicas : Texture2D[] = new Texture2D[5];


function Start () {

}

function Update() {
	act_Player = GetComponent(Player_Manager).darActual();
}

function OnGUI(){

}

//Implementación de la función Trigger()
function EventTrigger(objName : String){
	
}

//Imlementación de la funcion Switch()
function EventSwitch(comando : String){
	var managerDialogos = GetComponent(ManagerDialogos1_5A);
	
	if(comando.Equals("Diana")){
	
	managerDialogos.empezarDialogos(ManagerDialogos1_5A.CONVERSACION_DIANA);
	
	}
	
	if(comando.Equals("Fabio")){
	
	managerDialogos.empezarDialogos(ManagerDialogos1_5A.CONVERSACION_FABIO);
	
	}
	
	if(comando.Equals("Cristina")){
	
	managerDialogos.empezarDialogos(ManagerDialogos1_5A.CONVERSACION_CRISTINA);
	
	}
	
	if(comando.Equals("Mario")){
	
	managerDialogos.empezarDialogos(ManagerDialogos1_5A.CONVERSACION_MARIO);
	
	}
	
	if(comando.Equals("Francisco")){
	
	managerDialogos.empezarDialogos(ManagerDialogos1_5A.CONVERSACION_FRANCISCO);
	
	}
	
}

//Implementación de la funcion Item() de la interfaz
function EventItem(objName : String){
	
}

function DarCinematica(index : int){
	return cinematicas[index];
}