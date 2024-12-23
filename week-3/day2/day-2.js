let name='rahel'
let age=22
const isStudent=true

console.log(`${name},${age},${isStudent}`)

let person = {
    name: 'jane',
    age: 30,
    address:{
        street: '123 street',
        city:'XYZ'      
    }
}
console.log(person.name)
console.log(person.address.street)

const fruit_array=['apple','banana','orange','grape','pear']
console.log(fruit_array[1])
console.log(fruit_array[3])
fruit_array.push('cherry')
console.log(fruit_array)

 function printNumbers(n){
    for(i=1;i<n;i++){
        if(n%3==0){
            console.log('fizz')
        }else if(n%5==0){
            console.log('buzz')
        }else if(n%3==0 && n%5==0){
            console.log('fizzbuzz')
        }else{
            console.log(n)
        }
    }
}
printNumbers(5)

let numbers=[]
console.log(numbers)
for(i=1;i<20;i++){
    if(i%2==0){
        numbers.push(i)
    }
}
console.log(numbers)

function findNumber(array, target){
    for(let i=0;i<array.length;i++){
        if(array[i]==target){
            console.log(i)
            break
        }else if(array[i]%3==0){
            continue
        }else{
            console.log('target not found')
        }
    }
}

function findNumber() {
    const a = [1,2,3,4,5,6,7.8,9,10];
    const target = 5;
    let found = false;

    for(let i =0; i < a.length; i++){
        if(a[i] == target){
            console.log('Target found at index:' + i);
            found = true;
            break;
        }else if (a[i] % 3 == 0){
            continue;
        }
    }
    if(!found){
    console.log('Target not found');
    }
}

findNumber();

function printPattern(n) {
    for (let i = 1; i <= n; i++) {
        let row = ''; 
        
        for (let j = 1; j <= i; j++) {
            row += '*'; 
        }
        console.log(row); 
    }
}


printPattern(5);