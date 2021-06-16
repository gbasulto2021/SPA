import api from "./wp_api.js"
import { PostCard } from "../components/PostCard.js";
import { ajax } from "./ajax.js";
import { PostSearch } from "../components/PostSearch.js";


export async function InfiniteScroll(){

    const d = document,
          w = window;

    let query = localStorage.getItem("wpSearch"),
        apiURL,
        Component; // High Order Component
        
    w.addEventListener("scroll", async e=>{
        let{scrollTop, clientHeight, scrollHeight}= d.documentElement,
           {hash}= w.location;

        //    console.log(scrollHeight,scrollTop,clientHeight, hash)

        if(scrollTop + clientHeight >= scrollHeight){
            api.page++;

            if(!hash || hash === "#/"){
               apiURL = `${api.POSTS}&page=${api.page}`;
               Component = PostCard;
               
            }else if(hash.includes("#/search")){
                apiURL = `${api.SEARCH}${query}&page=${api.page}`;
                Component = PostSearch;
            }else{
                return false;
            }

            d.querySelector(".loader").style.display ="block";

            await ajax({
                 url: apiURL,
                 cbSuccess : (posts)=>{
                //    console.log(posts);
                   let html = "";
                   posts.forEach((post)=>{
                       html += Component(post);
                   });
                   d.getElementById("main").insertAdjacentHTML("beforeend", html);

                 }
             });

             d.querySelector(".loader").style.display ="none";
        }
    })
    
}