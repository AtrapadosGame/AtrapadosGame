#pragma strict
#pragma strict
//Ojo, para evitar problemas en el nivel 1.5:


//Variables para los managers


private var managerDialogos: ManagerDialogos2;
private var playerManager : Player_Manager;
private var lootManager : LootManager1_5;
private var persistance : Persistance;
private var inventario : InventarioManager;
private var puzzle : Puzzle;

private var currentPlayer : Player;
//Texturas

var cinematicas : Texture2D[] = new Texture2D[10];

var texturaCursorDario : Texture2D;
var texturaCursorCristina : Texture2D;
var texturaCursorFabio : Texture2D;
var texturaCursorDiana : Texture2D;
var texturaCursorMario : Texture2D;
var texturaCursorFrancisco : Texture2D;


var texturaPala : Texture2D;
var texturaExtintor : Texture2D;
var texturaToalla : Texture2D;
var texturaBotiquin : Texture2D;
var texturaSegueta : Texture2D;
var texturaTubo : Texture2D;
var texturaLlave : Texture2D;

var boolTubo : boolean = false ;
var boolReja : boolean = false ;
var boolPuerta : boolean = false ;
var boolLlave : boolean = false ;
var jefeEscapa : boolean = false ;
var quemado : boolean = false ;
var infoConserje : boolean = false ;

var cinematicaFusibles : boolean = false ;
var cinematicaTorniquete : boolean = false ;
var cinematicaExtintor : boolean = false ;
var cinematicaBotiquin : boolean = false ;
var cinematicaReja : boolean = false ;
var cinematicaFuego : boolean = false ;
var cinematicaMueble : boolean = false ;
var cinematicaInhalador : boolean = false ;
var cinematicaFinal : boolean = false ;
var cinematicaFrancisco : boolean = false ;


var texturaCuadroDario : Texture2D;
var texturaCuadroCristina : Texture2D;
var texturaCuadroFabio : Texture2D;
var texturaCuadroDiana : Texture2D;
var texturaCuadroMario : Texture2D;
var texturaCuadroFrancisco : Texture2D;

public static final var PALA : int = 0;
public static final var EXTINTOR : int = 1;
public static final var TOALLA : int = 2;
public static final var BOTIQUIN : int = 3;
public static final var LLAVE : int = 4;
public static final var SEGUETA : int = 6;
public static final var TUBO : int = 7;
public static final var INHALADOR : int = 8;

public static final var DIANA : int = Player_Manager.DIANA;
public static final var MARIO : int = Player_Manager.MARIO;
public static final var FRANCISCO : int = Player_Manager.FRANCISCO;

public var empleadosRescados : int = 0;
public var contadorSegueta : int = 0;
var siguienteNivel : String;


function Awake () {

GameObject.Find("Diana").renderer.enabled = false;
GameObject.Find("Diana").collider.enabled = false;
GameObject.Find("Diana").renderer.enabled = false;
GameObject.Find("Mario").collider.enabled = false;
GameObject.Find("Mario").renderer.enabled = false;
GameObject.Find("Francisco").collider.enabled = false;
GameObject.Find("Francisco").renderer.enabled = false;





//Inicializacion de los managers y demas scripts
playerManager = GetComponent(Player_Manager);
managerDialogos = GetComponent(ManagerDialogos2);
lootManager = GetComponent(LootManager1_5);
inventario = GetComponent(InventarioManager);
puzzle = GetComponent(Puzzle);
persistance = GameObject.Find("Persistance").GetComponent(Persistance);


inventario.setItemsActuales(persistance.getInventario());

var tempPlayers: Player[] = persistance.getParty();

for(var i:int = 0 ; i <tempPlayers.Length ; i++){
	if(tempPlayers[i]){
		playerManager.addPlayer(new Player(tempPlayers[i].getTextura(),tempPlayers[i].getId(),tempPlayers[i].getNombre(),tempPlayers[i].getCursor()));
		contadorSegueta++;
	}

}

}


