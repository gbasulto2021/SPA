export function PostSearch(props){
let {id,title,_embedded} = props,
     date = _embedded.self[0].date,
     dateFormat = new Date(date).toLocaleString();

return`

<section class="post-card">
   <img src="" alt="">
   <h2>${title}</h2>
   <p>
       <time datetime="${date}">${dateFormat}</time>
       <a href="#/${_embedded.self[0].slug}" data-id="${id}">Ver Publicacion</a>

   </p>
   </section>

`
}