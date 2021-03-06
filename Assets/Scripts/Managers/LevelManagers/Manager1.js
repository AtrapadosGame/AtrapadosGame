#pragma strict
//Ojo, para evitar problemas en el nivel 1:
// Dario --> Player1
// Fabio --> Player2
// Diana --> Player3
// Cristina --> Player4


// ================================================================================
// Variables
// ================================================================================

private var currentPlayer : Player;
private var managerDialogos: ManagerDialogos1;
private var inventario : InventarioManager;
private var playerManager : Player_Manager;

private var cinematica1 : boolean = false;//Derrumbe fabio-dario
private var cinematica2 : boolean = false;//Curar Cristina
private var cinematica3 : boolean = false;//Cristina puerta emergencia

// ================================================================================
// Texturas
// ================================================================================
var customSkin: GUISkin;

var cinematicas : Texture2D[] = new Texture2D[5];

//Objetos
var texturaLlave : Texture2D;
var texturaBotiquin : Texture2D;

//Players
var texturaCursorDario : Texture2D;
var texturaCursorCristina : Texture2D;
var texturaCursorFabio : Texture2D;
var texturaCursorDiana : Texture2D;

var texturaCuadroDario : Texture2D;
var texturaCuadroCristina : Texture2D;
var texturaCuadroFabio : Texture2D;
var texturaCuadroDiana : Texture2D;



public var onPause : boolean = false;
public var siguienteNivel : String;

// ================================================================================
// Start
// ================================================================================

function Awake () {
	
	inventario =  GetComponent(InventarioManager);
	playerManager = GetComponent(Player_Manager);
	
	
	playerManager.addPlayer(new Player(texturaCuadroDario,Player_Manager.DARIO, "Dario" , texturaCursorDario));
	GameObject.Find("Cristina").renderer.enabled = false;
	GameObject.Find("Cristina").collider.enabled = false;
	GameObject.Find("Derrumbe").renderer.enabled = false;
	GameObject.Find("Derrumbe").collider.enabled = false;
	GameObject.Find("Derrumbe2").renderer.enabled = false;
	GameObject.Find("Derrumbe2").collider.enabled = false;
	managerDialogos = GetComponent(ManagerDialogos1);
	
}


// ================================================================================
// Update
// ================================================================================



// ================================================================================
// OnGUI
// ================================================================================

function OnGUI(){

	GUI.skin = customSkin;
	if(cinematica1){
		GUI.Box (Rect (0,0, Screen.width, Screen.height),"");
		GUI.Label (Rect (150,0, Screen.width, Screen.height), cinematicas[0]);
	}
	if(cinematica2){
	GUI.Box (Rect (0,0, Screen.width, Screen.height),"");
		GUI.Label (Rect (150,0, Screen.width, Screen.height), cinematicas[1]);
	}
	if(cinematica3){
		GUI.Box (Rect (0,0, Screen.width, Screen.height),"");
		GUI.Label (Rect (150,0, Screen.width, Screen.height), cinematicas[2]);
	}
}

// ================================================================================
// Manejo de los eventos de triggers(Activados por Areas)(Llamado por interactorTrigger_)
// ================================================================================