function OnGUI(){

	if(cinematicaFusibles){
		GUI.Label (Rect (Screen.width/2 - 600,Screen.height/2 - 250, Screen.width, Screen.height), cinematicas[0]);
	}
	if(cinematicaTorniquete){
		GUI.Label (Rect (Screen.width/2 - 600,Screen.height/2 - 250, Screen.width, Screen.height), cinematicas[1]);
	}
	if(cinematicaExtintor){
		GUI.Label (Rect (Screen.width/2 - 600,Screen.height/2 - 250, Screen.width, Screen.height), cinematicas[2]);
	}
	if(cinematicaBotiquin){
		GUI.Label (Rect (Screen.width/2 - 600,Screen.height/2 - 250, Screen.width, Screen.height), cinematicas[3]);
	}
	if(cinematicaReja){
		GUI.Label (Rect (Screen.width/2 - 600,Screen.height/2 - 250, Screen.width, Screen.height), cinematicas[4]);
	}
	if(cinematicaMueble){
		GUI.Label (Rect (Screen.width/2 - 600,Screen.height/2 - 250, Screen.width, Screen.height), cinematicas[5]);
	}
	if(cinematicaInhalador){
		GUI.Label (Rect (Screen.width/2 - 600,Screen.height/2 - 250, Screen.width, Screen.height), cinematicas[6]);
	}
	if(cinematicaFuego){
		GUI.Label (Rect (Screen.width/2 - 600,Screen.height/2 - 250, Screen.width, Screen.height), cinematicas[7]);
	}
	if(cinematicaFinal){
		GUI.Label (Rect (Screen.width/2 - 600,Screen.height/2 - 250, Screen.width, Screen.height), cinematicas[8]);
	}
	if(cinematicaFrancisco){
		GUI.Label (Rect (Screen.width/2 - 600,Screen.height/2 - 250, Screen.width, Screen.height), cinematicas[9]);
	}
}



// ================================================================================
// Manejo de los eventos de triggers(Activados por Areas)(Llamado por interactorTrigger_)
// ================================================================================

//Implementación de la función Trigger()
function EventTrigger(objName : String){
//	currentPlayer = GetComponent(Player_Manager).getCurrentPlayer();
	var managerDialogos = GetComponent(ManagerDialogos2);	
}

