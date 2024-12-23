export function createUser(name) {
    return {
        name: name, 
        money: Math.floor(Math.random() * 50001) 
    };
}