const obj = {
    name: "jay",
    code: "10",
    phone: "7894561230",
    id: 1
}

let arr = []
// for(let key in obj){
//     if(typeof obj[key] === "string" && obj[key].startsWith("j")){
//         arr.push(obj[key])
//     }
// }

if(obj.name.startsWith("j")){
    arr.push(obj.id)
}
if(obj.code.startsWith("j")){
    arr.push(obj.code)
}
if(obj.phone.startsWith("j")){
    arr.push(obj.phone)
}

console.log(arr)