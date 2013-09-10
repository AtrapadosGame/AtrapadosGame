var guiskin: GUISkin;
var guiskin2: GUISkin;
var guiskin3: GUISkin;
private var guienable:boolean=true;
//Just provide any value here and other buttons will be set accordingly
static var buttonWidth: int=300;
static var buttonHeight: int=150;


function OnGUI ()
{
	GUI.skin=guiskin;	
	
	if(GUI.Button(Rect(20,425,buttonWidth,buttonHeight),""))
	{
		Application.LoadLevel("IntroN1");
	}	
	
	GUI.skin=guiskin2;	
	if(GUI.Button(Rect(20,525,buttonWidth,buttonHeight),""))
	{	
		Application.LoadLevel("instrucciones");
	}	
   	
   	GUI.skin=guiskin3;	
	if(GUI.Button(Rect(20,625,buttonWidth,buttonHeight),""))
	{	
		Application.LoadLevel("creditos");
	}	

   
}//end of GUI
 



