document.addEventListener("DOMContentLoaded" , ()=>{
    document.getElementById("sandwich").addEventListener("click" , ()=>{
        document.getElementsByClassName("menu")[0].classList.toggle("menu_show");
    })
 })