//Imlementación de la funcion Switch()
function EventSwitch(comando : String){
	
	currentPlayer = GetComponent(Player_Manager).getCurrentPlayer();
	var managerDialogos = GetComponent(ManagerDialogos2);
	
	//Caja donde esta el botiquin
	if(comando.Equals("MesaBotiquin")){	
		//Aca se consigue lel botiquin
		if(currentPlayer.getId() == Player_Manager.FRANCISCO){
			GameObject.Find("MesaBotiquin").GetComponent(Interactor_Click).FlagOff();
			GetComponent(InventarioManager).addItem(new Item(texturaBotiquin, BOTIQUIN));
			cinematicaFrancisco = true;
			yield WaitForSeconds(3);
			cinematicaFrancisco = false;
			managerDialogos.empezarDialogos(ManagerDialogos2.CONVERSACION_BOTIQUIN_LOCKER_FRANCISCO_EN_PARTY);
			Cursor.SetCursor(null, Vector2.zero, CursorMode.ForceSoftware);
		}
		else if(currentPlayer.getId() == Player_Manager.MARIO){
			managerDialogos.empezarDialogos(ManagerDialogos2.CONVERSACION_BOTIQUIN_LOCKER);
			Cursor.SetCursor(null, Vector2.zero, CursorMode.ForceSoftware);
		}
		else{
			managerDialogos.empezarDialogos(ManagerDialogos2.CONVERSACION_BOTIQUIN_LOCKER_NO_FRANCISCO);
			Cursor.SetCursor(null, Vector2.zero, CursorMode.ForceSoftware);
		}	
	}
	
	
	//puzzle
	if(comando.Equals("Puzzle")){	
		
		if(currentPlayer.getId() == Player_Manager.MARIO){
			managerDialogos.empezarDialogos(ManagerDialogos2.CONVERSACION_CAJA_FUERTE_MARIO);
			Cursor.SetCursor(null, Vector2.zero, CursorMode.ForceSoftware);	
			boolLlave = true;
		}
		else{
			puzzle.empezarPuzzle();
			if(puzzle.puzzleRespuesta())
			{
				GameObject.Find("Caja").GetComponent(Interactor_Click).FlagOff();
				GetComponent(InventarioManager).addItem(new Item(texturaLlave, LLAVE));
				managerDialogos.empezarDialogos(ManagerDialogos2.CONVERSACION_CAJA_EXITO);
				Cursor.SetCursor(null, Vector2.zero, CursorMode.ForceSoftware);	
			}
		}
	}
	
	//Caja donde esta la segueta
	if(comando.Equals("MesaSegueta")){	
		//Aca se consigue la segueta de la reja
		GameObject.Find("MesaSegueta").GetComponent(Interactor_Click).FlagOff();
		GetComponent(InventarioManager).addItem(new Item(texturaSegueta, SEGUETA));
		managerDialogos.empezarDialogos(ManagerDialogos2.CONVERSACION_ARMARIO_SEGUETAS_SI);
		Cursor.SetCursor(null, Vector2.zero, CursorMode.ForceSoftware);	
	}
	
	//Cajas donde no esta la segueta
	if(comando.Equals("MesaNoSegueta")){	
		//Aca no se consigue la segueta de la reja
		GameObject.Find("MesaNoSegueta").GetComponent(Interactor_Click).FlagOff();
		managerDialogos.empezarDialogos(ManagerDialogos2.CONVERSACION_ARMARIO_SEGUETAS_NO);
		Cursor.SetCursor(null, Vector2.zero, CursorMode.ForceSoftware);	
	}
	
	
	//mueble bloqueando puerta jefe
	if(comando.Equals("MesaPuerta")){	
		//Aca se consigue la llave de la puerta
		if(boolPuerta){
			if(GetComponent(InventarioManager).enInventario(PALA))
			{
			
				Destroy(GameObject.Find("MesaPuerta"));
				GetComponent(InventarioManager).usarItem(PALA);
				GetComponent(Player_Manager).getCurrentPlayer().getGameObject().GetComponent(MoverClick).MoverOff();
				cinematicaMueble = true;
				yield WaitForSeconds(3);
				cinematicaMueble = false;
				GetComponent(Player_Manager).getCurrentPlayer().getGameObject().GetComponent(MoverClick).MoverOn();
				managerDialogos.empezarDialogos(ManagerDialogos2.CONVERSACION_BARRICADA_PALA);
				Cursor.SetCursor(null, Vector2.zero, CursorMode.ForceSoftware);
			}
			else if(GetComponent(InventarioManager).enInventario(TUBO))
			{
				GameObject.Find("MesaPuerta").GetComponent(Interactor_Click).FlagOff();
				GetComponent(InventarioManager).usarItem(TUBO);
				GetComponent(Player_Manager).getCurrentPlayer().getGameObject().GetComponent(MoverClick).MoverOff();
				cinematicaMueble = true;
				yield WaitForSeconds(5);
				cinematicaMueble = false;
				GetComponent(Player_Manager).getCurrentPlayer().getGameObject().GetComponent(MoverClick).MoverOn();
				managerDialogos.empezarDialogos(ManagerDialogos2.CONVERSACION_BARRICADA_TUBO);
				Cursor.SetCursor(null, Vector2.zero, CursorMode.ForceSoftware);
				GameObject.Find("MesaPuerta").renderer.enabled = false;
				GameObject.Find("MesaPuerta").collider.enabled = false;
			}
			else if(currentPlayer.getId() == Player_Manager.MARIO){
				managerDialogos.empezarDialogos(ManagerDialogos2.CONVERSACION_BARRICADA_MARIO);
			}
			else{
				managerDialogos.empezarDialogos(ManagerDialogos2.CONVERSACION_BARRICADA_NO_MARIO);
				Cursor.SetCursor(null, Vector2.zero, CursorMode.ForceSoftware);
			}
		}
	}
	
	//Caja puerta jefe
	// el 5 representa la constante que represente a fransisco, estoy asumiendo que son 1 dario 2 diana 3 fransisco 4 mario
	// segun el player manager
	if(comando.Equals("MesaTubos")){	
		//Aca se consigue la llave de la puerta
		if(GetComponent(Player_Manager).estaPersonaje(FRANCISCO))
		{
			if(currentPlayer.getId() == Player_Manager.FRANCISCO)
			{
				GameObject.Find("MesaTubos").GetComponent(Interactor_Click).FlagOff();
				GetComponent(InventarioManager).addItem(new Item(texturaTubo, TUBO));
				cinematicaFrancisco = true;
				yield WaitForSeconds(3);
				cinematicaFrancisco = false;
				managerDialogos.empezarDialogos(ManagerDialogos2.CONVERSACION_ARMARIO_TUBO_FRANCISCO);
				Cursor.SetCursor(null, Vector2.zero, CursorMode.ForceSoftware);
			}else{
				managerDialogos.empezarDialogos(ManagerDialogos2.CONVERSACION_ARMARIO_TUBO_FRANCISCO_EN_PARTY);
				Cursor.SetCursor(null, Vector2.zero, CursorMode.ForceSoftware);
			}
		}
		else {
			managerDialogos.empezarDialogos(ManagerDialogos2.CONVERSACION_ARMARIO_TUBO_SIN_FRANCISCO);
			Cursor.SetCursor(null, Vector2.zero, CursorMode.ForceSoftware);
		}
	}
	
	
	
	//Caja fusibles
	if(comando.Equals("MesaFusibles")){	
		//Aca se consigue la llave de la puerta
		managerDialogos.empezarDialogos(ManagerDialogos2.CONVERSACION_ARMARIO_FUSIBLES);
		Cursor.SetCursor(null, Vector2.zero, CursorMode.ForceSoftware);
	}
	
	
	//JEFE
	if(comando.Equals("Jefe")){	
		managerDialogos.empezarDialogos(ManagerDialogos2.CONVERSACION_JEFE);
		Cursor.SetCursor(null, Vector2.zero, CursorMode.ForceSoftware);	
	}
	
	//reja puerta jefe
	if(comando.Equals("RejaJefe")){	
		if(currentPlayer.getId() == Player_Manager.MARIO){
			managerDialogos.empezarDialogos(ManagerDialogos2.CONVERSACION_REJA_MARIO);
		}
		else{
			if(GetComponent(InventarioManager).enInventario(SEGUETA))
			{
				if(contadorSegueta >= 3){
					GameObject.Find("Reja").GetComponent(Interactor_Click).FlagOff();
					managerDialogos.empezarDialogos(ManagerDialogos2.CONVERSACION_REJA_ABRIR);
					Cursor.SetCursor(null, Vector2.zero, CursorMode.ForceSoftware);
					
					GameObject.Find("Reja").renderer.enabled = false;
					GameObject.Find("Reja").collider.enabled = false;
					boolReja = true;
				}
				else{
					managerDialogos.empezarDialogos(ManagerDialogos2.CONVERSACION_REJA_SIN_3_PERSONAS);
					Cursor.SetCursor(null, Vector2.zero, CursorMode.ForceSoftware);
				}	
			}
			else{
				managerDialogos.empezarDialogos(ManagerDialogos2.CONVERSACION_REJA_SIN_SEGUETA);
				Cursor.SetCursor(null, Vector2.zero, CursorMode.ForceSoftware);
			}
		}
	}
	
	
	
	//puerta jefe
	if(comando.Equals("PuertaJefe")){	
		//Aca se usa la llave de la puerta
		if(boolReja){
			if(GetComponent(InventarioManager).enInventario(LLAVE))
			{
				var puerta : GameObject = GameObject.Find("Puerta");
				puerta.renderer.enabled = false;
				puerta.collider.enabled = false;
				GetComponent(InventarioManager).usarItem(LLAVE);
				managerDialogos.empezarDialogos(ManagerDialogos2.CONVERSACION_PUERTA_JEFE_2);
				Cursor.SetCursor(null, Vector2.zero, CursorMode.ForceSoftware);
				boolPuerta = true;
			}
			else if(currentPlayer.getId() == Player_Manager.MARIO){
				managerDialogos.empezarDialogos(ManagerDialogos2.CONVERSACION_PUERTA_JEFE_MARIO);
			}
			else {
				managerDialogos.empezarDialogos(ManagerDialogos2.CONVERSACION_PUERTA_JEFE_1);
				Cursor.SetCursor(null, Vector2.zero, CursorMode.ForceSoftware);
			}
		}
	}
	

	
	//CONVERSACIONES TRABAJADOR TUBO (terco)
	if(comando.Equals("TTubo")){	
		if(empleadosRescados >= 3){
			GameObject.Find	("TrabajadorTubo").GetComponent(Interactor_Click).FlagOff();
			managerDialogos.empezarDialogos(ManagerDialogos2.CONVERSACION_TRABAJADOR_LIBERADO);
			empleadosRescados++;
			Cursor.SetCursor(null, Vector2.zero, CursorMode.ForceSoftware);
		}else{
			managerDialogos.empezarDialogos(ManagerDialogos2.CONVERSACION_TRABAJADOR_TUBO_NORMAL);
			Cursor.SetCursor(null, Vector2.zero, CursorMode.ForceSoftware);
		}
	}
	
	
	//CONVERSACIONES TRABAJADOR LLAVE (terco)
	if(comando.Equals("TrabajadorLlave")){	
		//Aca se consigue la llave de la puerta
		if(empleadosRescados >= 3){
			GameObject.Find	("TrabajadorLlave").GetComponent(Interactor_Click).FlagOff();
			managerDialogos.empezarDialogos(ManagerDialogos2.CONVERSACION_TRABAJADOR_LIBERADO);
			empleadosRescados++;
			Cursor.SetCursor(null, Vector2.zero, CursorMode.ForceSoftware);
		}else{
			managerDialogos.empezarDialogos(ManagerDialogos2.CONVERSACION_TRABAJADOR_LLAVE_NORMAL);
			Cursor.SetCursor(null, Vector2.zero, CursorMode.ForceSoftware);
		}
	}
	
	
	//CONVERSACIONES TRABAJADOR CONSERJE (terco)
	//DA INFORMACION DEL CONSERJE y de la segueta
	if(comando.Equals("TrabajadorConserje")){	
		//Aca se consigue la llave de la puerta
		if(empleadosRescados >= 3)
		{
			GameObject.Find	("TrabajadorConserje").GetComponent(Interactor_Click).FlagOff();
			managerDialogos.empezarDialogos(ManagerDialogos2.CONVERSACION_TRABAJADOR_LIBERADO);
			empleadosRescados++;
			Cursor.SetCursor(null, Vector2.zero, CursorMode.ForceSoftware);
		}else{
			managerDialogos.empezarDialogos(ManagerDialogos2.CONVERSACION_TRABAJADOR_CONSERJE_NORMAL);
			Cursor.SetCursor(null, Vector2.zero, CursorMode.ForceSoftware);
		}
	}
	
	
	
	//CONVERSACIONES TRABAJADOR  LLAMAS
	if(comando.Equals("TrabajadorFuego")){	
		//Aca se consigue la llave de la puerta
		if(GetComponent(InventarioManager).enInventario(EXTINTOR))
		{
			managerDialogos.empezarDialogos(ManagerDialogos2.CONVERSACION_TRABAJADOR_LLAMAS_EXTINTOR);
			
			GetComponent(InventarioManager).usarItem(EXTINTOR);
			Destroy(GameObject.Find("EscombrosFuego"));
			empleadosRescados++;
			contadorSegueta++;
			GetComponent(Player_Manager).getCurrentPlayer().getGameObject().GetComponent(MoverClick).MoverOff();
			GameObject.Find("TrabajadorFuego").GetComponent(Interactor_Click).FlagOff();
			Cursor.SetCursor(null, Vector2.zero, CursorMode.ForceSoftware);
			
		}else if(!GetComponent(InventarioManager).enInventario(EXTINTOR) && !quemado)
		{
			managerDialogos.empezarDialogos(ManagerDialogos2.CONVERSACION_TRABAJADOR_LLAMAS);
			
			quemado = true;
			
			Cursor.SetCursor(null, Vector2.zero, CursorMode.ForceSoftware);
		}else
		{
			if(GetComponent(Player_Manager).estaPersonaje(DIANA)){
				if(GetComponent(InventarioManager).enInventario(BOTIQUIN)){
	
					GameObject.Find	("TrabajadorFuego").GetComponent(Interactor_Click).FlagOff();
					managerDialogos.empezarDialogos(ManagerDialogos2.CONVERSACION_TRABAJADOR_LLAMAS_CURAR);
					GetComponent(InventarioManager).usarItem(BOTIQUIN);
					Cursor.SetCursor(null, Vector2.zero, CursorMode.ForceSoftware);
					empleadosRescados++;
					contadorSegueta++;
					
				}
				else{
					managerDialogos.empezarDialogos(ManagerDialogos2.CONVERSACION_TRABAJADOR_LLAMAS_NO_BOTIQUIN);
					Cursor.SetCursor(null, Vector2.zero, CursorMode.ForceSoftware);
				}
			}	
			else{
				GameObject.Find	("TrabajadorFuego").GetComponent(Interactor_Click).FlagOff();
				managerDialogos.empezarDialogos(ManagerDialogos2.CONVERSACION_TRABAJADOR_LLAMAS_NO_DIANA);
				Cursor.SetCursor(null, Vector2.zero, CursorMode.ForceSoftware);
			}
		}
	}
	
	
	//CONVERSACIONES TRABAJADOR HERIDO
	if(comando.Equals("TrabajadorHerido")){	
		//Aca se consigue la llave de la puerta
		if(GetComponent(Player_Manager).estaPersonaje(DIANA))
		{
			GameObject.Find	("TrabajadorHerido").GetComponent(Interactor_Click).FlagOff();
			cinematicaBotiquin = true;
			yield WaitForSeconds(3);
			cinematicaBotiquin = false;
			managerDialogos.empezarDialogos(ManagerDialogos2.CONVERSACION_TRABAJADOR_HERIDO_DIANA_EN_PARTY);
			Cursor.SetCursor(null, Vector2.zero, CursorMode.ForceSoftware);
			contadorSegueta++;
			empleadosRescados++;
		}else if(GetComponent(InventarioManager).enInventario(TOALLA))
		{
			GameObject.Find	("TrabajadorHerido").GetComponent(Interactor_Click).FlagOff();
			cinematicaTorniquete = true;
			yield WaitForSeconds(3);
			cinematicaTorniquete = false;
			managerDialogos.empezarDialogos(ManagerDialogos2.CONVERSACION_TRABAJADOR_HERIDO_TOALLA);
			Cursor.SetCursor(null, Vector2.zero, CursorMode.ForceSoftware);
			empleadosRescados++;
			contadorSegueta++;
		}else{
			managerDialogos.empezarDialogos(ManagerDialogos2.CONVERSACION_TRABAJADOR_HERIDO_NO_TOALLA_NO_DIANA);
			Cursor.SetCursor(null, Vector2.zero, CursorMode.ForceSoftware);
		}
	}
	
	
	//CONVERSACIONES TRABAJADOR INCONCIENTE
	if(comando.Equals("TrabajadorDesmayado")){	
		//Aca se consigue la llave de la puerta
		if(GetComponent(Player_Manager).estaPersonaje(DIANA) )
		{
			GameObject.Find	("TrabajadorDesmayado").GetComponent(Interactor_Click).FlagOff();
			cinematicaInhalador = true;
			yield WaitForSeconds(3);
			cinematicaInhalador = false;
			managerDialogos.empezarDialogos(ManagerDialogos2.CONVERSACION_TRABAJADOR_DESMAYADO_DIANA_EN_PARTY);
			Cursor.SetCursor(null, Vector2.zero, CursorMode.ForceSoftware);
			contadorSegueta++;
			empleadosRescados++;
		}else if(GetComponent(InventarioManager).enInventario(INHALADOR))
		{
			GameObject.Find	("TrabajadorDesmayado").GetComponent(Interactor_Click).FlagOff();
			cinematicaInhalador = true;
			yield WaitForSeconds(3);
			cinematicaInhalador = false;
			managerDialogos.empezarDialogos(ManagerDialogos2.CONVERSACION_TRABAJADOR_DESMAYADO_INHALADOR);
			Cursor.SetCursor(null, Vector2.zero, CursorMode.ForceSoftware);
			empleadosRescados++;
			contadorSegueta++;
		}else if(GetComponent(Player_Manager).estaPersonaje(MARIO) )
		{
			managerDialogos.empezarDialogos(ManagerDialogos2.CONVERSACION_TRABAJADOR_DESMAYADO_MARIO);
			Cursor.SetCursor(null, Vector2.zero, CursorMode.ForceSoftware);
		}
		else
		{
			managerDialogos.empezarDialogos(ManagerDialogos2.CONVERSACION_TRABAJADOR_DESMAYADO);
			Cursor.SetCursor(null, Vector2.zero, CursorMode.ForceSoftware);
		}
	}
	
	
	//Caja donde esta EL INHALADOR
	if(comando.Equals("MesaInhalador")){	
		//Aca se consigue el inhalador
		if(GetComponent(Player_Manager).estaPersonaje(FRANCISCO) )
		{
			if(currentPlayer.getId() == Player_Manager.FRANCISCO)
			{
				GameObject.Find("MesaInhalador").GetComponent(Interactor_Click).FlagOff();
				GetComponent(InventarioManager).addItem(new Item(texturaTubo, INHALADOR));
				cinematicaFrancisco = true;
				yield WaitForSeconds(3);
				cinematicaFrancisco = false;
				managerDialogos.empezarDialogos(ManagerDialogos2.CONVERSACION_INHALADOR_FRANCISCO);
				Cursor.SetCursor(null, Vector2.zero, CursorMode.ForceSoftware);
			}else{
				managerDialogos.empezarDialogos(ManagerDialogos2.CONVERSACION_INHALADOR_FRANCISCO_EN_PARTY);
				Cursor.SetCursor(null, Vector2.zero, CursorMode.ForceSoftware);
			}
		
				
		}else{
			managerDialogos.empezarDialogos(ManagerDialogos2.CONVERSACION_INHALADOR_NO_FRANCISCO);
		}
	}
	
	//Caja donde esta EL INHALADOR
	if(comando.Equals("Salida")){	
		//Aca se consigue el inhalador
			if(GetComponent(InventarioManager).enInventario(LLAVE))
			{ 
				if(empleadosRescados == 6 )
				{
					var puertaS : GameObject = GameObject.Find("PuertaSalida");
					puertaS.renderer.enabled = false;
					puertaS.collider.enabled = false;
					GetComponent(InventarioManager).usarItem(LLAVE);
					managerDialogos.empezarDialogos(ManagerDialogos2.CONVERSACION_SALIDA_TRABAJADORES);
					Cursor.SetCursor(null, Vector2.zero, CursorMode.ForceSoftware);
				}
				else{
					managerDialogos.empezarDialogos(ManagerDialogos2.CONVERSACION_SALIDA_SOLO);
					Cursor.SetCursor(null, Vector2.zero, CursorMode.ForceSoftware);
				}
			}
			else if(currentPlayer.getId() == Player_Manager.MARIO){
				managerDialogos.empezarDialogos(ManagerDialogos2.CONVERSACION_PUERTA_JEFE_MARIO);
			}
			else{
				managerDialogos.empezarDialogos(ManagerDialogos2.CONVERSACION_PUERTA_JEFE_1);
				Cursor.SetCursor(null, Vector2.zero, CursorMode.ForceSoftware);
			}
	}
}	
	
