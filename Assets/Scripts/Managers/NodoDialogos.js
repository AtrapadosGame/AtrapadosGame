#pragma strict
public class NodoDialogos{
	
private var texto : String;
private var opciones : NodoDialogos[];

function darTexto(){
	return texto;
}

function NodoDialogos(nTexto : String){
	texto = nTexto;
	opciones = new NodoDialogos[3];
}

function darOpcion(pos : int){
	return opciones[pos];
}

function agregarOpcion(opcion : NodoDialogos, pos : int){
	opciones[pos] = opcion;
}

}