class modelDocumentario{
    constructor(title){
       this._title; 
       if(title !== undefined){
           this._title = title; 
       }
        this._plot = ""; 
        this._poster = ""; 
        
    }

        buscaFilme(){
          let title = this._title; 
           //var title = document.querySelector("#search").value
            let requisicao = new XMLHttpRequest(); 
            requisicao.open("GET",  `http://www.omdbapi.com/?i=tt3896198&apikey=c1ee88b2&=` + title , false)
            requisicao.addEventListener("load", () => 
            {
                if(requisicao.status == 200){
                    let objeto = this._processaResponse(requisicao.responseText); 
                    this._atualiza(objeto); 
                }

        })

        requisicao.send(); 
    }
    _processaResponse(responseString){
        let response = JSON.parse(responseString); 
        return response; 
    }

    _atualiza(dados){
        this._title = dados.Title; 
        this._plot = dados.Plot; 
        this._poster = dados.Poster; 

        console.log(dados)
    }

    getTitle(){
        return this._title; 
    }
    getPlot(){
        return this._plot; 
    }
    getPoster(){
        return this._poster; 
    }
}

class UserView{

   

    render (model){

        let informacoes = document.getElementById("search").value; 
        if(informacoes == ''){
            informacoes.style.display = 'none';
        }

       let imagem = document.querySelector("#doc-escolha"); 
        imagem.innerHTML = `
            <img src=${model.getPoster()}> 
        
        ` 
        document.body.appendChild( imagem ); 

        let texto = document.querySelector("#descricao")
        texto.innerHTML = `
            ${model.getPlot()} 
        ` 
        document.body.appendChild(texto); 

        
        let titulo = document.querySelector("#titulo")
        titulo.innerHTML = `
            ${model.getTitle()} 
        ` 
        document.body.appendChild(titulo); 



    }
}
class Controller{
    adicionaFilme(){
        let dados = new modelDocumentario(title.value)
        dados.buscaFilme(); 
        let view = new UserView(); 
        view.render(dados); 
    }


    
    // limpaCampo(){
    //     document.querySelector("#search").value = ""; 
    // }

}

let controller = new Controller(); 
document.getElementById("buscar").addEventListener("click", controller.adicionaFilme)
// document.getElementById("buscar").addEventListener("click", controller.limpaCampo)

var title = document.querySelector("#search").value
