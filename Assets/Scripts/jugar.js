var guiskin: GUISkin;
private var guienable:boolean=true;
//Just provide any value here and other buttons will be set accordingly
static var buttonWidth: int=300;
static var buttonHeight: int=150;


function OnGUI ()
{
	GUI.skin=guiskin;	
	
	if(GUI.Button(Rect(400,20,buttonWidth,buttonHeight),""))
	{
		Application.LoadLevel("Nivel1");
	}	
	
	
		
   	
   
}//end of GUI
