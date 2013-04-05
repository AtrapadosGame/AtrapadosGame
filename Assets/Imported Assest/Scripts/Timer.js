#pragma strict

private var startTime : float;
private var restSeconds : int;
private var roundedRestSeconds : int;
private var displaySeconds : int;
private var displayMinutes : int;
private var shakeTimer : int ;
private var lastShake : int;
private var numTemblores : int;

var timeUntilShake : int;
var shakeTimerFactor : int;
var countDownSeconds : int;

var MainCamera : Camera;

function Awake() {
    startTime = Time.time;
    lastShake = startTime;
    numTemblores = 0;
}

function OnGUI () {
    //make sure that your time is based on when this script was first called
    //instead of when your game started

	shakeTimer = Time.time - lastShake;
	if(shakeTimer >= timeUntilShake){

	//ACA TIENE QUE TEMBLAR
	MainCamera.GetComponent(cameraShake).Shake();
	
	lastShake = Time.time;
	numTemblores ++ ;
	timeUntilShake -= (shakeTimerFactor*numTemblores);
	
	}

    var guiTime = Time.time - startTime;
    restSeconds = countDownSeconds - (guiTime);
    if (restSeconds == 0) {
        Application.LoadLevel ("Game Over");
    }

    //display the timer
    roundedRestSeconds = Mathf.CeilToInt(restSeconds);
    displaySeconds = roundedRestSeconds % 60;
    displayMinutes = roundedRestSeconds / 60; 

    var text : String = String.Format ("{0:00}:{1:00}", displayMinutes, displaySeconds);
    var anchoLabel:int = Screen.width/8;
    var altoLabel:int = Screen.height/8; 
    GUI.Label (Rect (Screen.width/2 - anchoLabel, 0, anchoLabel, altoLabel), text);
}

function StartTime(){
	return startTime;
}