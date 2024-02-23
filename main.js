let Btn = document.getElementById("nav-button");
let navItems = document.getElementsByClassName("nav-items")[0];

Btn.addEventListener("click", function(){
    showBtn(Btn);
    navItems.classList.toggle('hideshow');
    console.log(navItems);
});

function showBtn(x){
    x.classList.toggle('onChan');
}
