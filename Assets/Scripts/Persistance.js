#pragma strict

private var inventario: Item[];  
private var party: Player[];


function Awake () {
DontDestroyOnLoad (transform.gameObject);
}

function guardarInventario(items : Item[]){
inventario = items;

}


function addPlayer(player:Player):boolean{


for(var i:int = 0 ; i <4 ; i++){

if(!party[i]){
	party[i] =player;
	
	
	print("se esta anadiendo");
	return true;
}
}
return false;
}




