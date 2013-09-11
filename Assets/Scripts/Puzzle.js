#pragma strict

// ================================================================================
// Variables
// ================================================================================
private var puzzleActivo : boolean;

//Usado para aplicar estilo a la ventana de puzzle

var customSkin: GUISkin;

//Dimensiones de la ventana del loot
private var ventana : Rect = Rect(Screen.width/4,Screen.height/4, Screen.width/2,(Screen.height/2));



private var textInput : String = "0";;
private var isIniciando: boolean;


//Dimensiones de los botones
private var ancho : int = 128;
private var alto : int = 64;
//texturas
var texturaInterruptor : Texture2D;


var puzzleResolved : boolean = false ;
//Constantes
private static final var SOLUCION: String = "181651";

//public static final var SOLUCION = [ [true,true,false]  , [false,true,false] , [false,false,false]];







// ================================================================================
// OnCreate
// ================================================================================

function Start(){



}


// ================================================================================
// OnGui
// ================================================================================
//TODO
function OnGUI () {

var pausa : boolean = GetComponent(MenuManager).estaPausado();

if(!pausa){
//GUI.skin = customSkin;
	if(puzzleActivo){
		ventana = GUI.Window(0,ventana , WindowFunction,"");
		
	}
	}
}
//TODO
function WindowFunction (windowID : int) {
GUI.Label(new Rect(ventana.width/2,10,ancho,alto), "Puzzle");


GUI.Label(new Rect(ventana.width/2,70,ancho,alto), textInput);
var cont: int = 0;
for(var i:int = 0 ; i <3 ; i++){

	for(var j:int = 0 ; j <3 ; j++){
cont++;
		if(GUI.Button(new Rect (j*ancho + ((ventana.width/10)*3),i*alto+100,ancho,alto),cont + ""))
 		{
 			if(isIniciando){
 			textInput = cont + "";
 			isIniciando =false;
 			}else{ 
 			if(textInput.Length < 6){
 			textInput += cont;
 			}
 			
 			}
 			
 		}
	
	}
}
GUI.Box(new Rect (((ventana.width/10)*3),3*alto+100,ancho,alto),"");
if(GUI.Button(new Rect (ancho + ((ventana.width/10)*3),3*alto+100,ancho,alto),""+0))
 		{
 			if(isIniciando){
 			textInput = 0 + "";
 			isIniciando =false;
 			}else{ 
 			if(textInput.Length < 6){
 			textInput += 0;
 			}
 			
 			}
 			
 		}
GUI.Box(new Rect ((ancho*2 +(ventana.width/10)*3),3*alto+100,ancho,alto),"");

if(GUI.Button(new Rect(ventana.width/3, (ventana.height * 3)/4, ancho, alto ), "Probar")){
		
		if(esSolucion()){
		
		print("encontro respuest");
		puzzleResolved = true;
		puzzleActivo = false;
		GameObject.Find("LevelManager").GetComponent(Manager2).EventSwitch("PuzzleResuelto");
		//TODO...RETORNA A EL MANAGER DEL LEVEL
		}else{
		//TODO...RETORNA A EL MANAGER DEL LEVEL
		print("No es la respuesta");
		textInput = "0";
		isIniciando = true;
		
		}
		
		}

if(GUI.Button(new Rect((ventana.width/9)*7, (ventana.height * 3)/4, ancho, alto ), "Cancelar")){
		
		puzzleActivo = false;
		GetComponent(Player_Manager).getCurrentPlayer().getGameObject().GetComponent(MoverClick).MoverOn();		
		GetComponent(MenuManager).setBotonesHabilitado(true);
		}


}



// ================================================================================
// Metodos
// ================================================================================


function empezarPuzzle(){
print("empezarPuzzle");
GetComponent(MenuManager).setBotonesHabilitado(false);
GetComponent(Player_Manager).getCurrentPlayer().getGameObject().GetComponent(MoverClick).MoverOff();

puzzleActivo = true;
isIniciando = true;
textInput = "0";

}
 

function esSolucion(): boolean{
	if(SOLUCION.Equals(textInput))
	{
	puzzleResolved = true;
	}
	return puzzleResolved;
}

function puzzleRespuesta(): boolean{
	return puzzleResolved;
} 





