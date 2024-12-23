import {createUser} from './userRegistration.js'
import { cars } from "./cars.js";


function main(){
    const user1 = createUser("jane");
    console.log("User: ", user1);

    console.log("Available Cars: ");
    let carDetails = [];
    for (let i = 0; i < cars.length; i++){
        
        if(user1.money>=cars[i].price){
            carDetails.push(cars[i])
        }
        
    }
    console.log(carDetails); 
}

main();
