#pragma strict
//Ojo, para evitar problemas en el nivel 1:
// Dario --> Player1
// Fabio --> Player2
// Diana --> Player3
// Cristina --> Player4


// ================================================================================
// Variables
// ================================================================================

private var act_Player : GameObject;

//Flags de control
private var flag1 : boolean = false;//Conseguir a Fabio
private var flag3 : boolean = false;//Conseguir a diana
private var cm1 : boolean = false;//Derrumbe fabio-dario
private var cm2 : boolean = false;//Curar Cristina
private var cm3 : boolean = false;//Cristina puerta emergencia

//Texturas
var cinematicas : Texture2D[] = new Texture2D[5];
var texturaLlave : Texture2D;
var texturaBotiquin : Texture2D;
private var managerDialogos;

public static final var OBJETO_LLAVE  :int= 0;
public static final var OBJETO_BOTIQUIN  :int= 1;


// ================================================================================
// Start
// ================================================================================

function Start () {
	GetComponent(Player_Manager).destruirPlayer4();
	GetComponent(Menu_script).activarP1();
	GameObject.Find("Derrumbe").renderer.enabled = false;
	GameObject.Find("Derrumbe").collider.enabled = false;
	GameObject.Find("Derrumbe2").renderer.enabled = false;
	GameObject.Find("Derrumbe2").collider.enabled = false;
	managerDialogos = GetComponent(ManagerDialogos1);
}


// ================================================================================
// Update
// ================================================================================

function Update() {
	act_Player = GetComponent(Player_Manager).darActual();
}

// ================================================================================
// OnGUI
// ================================================================================

function OnGUI(){
	if(cm1){
		GUI.Label (Rect (Screen.width/2 - 600,Screen.height/2 - 250, Screen.width, Screen.height), cinematicas[0]);
	}
	if(cm2){
		GUI.Label (Rect (Screen.width/2 - 600,Screen.height/2 - 250, Screen.width, Screen.height), cinematicas[1]);
	}
	if(cm3){
		GUI.Label (Rect (Screen.width/2 - 600,Screen.height/2 - 250, Screen.width, Screen.height), cinematicas[2]);
	}
}

// ================================================================================
// Manejo de los eventos de triggers(Activados por Areas)(Llamado por interactorTrigger_)
// ================================================================================

