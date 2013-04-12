#pragma strict

var closeDistance : float = 1.5;
private var flag : boolean = true;
private var cursor : Texture2D;
var actObject : String;
var manager : GameObject;
var player  : GameObject;

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
	
	if (DistanceFromObject() && flag) {
		
		manager.GetComponent(IEvent_manager).Switch(actObject);
	}
	else if (DistanceFromObject() && !flag) {
		
		manager.GetComponent(IEvent_manager).Switch(actObject + "S");
	}
}