//Implementación de la función Trigger()
function EventTrigger(objName : String){
	currentPlayer = playerManager.getCurrentPlayer();
	
	
	if(objName.Equals("Inicio")){
		managerDialogos.empezarDialogos(ManagerDialogos1.CONVERSACION_DARIO1);
		//GameObject.Find("InicioTrigger").GetComponent(Interactor_Trigger).apagar();
		
	}
	
	if(objName.Equals("Auxilio")){
		var target : Vector3 = new Vector3(currentPlayer.getGameObject().transform.position.x - 0.5,currentPlayer.getGameObject().transform.position.y,currentPlayer.getGameObject().transform.position.z);
		currentPlayer.getGameObject().GetComponent(MoverClick).SetTargetPosition(target);
		managerDialogos.empezarDialogos(ManagerDialogos1.CONVERSACION_WORLD1);
		
	}
	
	if(objName.Equals("Ayuda")){
	print("Ayuda");
		var target2 : Vector3 = new Vector3(currentPlayer.getGameObject().transform.position.x + 0.5,currentPlayer.getGameObject().transform.position.y,currentPlayer.getGameObject().transform.position.z);
		currentPlayer.getGameObject().GetComponent(MoverClick).SetTargetPosition(target2);
		managerDialogos.empezarDialogos(ManagerDialogos1.CONVERSACION_WORLD2);

	}
	
	if(objName.Equals("Fabio")){
		var target3 : Vector3 = new Vector3(currentPlayer.getGameObject().transform.position.x - 1,currentPlayer.getGameObject().transform.position.y,currentPlayer.getGameObject().transform.position.z);
		currentPlayer.getGameObject().GetComponent(MoverClick).SetTargetPosition(target3);
		yield WaitForSeconds(1);
		managerDialogos.empezarDialogos(ManagerDialogos1.CONVERSACION_FABIO_DARIO1);
		//GameObject.Find("FabioTrigger").GetComponent(Interactor_Trigger).apagar();
		yield WaitForSeconds(2);
		var der = GameObject.Find("Derrumbe");
		der.renderer.enabled = true;
		der.collider.enabled = true;
		der.audio.Play();
		yield WaitForSeconds(1);
		//managerDialogos.empezarDialogos(ManagerDialogos1.CONVERSACION_WORLD3);
		playerManager.addPlayer(new Player(texturaCuadroFabio,Player_Manager.FABIO, "Fabio" , texturaCursorFabio));
		
		var pl : GameObject = GameObject.Find("Fabio");
		pl.AddComponent(MoverClick);
		pl.GetComponent(MoverClick).inicializarValores(0.1,1.5);
		pl.renderer.enabled = false;
		pl.collider.enabled = false;	
		
		
		
	}
	
	if(objName.Equals("Salida")){
		var fabio : boolean = playerManager.estaPersonaje(Player_Manager.FABIO);
		var diana : boolean = playerManager.estaPersonaje(Player_Manager.DIANA);
		var cris : boolean = playerManager.estaPersonaje(Player_Manager.CRISTINA);
		if(fabio && diana && cris){
			managerDialogos.empezarDialogos(ManagerDialogos1.CONVERSACION_PLAYER5);
			GameObject.Find("SalidaATrigger").GetComponent(Interactor_Trigger).apagar();
			Destroy(GameObject.Find("LuzSalidaA"));
		}
		else{
			managerDialogos.empezarDialogos(ManagerDialogos1.CONVERSACION_PLAYER4);
			GameObject.Find("SalidaATrigger").GetComponent(Interactor_Trigger).Reactivar();
		}
	}
	
	if(objName.Equals("Salida2")){
		fabio = playerManager.estaPersonaje(Player_Manager.FABIO);
		diana = playerManager.estaPersonaje(Player_Manager.DIANA);
		cris = playerManager.estaPersonaje(Player_Manager.CRISTINA);
		
		if(fabio && diana && cris){
			
			var der2 = GameObject.Find("Derrumbe2");
			der2.renderer.enabled = true;
			der2.collider.enabled = true;
			der2.audio.Play();
			managerDialogos.empezarDialogos(ManagerDialogos1.CONVERSACION_PLAYER6);
			GameObject.Find("LuzSalidaB").transform.position = new Vector3(-10.3,0.5,-12);
		}
		else{
			managerDialogos.empezarDialogos(ManagerDialogos1.CONVERSACION_PLAYER4);
			GameObject.Find("SalidaBTrigger").GetComponent(Interactor_Trigger).Reactivar();
		}
	}
	
	if(objName.Equals("Final")){
		managerDialogos.empezarDialogos(ManagerDialogos1.CONVERSACION_PLAYER11);
		
	}
	
	if(objName.Equals("Fantasma")){
		var fantasma : GameObject = GameObject.Find("Fantasma");
		fantasma.GetComponent(TrasladarHorizontal).activar();
		managerDialogos.empezarDialogos(ManagerDialogos1.CONVERSACION_PLAYER15);
		yield WaitForSeconds(3);
		fantasma.GetComponent(TrasladarHorizontal).desactivar();
		GameObject.Find("FantasmaTrigger").GetComponent(Interactor_Trigger).apagar();
	}
}


// ================================================================================
// Manejo de eventos por Click(Llamado por Interactor Click)
// ================================================================================

