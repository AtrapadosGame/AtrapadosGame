#pragma strict

//flag para determinar dos tipos de interacción con el objeto
private var flag : boolean = true;
// Determina el cursor que se despliega en el OnMouseEnter
private var cursor : Texture2D;
//Determina el jugador actual
private var player  : GameObject;
//Determina el comando de acción del evento
var actObject : String;
//Conexión con el LevelManager
var manager : GameObject;
//Distancia mínima de interacción
var closeDistance : float = 1.5;


function Start(){
player = manager.GetComponent(Player_Manager).darActual();
}


function  DistanceFromObject(){
	var onDistance : boolean = false;
	
    var sqrLen = (player.transform.position - transform.position).sqrMagnitude;
    if( sqrLen < closeDistance){
    	onDistance = true;
        return onDistance;
    }
}

function FlagOn(){
	flag = true;
}

function FlagOff(){
	flag = false;
}

function OnMouseEnter(){
	player = manager.GetComponent(Player_Manager).darActual();
	if(DistanceFromObject() && flag){
	
	 var cursorTexture:Texture2D = player.GetComponent(Player).darCursor();
	Cursor.SetCursor(cursorTexture, Vector2.zero, CursorMode.ForceSoftware);
	}
	
}

function OnMouseExit(){
	if(flag)
		    Cursor.SetCursor(null, Vector2.zero, CursorMode.ForceSoftware);
}

function OnMouseDown(){
			
	if(flag){
			
	manager.GetComponent(IEvent_manager).Switch(actObject);
	}
}