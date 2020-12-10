class modelDocumentario{
    constructor(title){
        
  
        this._title = title; 
        this._plot = ""; 
        this._poster = ""; 

     
    }

       

    buscaFilme(){  
      
      let title = this._title; 
      
      title = title.split(" ").join("+")
     
      
        let requisicao  = new XMLHttpRequest();
        requisicao.open('GET',` http://www.omdbapi.com/?t=${title}&apikey=c1ee88b2`, false);
        requisicao.addEventListener('load',()=>
        {
            if (requisicao.status == 200 && requisicao.readyState == 4)
            {
                let dados =this._processaResponse(requisicao.responseText)
                this._att(dados)
              
            }
        });
        
       

        requisicao.send();

    }
   
    _processaResponse(responseString){
        let response = JSON.parse(responseString); 
        return response; 
    }
    

    _att(dados){

     
        this._title = dados.Title; 
        this._plot = dados.Plot; 
        this._poster = dados.Poster; 
        
    }

    getTitle(){
            return this._title;
       
    }
    getPlot(){
        if(this._plot == 'N/A'){
            return ''; 
        }else{  
            return this._plot; 
        }
    }
    getPoster(){
        return this._poster; 
    }
   
}

class UserView{
    render (model){

        
        let titulo = document.querySelector("#title")
        titulo.innerHTML = `
            ${model.getTitle()} 
        ` 
        document.body.appendChild(titulo); 


    
       let imagem = document.querySelector("#poster"); 
        imagem.innerHTML = `
            <img src=${model.getPoster()}> 
        
        ` 
        document.body.appendChild( imagem ); 

        let texto = document.querySelector("#descricao")
        texto.innerHTML = `
            ${model.getPlot()} 
        ` 
        document.body.appendChild(texto); 

        
      


    }
}
class Controller{
    adicionaFilme(){

        let dados = new modelDocumentario(title.value)
        dados.buscaFilme(); 
        let view = new UserView(); 
        view.render(dados); 
    }
    

}

let controller = new Controller();

document.getElementById("buscar").addEventListener("click", controller.adicionaFilme)

var title = document.querySelector("#search")