//Imlementación de la funcion Switch()
function EventSwitch(comando : String){
currentPlayer = playerManager.getCurrentPlayer();
	
	
	//Caja donde esta la llave
	if(comando.Equals("Caja")){
		
		//Aca se consigue la llave de la puerta
		GameObject.Find("CajaLlave").GetComponent(Interactor_Click).FlagOff();
		inventario.addItem(new Item(texturaLlave, InventarioManager.LLAVE));
		managerDialogos.empezarDialogos(ManagerDialogos1.CONVERSACION_DARIO3);
		Cursor.SetCursor(null, Vector2.zero, CursorMode.ForceSoftware);
		
	}
	//Puerta de la primera habitación, se necesita la llave para poder abrirla
	if(comando.Equals("Puerta")){
		
		//SI se tiene la llave en el inventario
		if(inventario.enInventario(InventarioManager.LLAVE)){
			
			var puerta : GameObject = GameObject.Find("Puerta");
			puerta.audio.Play();
			yield WaitForSeconds(0.5);
			Destroy(puerta);
			Cursor.SetCursor(null, Vector2.zero, CursorMode.ForceSoftware);
			
		}else{//En caso de que se haga click sin tener la llave
			
			managerDialogos.empezarDialogos(ManagerDialogos1.CONVERSACION_DARIO2);
		}
	}
	
	
	//Cajon donde esta el botiquin
	if(comando.Equals("Cajon")){
		
		//Cuando el jugador interactua con el cajon que contiene el botiquin
		if(!(currentPlayer.getId() == Player_Manager.DIANA)){// Si no se tiene a Diana seleccionada
		
			if(playerManager.estaPersonaje(Player_Manager.DIANA))
			{//Si diana esta en la party
				managerDialogos.empezarDialogos(ManagerDialogos1.CONVERSACION_PLAYER12);
		}
	else{//Si diana no esta en la party
	
	managerDialogos.empezarDialogos(ManagerDialogos1.CONVERSACION_PLAYER13);
}
}
else{//Cuando se tiene a diana seleccionada
	
	inventario.addItem(new Item(texturaBotiquin, InventarioManager.BOTIQUIN));
	managerDialogos.empezarDialogos(ManagerDialogos1.CONVERSACION_DIANA1);
	GameObject.Find("CajaBotiquin").GetComponent(Interactor_Click).FlagOff();
	Cursor.SetCursor(null, Vector2.zero, CursorMode.ForceSoftware);
}
}

//Derrumbe de la habitacion donde esta fabio
if(comando.Equals("Derrumbe")){
	if(currentPlayer.getId() == Player_Manager.FABIO){
		currentPlayer.getGameObject().GetComponent(MoverClick).MoverOff();
		cinematica1 = true;//Empieza la cinematica 1
		
		yield WaitForSeconds(5);
		Destroy(GameObject.Find("Derrumbe"));
		
		cinematica1 = false;//Termina la cinematica 1
		Cursor.SetCursor(null, Vector2.zero, CursorMode.ForceSoftware);
		managerDialogos.empezarDialogos(ManagerDialogos1.CONVERSACION_FABIO_DARIO2);
		
	}
	else if(currentPlayer.getId() == Player_Manager.DARIO){
		managerDialogos.empezarDialogos(ManagerDialogos1.CONVERSACION_PLAYER9);
	}
}
//Armario donde esta atrapada cristina
if(comando.Equals("Armario")){
	if(!(currentPlayer.getId() == Player_Manager.FABIO)){
		managerDialogos.empezarDialogos(ManagerDialogos1.CONVERSACION_PLAYER1);
	}
	else{
		
		Destroy(GameObject.Find("Armario"));
		GameObject.Find("AyudaTrigger").GetComponent(Interactor_Trigger).apagar();
		Cursor.SetCursor(null, Vector2.zero, CursorMode.ForceSoftware);
		GameObject.Find("Cristina").renderer.enabled = true;
	GameObject.Find("Cristina").collider.enabled = true;
		
		currentPlayer.getGameObject().GetComponent(MoverClick).MoverOff();
		cinematica1 = true;
		yield WaitForSeconds(5);
		cinematica1 = false;
		managerDialogos.empezarDialogos(ManagerDialogos1.CONVERSACION_CRISTINA);
	}
}
//Escombros donde esta atrapada diana
if(comando.Equals("Escombros")){
	if(currentPlayer.getId() == Player_Manager.FABIO){
		currentPlayer.getGameObject().GetComponent(MoverClick).MoverOff();
		cinematica1 = true;
		yield WaitForSeconds(5);
		Destroy(GameObject.Find("Escombros"));
		cinematica1 = false;
		managerDialogos.empezarDialogos(ManagerDialogos1.CONVERSACION_DIANA2);
		playerManager.addPlayer(new Player(texturaCuadroDiana,Player_Manager.DIANA, "Diana" , texturaCursorDiana));
		var pl : GameObject = GameObject.Find("Diana");
		pl.AddComponent(MoverClick);
		pl.GetComponent(MoverClick).inicializarValores(0.1,1.5);
		pl.renderer.enabled = false;
		pl.collider.enabled = false;	
		
		
		Cursor.SetCursor(null, Vector2.zero, CursorMode.ForceSoftware);
		GameObject.Find("AuxilioTrigger").GetComponent(Interactor_Trigger).apagar();
		
	}
	else if(currentPlayer.getId() == Player_Manager.DARIO){
		if(playerManager.estaPersonaje(Player_Manager.FABIO)){ // Si esta fabio
			managerDialogos.empezarDialogos(ManagerDialogos1.CONVERSACION_DARIO5);
		}
		else{
			managerDialogos.empezarDialogos(ManagerDialogos1.CONVERSACION_DARIO4);
		}
	}
	
}
//Curar a Cristina
if(comando.Equals("Cristina")){
	// SE Intenta usar el botiquin para curar a cristina  ==========================================
	
	
	
	if(currentPlayer.getId() == Player_Manager.DIANA){//Si se tiene a diana seleccionada
	
	if(inventario.enInventario(InventarioManager.BOTIQUIN)){
		
		//Curan exitosamente a cristina
		currentPlayer.getGameObject().GetComponent(MoverClick).MoverOff();
		cinematica2 = true;
		
		yield WaitForSeconds(3);
		cinematica2 = false;
		//Ya esta
		managerDialogos.empezarDialogos(ManagerDialogos1.CONVERSACION_PLAYER3);
		//Cristina se unio
		managerDialogos.empezarDialogos(ManagerDialogos1.CONVERSACION_WORLD5);
		playerManager.addPlayer(new Player(texturaCuadroCristina,Player_Manager.CRISTINA, "Cristina" , texturaCursorCristina));
				
		var playerCristina = GameObject.Find("Cristina");
		playerCristina.AddComponent(MoverClick);
		playerCristina.GetComponent(MoverClick).inicializarValores(0.1,1.5); 
		playerCristina.GetComponent(Interactor_Click).FlagOff();
		playerCristina.renderer.enabled = false;
		playerCristina.collider.enabled = false;	
		
		Cursor.SetCursor(null, Vector2.zero, CursorMode.ForceSoftware);

		
		currentPlayer.getGameObject().GetComponent(MoverClick).MoverOn();
		
		
	}
	else{
		
	// Voy a necesitar un botiquin
	managerDialogos.empezarDialogos(ManagerDialogos1.CONVERSACION_DIANA3);
	}
}

else{
	//Si no se tiene a diana seleccionada
	managerDialogos.empezarDialogos(ManagerDialogos1.CONVERSACION_PLAYER14);
}
}



if(comando.Equals("Emergencia")){
	if(currentPlayer.getId() == Player_Manager.CRISTINA){
	
		currentPlayer.getGameObject().GetComponent(MoverClick).MoverOff();
		
		cinematica3 = true;
		Destroy(GameObject.Find("PuertaEmergencia"));
		Cursor.SetCursor(null, Vector2.zero, CursorMode.ForceSoftware);
		yield WaitForSeconds(5);
		cinematica3 = false;
		currentPlayer.getGameObject().GetComponent(MoverClick).MoverOn();
	}
	else{
		print("Cristina no esta seleccionada");
		if(playerManager.estaPersonaje(Player_Manager.CRISTINA)){
			managerDialogos.empezarDialogos(ManagerDialogos1.CONVERSACION_PLAYER8);
		}else{
			print("Cristina no esta en la party");
			managerDialogos.empezarDialogos(ManagerDialogos1.CONVERSACION_PLAYER7);
		}
	}
}
}


//Se llama como resultado(al finalizar) de un dialogo, no todos los dialogos tiene resultado*
//Implementación de la función IEventDialog
function EventDialog(idResultado : int){
print("Evento!!!!!!!!!!!!");
switch(idResultado){

case ManagerDialogos1.FINAL:
print("fin nivel!!!!!!!!!!");
	Application.LoadLevel(siguienteNivel);
break;
}
}

function DarCinematica(index : int){
	return cinematicas[index];
}