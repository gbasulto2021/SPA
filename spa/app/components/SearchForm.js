export function SearchForm(){
    const $form = document.createElement('form'),
          $input = document.createElement('input');
          $form.classList.add('form-search');
          $input.type = "search";
          $input.name = "search";
          $input.placeholder = "Buscar..."

          $form.appendChild($input);
    
    return $form
}