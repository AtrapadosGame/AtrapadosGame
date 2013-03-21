var originPosition:Vector3;
var originRotation:Quaternion;
 
var shake_decay: float;
var shake_intensity: float;;
 
function OnGUI () {
    if (GUI.Button (Rect (120,140,180,120), "Shake")) {
        Shake();
    }
} 
 
function Update(){
    if(shake_intensity > 0){
        transform.position = originPosition + Random.insideUnitSphere * shake_intensity;
        transform.rotation =  Quaternion(
                        originRotation.x + Random.Range(-shake_intensity,shake_intensity)*.2,
                        originRotation.y + Random.Range(-shake_intensity,shake_intensity)*.2,
                        originRotation.z + Random.Range(-shake_intensity,shake_intensity)*.2,
                        originRotation.w + Random.Range(-shake_intensity,shake_intensity)*.2);
        shake_intensity -= shake_decay;
    }
}
 
function Shake(){
    originPosition = transform.position;
    originRotation = transform.rotation;
    shake_intensity = .3;
    shake_decay = 0.002;
}