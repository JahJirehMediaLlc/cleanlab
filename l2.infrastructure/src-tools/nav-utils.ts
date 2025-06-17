//
export function toggle(elementID: string){
    console.warn("nav-ui toggling:",elementID);
    try{
        document.getElementById(elementID)!.classList.toggle("hide");
    }
    catch(error)
    {
        console.log("elementID error:",error);
    }
}
//
export function toggleTopSpinner(){
    toggle("top-spinner-ui");
}
//
export function toggleTopLeftTray(){
    toggle("top-left-tray-ui");
}
//
export function toggleTopRightTray(){
    toggle("top-right-tray-ui");
}
//
export function toggleBottomSpinner(){
    toggle("bottom-spinner-ui");
}
//
export function toggleBottomLeftTray(){
    toggle("bottom-left-tray-ui");
}
//
export function toggleBottomRightTray(){
    toggle("bottom-right-tray-ui");
}
//
export function updateVersion(text:string){
    document.getElementById("top-sw-version")!.innerText = text;
    document.getElementById("bottom-sw-version")!.innerText = text;
}
//
function initListners(){
    document.getElementById("top-left-tray")!.addEventListener("click", toggleTopLeftTray);
    document.getElementById("top-right-tray")!.addEventListener("click", toggleTopRightTray);
    document.getElementById("top-spinner")!.addEventListener("click", toggleTopSpinner);

    document.getElementById("bottom-left-tray")!.addEventListener("click", toggleBottomLeftTray);
    document.getElementById("bottom-right-tray")!.addEventListener("click", toggleBottomRightTray);
    document.getElementById("bottom-spinner")!.addEventListener("click", toggleBottomSpinner);

    console.log("nav-ui listeners initialized...");
}

//initListners();
//console.log("nav-ui loaded....");