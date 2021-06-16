export function PostCard(props){
  let {title,date,slug,_embedded,id} = props,
      dateFormat = new Date(date).toLocaleString(),
      urlPoster = _embedded["wp:featuredmedia"]?_embedded["wp:featuredmedia"][0].source_url: "app/assets/kEnAi.svg";


   document.addEventListener("click", e=>{
      if(!e.target.matches(".post-card a")) return false;
      localStorage.setItem("wpPostId", e.target.dataset.id)
   });

return `
   <section class="post-card">
   <img src="${urlPoster}" alt="${title.rendered}">
   <h2>${title.rendered}</h2>
   <p>
       <time datetime="${date}">${dateFormat}</time>
       <a href="#/${slug}" data-id="${id}">>Ver Publicacion</a>

   </p>
   </section>
`;
}