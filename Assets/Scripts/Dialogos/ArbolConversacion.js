#pragma strict
public class ArbolConversacion{


// ================================================================================
// Variables
// ================================================================================
private var raiz : NodoDialogo;
private var nodoActual : NodoDialogo;
private var texturaPj1 : Texture2D ;
private var texturaPj2 : Texture2D;

// ================================================================================
// Constructores
// ================================================================================
function ArbolConversacion(textura1 : Texture2D , textura2: Texture2D){
texturaPj1 = textura1;
texturaPj2 = textura2;

}

// ================================================================================
// Metodos
// ================================================================================


// ================================================================================
// Getters y Setters
// ================================================================================

function setRaiz(nodo : NodoDialogo){
raiz = nodo;
nodoActual = raiz;
}

function  getNodoActual():NodoDialogo{

return nodoActual;
}

function setNodoActual(nodo : NodoDialogo){
 nodoActual = nodo;

}

}