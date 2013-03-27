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
			GUI.Label (Rect (0,50, Screen.width, Screen.height), cinematicas[0]);
		}
		if(cm2){
			GUI.Label (Rect (0, 50, Screen.width, Screen.height), cinematicas[1]);
		}
		if(cm3){
			GUI.Label (Rect (0, 50, Screen.width, Screen.height), cinematicas[2]);
		}
	}
	
	//Implementación de la función Trigger()
	function EventTrigger(objName : String){
		var managerDialogos = GetComponent(ManagerDialogos1);
		
		if(objName.Equals("Inicio")){
			managerDialogos.mostrarDialogo(0,managerDialogos.GLOBO_PENSAMIENTO, Screen.width/2, Screen.height/2,Screen.width/2 + 10,Screen.height/2 + 30);
			yield WaitForSeconds(5);
			GameObject.Find("InicioTrigger").GetComponent(Interactor_Trigger).apagar();
			managerDialogos.apagarDialogo();
		}
		
		if(objName.Equals("Auxilio")){
			managerDialogos.mostrarDialogo(4,ManagerDialogos1.GLOBO_DIALOGO_OPUESTO,Screen.width - 200,Screen.height/2 - 400,Screen.width - 190, Screen.height/2 - 430);
			yield WaitForSeconds(2);
			managerDialogos.apagarDialogo();
		}
		
		if(objName.Equals("Ayuda")){
			managerDialogos.mostrarDialogo(7,ManagerDialogos1.GLOBO_DIALOGO_INVERSO,Screen.width - 200,Screen.height/2 - 400,Screen.width - 190, Screen.height/2 - 430);
			yield WaitForSeconds(2);
			managerDialogos.apagarDialogo();
		}
		
		if(objName.Equals("Fabio")){
			var target : Vector3 = new Vector3(act_Player.transform.position.x - 1.5,act_Player.transform.position.y,act_Player.transform.position.z);
			act_Player.GetComponent(MoverClick).SetTargetPosition(target);
			act_Player.GetComponent(MoverClick).MoverOff();
			managerDialogos.mostrarDialogo(10,ManagerDialogos1.GLOBO_DIALOGO,Screen.width/2, Screen.height/2,Screen.width/2 + 10,Screen.height/2 + 30);
			yield WaitForSeconds(3);
			managerDialogos.apagarDialogo();
			managerDialogos.mostrarDialogo(11,ManagerDialogos1.GLOBO_DIALOGO_OPUESTO,Screen.width/2, Screen.height/2,Screen.width/2 + 10,Screen.height/2 + 30);
			yield WaitForSeconds(2);
			managerDialogos.apagarDialogo();
			GameObject.Find("FabioTrigger").GetComponent(Interactor_Trigger).apagar();
			yield WaitForSeconds(0.02);
			var der = GameObject.Find("Derrumbe");
			der.renderer.enabled = true;
			der.collider.enabled = true;
			der.audio.Play();
			yield WaitForSeconds(0.5);
			managerDialogos.mostrarDialogo(12,ManagerDialogos1.GLOBO_DIALOGO,Screen.width/2, Screen.height/2,Screen.width/2 + 10,Screen.height/2 + 30);
			yield WaitForSeconds(3);
			managerDialogos.apagarDialogo();
			managerDialogos.mostrarDialogo(13,ManagerDialogos1.GLOBO_DIALOGO_OPUESTO,Screen.width/2, Screen.height/2,Screen.width/2 + 10,Screen.height/2 + 30);
			yield WaitForSeconds(2);
			managerDialogos.apagarDialogo();
			managerDialogos.mostrarDialogo(14,ManagerDialogos1.CUADRO_TEXTO,Screen.width - 30, Screen.height - 50,Screen.width - 30, Screen.height - 50);
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
				
				GameObject.Find("SalidaA").GetComponent(Interactor_Trigger).apagar();
			}
			else{
				
			}
		}
		
		if(objName.Equals("Salida2")){
			print("salida2");
			fabio = GetComponent(Menu_script).EstaPersonaje("Fabio");
			diana = GetComponent(Menu_script).EstaPersonaje("Diana");
			cris = GetComponent(Menu_script).EstaPersonaje("Cristina");
		}
		
		if(fabio && diana && cris){
			act_Player.GetComponent(MoverClick).MoverOff();
				
				GameObject.Find("LuzSalidaB").transform.position = new Vector3(-10.3,0.5,-12);
				GameObject.Find("SalidaB").GetComponent(Interactor_Trigger).apagar();
				act_Player.GetComponent(MoverClick).MoverOn();
			}
		else{
				
		}
		
		if(objName.Equals("Final")){
			
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
			managerDialogos.mostrarDialogo(2,managerDialogos.GLOBO_PENSAMIENTO, Screen.width/2, Screen.height/2,Screen.width/2 + 10,Screen.height/2 + 30);
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
			GameObject.Find("CursorLlave").GetComponent(CursorControl).DesactivarCursor();
			Screen.showCursor = true;
		}
		
		if(comando.Equals("Puerta")){
			if(flag2){
				managerDialogos.mostrarDialogo(27,managerDialogos.GLOBO_PENSAMIENTO, Screen.width/2, Screen.height/2,Screen.width/2 + 10,Screen.height/2 + 30);
				yield WaitForSeconds(3);
				managerDialogos.apagarDialogo();
			}	
			else{
				managerDialogos.mostrarDialogo(1,managerDialogos.GLOBO_PENSAMIENTO, Screen.width/2, Screen.height/2,Screen.width/2 + 10,Screen.height/2 + 30);
				yield WaitForSeconds(3);
				managerDialogos.apagarDialogo();
			}		
		}
		
		//Cajon donde esta el botiquin
		if(comando.Equals("Cajon") && fCajon){
			if(!(act_Player.GetComponent(Player).Nombre().Equals("Diana"))){
				if(flag3){
				
				}
				else{
					
				}
			}
			else{
				fCajon = false;
				GetComponent(Menu_script).agregarItem(texturaBotiquin, "Botiquin");
				
			}
		}
		//Derrumbe de la habitacion donde esta fabio
		if(comando.Equals("Derrumbe")){
			if(act_Player.GetComponent(Player).Nombre().Equals("Fabio")){
				
				GameObject.Find("CursorFuerza").GetComponent(CursorControl).DesactivarCursor();
			}
			else if(act_Player.GetComponent(Player).Nombre().Equals("Dario")){
			
			}
		}
		//Armario donde esta atrapada cristina
		if(comando.Equals("Armario")){
			if(!(act_Player.GetComponent(Player).Nombre().Equals("Fabio"))){
				
			}
			else{
			
			}
		}
		//Escombros donde esta atrapada diana
		if(comando.Equals("Escombros")){
			if(act_Player.GetComponent(Player).Nombre().Equals("Fabio")){
				
				GameObject.Find("CursorFuerza").GetComponent(CursorControl).DesactivarCursor();
				Destroy(GameObject.Find("Escombros"));
				//Destroy(GameObject.Find("ParedOC"));
				GameObject.Find("AuxilioTrigger").GetComponent(Interactor_Trigger).apagar();
				flag3 = true;
			}
			else if(act_Player.GetComponent(Player).Nombre().Equals("Dario")){}
			
		}
		//Curar a Cristina
		if(comando.Equals("Cristina")){
			if(act_Player.GetComponent(Player).Nombre().Equals("Diana")){
			
			}
		}
		
		if(comando.Equals("Emergencia")){
			if(act_Player.GetComponent(Player).Nombre().Equals("Cristina")){
				cm3 = true;
				Destroy(GameObject.Find("PuertaEmergencia"));
				GameObject.Find("CursorPeque").GetComponent(CursorControl).DesactivarCursor();
				yield WaitForSeconds(5);
				cm3 = false;
			}
			else{
			
			}	
		}
	}
	
	//Implementación de la funcion Item() de la interfaz
	function EventItem(objName : String){
		//Llave
		if(objName.Equals("llave")){
			Screen.showCursor = false;
			GameObject.Find("CursorLlave").GetComponent(CursorControl).ActivarCursor();
			GameObject.Find("Puerta").GetComponent(Interactor_Click).FlagOff();	
		}
	}
	
	function DarCinematica(index : int){
		return cinematicas[index];
	}