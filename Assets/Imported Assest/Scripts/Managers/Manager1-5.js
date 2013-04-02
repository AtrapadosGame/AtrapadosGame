#pragma strict
//Ojo, para evitar problemas en el nivel 1-5A:
// Dario --> Player1
	private static final var NUM_FLAGS : int = 33;
	private var act_Player : GameObject;
	private var startTime : float;
	//Conversaciones y textos
	private var flagsDialogos : boolean[];
	//Flags de control
	
	//Texturas
	var cinematicas : Texture2D[] = new Texture2D[5];
	
	
	function Start () {
		flagsDialogos = new boolean[NUM_FLAGS];
		for(var i : int = 0; i < NUM_FLAGS; i++){
			flagsDialogos[i] = false;
		}
	}

	function Update() {
		act_Player = GetComponent(Player_Manager).darActual();	
	}
	
	function OnGUI(){

	}
	
	//Implementación de la función Trigger()
	function EventTrigger(objName : String){
		var managerDialogos = GetComponent(ManagerDialogos1p5A);
		
		
	}
	
	//Imlementación de la funcion Switch()
	function EventSwitch(comando : String){
		var habID;
		var managerDialogos = GetComponent(ManagerDialogos1p5A);
		
	
	}
	
	//Implementación de la funcion Item() de la interfaz
	function EventItem(objName : String){
		
	}
	
	function DarCinematica(index : int){
		return cinematicas[index];
	}