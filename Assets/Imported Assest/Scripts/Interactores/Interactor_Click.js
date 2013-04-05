#pragma strict
private var player : GameObject;
private var closeDistance : float = 1.5;
private var flag : boolean = true;
private var cursor : String;
var actObject : String;
var manager : GameObject;

    var cursorTexture : Texture2D;
    var cursorMode : CursorMode = CursorMode.Auto;
    var hotSpot : Vector2 = Vector2.zero;

function Start () {
}

function Update () {
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
	if(DistanceFromObject() && flag)
		   Cursor.SetCursor(cursorTexture, hotSpot, cursorMode);
}

function OnMouseExit(){
	if(flag)
		    Cursor.SetCursor(null, Vector2.zero, cursorMode);
}

function OnMouseDown(){
	print("entre!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
	if(DistanceFromObject() && flag)
		manager.GetComponent(IEvent_manager).Switch(actObject);
	else if (DistanceFromObject() && !flag)
		manager.GetComponent(IEvent_manager).Switch(actObject + "S");
}