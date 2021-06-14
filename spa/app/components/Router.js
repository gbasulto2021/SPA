import api from "../helpers/wp_api.js";
import {ajax} from "../helpers/ajax.js";
import { PostCard } from "./PostCard.js";


export function Router(){
   const d = document,
         w = window,
         $posts = d.getElementById("posts");

      let {hash} = location;   
      $posts.innerHTML = null;
      if(!hash || hash === "#/"){
         
        ajax({
                url: api.POSTS,
                cbSuccess: (posts)=>{
                  let html = "";
                //   console.log(posts)
                  posts.forEach(post => html += PostCard (post));
                  d.querySelector('.loader').style.display = "none";
                  $posts.innerHTML = html;
                }
            });

      }else if(hash.includes("#/search")){
        $posts.innerHTML = `<h2>Seccion de busqueda</h2>`;
      }else if(hash === "#/contacto"){
        $posts.innerHTML = `<h2>Seccion de Contacto</h2>`;
      }else{
        $posts.innerHTML = `<h2>Aqui cargara el contenido del Post previamente seleccionado</h2>`;  
      }


    

}