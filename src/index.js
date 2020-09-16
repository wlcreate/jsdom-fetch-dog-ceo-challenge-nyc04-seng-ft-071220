console.log('%c HI', 'color: firebrick')

document.addEventListener('DOMContentLoaded', function() {
    let dogsContainer = document.querySelector("#dog-image-container") //Challenge 1
    const dogUl = document.querySelector("ul#dog-breeds") // Challenge 2 + 3

    //Challenge 1
    fetch("https://dog.ceo/api/breeds/image/random/4")
    .then(response => response.json())
    .then((dogObj) => {
        
        dogObj.message.forEach(dogUrl => {
            let dogImg = document.createElement("img")
            dogImg.src = dogUrl
            dogsContainer.append(dogImg)
        })
    })

    // Challenge 2
    fetch("https://dog.ceo/api/breeds/list/all")
    .then(response => response.json())
    .then((dogBreedObj) => {
        let breeds = Object.keys(dogBreedObj.message);
        // Object.keys takes in the keys from the message hash & turns into array of the dog breeds
        breeds.forEach(breed => {
            let dogBreedLi = document.createElement("li")
            dogBreedLi.innerHTML = breed
            dogUl.append(dogBreedLi)
        })
    })

    // Challenge 3
    dogUl.addEventListener("click", function(event){
        if (event.target.tagName === "LI") {
            event.target.style.color = "purple"
        }
    })

    //Challenge 4
    let dogSelect = document.querySelector("select#breed-dropdown")
    dogSelect.addEventListener("change", (event) => {
        fetch("https://dog.ceo/api/breeds/list/all")
        .then(response => response.json())
        // gets all of the breeds that start with user's input of letter
        .then(dogBreedObj => {
            let breeds = Object.keys(dogBreedObj.message);
            let filteredBreeds = breeds.filter(breed => {
                return breed.startsWith(event.target.value)
            })

            // returns/displays the breeds of that certain letter from user's input
            dogUl.innerHTML = ""
            filteredBreeds.forEach(breed => {
                let dogBreedLi = document.createElement("li")
                dogBreedLi.innerHTML = breed
                dogUl.append(dogBreedLi)
            })
        })
    })

})