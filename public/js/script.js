document.addEventListener("DOMContentLoaded" , ()=>{
    document.getElementById("sandwich").addEventListener("click" , ()=>{
        document.getElementsByClassName("menu")[0].classList.toggle("menu_show");
    });

    const email = document.getElementById("email")
    const submit = document.getElementById("submit")

    const email1 = document.getElementById("email1")
    const submit1 = document.getElementById("submit1")

    submit.addEventListener("click", ()=>{
        if(email.value === ""){
            console.log("malik")
        }
        else{
            fetch('https://blooming-sea-31036.herokuapp.com/register',
            {
                headers: {
                    'Content-Type': 'application/json'
                  },
                method : 'post',
                body : JSON.stringify({
                    email : `${email.value}`
                })

            }
            )
            .then(response => {
                if(response.status !== 200){
                    document.getElementsByClassName("message")[0].style.display = "none"
                }
                else{
                    document.getElementsByClassName("message")[0].style.display = "flex"
                }
            })

        }
    })

    submit1.addEventListener("click", ()=>{
        if(email1.value === ""){
            console.log("malik")
        }
        else{
            fetch('https://blooming-sea-31036.herokuapp.com/register',
            {
                headers: {
                    'Content-Type': 'application/json'
                  },
                method : 'post',
                body : JSON.stringify({
                    email : `${email1.value}`
                })

            }
            )
            .then(response => {
                if(response.status !== 200){
                    console.log('failure')
                }
                else{
                    document.getElementsByClassName("message")[1].style.display = "flex"
                }
            })

        }
    })
 })