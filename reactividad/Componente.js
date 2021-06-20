class Componente{
    constructor(options){
this.el = options.el;
this.data = options.data;
this.template = options.template;
    }

  render(){
      const $el = d.querySelector(this.el);
      if(!$el) return;
      $el.innerHTML = this.template(this.data);
  }

  setState(obj){
     for(key in obj){
        if (this.data.hasOwnProperty(key)) {
            this.data[key] = obj[key];
          }
  }

  this.render();

}

getState(){
    return JSON.parse(JSON.stringify(this.data));
}

}






