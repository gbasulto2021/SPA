import api from "./helpers/wp_api.js";
import {ajax} from "./helpers/ajax.js";

export function App(){
    document.getElementById("root").innerHTML =`<h1>Bienvenidos a mi primer SPA con vanilla JS</h1>`;

    ajax({
        url: api.POSTS,
        cbSuccess : (posts)=>{
            console.log(posts)
        }
         })
}





