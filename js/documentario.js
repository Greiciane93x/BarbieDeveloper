let botao = document.getElementById('buscar'); 
botao.addEventListener('click', getFilmes)

    async function getFilmes() {

      

         titulo = document.getElementById('search').value

        const url = `https://www.omdbapi.com/?s=${titulo}&apikey=c1ee88b2`; 
     
        let resposta = await fetch(url)
            .then(res =>{
                let req = res.json()
                return req
            })

           
        if(resposta.Response === 'False'){
            let results = document.getElementById('results')
            let resultados = `
                <h5 id="nao-encontrado"> Nenhum título com "${titulo}" foi encontrado. Por favor, tente novamente. </h5>
            `
            results.innerHTML = resultados 

        }else if(resposta.Response === 'True'){
            let container = document.getElementById('container'); 

             let filmes = resposta.Search 


            for(f of filmes){
          
                let containerDeFilmes = document.createElement('div')
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

        
                let anoFilme = `<small>${f.Year}<small>`
                InformacoesDiv.innerHTML += anoFilme

              
            }
        }

    }
    

