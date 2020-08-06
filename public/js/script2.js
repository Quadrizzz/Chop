var diets =""
var cuisines=""
var intolerances =""
var types = null
var radio = document.getElementsByName("type");
var cuisine = document.getElementsByClassName("cuisine")
var diet = document.getElementsByClassName("diet")
var intolerance = document.getElementsByClassName("Intolerance") 
var query = ""
var result = null
window.onload = ()=>{
    var queries =  document.getElementById("food")
    queries.addEventListener('change', change)
}
const change = (e)=>{
    query = e.target.value
    // console.log(query)
}

const check = ()=>{
    for(var i = 0; i < radio.length ; i++ ){
        if ( radio[i].checked){
            types = radio[i].value
        }
    } 
    
    console.log(types)
}

const cuisine_check = ()=>{
    for(var i = 0; i < cuisine.length ; i++){

        if(!cuisine[i].checked){
            if(cuisines.includes(cuisine[i].value) === true){
               cuisines = cuisines.replace(cuisine[i].value, "")
            }
        }

        else if(cuisine[i].checked){
            if(cuisines.includes(cuisine[i].value) === false)
            cuisines += cuisine[i].value
        }
    }

    // cuisines = cuisines.substring(0 , cuisines.length -1);
    console.log(cuisines)
}


const diet_check = ()=>{
    for(var i = 0; i < diet.length ; i++){

        if(!diet[i].checked){
            if(diets.includes(diet[i].value) === true){
               diets = diets.replace(diet[i].value, "")
            }
        }

        else if(diet[i].checked){
            if(diets.includes(diet[i].value) === false)
                diets += diet[i].value
        }
        

    }

    console.log(diets)
}

const intolerance_check = ()=>{
    for(var i = 0; i < intolerance.length ; i++){

        if(!intolerance[i].checked){
            if(intolerances.includes(intolerance[i].value) === true){
               intolerances = intolerances.replace(intolerance[i].value, "")
            }
        }

        else if(intolerance[i].checked){
            if(intolerances.includes(intolerance[i].value) === false)
                intolerances += intolerance[i].value
        }
        

    }

    console.log(intolerances)
}

const submit = ()=>{
    fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=aae02a4ef3b6414e9ab9368146f92356&query=${query}&cusine=${cuisines.slice(0,-1)}&diet=${diets.slice(0,-1)}&intolerances=${intolerances.slice(0,-1)}&type=${types}`,{
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then (response =>{ return response.json()})
    .then(
        data=> console.log(data)
    )
}
