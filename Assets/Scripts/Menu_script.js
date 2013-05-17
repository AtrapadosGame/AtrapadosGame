#pragma strict
//Menu_script: Este script controla las acciones del menu de personajes en la interfaz de usuario

private var player : GameObject; //Jugador activo en un momento dado
private var actualObject : GameObject;//Objecto actual con el que es posible efectuar una habilidad
private var itemList : Array = new Array(); //Guarda las texturas de los items que se recogen
private var actionList : Array = new Array(); //Guarda los comandos de accion de los items que se recogen
private var lastTooltip : String = " "; //Tooltip para controlar los mensajes del menu

// Las siguientes variables determinan el posicionamiento de los botones
private var posX : int;
private var posY : int;
private var ancho : int;
private var alto : int;
private var separacion : int;
private var pausa :boolean = false;


//Las siguientes variables determinan si el personaje en cuestión está dentro del grupo
// y es posible seleccionarlo para usarlo
private var estaP1 : boolean = false;
private var estaP2 : boolean = false;
private var estaP3 : boolean= false;
private var estaP4 : boolean = false;

//Las siguientes variables determinan las texturas de los botones de cada personaje
var texturaP1 : Texture2D;
var texturaP2 : Texture2D;
var texturaP3 : Texture2D;
var texturaP4 : Texture2D;
var menu : Texture2D;
var reiniciar : Texture2D;
var home : Texture2D;

//Inicializa el jugador activo al principio del nivel
function Start () {
	ancho = (Screen.width/8) - 50;
	alto = Screen.height/8;
	separacion = 3;
	player = GetComponent(Player_Manager).darActual();
}

function Update (){

}


//Dibuja el menu y responde a los eventos de los botones
function OnGUI () {
	posX = 0;
	posY = 0;
	GUI.depth = 0;
	
	if(!pausa){
		// Crea los botones de cada personaje
		if(estaP1){
			var bttP1 = GUI.Button (new Rect (posX,posY,ancho,alto),GUIContent (texturaP1,"Boton"));
			posX += (ancho + separacion);
		}
	
		if(estaP2){
			var bttP2 = GUI.Button (new Rect (posX,posY,ancho,alto),GUIContent (texturaP2,"Boton"));
			posX += (ancho + separacion);
		}
	
		if(estaP3){
			var bttP3 = GUI.Button (new Rect (posX,posY,ancho,alto),GUIContent (texturaP3,"Boton"));
			posX += (ancho + separacion);
		}
	
		if(estaP4){
			var bttP4 = GUI.Button (new Rect (posX,posY,ancho,alto),GUIContent (texturaP4,"Boton"));
			posX += (ancho + separacion);
		}
	
		//Dibuja periodicamente los botones de los items
		for(var i:int=0;i < itemList.length;i++){
			var tex : Texture2D = itemList[i];
			//print(tex + "---" + i);
			if(tex != null){ 
				GUI.Box(new Rect(i*ancho,Screen.height - alto,ancho,alto), GUIContent (tex,"Boton"));
				//if(GUI.Button(new Rect(i*ancho,Screen.height - alto,ancho,alto), tex)){
				//	SendMessage ("EventItem",actionList[i]);
				
			}
		}
	
		//Maneja los eventos de presionar algún boton de la interfaz
		if(bttP1 && estaP1){
			P1Button();
		}
	
		if(bttP2 && estaP2){
			P2Button();
		}
	
		if(bttP3 && estaP3){
			P3Button();
		}
	
		if(bttP4 && estaP4){
			P4Button();
		}
	}
	else{
		if(GUI.Button (new Rect (Screen.width   - 50,50,150,50),GUIContent (reiniciar,"Boton"),"Reiniciar nivel")){
			Time.timeScale=1;
			pausa = false;
			Application.LoadLevel("Nivel1");
		}
		if(GUI.Button (new Rect (Screen.width - 50,100,150,50),GUIContent (home,"Boton"),"Salir del juego")){
			Time.timeScale=1;
			pausa = false;
			Application.LoadLevel("menu");
		}
	}
	 //Dibuja el boton de pausa
    if(GUI.Button (new Rect (Screen.width - 50,0,50,50),GUIContent (menu,"Boton"))){
    	if(!pausa){
    		Time.timeScale=0;
    		pausa = true;
		}
		else{
			Time.timeScale=1;
			pausa = false;
		}
    }
	
	//Inicializa y maneja el tooltip de cada boton
	if (Event.current.type == EventType.Repaint && GUI.tooltip != lastTooltip) {        
    	if (lastTooltip != "") {//Maneja los eventos de OnMouseOut
        	SendMessage (lastTooltip + "OnMouseOut", SendMessageOptions.DontRequireReceiver);      
    	} 

    	if (GUI.tooltip != "") {//Maneja los eventos de OnMouseOver
       		SendMessage (GUI.tooltip + "OnMouseOver", SendMessageOptions.DontRequireReceiver);
    	}

    	lastTooltip = GUI.tooltip; 
	}
}

// Estas funciones manejan los eventos que ocurren si el cursor está sobre los botones de personajes
// Evita que los personajes se muevan cuando se hace click en un boton
function BotonOnMouseOver() {
	apagarMovimiento();
}

//Reactivan el movimiento cuando el cursor ya no está sobre el boton
function BotonOnMouseOut () {
	encenderMovimiento();
}

//Estas funcones activan los flags de los botones de personajes
function activarP1(){
	estaP1 = true;
}

function activarP2(){
	estaP2 = true;
}

function activarP3(){
	estaP3 = true;
}

function activarP4(){
	estaP4 = true;
}

// Estas funciones controlan la accion de los botones
// Cambian el control del personaje actual
function P1Button(){
	GetComponent(Player_Manager).cambiarP1();
	player = GetComponent(Player_Manager).darActual();
}

function P2Button(){
	GetComponent(Player_Manager).cambiarP2();
	player = GetComponent(Player_Manager).darActual();
}

function P3Button(){
	GetComponent(Player_Manager).cambiarP3();
	player = GetComponent(Player_Manager).darActual();
}

function P4Button(){
	GetComponent(Player_Manager).cambiarP4();
	player = GetComponent(Player_Manager).darActual();
}

//Estas funciones permiten controlar el movimiento cuando se presiona un boton 
function apagarMovimiento(){
	player.GetComponent(MoverClick).MoverOff();
}

function encenderMovimiento(){
	player.GetComponent(MoverClick).MoverOn();
}

//Permite agregar nuevos items al menu
function agregarItem(texture : Texture2D, command : String){
	itemList.Add(texture);
	actionList.Add(command);
}

function sacarItem(command : String){
	var pos : int = 0;
	var f : boolean = false;
	for(var i : int = 0; i<actionList.length && !f; i++){
		var actual : String = actionList[i];
		if(actual.Equals(command)){
			pos = i;
			f = true;
		}
	}
	itemList.remove(i);
	actionList.remove(i);
}

function ActualizarActualObject(nuevo: GameObject){
	actualObject = nuevo;
}

function EstaPersonaje(name : String){
	if(name.Equals("P1") || name.Equals("p1"))
		return estaP1;
	if(name.Equals("P2") || name.Equals("p2"))
		return estaP2;
	if(name.Equals("P3") || name.Equals("p3"))
		return estaP3;
	if(name.Equals("P4") || name.Equals("p4"))
		return estaP4;
}

function EstaItem(comando : String){
	var esta : boolean = false;
	for(var i : int = 0; i < actionList.length; i++){
		var actual : String = actionList[i];
		if(actual.Equals(comando))
			esta = true;
	}
	return esta;
}