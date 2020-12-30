let botao = document.getElementById('buscar'); 
botao.addEventListener('click', getFilmes)

    async function getFilmes() {

    let elemento = document.getElementById('container')
    if (elemento != null) {
        elemento.parentNode.removeChild(elemento)
    }

   
    let body = document.body
    let div = document.createElement('div')
    div.id = 'container'
    div.className = 'invisivel'
    body.appendChild(div)

         let titulo  = document.getElementById('search').value

         const url = `https://www.omdbapi.com/?s=${titulo}&apikey=c1ee88b2`; 
     
        let resposta = await fetch(url)
            .then(resp =>{
                let req = resp.json()
                return req
            })
     
        if(resposta.Response === 'False'){
           
            
            let buscaErrada = document.querySelector("#results")
          
                buscaErrada.innerHTML = `  <h5 id="nao-encontrado"> Nenhum título com "${titulo}" foi encontrado. Por favor, tente novamente. </h5>`
         

          

        }else if(resposta.Response === 'True'){

            let container = document.getElementById('container'); 
            
            let filmes = resposta.Search


            for(f of filmes){
               
           
             
                containerDeFilmes = document.createElement('div')
                containerDeFilmes.className = 'filmes-container'
                container.appendChild(containerDeFilmes)
                
                let poster = `<div class="poster">
                                    <img src="${f.Poster}">
                              </div>`
                containerDeFilmes.innerHTML += poster

                
                let InformacoesDiv = document.createElement('div')
                InformacoesDiv.className = 'informacoes'
                containerDeFilmes.appendChild(InformacoesDiv)

                let titulo = `<h4 class="titulo">${f.Title}</h4>`
                InformacoesDiv.innerHTML += titulo

        
                let anoFilme = `<small class="ano">${f.Year}<small>`
                InformacoesDiv.innerHTML += anoFilme
                
            

        }
        
        let buscaErrada = document.querySelector("#nao-encontrado")
        buscaErrada.classList.add('invisivel')

    }
    
    }
