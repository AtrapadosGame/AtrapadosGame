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
	var managerDialogos = GetComponent(ManagerDialogos1_5);
	
	if(comando.Equals("test")){
	
	managerDialogos.empezarDialogos(ManagerDialogos1_5.CONVERSACION_DIANA);
	
	}
	
}

//Implementación de la funcion Item() de la interfaz
function EventItem(objName : String){
	
}

function DarCinematica(index : int){
	return cinematicas[index];
}