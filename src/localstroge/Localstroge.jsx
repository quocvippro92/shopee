const LocalStorge = (key,defaultValue)=>{
    const get = ()=> JSON.parse(localStorage.getItem(key)) || defaultValue;
    const set = (value) => localStorage.setItem(key,JSON.stringify(value))
    
    return {get,set}
 }
 export default LocalStorge;