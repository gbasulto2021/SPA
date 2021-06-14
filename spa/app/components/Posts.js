export function Posts(){
    const $posts = document.createElement("secction");
    $posts.id = "posts";
    $posts.classList.add('grid-fluid');

    return $posts;
}