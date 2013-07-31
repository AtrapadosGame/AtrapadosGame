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
var cinematicas : Texture2D[] = new Texture2D[5];

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


public static final var DARIO : int = 0;
public static final var CRISTINA : int = 1;
public static final var DIANA : int = 2;
public static final var FABIO : int = 3;
public static final var MARIO : int = 4;
public static final var FRANCISCO : int = 5;

public var empleadosRescados : int = 0;
public var contadorSegueta : int = 0;

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
		GameObject.Find("MesaBotiquin").GetComponent(Interactor_Click).FlagOff();
		GetComponent(InventarioManager).addItem(new Item(texturaBotiquin, BOTIQUIN));
		managerDialogos.empezarDialogos(ManagerDialogos2.CONVERSACION_BOTIQUIN_LOCKER_FRANCISCO_EN_PARTY);
		Cursor.SetCursor(null, Vector2.zero, CursorMode.ForceSoftware);	
	}
	
	
	//puzzle
	if(comando.Equals("Puzzle")){	
		//
		if(infoConserje)
		{
			puzzle.empezarPuzzle();
			if(puzzle.puzzleRespuesta())
			{
				GameObject.Find("Caja").GetComponent(Interactor_Click).FlagOff();
				GetComponent(InventarioManager).addItem(new Item(texturaLlave, LLAVE));
				managerDialogos.empezarDialogos(ManagerDialogos2.CONVERSACION_BOTIQUIN_LOCKER_FRANCISCO_EN_PARTY);
				Cursor.SetCursor(null, Vector2.zero, CursorMode.ForceSoftware);	
			}
		}else{
			managerDialogos.empezarDialogos(ManagerDialogos2.CONVERSACION_CAJA_FUERTE_MARIO);
			Cursor.SetCursor(null, Vector2.zero, CursorMode.ForceSoftware);	
			boolLlave = true;
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
		if(GetComponent(InventarioManager).enInventario(PALA))
		{
			GameObject.Find("MesaPuerta").GetComponent(Interactor_Click).FlagOff();
			GetComponent(InventarioManager).usarItem(PALA);
			managerDialogos.empezarDialogos(ManagerDialogos2.CONVERSACION_BARRICADA_PALA);
			Cursor.SetCursor(null, Vector2.zero, CursorMode.ForceSoftware);
			GameObject.Find("RejaJefe").renderer.enabled = false;
			GameObject.Find("RejaJefe").collider.enabled = false;
		}
		else if(GetComponent(InventarioManager).enInventario(TUBO))
		{
			GameObject.Find("MesaPuerta").GetComponent(Interactor_Click).FlagOff();
			GetComponent(InventarioManager).usarItem(TUBO);
			managerDialogos.empezarDialogos(ManagerDialogos2.CONVERSACION_BARRICADA_TUBO);
			Cursor.SetCursor(null, Vector2.zero, CursorMode.ForceSoftware);
			var boolTubo = true;
			GameObject.Find("MesaPuerta").renderer.enabled = false;
			GameObject.Find("MesaPuerta").collider.enabled = false;
		}
		else{
			managerDialogos.empezarDialogos(ManagerDialogos2.CONVERSACION_BARRICADA_NO_MARIO);
			Cursor.SetCursor(null, Vector2.zero, CursorMode.ForceSoftware);
		}
		
	}
	
	//Caja puerta jefe
	// el 5 representa la constante que represente a fransisco, estoy asumiendo que son 1 dario 2 diana 3 fransisco 4 mario
	// segun el player manager
	if(comando.Equals("MesaTubos")){	
		//Aca se consigue la llave de la puerta
		if(GetComponent(Player_Manager).estaPersonaje(FRANCISCO))
		{
			if(currentPlayer.Equals("Francisco"))
			{
				GameObject.Find("MesaTubos").GetComponent(Interactor_Click).FlagOff();
				GetComponent(InventarioManager).addItem(new Item(texturaTubo, TUBO));
				managerDialogos.empezarDialogos(ManagerDialogos2.CONVERSACION_ARMARIO_TUBO_FRANCISCO_EN_PARTY);
				Cursor.SetCursor(null, Vector2.zero, CursorMode.ForceSoftware);
			}else{
				managerDialogos.empezarDialogos(ManagerDialogos2.CONVERSACION_ARMARIO_TUBO_FRANCISCO_EN_PARTY);
				Cursor.SetCursor(null, Vector2.zero, CursorMode.ForceSoftware);
			}
		}
		else {
			GameObject.Find("MesaTubos").GetComponent(Interactor_Click).FlagOff();
			managerDialogos.empezarDialogos(ManagerDialogos2.CONVERSACION_BARRICADA_TUBO);
			Cursor.SetCursor(null, Vector2.zero, CursorMode.ForceSoftware);
			boolTubo = true ;
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
		//Aca se consigue la llave de la puerta
		GameObject.Find("Jefe").GetComponent(Interactor_Click).FlagOff();
		managerDialogos.empezarDialogos(ManagerDialogos2.CONVERSACION_JEFE);
		Cursor.SetCursor(null, Vector2.zero, CursorMode.ForceSoftware);
		GameObject.Find("Jefe").renderer.enabled = false;
		GameObject.Find("Jefe").collider.enabled = false;
		jefeEscapa = true;
		
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
				}
				else{
					managerDialogos.empezarDialogos(ManagerDialogos2.CONVERSACION_REJA_SIN_3_PERSONAS);
					Cursor.SetCursor(null, Vector2.zero, CursorMode.ForceSoftware);
				}	
			}
			else{
				managerDialogos.empezarDialogos(ManagerDialogos2.CONVERSACION_REJA_SIN_SEGUETA);
				Cursor.SetCursor(null, Vector2.zero, CursorMode.ForceSoftware);
				boolReja = true;
			}
		}
	}
	
	
	
	//puerta jefe
	if(comando.Equals("PuertaJefe")){	
		//Aca se usa la llave de la puerta
		if(GetComponent(InventarioManager).enInventario(LLAVE))
		{
			GameObject.Find("PuertaJefe").GetComponent(Interactor_Click).FlagOff();
			GetComponent(InventarioManager).usarItem(LLAVE);
			managerDialogos.empezarDialogos(ManagerDialogos2.CONVERSACION_PUERTA_JEFE_2);
			Cursor.SetCursor(null, Vector2.zero, CursorMode.ForceSoftware);
			
		}else {
			managerDialogos.empezarDialogos(ManagerDialogos2.CONVERSACION_PUERTA_JEFE_1);
			Cursor.SetCursor(null, Vector2.zero, CursorMode.ForceSoftware);
			boolReja = true ;
		}
	}
	

	
	//CONVERSACIONES TRABAJADOR TUBO (terco)
	if(comando.Equals("TTubo")){	
		//Aca se consigue la llave de la puerta
		if(boolTubo)
		{
			managerDialogos.empezarDialogos(ManagerDialogos2.CONVERSACION_TRABAJADOR_TUBO_DESPUES_BARRICADA);
			Cursor.SetCursor(null, Vector2.zero, CursorMode.ForceSoftware);
			boolTubo = false ;
			
		}else if(empleadosRescados >= 3){
			GameObject.Find	("TrabajadorTubo").GetComponent(Interactor_Click).FlagOff();
			managerDialogos.empezarDialogos(ManagerDialogos2.CONVERSACION_TRABAJADOR_TUBO_LIBERADO);
			empleadosRescados++;
			Cursor.SetCursor(null, Vector2.zero, CursorMode.ForceSoftware);
			GameObject.Find("TrabajadorTubo").renderer.enabled = false;
			GameObject.Find("TrabajadorTubo").collider.enabled = false;
		}else{
			managerDialogos.empezarDialogos(ManagerDialogos2.CONVERSACION_TRABAJADOR_TUBO_NORMAL);
			Cursor.SetCursor(null, Vector2.zero, CursorMode.ForceSoftware);
			
		}
	}
	
	
	//CONVERSACIONES TRABAJADOR LLAVE (terco)
	if(comando.Equals("TrabajadorLlave")){	
		//Aca se consigue la llave de la puerta
		if(boolPuerta)
		{
			managerDialogos.empezarDialogos(ManagerDialogos2.CONVERSACION_TRABAJADOR_LLAVE_DESPUES_PUERTA);
			Cursor.SetCursor(null, Vector2.zero, CursorMode.ForceSoftware);
			boolPuerta = false ;
			
		}else if(empleadosRescados >= 3){
			GameObject.Find	("TrabajadorLlave").GetComponent(Interactor_Click).FlagOff();
			managerDialogos.empezarDialogos(ManagerDialogos2.CONVERSACION_TRABAJADOR_LLAVE_LIBERADO);
			empleadosRescados++;
			Cursor.SetCursor(null, Vector2.zero, CursorMode.ForceSoftware);
			GameObject.Find("TrabajadorLlave").renderer.enabled = false;
			GameObject.Find("TrabajadorLlave").collider.enabled = false;
		}else{
			managerDialogos.empezarDialogos(ManagerDialogos2.CONVERSACION_TRABAJADOR_LLAVE_NORMAL);
			Cursor.SetCursor(null, Vector2.zero, CursorMode.ForceSoftware);
			
		}
	}
	
	
	//CONVERSACIONES TRABAJADOR CONSERJE (terco)
	//DA INFORMACION DEL CONSERJE y de la segueta
	if(comando.Equals("TrabajadorConserje")){	
		//Aca se consigue la llave de la puerta
		if(boolLlave)
		{
			managerDialogos.empezarDialogos(ManagerDialogos2.CONVERSACION_TRABAJADOR_CONSERJE_DESPUES_CAJA);
			boolLlave = false ;
			infoConserje = true;
		
		}else if(boolReja)
		{
			managerDialogos.empezarDialogos(ManagerDialogos2.CONVERSACION_TRABAJADOR_CONSERJE_DESPUES_PUERTA);
			boolReja = false ;
			
		
					
		}else if(empleadosRescados >= 3)
		{
			GameObject.Find	("TrabajadorLlave").GetComponent(Interactor_Click).FlagOff();
			managerDialogos.empezarDialogos(ManagerDialogos2.CONVERSACION_TRABAJADOR_CONSERJE_LIBERADO);
			empleadosRescados++;
			Cursor.SetCursor(null, Vector2.zero, CursorMode.ForceSoftware);
			GameObject.Find("TrabajadorLlave").renderer.enabled = false;
			GameObject.Find("TrabajadorLlave").collider.enabled = false;
		}else{
			managerDialogos.empezarDialogos(ManagerDialogos2.CONVERSACION_TRABAJADOR_CONSERJE_NORMAL);
			
		}
	}
	
	
	
	//CONVERSACIONES TRABAJADOR  LLAMAS
	if(comando.Equals("TrabajadorFuego")){	
		//Aca se consigue la llave de la puerta
		if(GetComponent(InventarioManager).enInventario(EXTINTOR))
		{
			managerDialogos.empezarDialogos(ManagerDialogos2.CONVERSACION_TRABAJADOR_LLAMAS_EXTINTOR);
			Cursor.SetCursor(null, Vector2.zero, CursorMode.ForceSoftware);
			GetComponent(InventarioManager).usarItem(EXTINTOR);
			GameObject.Find("EscombrosFuego").renderer.enabled = false;
			GameObject.Find("EscombrosFuego").collider.enabled = false;
			empleadosRescados++;
			GameObject.Find("TrabajadorFuego").renderer.enabled = false;
			GameObject.Find("TrabajadorFuego").collider.enabled = false;

		
		}else if(!GetComponent(InventarioManager).enInventario(EXTINTOR))
		{
			managerDialogos.empezarDialogos(ManagerDialogos2.CONVERSACION_TRABAJADOR_LLAMAS);
			Cursor.SetCursor(null, Vector2.zero, CursorMode.ForceSoftware);
			GameObject.Find("FireTrabajador").renderer.enabled = false;
			GameObject.Find("FireTrabajador").collider.enabled = false;
			GameObject.Find("FireTrabajador2").renderer.enabled = false;
			GameObject.Find("FireTrabajador2").collider.enabled = false;
			//GameObject.Find("FireTrabajador2").transform.position.x;
			//mover trabajador

			quemado = true;
		
		}else if(GetComponent(InventarioManager).enInventario(BOTIQUIN) && quemado)
		{
			GameObject.Find	("TrabajadorFuego").GetComponent(Interactor_Click).FlagOff();
			managerDialogos.empezarDialogos(ManagerDialogos2.CONVERSACION_TRABAJADOR_LLAMAS_CURAR);
			GetComponent(InventarioManager).usarItem(BOTIQUIN);
			Cursor.SetCursor(null, Vector2.zero, CursorMode.ForceSoftware);
			empleadosRescados++;
			GameObject.Find("TrabajadorFuego").renderer.enabled = false;
			GameObject.Find("TrabajadorFuego").collider.enabled = false;
			
		
		}else if(!GetComponent(InventarioManager).enInventario(BOTIQUIN) && quemado && !GetComponent(Player_Manager).estaPersonaje(DIANA))
		{
			GameObject.Find	("TrabajadorFuego").GetComponent(Interactor_Click).FlagOff();
			managerDialogos.empezarDialogos(ManagerDialogos2.CONVERSACION_TRABAJADOR_LLAMAS_NO_BOTIQUIN);
			Cursor.SetCursor(null, Vector2.zero, CursorMode.ForceSoftware);

		}else if(!GetComponent(Player_Manager).estaPersonaje(DIANA) && quemado)
		{
			GameObject.Find	("TrabajadorFuego").GetComponent(Interactor_Click).FlagOff();
			managerDialogos.empezarDialogos(ManagerDialogos2.CONVERSACION_TRABAJADOR_LLAMAS_NO_DIANA);
			Cursor.SetCursor(null, Vector2.zero, CursorMode.ForceSoftware);

		}else if(GetComponent(Player_Manager).estaPersonaje(DIANA) && quemado)
		{
			GameObject.Find	("TrabajadorFuego").GetComponent(Interactor_Click).FlagOff();
			managerDialogos.empezarDialogos(ManagerDialogos2.CONVERSACION_TRABAJADOR_LLAMAS_CURAR);
			Cursor.SetCursor(null, Vector2.zero, CursorMode.ForceSoftware);
			empleadosRescados++;
			GameObject.Find("TrabajadorFuego").renderer.enabled = false;
			GameObject.Find("TrabajadorFuego").collider.enabled = false;

		}
	}
	
	
	//CONVERSACIONES TRABAJADOR HERIDO
	if(comando.Equals("TrabajadorHerido")){	
		//Aca se consigue la llave de la puerta
		if(GetComponent(Player_Manager).estaPersonaje(DIANA))
		{
			GameObject.Find	("TrabajadorHerido").GetComponent(Interactor_Click).FlagOff();
			managerDialogos.empezarDialogos(ManagerDialogos2.CONVERSACION_TRABAJADOR_HERIDO_DIANA_EN_PARTY);
			Cursor.SetCursor(null, Vector2.zero, CursorMode.ForceSoftware);
			
			empleadosRescados++;
			GameObject.Find("TrabajadorHerido").renderer.enabled = false;
			GameObject.Find("TrabajadorHerido").collider.enabled = false;
			
		
		}else if(GetComponent(InventarioManager).enInventario(TOALLA))
		{
			GameObject.Find	("TrabajadorHerido").GetComponent(Interactor_Click).FlagOff();
			managerDialogos.empezarDialogos(ManagerDialogos2.CONVERSACION_TRABAJADOR_HERIDO_TOALLA);
			Cursor.SetCursor(null, Vector2.zero, CursorMode.ForceSoftware);
			empleadosRescados++;
			GameObject.Find("TrabajadorHerido").renderer.enabled = false;
			GameObject.Find("TrabajadorHerido").collider.enabled = false;
			
			
		
		}else{
			managerDialogos.empezarDialogos(ManagerDialogos2.CONVERSACION_TRABAJADOR_HERIDO_NO_TOALLA_NO_DIANA);
			Cursor.SetCursor(null, Vector2.zero, CursorMode.ForceSoftware);
			
		}
	}
	
	
	
	
	//CONVERSACIONES TRABAJADOR INCONCIENTE
	if(comando.Equals("TrabajadorHerido")){	
		//Aca se consigue la llave de la puerta
		if(GetComponent(Player_Manager).estaPersonaje(DIANA) )
		{
			GameObject.Find	("TrabajadorHerido").GetComponent(Interactor_Click).FlagOff();
			managerDialogos.empezarDialogos(ManagerDialogos2.CONVERSACION_TRABAJADOR_DESMAYADO_DIANA_EN_PARTY);
			Cursor.SetCursor(null, Vector2.zero, CursorMode.ForceSoftware);
			
			empleadosRescados++;
			GameObject.Find("TrabajadorHerido").renderer.enabled = false;
			GameObject.Find("TrabajadorHerido").collider.enabled = false;
			
		
		
		}else if(GetComponent(InventarioManager).enInventario(INHALADOR))
		{
			GameObject.Find	("TrabajadorHerido").GetComponent(Interactor_Click).FlagOff();
			managerDialogos.empezarDialogos(ManagerDialogos2.CONVERSACION_TRABAJADOR_DESMAYADO_INHALADOR);
			Cursor.SetCursor(null, Vector2.zero, CursorMode.ForceSoftware);
			empleadosRescados++;
			GameObject.Find("TrabajadorHerido").renderer.enabled = false;
			GameObject.Find("TrabajadorHerido").collider.enabled = false;
			
			
		
		}else if(GetComponent(Player_Manager).estaPersonaje(MARIO) )
		{
			managerDialogos.empezarDialogos(ManagerDialogos2.CONVERSACION_TRABAJADOR_DESMAYADO);
			Cursor.SetCursor(null, Vector2.zero, CursorMode.ForceSoftware);
			
			empleadosRescados++;
			GameObject.Find("TrabajadorHerido").renderer.enabled = false;
			GameObject.Find("TrabajadorHerido").collider.enabled = false;	
		}
	}
	
	
	//Caja donde esta EL INHALADOR
	if(comando.Equals("MesaInhalador")){	
		//Aca se consigue el inhalador
		if(GetComponent(Player_Manager).estaPersonaje(FRANCISCO) )
		{
			if(currentPlayer.Equals("Francisco"))
			{
				GameObject.Find("MesaTubos").GetComponent(Interactor_Click).FlagOff();
				GetComponent(InventarioManager).addItem(new Item(texturaTubo, INHALADOR));
				managerDialogos.empezarDialogos(ManagerDialogos2.CONVERSACION_INHALADOR_FRANCISCO_EN_PARTY);
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
		if(empleadosRescados == 6 )
		{
			GameObject.Find("Salida").GetComponent(Interactor_Click).FlagOff();
			managerDialogos.empezarDialogos(ManagerDialogos2.CONVERSACION_SALIDA_TRABAJADORES);
			Cursor.SetCursor(null, Vector2.zero, CursorMode.ForceSoftware);
			//GAME OVER
		}else if(jefeEscapa){
			managerDialogos.empezarDialogos(ManagerDialogos2.CONVERSACION_SALIDA_JEFE);
			Cursor.SetCursor(null, Vector2.zero, CursorMode.ForceSoftware);
			//GAME OVER
		}else{
			managerDialogos.empezarDialogos(ManagerDialogos2.CONVERSACION_SALIDA_SOLO);
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
		
}



function DarCinematica(index : int){
	return cinematicas[index];
}