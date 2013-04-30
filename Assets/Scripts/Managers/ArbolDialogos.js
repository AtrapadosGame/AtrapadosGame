#pragma strict
public class ArbolDialogos{

private var raices : NodoDialogos[];
private var nodoActual : NodoDialogos;

function ArbolDialogos(numRaices : int) {
	raices = new NodoDialogos[numRaices];
}

function agregarRaiz(raiz : NodoDialogos, pos : int){
	raices[pos] = raiz;
}

}