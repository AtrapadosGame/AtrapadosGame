#pragma strict
//Mueve el objeto hacia la posición donde se hizo click con el mouse
 
private var mover:boolean = false;// Determina la posibilidad de moverse o no
private var targetPosition:Vector3;//Posición a la cual moverse
var speed:float; // Determina la velocidad de movimiento
var bounceDistance: float;

function Awake(){
	targetPosition = Vector3.zero;
}

function Update () {
	if(Input.GetKeyDown(KeyCode.Mouse0) && mover)
	{
		//Crea un raycast hasta la posición deseada
		var playerPlane = new Plane(Vector3.up, transform.position);
		var ray = Camera.main.ScreenPointToRay (Input.mousePosition);
		var hitdist = 0.0;
 
		if (playerPlane.Raycast (ray, hitdist)) {
		
			targetPosition = ray.GetPoint(hitdist);
		}
		
		transform.LookAt(targetPosition);
		
	}
 	//Interpola la posición hasta llegar al destino
 	if(targetPosition != Vector3.zero)
			transform.position = Vector3.MoveTowards(transform.position, targetPosition, Time.deltaTime * speed);
}

function OnCollisionEnter(){

	targetPosition = Vector3.zero;
	rigidbody.angularVelocity = Vector3.zero;
	rigidbody.velocity = Vector3.zero;
	transform.Translate(Vector3.forward *-bounceDistance );
}


function SetTargetPosition(nTarget : Vector3){
	targetPosition = nTarget;
}


function MoverOff(){
	mover = false;
}

function MoverOn(){
	mover = true;
}



