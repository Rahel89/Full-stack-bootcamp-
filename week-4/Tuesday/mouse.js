const hoverBox = document.getElementById('hover-box');
const clickButton = document.getElementById('click-button');
const hoverArea = document.getElementById('area');

//Mouse down event to change button color
clickButton.addEventListener('mousedown',function(){
    this.style.background ='pink'
})

// Mouse up to reset button color
clickButton.addEventListener('mouseup', function() {
    this.style.background = 'lightblue'
})

// Mouse over event to change border color of hover box
hoverBox.addEventListener('mouseover', function() {
    this.style.borderColor = 'red'; 
})

// Mouse out event to reset border color
hoverBox.addEventListener('mouseout', function() {
    this.style.borderColor = 'black'; 
})

// Key press event 
document.addEventListener('keypress', function(event) {
    console.log(`Key pressed: ${event.key}`); 
});
//mouse move event
hoverArea.addEventListener('mousemove',function(event){
    console.log(`mouse moved to (${event.clientX},${event.clientY})`)
})