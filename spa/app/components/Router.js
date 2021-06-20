import api from "../helpers/wp_api.js";
import {ajax} from "../helpers/ajax.js";
import { PostCard } from "./PostCard.js";
import { Post } from "./Post.js";
import { PostSearch } from "./PostSearch.js";
import { ContactForm } from "./ContactForm.js";


export async function Router(){
   const d = document,
         w = window,
         $main = d.getElementById("main");

      let {hash} = location;
        
      $main.innerHTML = null;

          
      if(!hash || hash === "#/"){
         
        await ajax({
                url: api.POSTS,
                cbSuccess: (posts)=>{
                  let html = "";
                  // console.log(posts)
                  posts.forEach(post => {
                  
                  html += PostCard (post)});
                  // d.querySelector('.loader').style.display = "none";
                  
                  $main.innerHTML = html;
                  
                }
            });

          

      }else if(hash.includes("#/search")){
        let query = localStorage.getItem("wpSearch");
        if(!query) {
          d.querySelector('.loader').style.display = "none";
          return false;
        }
        
        if(query){
          
          await ajax({
            url: `${api.SEARCH}${query}`,
            cbSuccess: (searchs)=>{
              // console.log(searchs);
                 let html = "";
                  
                  if(searchs.length === 0){
                    html = `
                        <p class="error">
                        No existen resultados que coincidan con tu busqueda <mark>${query}
                        </p>
                    `
                  }else{
                    searchs.forEach(search => {
                          html+= PostSearch(search)
                    });
                  }
                                      
                  $main.innerHTML = html;
            }
          })

        }

        
        
        


      }else if(hash === "#/contacto"){
        $main.appendChild(ContactForm());
      }else{
        
        let idPost = localStorage.getItem("wpPostId");
        
         await ajax({
          url: `${api.POST}/${idPost}`,
          cbSuccess: (post)=>{
            let html = "";
            // console.log(post)
             html = Post(post);
             $main.innerHTML = html;
          }
      });
        
        
        
      }

      d.querySelector('.loader').style.display = "none";
    

}