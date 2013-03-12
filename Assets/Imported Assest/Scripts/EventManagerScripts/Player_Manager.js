#pragma strict
private var actual : GameObject;
var startPlayer : String; //Determina el jugados inicial del nivel
var player1 : GameObject;
var player2 : GameObject;
var player3 : GameObject;
var player4 : GameObject;
var camara : Camera;
var luz : GameObject;  

function Awake(){
	actual = GameObject.Find(startPlayer);
}

function Start () {
	actual.GetComponent(MoverInput).MoverOn();
}

function Update () {

}

function cambiarP1(){
	var posActual = actual.transform.position;
	var rotActual = actual.transform.rotation;
	actual.renderer.enabled = false;
	actual.collider.enabled = false;
	actual.GetComponent(MoverInput).MoverOff();
	player1.transform.position = posActual;
	crearPlayer1();
	player1.GetComponent(MoverInput).MoverOn();
	actual = player1;
	camara.GetComponent(SmoothFollow).ChangeTarget(actual.transform);
	luz.GetComponent(SmoothFollow).ChangeTarget(actual.transform);
	GetComponent(ScreenManager).CambiarCursor("CursorH");
}

function cambiarP4(){
	var posActual = actual.transform.position;
	actual.renderer.enabled = false;
	actual.collider.enabled = false;
	actual.GetComponent(MoverInput).MoverOff();
	player4.transform.position = posActual;
	crearPlayer4();
	player4.GetComponent(MoverInput).MoverOn();
	actual = player4;
	camara.GetComponent(SmoothFollow).ChangeTarget(actual.transform);
	luz.GetComponent(SmoothFollow).ChangeTarget(actual.transform);
	GetComponent(ScreenManager).CambiarCursor("CursorFuerza");
}

function cambiarP2(){
	var posActual = actual.transform.position;
	actual.renderer.enabled = false;
	actual.collider.enabled = false;
	actual.GetComponent(MoverInput).MoverOff();
	player2.transform.position = posActual;
	crearPlayer2();
	player2.GetComponent(MoverInput).MoverOn();
	actual = player2;
	camara.GetComponent(SmoothFollow).ChangeTarget(actual.transform);
	luz.GetComponent(SmoothFollow).ChangeTarget(actual.transform);
	GetComponent(ScreenManager).CambiarCursor("CursorCura");
}

function cambiarP3(){
	var posActual = actual.transform.position;
	actual.renderer.enabled = false;
	actual.collider.enabled = false;
	actual.GetComponent(MoverInput).MoverOff();
	player3.transform.position = posActual;
	crearPlayer3();
	player3.GetComponent(MoverInput).MoverOn();
	actual = player3;
	camara.GetComponent(SmoothFollow).ChangeTarget(actual.transform);
	luz.GetComponent(SmoothFollow).ChangeTarget(actual.transform);
	GetComponent(ScreenManager).CambiarCursor("CursorPeque");
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
	player1.GetComponent(MoverInput).MoverOn();
}

function activarPlayer2(){
	destruirPlayer2();
	player2.GetComponent(MoverInput).MoverOn();
}

function activarPlayer3(){
	destruirPlayer3();
	player3.GetComponent(MoverInput).MoverOn();
}

function activarPlayer4(){
	destruirPlayer4();
	player4.GetComponent(MoverInput).MoverOn();
}



