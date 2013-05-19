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
		managerDialogos.mostrarDialogo(0,managerDialogos.GLOBO_PENSAMIENTO, managerDialogos.POS_PERSONAJE_ACTUAL[0], managerDialogos.POS_PERSONAJE_ACTUAL[1],managerDialogos.POS_PERSONAJE_ACTUAL[2],managerDialogos.POS_PERSONAJE_ACTUAL[3]);
		yield WaitForSeconds(5);
		//GameObject.Find("InicioTrigger").GetComponent(Interactor_Trigger).apagar();
		managerDialogos.apagarDialogo();
	}
	
	if(objName.Equals("Auxilio")){
		var target : Vector3 = new Vector3(act_Player.transform.position.x - 0.5,act_Player.transform.position.y,act_Player.transform.position.z);
		act_Player.GetComponent(MoverClick).SetTargetPosition(target);
		act_Player.GetComponent(MoverClick).MoverOff();
		managerDialogos.mostrarDialogo(4,managerDialogos.GLOBO_DIALOGO_OPUESTO, Screen.width - 270, Screen.height/2 - 280,Screen.width - 240,Screen.height/2 - 250);
		yield WaitForSeconds(2);
		managerDialogos.apagarDialogo();
		act_Player.GetComponent(MoverClick).MoverOn();
	}
	
	if(objName.Equals("Ayuda")){
		var target2 : Vector3 = new Vector3(act_Player.transform.position.x + 0.5,act_Player.transform.position.y,act_Player.transform.position.z);
		act_Player.GetComponent(MoverClick).SetTargetPosition(target2);
		act_Player.GetComponent(MoverClick).MoverOff();
		managerDialogos.mostrarDialogo(7,ManagerDialogos1.GLOBO_DIALOGO_INVERSO,Screen.width/2 - 100,Screen.height/2 - 280,Screen.width/2 - 70, Screen.height/2 - 190);
		yield WaitForSeconds(2);
		managerDialogos.apagarDialogo();
		act_Player.GetComponent(MoverClick).MoverOn();
	}
	
	if(objName.Equals("Fabio")){
		var target3 : Vector3 = new Vector3(act_Player.transform.position.x - 1,act_Player.transform.position.y,act_Player.transform.position.z);
		act_Player.GetComponent(MoverClick).SetTargetPosition(target3);
		act_Player.GetComponent(MoverClick).MoverOff();
		managerDialogos.mostrarDialogo(10,managerDialogos.GLOBO_DIALOGO, managerDialogos.POS_PERSONAJE_ACTUAL[0], managerDialogos.POS_PERSONAJE_ACTUAL[1],managerDialogos.POS_PERSONAJE_ACTUAL[2],managerDialogos.POS_PERSONAJE_ACTUAL[3]);
		yield WaitForSeconds(3);
		managerDialogos.apagarDialogo();
		managerDialogos.mostrarDialogo(11,ManagerDialogos1.GLOBO_DIALOGO_INVERSO,Screen.width/2 + 200, Screen.height/2 - 30,Screen.width/2 + 230,Screen.height/2 + 60);
		yield WaitForSeconds(2);
		managerDialogos.apagarDialogo();
		//GameObject.Find("FabioTrigger").GetComponent(Interactor_Trigger).apagar();
		yield WaitForSeconds(0.02);
		var der = GameObject.Find("Derrumbe");
		der.renderer.enabled = true;
		der.collider.enabled = true;
		der.audio.Play();
		yield WaitForSeconds(0.5);
		managerDialogos.mostrarDialogo(12,managerDialogos.GLOBO_DIALOGO, managerDialogos.POS_PERSONAJE_ACTUAL[0], managerDialogos.POS_PERSONAJE_ACTUAL[1],managerDialogos.POS_PERSONAJE_ACTUAL[2],managerDialogos.POS_PERSONAJE_ACTUAL[3]);
		yield WaitForSeconds(3);
		managerDialogos.apagarDialogo();
		managerDialogos.mostrarDialogo(13,ManagerDialogos1.GLOBO_DIALOGO_INVERSO,Screen.width/2 + 200, Screen.height/2 - 30,Screen.width/2 + 230,Screen.height/2 + 60);
		yield WaitForSeconds(2);
		managerDialogos.apagarDialogo();
		managerDialogos.mostrarDialogo(14,ManagerDialogos1.CUADRO_TEXTO,Screen.width - 150, Screen.height - 50,Screen.width - 150, Screen.height - 40);
		yield WaitForSeconds(2);
		managerDialogos.apagarDialogo();
		GetComponent(Menu_script).activarP2();
		act_Player.GetComponent(MoverClick).MoverOn();
	}
	
	if(objName.Equals("Salida")){
		var fabio : boolean = GetComponent(Menu_script).EstaPersonaje("P2");
		var diana : boolean = GetComponent(Menu_script).EstaPersonaje("P3");
		var cris : boolean = GetComponent(Menu_script).EstaPersonaje("P4");
		print(fabio + " " + diana + " " + cris);
		if(fabio && diana && cris){
			act_Player.GetComponent(MoverClick).MoverOff();
			managerDialogos.mostrarDialogo(23,managerDialogos.GLOBO_PENSAMIENTO, managerDialogos.POS_PERSONAJE_ACTUAL[0], managerDialogos.POS_PERSONAJE_ACTUAL[1],managerDialogos.POS_PERSONAJE_ACTUAL[2],managerDialogos.POS_PERSONAJE_ACTUAL[3]);
			yield WaitForSeconds(3);
			managerDialogos.apagarDialogo();
			GameObject.Find("SalidaATrigger").GetComponent(Interactor_Trigger).apagar();
			act_Player.GetComponent(MoverClick).MoverOn();
		}
		else{
			managerDialogos.mostrarDialogo(22,managerDialogos.GLOBO_PENSAMIENTO, managerDialogos.POS_PERSONAJE_ACTUAL[0], managerDialogos.POS_PERSONAJE_ACTUAL[1],managerDialogos.POS_PERSONAJE_ACTUAL[2],managerDialogos.POS_PERSONAJE_ACTUAL[3]);
			yield WaitForSeconds(3);
			managerDialogos.apagarDialogo();
		}
	}
	
	if(objName.Equals("Salida2")){
		fabio = GetComponent(Menu_script).EstaPersonaje("P2");
		diana = GetComponent(Menu_script).EstaPersonaje("P3");
		cris = GetComponent(Menu_script).EstaPersonaje("P4");
		
		if(fabio && diana && cris){
			act_Player.GetComponent(MoverClick).MoverOff();
			der = GameObject.Find("Derrumbe2");
			der.renderer.enabled = true;
			der.collider.enabled = true;
			der.audio.Play();
			yield WaitForSeconds(0.5);
			managerDialogos.mostrarDialogo(24,managerDialogos.GLOBO_PENSAMIENTO, managerDialogos.POS_PERSONAJE_ACTUAL[0], managerDialogos.POS_PERSONAJE_ACTUAL[1],managerDialogos.POS_PERSONAJE_ACTUAL[2],managerDialogos.POS_PERSONAJE_ACTUAL[3]);
			yield WaitForSeconds(3);
			managerDialogos.apagarDialogo();
			GameObject.Find("LuzSalidaB").transform.position = new Vector3(-10.3,0.5,-12);
			//GameObject.Find("SalidaB").GetComponent(Interactor_Trigger).apagar();
			act_Player.GetComponent(MoverClick).MoverOn();
		}
		else{
			managerDialogos.mostrarDialogo(22,managerDialogos.GLOBO_PENSAMIENTO, managerDialogos.POS_PERSONAJE_ACTUAL[0], managerDialogos.POS_PERSONAJE_ACTUAL[1],managerDialogos.POS_PERSONAJE_ACTUAL[2],managerDialogos.POS_PERSONAJE_ACTUAL[3]);
			yield WaitForSeconds(3);
			managerDialogos.apagarDialogo();
		}
	}
	
	if(objName.Equals("Final")){
		managerDialogos.mostrarDialogo(30,managerDialogos.GLOBO_PENSAMIENTO, managerDialogos.POS_PERSONAJE_ACTUAL[0], managerDialogos.POS_PERSONAJE_ACTUAL[1],managerDialogos.POS_PERSONAJE_ACTUAL[2],managerDialogos.POS_PERSONAJE_ACTUAL[3]);
		yield WaitForSeconds(3);
		managerDialogos.apagarDialogo();
		Application.LoadLevel("cambio nivel");
	}
	
	if(objName.Equals("Fantasma")){
		var fantasma : GameObject = GameObject.Find("Fantasma");
		fantasma.GetComponent(TrasladarHorizontal).activar();
		yield WaitForSeconds(0.5);
		managerDialogos.mostrarDialogo(37,managerDialogos.GLOBO_PENSAMIENTO, managerDialogos.POS_PERSONAJE_ACTUAL[0], managerDialogos.POS_PERSONAJE_ACTUAL[1],managerDialogos.POS_PERSONAJE_ACTUAL[2],managerDialogos.POS_PERSONAJE_ACTUAL[3]);
		yield WaitForSeconds(3);
		managerDialogos.apagarDialogo();
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
		
		GetComponent(Inventario).addItem(new Item(texturaLlave, OBJETO_LLAVE));
		managerDialogos.mostrarDialogo(2,managerDialogos.GLOBO_PENSAMIENTO, managerDialogos.POS_PERSONAJE_ACTUAL[0], managerDialogos.POS_PERSONAJE_ACTUAL[1],managerDialogos.POS_PERSONAJE_ACTUAL[2],managerDialogos.POS_PERSONAJE_ACTUAL[3]);
		yield WaitForSeconds(3);
		managerDialogos.apagarDialogo();
		
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
			
			managerDialogos.mostrarDialogo(1,managerDialogos.GLOBO_PENSAMIENTO, managerDialogos.POS_PERSONAJE_ACTUAL[0], managerDialogos.POS_PERSONAJE_ACTUAL[1],managerDialogos.POS_PERSONAJE_ACTUAL[2],managerDialogos.POS_PERSONAJE_ACTUAL[3]);
			yield WaitForSeconds(3);
			managerDialogos.apagarDialogo();
		}
	}
	
	
	//Cajon donde esta el botiquin
	if(comando.Equals("Cajon")){
		
		//Cuando el jugador interactua con el cajon que contiene el botiquin
		if(!(act_Player.GetComponent(Player).Nombre().Equals("Diana"))){// Si no se tiene a Diana seleccionada
		
		if(flag3){//Si diana esta en la party
		
		managerDialogos.mostrarDialogo(31,managerDialogos.GLOBO_PENSAMIENTO, managerDialogos.POS_PERSONAJE_ACTUAL[0], managerDialogos.POS_PERSONAJE_ACTUAL[1],managerDialogos.POS_PERSONAJE_ACTUAL[2],managerDialogos.POS_PERSONAJE_ACTUAL[3]);
		yield WaitForSeconds(3);
		managerDialogos.apagarDialogo();
	}
	else{//Si diana no esta en la party
	
	managerDialogos.mostrarDialogo(32,managerDialogos.GLOBO_PENSAMIENTO, managerDialogos.POS_PERSONAJE_ACTUAL[0], managerDialogos.POS_PERSONAJE_ACTUAL[1],managerDialogos.POS_PERSONAJE_ACTUAL[2],managerDialogos.POS_PERSONAJE_ACTUAL[3]);
	yield WaitForSeconds(3);
	managerDialogos.apagarDialogo();
}
}
else{//Cuando se tiene a diana seleccionada

GetComponent(Inventario).addItem(new Item(texturaLlave, OBJETO_LLAVE));
managerDialogos.mostrarDialogo(18,managerDialogos.GLOBO_DIALOGO, managerDialogos.POS_PERSONAJE_ACTUAL[0], managerDialogos.POS_PERSONAJE_ACTUAL[1],managerDialogos.POS_PERSONAJE_ACTUAL[2],managerDialogos.POS_PERSONAJE_ACTUAL[3]);
yield WaitForSeconds(3);
managerDialogos.apagarDialogo();
}
}

