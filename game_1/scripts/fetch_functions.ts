export function foo1(randomString: string){
    console.log(randomString)
}
export async function foo2(){
    const response = await fetch("https://jsonplaceholder.typicode.com/users")
    const data= await response.json()
    console.log(data)
}
