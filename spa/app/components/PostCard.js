export function PostCard(props){
  let {title,date,slug,_embedded} = props,
      dateFormat = new Date(date).toLocaleString(),
      urlPoster = _embedded["wp:featuredmedia"]?_embedded["wp:featuredmedia"][0].source_url: "app/assets/kEnAi.svg";

return `
   <section class="post-card">
   <img src="${urlPoster}" alt="${title.rendered}">
   <h2>${title.rendered}</h2>
   <p>
       <time datetime="${date}">${dateFormat}</time>
       <a href="#/${slug}">Ver Publicacion</a>

   </p>
   </section>
`;
}