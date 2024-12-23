const body= document.body;
const div = document.createElement('div');
div.style.backgroundColor = 'red';
div.id = 'div-id'; 
div.className = 'center'; 

const h1 = document.createElement('h1');
h1.textContent = "hi everyone";
div.appendChild(h1); 

const p = document.createElement('p');
p.style.backgroundColor = 'red';
p.style.color = 'white';
const span = document.createElement('span');
const strong = document.createElement('strong');
strong.textContent = "this is a very strong text";
span.appendChild(strong);
p.appendChild(span); 
div.appendChild(p); 

let img = document.createElement('img');
img.src='flower.jpg'
img.className = 'center'
div.appendChild(img);

document.body.appendChild(div);

const spanDiv = document.createElement('div');

