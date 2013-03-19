#pragma strict
private var actual : GameObject;
var startPlayer : String; //Determina el jugados inicial del nivel
var player1 : GameObject;
var player2 : GameObject;
var player3 : GameObject;
var player4 : GameObject;
var cursorP1 : String;
var cursorP2 : String;
var cursorP3 : String;
var cursorP4 : String;
var camara : Camera;
var luz : GameObject;  

function Awake(){
	actual = GameObject.Find(startPlayer);
}

function Start () {
	actual.GetComponent(MoverClick).MoverOn();
}

function Update () {

}

function cambiarP1(){
	var posActual = actual.transform.position;
	var rotActual = actual.transform.rotation;
	actual.renderer.enabled = false;
	actual.collider.enabled = false;
	//actual.GetComponent(MoverClick).MoverOff();
	player1.transform.position = posActual;
	actual.GetComponent(MoverClick).SetTargetPosition(Vector3.zero);
	crearPlayer1();
	player1.GetComponent(MoverClick).MoverOn();
	actual = player1;
	camara.GetComponent(SmoothFollow).ChangeTarget(actual.transform);
	luz.GetComponent(SmoothFollow).ChangeTarget(actual.transform);
	GetComponent(ScreenManager).CambiarCursor(cursorP1);
}

function cambiarP4(){
	var posActual = actual.transform.position;
	actual.renderer.enabled = false;
	actual.collider.enabled = false;
	//actual.GetComponent(MoverClick).MoverOff();
	player4.transform.position = posActual;
	actual.GetComponent(MoverClick).SetTargetPosition(Vector3.zero);
	crearPlayer4();
	player4.GetComponent(MoverClick).MoverOn();
	actual = player4;
	camara.GetComponent(SmoothFollow).ChangeTarget(actual.transform);
	luz.GetComponent(SmoothFollow).ChangeTarget(actual.transform);
	GetComponent(ScreenManager).CambiarCursor(cursorP4);
}

function cambiarP2(){
	var posActual = actual.transform.position;
	actual.renderer.enabled = false;
	actual.collider.enabled = false;
	//actual.GetComponent(MoverClick).MoverOff();
	player2.transform.position = posActual;
	actual.GetComponent(MoverClick).SetTargetPosition(Vector3.zero);
	crearPlayer2();
	player2.GetComponent(MoverClick).MoverOn();
	actual = player2;
	camara.GetComponent(SmoothFollow).ChangeTarget(actual.transform);
	luz.GetComponent(SmoothFollow).ChangeTarget(actual.transform);
	GetComponent(ScreenManager).CambiarCursor(cursorP2);
}

function cambiarP3(){
	var posActual = actual.transform.position;
	actual.renderer.enabled = false;
	actual.collider.enabled = false;
	//actual.GetComponent(MoverClick).MoverOff();
	player3.transform.position = posActual;
	actual.GetComponent(MoverClick).SetTargetPosition(Vector3.zero);
	crearPlayer3();
	player3.GetComponent(MoverClick).MoverOn();
	actual = player3;
	camara.GetComponent(SmoothFollow).ChangeTarget(actual.transform);
	luz.GetComponent(SmoothFollow).ChangeTarget(actual.transform);
	GetComponent(ScreenManager).CambiarCursor(cursorP3);
}

function darActual(){
	return actual;
}

function darPlayer1(){
	return player1;
}

function darPlayer2(){
	return player2;
}

function darPlayer3(){
	return player3;
}

function darPlayer4(){
	return player4;
}

function destruirPlayer4(){
	player4.renderer.enabled = false;
	player4.collider.enabled = false;
}

function destruirPlayer1(){
	player1.renderer.enabled = false;
	player1.collider.enabled = false;
}

function destruirPlayer3(){
	player3.renderer.enabled = false;
	player3.collider.enabled = false;
}

function destruirPlayer2(){
	player2.renderer.enabled = false;
	player2.collider.enabled = false;
}

function crearPlayer4(){
	player4.renderer.enabled = true;
	player4.collider.enabled = true;
}

function crearPlayer1(){
	player1.renderer.enabled = true;
	player1.collider.enabled = true;
}

function crearPlayer3(){
	player3.renderer.enabled = true;
	player3.collider.enabled = true;
}

function crearPlayer2(){
	player2.renderer.enabled = true;
	player2.collider.enabled = true;
}

function activarPlayer1(){
	destruirPlayer1();
	player1.GetComponent(MoverClick).MoverOn();
}

function activarPlayer2(){
	destruirPlayer2();
	player2.GetComponent(MoverClick).MoverOn();
}

function activarPlayer3(){
	destruirPlayer3();
	player3.GetComponent(MoverClick).MoverOn();
}

function activarPlayer4(){
	destruirPlayer4();
	player4.GetComponent(MoverClick).MoverOn();
}



