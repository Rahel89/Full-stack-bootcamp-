let book = {
    title: 'Little Women',
    author: 'Louisa May Alcott',
    pages: 555
};

console.log(`${book.title}, ${book.pages}`);


const colors_array = ["black", "red", "pink", "brown", "blue", "yellow"]
for(i=0;i<colors_array.length;i++){
    console.log(colors_array[i])
}
let person ={
    name: "rahel",
    age:22,
    isStudent: true
}
 person.age= 25;
 person.isStudent= false;
 console.log(person)

 let temp=40
 let weather="sunny"

 if (temp>20 && weather =="sunny"){
    console.log("It's warm and sunny")
 }
 else if(temp<=20 && weather=="rainy"){
    console.log("It's cold and rainy")
 }
 else{
    console.log("it's just another day")
 }