//Se llama como resultado(al finalizar) de un dialogo, no todos los dialogos tiene resultado*
//Implementación de la función IEventDialog
function EventDialog(idResultado : int){

	if(idResultado == ManagerDialogos2.FUSIBLES){
		cinematicaFusibles = true;
		GetComponent(Player_Manager).getCurrentPlayer().getGameObject().GetComponent(MoverClick).MoverOff();
		yield WaitForSeconds(5);
		cinematicaFusibles = false;
		GetComponent(Player_Manager).getCurrentPlayer().getGameObject().GetComponent(MoverClick).MoverOn();
	}
	
	if(idResultado == ManagerDialogos2.TRABAJADOR_FUEGO){
		
		GetComponent(Player_Manager).getCurrentPlayer().getGameObject().GetComponent(MoverClick).MoverOff();
		cinematicaFuego = true;
		yield WaitForSeconds(5);
		cinematicaFuego = false;
		GetComponent(Player_Manager).getCurrentPlayer().getGameObject().GetComponent(MoverClick).MoverOn();
		GameObject.Find("TrabajadorFuego").transform.position.x = -7.624907;
		GameObject.Find("TrabajadorFuego").transform.position.z = -9.590029;
	}
	if(idResultado == ManagerDialogos2.TRABAJADOR_FUEGO_EXTINTOR){
	
		GetComponent(Player_Manager).getCurrentPlayer().getGameObject().GetComponent(MoverClick).MoverOff();
		cinematicaExtintor = true;
		yield WaitForSeconds(5);
		cinematicaExtintor = false;
		GetComponent(Player_Manager).getCurrentPlayer().getGameObject().GetComponent(MoverClick).MoverOn();

	}
	
	if(idResultado == ManagerDialogos2.BOTIQUIN){
	
		GetComponent(Player_Manager).getCurrentPlayer().getGameObject().GetComponent(MoverClick).MoverOff();
		cinematicaBotiquin = true;
		yield WaitForSeconds(5);
		cinematicaBotiquin = false;
		GetComponent(Player_Manager).getCurrentPlayer().getGameObject().GetComponent(MoverClick).MoverOn();

	}
	if(idResultado == ManagerDialogos2.FINAL_JEFE){
		Application.LoadLevel(siguienteNivel);
	}
	
	if(idResultado == ManagerDialogos2.SALIDA_TRABAJADORES){
		cinematicaFinal = true;
		yield WaitForSeconds(7);
		cinematicaFinal = false;
		Application.LoadLevel(siguienteNivel);
	}
	
	if(idResultado == ManagerDialogos2.HUIR){
		cinematicaFinal = true;
		yield WaitForSeconds(7);
		cinematicaFinal = false;
		Application.LoadLevel(siguienteNivel);
	}
	
	if(idResultado == ManagerDialogos2.REJA){
		GetComponent(Player_Manager).getCurrentPlayer().getGameObject().GetComponent(MoverClick).MoverOff();
		cinematicaReja = true;
		yield WaitForSeconds(5);
		cinematicaReja = false;
		GetComponent(Player_Manager).getCurrentPlayer().getGameObject().GetComponent(MoverClick).MoverOn();
	}		
}


function DarCinematica(index : int){
	return cinematicas[index];
}