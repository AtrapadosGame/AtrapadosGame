#pragma strict
//Ojo, para evitar problemas en el nivel 1:
// Dario --> Player1
// Fabio --> Player2
// Diana --> Player3
// Cristina --> Player4
private static final var NUM_FLAGS : int = 33;
private var act_Player : GameObject;
private var startTime : float;
//Conversaciones y textos
private var flagsDialogos : boolean[];
//Flags de control
private var flag1 : boolean = false;//Conseguir a Fabio
private var flag2 : boolean = false;//Conseguir la llave
private var flag3 : boolean = false;//Conseguir a diana
private var flag4 : boolean = false;//Conseguir el botiquin
private var cm1 : boolean = false;//Derrumbe fabio-dario
private var cm2 : boolean = false;//Curar Cristina
private var cm3 : boolean = false;//Cristina puerta emergencia
private var fCaja : boolean = true;
private var fCajon : boolean = true;

//Texturas
var cinematicas : Texture2D[] = new Texture2D[5];
var texturaLlave : Texture2D;
var texturaBotiquin : Texture2D;


function Start () {
	flagsDialogos = new boolean[NUM_FLAGS];
	for(var i : int = 0; i < NUM_FLAGS; i++){
		flagsDialogos[i] = false;
	}
	startTime = GetComponent(Timer).StartTime();
	
	GetComponent(Player_Manager).destruirPlayer4();
	GameObject.Find("Derrumbe").renderer.enabled = false;
	GameObject.Find("Derrumbe").collider.enabled = false;
	GameObject.Find("Derrumbe2").renderer.enabled = false;
	GameObject.Find("Derrumbe2").collider.enabled = false;
}

function Update() {
	act_Player = GetComponent(Player_Manager).darActual();
}

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
		var fabio : boolean = GetComponent(Menu_script).EstaPersonaje("Fabio");
		var diana : boolean = GetComponent(Menu_script).EstaPersonaje("Diana");
		var cris : boolean = GetComponent(Menu_script).EstaPersonaje("Cristina");
		if(fabio && diana && cris){
			act_Player.GetComponent(MoverClick).MoverOff();
			managerDialogos.mostrarDialogo(23,managerDialogos.GLOBO_PENSAMIENTO, managerDialogos.POS_PERSONAJE_ACTUAL[0], managerDialogos.POS_PERSONAJE_ACTUAL[1],managerDialogos.POS_PERSONAJE_ACTUAL[2],managerDialogos.POS_PERSONAJE_ACTUAL[3]);
			yield WaitForSeconds(3);
			managerDialogos.apagarDialogo();
			//GameObject.Find("SalidaA").GetComponent(Interactor_Trigger).apagar();
			act_Player.GetComponent(MoverClick).MoverOn();
		}
		else{
			managerDialogos.mostrarDialogo(22,managerDialogos.GLOBO_PENSAMIENTO, managerDialogos.POS_PERSONAJE_ACTUAL[0], managerDialogos.POS_PERSONAJE_ACTUAL[1],managerDialogos.POS_PERSONAJE_ACTUAL[2],managerDialogos.POS_PERSONAJE_ACTUAL[3]);
			yield WaitForSeconds(3);
			managerDialogos.apagarDialogo();
		}
	}
	
	if(objName.Equals("Salida2")){
		fabio = GetComponent(Menu_script).EstaPersonaje("Fabio");
		diana = GetComponent(Menu_script).EstaPersonaje("Diana");
		cris = GetComponent(Menu_script).EstaPersonaje("Cristina");
		
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
	
	if(objName.Equals("Sonido")){
		var son = GameObject.Find("TSonido");
		son.audio.Play();
	}
}

