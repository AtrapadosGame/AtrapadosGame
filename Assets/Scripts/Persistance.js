#pragma strict



// ================================================================================
// TESTING ENVIRONMENT
// ================================================================================
var texturaCursorDario: Texture2D;
var texturaCursorDiana: Texture2D;
var texturaCuadroDario : Texture2D;
var texturaCuadroDiana : Texture2D;
var texturaCursorMario: Texture2D;
var texturaCursorFrancisco: Texture2D;
var texturaCuadroMario : Texture2D;
var texturaCuadroFrancisco : Texture2D;

var texturaPala : Texture2D;
var texturaBotiquin: Texture2D;
var texturaToalla: Texture2D;

function inicializarTest(){

inventario = new Item[4];
party = new Player[4];
//Se inicializa el nivel con diana y dario
party[0] = new Player(texturaCuadroDario, 0,"Dario", texturaCursorDario );
party[1] = new Player(texturaCuadroDiana, 1,"Diana", texturaCursorDiana );
party[2] = new Player(texturaCuadroMario, 4,"Mario", texturaCursorMario );
party[3] = new Player(texturaCuadroMario, 5,"Francisco", texturaCursorMario );
inventario[0]  = new Item(texturaPala,4,"Llave");
inventario[1]  = new Item(texturaBotiquin,0,"Pala");
//inventario[2] = new Item(texturaToalla,2,"Toalla");
//inventario[0] = new Item(texturaToalla,6,"Segueta");

}
// ================================================================================
// Variables
// ================================================================================

private var inventario: Item[];  
private var party: Player[];

// ================================================================================
// Awake
// ================================================================================

function Awake () {
DontDestroyOnLoad (transform.gameObject);

//testing purpose
inicializarTest();
}

// ================================================================================
// Metodos
// ================================================================================

function finalizarNivel(items : Item[], players: Player[]){
inventario = items;
party =players;

}

// ================================================================================
// Getters y Setters
// ================================================================================


function getInventario(){
return inventario;

}

function getParty(){
return party;
}


