/* const BREEDS_URL=
'https://dog.ceo/api/breeds/image/random';

//Tip: You can comment out multiple lines in VSCode with
// Ctrl + / or Shift + Alt + A
function addDoggo(){
    //start
    fetch(BREEDS_URL)
    .then(function(response){
        return response.json();
    })
    .then(function(data){
        const img=document.createElement('img');
        img.src=data.message;
        img.alt ='Cute doggo';

        document.querySelector('.doggos').appendChild(img);

        //stop
    })
}
document.querySelector('.add-doggo').addEventListener("click",addDoggo);
 */

const BREEDS_URL = 'https://dog.ceo/api/breeds/list/all';
const select = document.querySelector('.breeds');
const img = document.querySelector('.dog-img');
const spinner = document.querySelector('.spinner');

fetch(BREEDS_URL)
    .then(response => response.json())
    .then(data => {
        const breedsObject = data.message;
        const breedsArray = Object.keys(breedsObject);

        for (let i = 0; i < breedsArray.length; i++) {
            const option = document.createElement('option');
            option.value = breedsArray[i];
            option.innerText = breedsArray[i];
            select.appendChild(option);
        }
    });

select.addEventListener("change", function (event) {
    let url = `https://dog.ceo/api/breed/${event.target.value}/images/random`;
    getDoggo(url);
});

function getDoggo(url) {
    spinner.classList.add("show");
    img.classList.remove("show");
    fetch(url)
        .then(response => response.json())
        .then(data => {
            img.src = data.message;
        })
        .finally(() => {
            spinner.classList.remove("show");
            img.classList.add("show");
        });
}
