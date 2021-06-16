export function ContactForm(){
    const d = document,
          $form = d.createElement("form"),
          $styles = d.querySelector("#dynamic-styles");

         $form.classList.add("contact-form");
         
          $styles.innerHTML = `
          
          *{
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        h1{
            text-align: center;
        }
        
        .contact-form{
            --form-ok-color: #4caf50;
            --form-error-color:#f44336;
            margin-left: auto;
            margin-right: auto;
            width: 80%;
        }
        
        .contact-form > *{
            padding: 0.5rem;
            margin: 1rem auto;
            display: block;
            width: 100%;
        }
        
        .contact-form textarea{
            resize: none;
        }
        
        .contact-form legend,
        .contact-form-response{
            font-size: 1.5rem;
            font-weight: bold;
            text-align: center;
        }
        
        .contact-form input,
        .contact-form textarea{
            font-family: sans-serif;
            font-size: 1rem;
        }
        
        .contact-form input[type="submit"]{
            width: 30%;
            font-weight: bold;
            cursor:pointer;
        }
        
        .contact-form *::placeholder{
            color:rgb(36, 33, 33);
        }
        
        .contact-form [required]:valid{
            border: thin solid var(--form-ok-color);
        }
        
        .contact-form [required]:invalid{
            border: thin solid var(--form-error-color);
        }
        
        .contact-form-error{
            text-align: center;
            margin-top: -1rem;
            font-size: 80%;
            background-color: var(--form-error-color);
            color:#fff;
            transition: all 800ms ease;
        }
        
        .contact-form-error.is-active{
            display: block;
            animation: show-message 1s 1 normal 0s ease-out both;
        }
        
        .none{
            display: none;
        }
        
        @keyframes show-message {
            0%{
                visibility: hidden;
                opacity: 0;
            }
            100%{
                visibility: visible;
                opacity: 1;
            }
        }
        
        .contact-form-loader{
            margin-left: auto;
            margin-right: auto;
            width: 100px;
            height: 100px;
        }
        
        .contact-form-loader img{
            width: 100%;
        }
        

          `;

          $form.innerHTML = `

          
          <legend>Env&iacuteanos tus comentarios</legend>
          <input type="text" name="name" placeholder="Escribe tu nombre" pattern="^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\\s]+$" title="Nombre solo acepta letras y espacios en blanco" required>
          <input type="email" name="email" placeholder="Escribe tu email" pattern="^[a-z0-9]+(\\.[_a-z0-9]+)*@[a-z0-9-]+(\\.[a-z0-9-]+)*(\\.[a-z]{2,15})$" title="Email incorrecto" required>
          <input type="text" name="subject" class="subject" placeholder="Asunto a tratar" title="El asunto es requerido" required>
          <textarea name="comments" cols="50" rows="5" placeholder="Escribe tus comentarios" title="Tu comentario no debe exceder los 255 caracteres" data-pattern="^.{1,255}$" required></textarea>
          <input type="submit" value="Enviar">
          <div class="contact-form-loader none">
              <img src="../assets/loader.svg" alt="Cargando...">
          </div>
          <div class="contact-form-response none">
              <p>Los datos han sido enviados</p>
          </div>

          `;

         
          const validationForm = ()=> {
            const $inputs = d.querySelectorAll(".contact-form [required]");
            
             $inputs.forEach((input)=>{
                   const $span = d.createElement("SPAN");
                   $span.id = input.name;
                   $span.textContent = input.title;
                   $span.classList.add("contact-form-error", "none");
                   input.insertAdjacentElement("afterend", $span);
                   
                   
             });
            }
             
             d.addEventListener("keyup", (e)=>{
                  
                  if(e.target.matches(".contact-form [required]")){
                    let $input = e.target,
                        patron = $input.pattern || $input.dataset.pattern;
                        // console.log(patron);
                       
                        
                        if(patron && $input.value !== ""){
                            // console.log("Tiene patron");
                            let regex = new RegExp(patron);
                            return !regex.exec($input.value)
                            ? d.getElementById($input.name).classList.add("is-active")
                            : d.getElementById($input.name).classList.remove("is-active");
        
                        }
                        if(!patron){
                            return $input.value ===""
                            ? d.getElementById($input.name).classList.add("is-active")
                            : d.getElementById($input.name).classList.remove("is-active");
                        //    console.log("No tiene patron");
                        }
        
                  }
             });
        
             d.addEventListener("submit", (e)=> {
                 e.preventDefault();
                 const $loader = d.querySelector(".contact-form-loader"),
                       $response = d.querySelector(".contact-form-response");
                  
                  $loader.classList.remove("none");
        
                 fetch("https://formsubmit.co/ajax/gbasulto2015@gmail.com", {
                     method: "POST",
                     body: new FormData(e.target),
                     mode: "cors"
                 } )
                 .then(res => res.ok? res.json(): Promise.reject(res))
                 .then((json)=>{
                    //  console.log(json);
                     
                     $response.classList.remove("none");
                     $response.innerHTML = `<p> ${json.message}</p>`;
                     e.target.reset();
                 })
                 .catch((err)=>{
                     console.log(err);
                     $response.classList.remove("none");
                     let message = err.statusText || "Ocurrio un error al enviar el formulario";
                     $response.innerHTML = `<p>Error ${err.status} : ${message}</p>`;
                    
                 })
                 .finally(()=>{
                       $loader.classList.add("none");
                    setTimeout(() => {
                        $response.classList.add("none");
                        $response.innerHTML = "";
                        
         
                     }, 3000);
                 });
                 
                });
          
            setTimeout(()=> validationForm(), 100);
                

          return $form;
}