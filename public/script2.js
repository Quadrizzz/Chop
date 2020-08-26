var diets =""
var cuisines=""
var intolerances =""
var types = null
var radio = document.getElementsByName("type");
var cuisine = document.getElementsByClassName("cuisine")
var diet = document.getElementsByClassName("diet")
var intolerance = document.getElementsByClassName("Intolerance") 
var query = ""
let Ingredients = null
window.onload = ()=>{
    var queries =  document.getElementById("food")
    queries.addEventListener('change', change)
    document.getElementById("clear-button").addEventListener('click', clear)
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

}

const submit = ()=>{
    var form = document.getElementById("recipe-form");
    let result = null
    form.style.display = "none";
    document.getElementById("animation").style.display = "flex";
    fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=aae02a4ef3b6414e9ab9368146f92356&query=${query}&cusine=${cuisines.slice(0,-1)}&diet=${diets.slice(0,-1)}&intolerances=${intolerances.slice(0,-1)}&type=${types}`,{
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then (response =>{ return response.json()})
    .then(
        data=>{ result = data;
                show_result(result)

        }
    )
}

const show_result = (result)=>{
    var display = document.getElementById('recipe-results');
    var form = document.getElementById("recipe-form");
    // if(window.innerWidth <= 768){
    //     display.style.display = "flex"
    // }
    // else{
    //     display.style.display = "grid"
    // }
    display.classList.toggle("recipe-results-show")
    document.getElementById("animation").style.display = "none";
    if(result.totalResults === 0){
        display.style.display ="none"
        form.style.display = 'flex'
        // console.log('empty')
    }
    result.results.map((data , i)=>{
        let div = document.createElement('div');
        div.id =  result.results[i].id
        let image = document.createElement('img');
        image.src = `${result.results[i].image}`;
        let text = document.createElement('h3');
        text.innerHTML = `${result.results[i].title}`;
        let button = document.createElement('button')
        button.innerHTML = "Check Ingredients";
        button.addEventListener ("click", ()=>{show_ingredient(result.results[i].id)});
          
        div.appendChild(text)
        div.appendChild(image)
        div.appendChild(button)
        display.appendChild(div)
    })
}

const show_ingredient = (id)=>{
    fetch(`https://api.spoonacular.com/recipes/${id}/ingredientWidget.json?apiKey=aae02a4ef3b6414e9ab9368146f92356`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then (response =>{ return response.json()})
    .then(
        data=>{ Ingredients = data;
                display_ingredients(id)

        }
    )
    
}

const display_ingredients = (id)=>{
    let div = document.getElementById(id);
    let texts = {
        "title": 'Ingredients',
        "content":[]
    }
    Ingredients.ingredients.map((data , i)=>{
        // let text = document.createElement('p');
        // text.innerHTML = `${Ingredients.ingredients[i].name}`;
        // div.appendChild(text)
        texts.content.push(Ingredients.ingredients[i].name);
    })
    launchModal(texts)
    // console.log(texts.content)
}

const clear = ()=>{
   var recipe_results = document.getElementById("recipe-results")
    recipe_results.classList.toggle("recipe-results-show")
    while(recipe_results.firstChild){
        recipe_results.removeChild(recipe_results.firstChild)
    }
    document.getElementById("recipe-form").style.display = "flex";
}




var launchModal = function (object) {

    // Declare Variables
    var modal = document.getElementById("modal");
    // Get a copy of the HTML wihin the script modal__template
    var template = document.getElementById("modal__template").innerHTML;
  
    // Add new object here to use as content template
    var message = {};
    message = Object.assign(object,message)
    modal.classList.add("show");
    (function () {
      function removeLink() {
        var temp = button2;
        button2Link.parentNode.removeChild(button2Link);
        objEl.getElementsByTagName("footer")[0].appendChild(temp);
      }
      var prevModal = document.getElementById("objEl");
      if (prevModal) {prevModal.parentNode.removeChild(prevModal);;}
  
      // Save message object as data for easy reference
      var data = message[object];
  
      // Create pseudo element and fill it with HTML include in script#modal__template
      var objEl = document.createElement('div');
      objEl.innerHTML = template;
      objEl.setAttribute("id", "objEl");
  
      // Use tag names to access elements because ID selector doesn't work on elements
      // not yet in DOM
      var button1 = objEl.getElementsByClassName("modal__button1")[0];
      var button2 = objEl.getElementsByClassName("modal__button2")[0];
      var button2Link = objEl.getElementsByClassName("modal__button2link")[0];
  
      // Append content to title and main
      objEl.getElementsByTagName("h2")[0].appendChild(document.createTextNode(object.title));
      objEl.getElementsByTagName("main")[0].appendChild(document.createTextNode(object.content));
  
      // If button1 is specified in data, add text, otherwise remove
      if (object.button1) {
        button1.appendChild(document.createTextNode(data.button1));
      } else {
        button1.parentNode.removeChild(button1);;
      }
      // If button2link is specified, add link to button 2. Otherwise remove a tag, but keep button2
      if (object.button2Link) {
        button2Link.setAttribute("href", object.button2Link);
      } else {
        removeLink();
      }
      // If button2 is specified in data, add text, otherwise remove      
      if (object.button2) {
        button2.appendChild(document.createTextNode(object.button2));
      } else {
        button2.parentNode.removeChild(button2);
      }
      // Add pseudo element to document
      document.getElementById("modal__dialog").appendChild(objEl);
  
    })();
  
    // Closes modal when called
    function closeModal() {
      console.log("close");
      modal.classList.remove("show");
    }
  
    // Bind close event to close button and button1
    // var closeButtons = modal.getElementsByClassName("modal__close")[0];
    // for (var i = 0; i < closeButtons.length; i++) {
    //     if (window.CP.shouldStopExecution(0)) break;closeButtons[0].onclick = closeModal();
    // }
    var closebtn = document.getElementById("close");
    closebtn.addEventListener('click', ()=>{
        closeModal()
    })
  
    // Close modal if it is clicked. Does not fire if target is modal__dialog or child
    var modalDialog = document.getElementById('modal__dialog');
  
    //I'm using "click" but it works with any event
    modal.addEventListener('click', function (event) {
      var isClickInside = modalDialog.contains(event.target);
  
      if (!isClickInside) {
        //the click was outside the specifiedElement, do something
        closeModal();
      }
    });
  
  };
  
  // Launch modal on page load
 