//Imlementación de la funcion Switch()
function EventSwitch(comando : String){
	var habID;
	var managerDialogos = GetComponent(ManagerDialogos1);
	//Caja donde esta la llave
	if(comando.Equals("Caja") && fCaja){
		fCaja = false;
		GetComponent(Menu_script).agregarItem(texturaLlave, "llave");
		managerDialogos.mostrarDialogo(2,managerDialogos.GLOBO_PENSAMIENTO, managerDialogos.POS_PERSONAJE_ACTUAL[0], managerDialogos.POS_PERSONAJE_ACTUAL[1],managerDialogos.POS_PERSONAJE_ACTUAL[2],managerDialogos.POS_PERSONAJE_ACTUAL[3]);
		yield WaitForSeconds(3);
		managerDialogos.apagarDialogo();
		flag2 = true;
	}
	//Puerta de la primera habitación
	if(comando.Equals("PuertaS")){
		var puerta : GameObject = GameObject.Find("Puerta");
		puerta.audio.Play();
		yield WaitForSeconds(0.5);
		Destroy(puerta);
		Cursor.SetCursor(null, Vector2.zero, CursorMode.ForceSoftware);
		
	}
	
	if(comando.Equals("Puerta")){
		if(flag2){
			
			managerDialogos.mostrarDialogo(27,managerDialogos.GLOBO_PENSAMIENTO, managerDialogos.POS_PERSONAJE_ACTUAL[0], managerDialogos.POS_PERSONAJE_ACTUAL[1],managerDialogos.POS_PERSONAJE_ACTUAL[2],managerDialogos.POS_PERSONAJE_ACTUAL[3]);
			yield WaitForSeconds(3);
			managerDialogos.apagarDialogo();
		}
		else{
			managerDialogos.mostrarDialogo(1,managerDialogos.GLOBO_PENSAMIENTO, managerDialogos.POS_PERSONAJE_ACTUAL[0], managerDialogos.POS_PERSONAJE_ACTUAL[1],managerDialogos.POS_PERSONAJE_ACTUAL[2],managerDialogos.POS_PERSONAJE_ACTUAL[3]);
			yield WaitForSeconds(3);
			managerDialogos.apagarDialogo();
		}
	}
	
	//Cajon donde esta el botiquin
	if(comando.Equals("Cajon") && fCajon){
		if(!(act_Player.GetComponent(Player).Nombre().Equals("Diana"))){
			if(flag3){
				managerDialogos.mostrarDialogo(31,managerDialogos.GLOBO_PENSAMIENTO, managerDialogos.POS_PERSONAJE_ACTUAL[0], managerDialogos.POS_PERSONAJE_ACTUAL[1],managerDialogos.POS_PERSONAJE_ACTUAL[2],managerDialogos.POS_PERSONAJE_ACTUAL[3]);
				yield WaitForSeconds(3);
				managerDialogos.apagarDialogo();
			}
			else{
				managerDialogos.mostrarDialogo(32,managerDialogos.GLOBO_PENSAMIENTO, managerDialogos.POS_PERSONAJE_ACTUAL[0], managerDialogos.POS_PERSONAJE_ACTUAL[1],managerDialogos.POS_PERSONAJE_ACTUAL[2],managerDialogos.POS_PERSONAJE_ACTUAL[3]);
				yield WaitForSeconds(3);
				managerDialogos.apagarDialogo();
			}
		}
		else{
			fCajon = false;
			flag4 = true;
			GetComponent(Menu_script).agregarItem(texturaBotiquin, "Botiquin");
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
		if(act_Player.GetComponent(Player).Nombre().Equals("Diana")){
			if(flag4){
				act_Player.GetComponent(MoverClick).MoverOff();
				cm2 = true;
				yield WaitForSeconds(5);
				cm2 = false;
				managerDialogos.mostrarDialogo(21,managerDialogos.GLOBO_PENSAMIENTO, managerDialogos.POS_PERSONAJE_ACTUAL[0], managerDialogos.POS_PERSONAJE_ACTUAL[1],managerDialogos.POS_PERSONAJE_ACTUAL[2],managerDialogos.POS_PERSONAJE_ACTUAL[3]);
				yield WaitForSeconds(3);
				managerDialogos.apagarDialogo();
				managerDialogos.mostrarDialogo(34,ManagerDialogos1.CUADRO_TEXTO,Screen.width - 160, Screen.height - 50,Screen.width - 160, Screen.height - 40);
				yield WaitForSeconds(2);
				managerDialogos.apagarDialogo();
				GetComponent(Menu_script).activarP4();
				GetComponent(Player_Manager).darPlayer4().GetComponent(Interactor_Click).enabled = false;
				act_Player.GetComponent(MoverClick).MoverOn();
			}
			else{
				managerDialogos.mostrarDialogo(36,managerDialogos.GLOBO_PENSAMIENTO, managerDialogos.POS_PERSONAJE_ACTUAL[0], managerDialogos.POS_PERSONAJE_ACTUAL[1],managerDialogos.POS_PERSONAJE_ACTUAL[2],managerDialogos.POS_PERSONAJE_ACTUAL[3]);
				yield WaitForSeconds(3);
				managerDialogos.apagarDialogo();
			}
		}
		else{
			managerDialogos.mostrarDialogo(35,managerDialogos.GLOBO_PENSAMIENTO, managerDialogos.POS_PERSONAJE_ACTUAL[0], managerDialogos.POS_PERSONAJE_ACTUAL[1],managerDialogos.POS_PERSONAJE_ACTUAL[2],managerDialogos.POS_PERSONAJE_ACTUAL[3]);
			yield WaitForSeconds(3);
			managerDialogos.apagarDialogo();	
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
			managerDialogos.mostrarDialogo(25,managerDialogos.GLOBO_PENSAMIENTO, managerDialogos.POS_PERSONAJE_ACTUAL[0], managerDialogos.POS_PERSONAJE_ACTUAL[1],managerDialogos.POS_PERSONAJE_ACTUAL[2],managerDialogos.POS_PERSONAJE_ACTUAL[3]);
			yield WaitForSeconds(3);
			managerDialogos.apagarDialogo();
			if(GetComponent(Menu_script).EstaPersonaje("Cristina")){
				managerDialogos.mostrarDialogo(26,managerDialogos.GLOBO_PENSAMIENTO, managerDialogos.POS_PERSONAJE_ACTUAL[0], managerDialogos.POS_PERSONAJE_ACTUAL[1],managerDialogos.POS_PERSONAJE_ACTUAL[2],managerDialogos.POS_PERSONAJE_ACTUAL[3]);
				yield WaitForSeconds(3);
				managerDialogos.apagarDialogo();
			}
		}
	}
}

//Implementación de la funcion Item() de la interfaz
function EventItem(objName : String){
	//Llave
	if(objName.Equals("llave")){
		
		Cursor.SetCursor(texturaLlave, Vector2.zero, CursorMode.ForceSoftware);
		GameObject.Find("Puerta").GetComponent(Interactor_Click).FlagOff();
	}else if(objName.Equals("Botiquin")){
		
		//Cursor.SetCursor(texturaBotiquin, Vector2.zero, CursorMode.ForceSoftware);
		//GameObject.Find("Cristina").GetComponent(Interactor_Click).FlagOff();
	}
	
	
}

function DarCinematica(index : int){
	return cinematicas[index];
}