//Implementación de la función Trigger()
function EventTrigger(objName : String){
	var managerDialogos = GetComponent(ManagerDialogos1);
	
	if(objName.Equals("Inicio")){
		managerDialogos.empezarDialogos(ManagerDialogos1.CONVERSACION_DARIO1);
		//GameObject.Find("InicioTrigger").GetComponent(Interactor_Trigger).apagar();
		
	}
	
	if(objName.Equals("Auxilio")){
		var target : Vector3 = new Vector3(act_Player.transform.position.x - 0.5,act_Player.transform.position.y,act_Player.transform.position.z);
		act_Player.GetComponent(MoverClick).SetTargetPosition(target);
		managerDialogos.empezarDialogos(ManagerDialogos1.CONVERSACION_WORLD1);
		
	}
	
	if(objName.Equals("Ayuda")){
	print("Ayuda");
		var target2 : Vector3 = new Vector3(act_Player.transform.position.x + 0.5,act_Player.transform.position.y,act_Player.transform.position.z);
		act_Player.GetComponent(MoverClick).SetTargetPosition(target2);
		managerDialogos.empezarDialogos(ManagerDialogos1.CONVERSACION_WORLD2);

	}
	
	if(objName.Equals("Fabio")){
		var target3 : Vector3 = new Vector3(act_Player.transform.position.x - 1,act_Player.transform.position.y,act_Player.transform.position.z);
		act_Player.GetComponent(MoverClick).SetTargetPosition(target3);
		yield WaitForSeconds(1);
		managerDialogos.empezarDialogos(ManagerDialogos1.CONVERSACION_FABIO_DARIO1);
		//GameObject.Find("FabioTrigger").GetComponent(Interactor_Trigger).apagar();
		yield WaitForSeconds(0.02);
		var der = GameObject.Find("Derrumbe");
		der.renderer.enabled = true;
		der.collider.enabled = true;
		der.audio.Play();
		//managerDialogos.empezarDialogos(ManagerDialogos1.CONVERSACION_WORLD3);
		GetComponent(Menu_script).activarP2();
		
	}
	
	if(objName.Equals("Salida")){
		var fabio : boolean = GetComponent(Menu_script).EstaPersonaje("P2");
		var diana : boolean = GetComponent(Menu_script).EstaPersonaje("P3");
		var cris : boolean = GetComponent(Menu_script).EstaPersonaje("P4");
		print(fabio + " " + diana + " " + cris);
		if(fabio && diana && cris){
			managerDialogos.empezarDialogos(ManagerDialogos1.CONVERSACION_PLAYER5);
			GameObject.Find("SalidaATrigger").GetComponent(Interactor_Trigger).apagar();
			
		}
		else{
			managerDialogos.empezarDialogos(ManagerDialogos1.CONVERSACION_PLAYER4);
		}
	}
	
	if(objName.Equals("Salida2")){
		fabio = GetComponent(Menu_script).EstaPersonaje("P2");
		diana = GetComponent(Menu_script).EstaPersonaje("P3");
		cris = GetComponent(Menu_script).EstaPersonaje("P4");
		
		if(fabio && diana && cris){
			
			der = GameObject.Find("Derrumbe2");
			der.renderer.enabled = true;
			der.collider.enabled = true;
			der.audio.Play();
			managerDialogos.empezarDialogos(ManagerDialogos1.CONVERSACION_PLAYER6);
			GameObject.Find("LuzSalidaB").transform.position = new Vector3(-10.3,0.5,-12);
			//GameObject.Find("SalidaB").GetComponent(Interactor_Trigger).apagar();
			
		}
		else{
			managerDialogos.empezarDialogos(ManagerDialogos1.CONVERSACION_PLAYER4);
		}
	}
	
	if(objName.Equals("Final")){
		managerDialogos.empezarDialogos(ManagerDialogos1.CONVERSACION_PLAYER11);
		Application.LoadLevel("cambio nivel");
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
	
	var managerDialogos = GetComponent(ManagerDialogos1);
	//Caja donde esta la llave
	if(comando.Equals("Caja")){
		
		//Aca se consigue la llave de la puerta
		GameObject.Find("CajaLlave").GetComponent(Interactor_Click).FlagOff();
		GetComponent(Inventario).addItem(new Item(texturaLlave, OBJETO_LLAVE));
		managerDialogos.empezarDialogos(ManagerDialogos1.CONVERSACION_DARIO3);
		Cursor.SetCursor(null, Vector2.zero, CursorMode.ForceSoftware);
		
	}
	//Puerta de la primera habitación, se necesita la llave para poder abrirla
	if(comando.Equals("Puerta")){
		
		//SI se tiene la llave en el inventario
		if(GetComponent(Inventario).enInventario(OBJETO_LLAVE)){
			
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
		if(!(act_Player.GetComponent(Player).Nombre().Equals("Diana"))){// Si no se tiene a Diana seleccionada
		
			if(flag3)
			{//Si diana esta en la party
				managerDialogos.empezarDialogos(ManagerDialogos1.CONVERSACION_PLAYER12);
		}
	else{//Si diana no esta en la party
	
	managerDialogos.empezarDialogos(ManagerDialogos1.CONVERSACION_PLAYER13);
}
}
else{//Cuando se tiene a diana seleccionada
	
	GetComponent(Inventario).addItem(new Item(texturaBotiquin, OBJETO_BOTIQUIN));
	managerDialogos.empezarDialogos(ManagerDialogos1.CONVERSACION_DIANA1);
	GameObject.Find("CajaBotiquin").GetComponent(Interactor_Click).FlagOff();
	Cursor.SetCursor(null, Vector2.zero, CursorMode.ForceSoftware);
}
}

//Derrumbe de la habitacion donde esta fabio
if(comando.Equals("Derrumbe")){
	if(act_Player.GetComponent(Player).Nombre().Equals("Fabio")){
		act_Player.GetComponent(MoverClick).MoverOff();
		cm1 = true;//Empieza la cinematica 1
		
		yield WaitForSeconds(5);
		Destroy(GameObject.Find("Derrumbe"));
		
		cm1 = false;//Termina la cinematica 1
		Cursor.SetCursor(null, Vector2.zero, CursorMode.ForceSoftware);
		managerDialogos.empezarDialogos(ManagerDialogos1.CONVERSACION_FABIO_DARIO2);
		flag1 = true;
	}
	else if(act_Player.GetComponent(Player).Nombre().Equals("Dario")){
		managerDialogos.empezarDialogos(ManagerDialogos1.CONVERSACION_PLAYER9);
	}
}
//Armario donde esta atrapada cristina
if(comando.Equals("Armario")){
	if(!(act_Player.GetComponent(Player).Nombre().Equals("Fabio"))){
		managerDialogos.empezarDialogos(ManagerDialogos1.CONVERSACION_PLAYER1);
	}
	else{
		
		Destroy(GameObject.Find("Armario"));
		GameObject.Find("AyudaTrigger").GetComponent(Interactor_Trigger).apagar();
		Cursor.SetCursor(null, Vector2.zero, CursorMode.ForceSoftware);
		GetComponent(Player_Manager).crearPlayer4();
		act_Player.GetComponent(MoverClick).MoverOff();
		cm1 = true;
		yield WaitForSeconds(5);
		cm1 = false;
		managerDialogos.empezarDialogos(ManagerDialogos1.CONVERSACION_CRISTINA);
	}
}
//Escombros donde esta atrapada diana
if(comando.Equals("Escombros")){
	if(act_Player.GetComponent(Player).Nombre().Equals("Fabio")){
		act_Player.GetComponent(MoverClick).MoverOff();
		cm1 = true;
		yield WaitForSeconds(5);
		Destroy(GameObject.Find("Escombros"));
		cm1 = false;
		managerDialogos.empezarDialogos(ManagerDialogos1.CONVERSACION_DIANA2);
		GetComponent(Menu_script).activarP3();
		Cursor.SetCursor(null, Vector2.zero, CursorMode.ForceSoftware);
		GameObject.Find("AuxilioTrigger").GetComponent(Interactor_Trigger).apagar();
		flag3 = true;
	}
	else if(act_Player.GetComponent(Player).Nombre().Equals("Dario")){
		if(flag1){
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
	
	
	
	if(act_Player.GetComponent(Player).Nombre().Equals("Diana")){//Si se tiene a diana seleccionada
	
	if(GetComponent(Inventario).enInventario(OBJETO_BOTIQUIN)){
		
		//Curan exitosamente a cristina
		act_Player.GetComponent(MoverClick).MoverOff();
		cm2 = true;
		
		yield WaitForSeconds(5);
		cm2 = false;
		//Ya esta
		managerDialogos.empezarDialogos(ManagerDialogos1.CONVERSACION_PLAYER3);
		//Cristina se unio
		managerDialogos.empezarDialogos(ManagerDialogos1.CONVERSACION_WORLD5);
		GetComponent(Menu_script).activarP4();
		GameObject.Find("Cristina").GetComponent(Interactor_Click).enabled = false;
		GetComponent(Player_Manager).darPlayer4().GetComponent(Interactor_Click).enabled = false;
		Cursor.SetCursor(null, Vector2.zero, CursorMode.ForceSoftware);

		
		act_Player.GetComponent(MoverClick).MoverOn();
		
		
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
	if(act_Player.GetComponent(Player).Nombre().Equals("Cristina")){
	
		act_Player.GetComponent(MoverClick).MoverOff();
		
		cm3 = true;
		Destroy(GameObject.Find("PuertaEmergencia"));
		Cursor.SetCursor(null, Vector2.zero, CursorMode.ForceSoftware);
		yield WaitForSeconds(5);
		cm3 = false;
		act_Player.GetComponent(MoverClick).MoverOn();
	}
	else{
		managerDialogos.empezarDialogos(ManagerDialogos1.CONVERSACION_PLAYER7);
		if(GetComponent(Menu_script).EstaPersonaje("P4")){
			managerDialogos.empezarDialogos(ManagerDialogos1.CONVERSACION_PLAYER8);
		}
	}
}
}

function DarCinematica(index : int){
	return cinematicas[index];
}