//Derrumbe de la habitacion donde esta fabio
if(comando.Equals("Derrumbe")){
	if(act_Player.GetComponent(Player).Nombre().Equals("Fabio")){
		act_Player.GetComponent(MoverClick).MoverOff();
		cm1 = true;
		yield WaitForSeconds(5);
		Destroy(GameObject.Find("Derrumbe"));
		act_Player.GetComponent(MoverClick).MoverOn();
		cm1 = false;
		Cursor.SetCursor(null, Vector2.zero, CursorMode.ForceSoftware);
		yield WaitForSeconds(1);
		managerDialogos.mostrarDialogo(15,managerDialogos.GLOBO_DIALOGO, managerDialogos.POS_PERSONAJE_ACTUAL[0], managerDialogos.POS_PERSONAJE_ACTUAL[1],managerDialogos.POS_PERSONAJE_ACTUAL[2],managerDialogos.POS_PERSONAJE_ACTUAL[3]);
		yield WaitForSeconds(3);
		managerDialogos.apagarDialogo();
		managerDialogos.mostrarDialogo(16,managerDialogos.GLOBO_DIALOGO, managerDialogos.POS_PERSONAJE_ACTUAL[0], managerDialogos.POS_PERSONAJE_ACTUAL[1],managerDialogos.POS_PERSONAJE_ACTUAL[2],managerDialogos.POS_PERSONAJE_ACTUAL[3]);
		yield WaitForSeconds(3);
		managerDialogos.apagarDialogo();
		flag1 = true;
	}
	else if(act_Player.GetComponent(Player).Nombre().Equals("Dario")){
		managerDialogos.mostrarDialogo(28,managerDialogos.GLOBO_PENSAMIENTO, managerDialogos.POS_PERSONAJE_ACTUAL[0], managerDialogos.POS_PERSONAJE_ACTUAL[1],managerDialogos.POS_PERSONAJE_ACTUAL[2],managerDialogos.POS_PERSONAJE_ACTUAL[3]);
		yield WaitForSeconds(3);
		managerDialogos.apagarDialogo();
	}
}
//Armario donde esta atrapada cristina
if(comando.Equals("Armario")){
	if(!(act_Player.GetComponent(Player).Nombre().Equals("Fabio"))){
		managerDialogos.mostrarDialogo(8,managerDialogos.GLOBO_PENSAMIENTO, managerDialogos.POS_PERSONAJE_ACTUAL[0], managerDialogos.POS_PERSONAJE_ACTUAL[1],managerDialogos.POS_PERSONAJE_ACTUAL[2],managerDialogos.POS_PERSONAJE_ACTUAL[3]);
		yield WaitForSeconds(3);
		managerDialogos.apagarDialogo();
	}
	else{
		act_Player.GetComponent(MoverClick).MoverOff();
		Destroy(GameObject.Find("Armario"));
		GameObject.Find("AyudaTrigger").GetComponent(Interactor_Trigger).apagar();
		Cursor.SetCursor(null, Vector2.zero, CursorMode.ForceSoftware);
		GetComponent(Player_Manager).crearPlayer4();
		cm1 = true;
		yield WaitForSeconds(5);
		cm1 = false;
		managerDialogos.mostrarDialogo(19,managerDialogos.GLOBO_DIALOGO_INVERSO, Screen.width/2 - 80, Screen.height/2 ,Screen.width/2 - 50 ,Screen.height/2 + 90);
		yield WaitForSeconds(3);
		managerDialogos.apagarDialogo();
		act_Player.GetComponent(MoverClick).MoverOn();
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
		managerDialogos.mostrarDialogo(20,ManagerDialogos1.GLOBO_DIALOGO_INVERSO,Screen.width/2 + 200, Screen.height/2 - 30,Screen.width/2 + 230,Screen.height/2 + 60);
		yield WaitForSeconds(3);
		managerDialogos.apagarDialogo();
		managerDialogos.mostrarDialogo(33,ManagerDialogos1.CUADRO_TEXTO,Screen.width - 150, Screen.height - 50,Screen.width - 150, Screen.height - 40);
		yield WaitForSeconds(2);
		managerDialogos.apagarDialogo();
		act_Player.GetComponent(MoverClick).MoverOn();
		GetComponent(Menu_script).activarP3();
		Cursor.SetCursor(null, Vector2.zero, CursorMode.ForceSoftware);
		GameObject.Find("AuxilioTrigger").GetComponent(Interactor_Trigger).apagar();
		flag3 = true;
	}
	else if(act_Player.GetComponent(Player).Nombre().Equals("Dario")){
		if(flag1){
			managerDialogos.mostrarDialogo(6,managerDialogos.GLOBO_PENSAMIENTO, managerDialogos.POS_PERSONAJE_ACTUAL[0], managerDialogos.POS_PERSONAJE_ACTUAL[1],managerDialogos.POS_PERSONAJE_ACTUAL[2],managerDialogos.POS_PERSONAJE_ACTUAL[3]);
			yield WaitForSeconds(3);
			managerDialogos.apagarDialogo();
		}
		else{
			managerDialogos.mostrarDialogo(5,managerDialogos.GLOBO_PENSAMIENTO, managerDialogos.POS_PERSONAJE_ACTUAL[0], managerDialogos.POS_PERSONAJE_ACTUAL[1],managerDialogos.POS_PERSONAJE_ACTUAL[2],managerDialogos.POS_PERSONAJE_ACTUAL[3]);
			yield WaitForSeconds(3);
			managerDialogos.apagarDialogo();
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
		managerDialogos.mostrarDialogo(21,managerDialogos.GLOBO_PENSAMIENTO, managerDialogos.POS_PERSONAJE_ACTUAL[0], managerDialogos.POS_PERSONAJE_ACTUAL[1],managerDialogos.POS_PERSONAJE_ACTUAL[2],managerDialogos.POS_PERSONAJE_ACTUAL[3]);
		yield WaitForSeconds(3);
		managerDialogos.apagarDialogo();
		//Cristina se unio
		managerDialogos.mostrarDialogo(34,ManagerDialogos1.CUADRO_TEXTO,Screen.width - 160, Screen.height - 50,Screen.width - 160, Screen.height - 40);
		yield WaitForSeconds(2);
		managerDialogos.apagarDialogo();
		GetComponent(Menu_script).activarP4();
		GameObject.Find("Cristina").GetComponent(Interactor_Click).enabled = false;
		GetComponent(Player_Manager).darPlayer4().GetComponent(Interactor_Click).enabled = false;
		Cursor.SetCursor(null, Vector2.zero, CursorMode.ForceSoftware);

		
		act_Player.GetComponent(MoverClick).MoverOn();
		
		
	}
	else{
		
	// Voy a necesitar un botiquin
	managerDialogos.mostrarDialogo(36,managerDialogos.GLOBO_PENSAMIENTO, managerDialogos.POS_PERSONAJE_ACTUAL[0], managerDialogos.POS_PERSONAJE_ACTUAL[1],managerDialogos.POS_PERSONAJE_ACTUAL[2],managerDialogos.POS_PERSONAJE_ACTUAL[3]);
	yield WaitForSeconds(3);
	managerDialogos.apagarDialogo();
	}
}

else{
	//Si no se tiene a diana seleccionada
	managerDialogos.mostrarDialogo(35,managerDialogos.GLOBO_PENSAMIENTO, managerDialogos.POS_PERSONAJE_ACTUAL[0], managerDialogos.POS_PERSONAJE_ACTUAL[1],managerDialogos.POS_PERSONAJE_ACTUAL[2],managerDialogos.POS_PERSONAJE_ACTUAL[3]);
	yield WaitForSeconds(3);
	managerDialogos.apagarDialogo();
}
}

if(comando.Equals("CristinaS")){
	// ACA TAMBIEN===============================================================================================
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
		managerDialogos.mostrarDialogo(25,managerDialogos.GLOBO_PENSAMIENTO, managerDialogos.POS_PERSONAJE_ACTUAL[0], managerDialogos.POS_PERSONAJE_ACTUAL[1],managerDialogos.POS_PERSONAJE_ACTUAL[2],managerDialogos.POS_PERSONAJE_ACTUAL[3]);
		yield WaitForSeconds(3);
		managerDialogos.apagarDialogo();
		if(GetComponent(Menu_script).EstaPersonaje("P4")){
			managerDialogos.mostrarDialogo(26,managerDialogos.GLOBO_PENSAMIENTO, managerDialogos.POS_PERSONAJE_ACTUAL[0], managerDialogos.POS_PERSONAJE_ACTUAL[1],managerDialogos.POS_PERSONAJE_ACTUAL[2],managerDialogos.POS_PERSONAJE_ACTUAL[3]);
			yield WaitForSeconds(3);
			managerDialogos.apagarDialogo();
		}
	}
}
}

function DarCinematica(index : int){
	return cinematicas[index];
}