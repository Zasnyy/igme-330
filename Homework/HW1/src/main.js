import { randomElement } from "./utils.js";

let words1 = [];
let words2 = [];
let words3 = [];

const loadBabble = () =>
{
    fetch('./data/babble-data.json')
      .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        console.log('Success:', data);

        
        ({
            babble: {
                first: words1,
                second: words2,
                third: words3
            }
        } = data);

        init();
      })
      .catch(error => {
        console.error('Error:', error);
        document.querySelector('#output').innerHTML = `<p>Error loading file: ${error.message}</p>`;
      });
    };

const generateTechno = (num) => { 
    //return randomElement(words1) + " " + randomElement(words2) + " " + randomElement(words3);
    let str = "";
    for (let i = 0; i < num; i++) {
        str += `<p>${randomElement(words1)} ${randomElement(words2)} ${randomElement(words3)}</p>`;
    }
    document.querySelector("#output").innerHTML = str;
}

const init = () => {
    generateTechno(1);
    //document.querySelector("#myButton").onclick = generate;
    document.querySelector("#btn-gen-1").addEventListener("click", () => generateTechno(1));
    document.querySelector("#btn-gen-5").addEventListener("click", () => generateTechno(5));
}

loadBabble();
