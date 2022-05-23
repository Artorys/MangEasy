function geraCard(array)
{
    array.forEach((el,index)=>
    {
        CriaCard(el.nameItem,el.img,el.description,el.value,el.categoria,index)
    })
    
}
geraCard(data)
function CriaCard(nome,imagem,descricao,valor,categoria,id)
{
    criaCardCarrinho.innerHTML = ""
    const vitrine = document.querySelector(".vitrine")
    const li = document.createElement("li")
    li.classList.add("card")
    li.id = id
    li.insertAdjacentHTML("afterbegin",    
    `
    <div class = "box-card">
        <div class = "box-img">
            <img alt = "${nome}" class = "card-img" src = "${imagem}">
        </div>
        <p class = "categoria">${categoria}</p>
        <h2 class = "nome">${nome}</h2>
        <p>${descricao}</p>
        <p class = "preco">R$${valor}</p>
        <button class = "add">Adicionar ao carrinho</button>
    </div>
`) 
    vitrine.appendChild(li)
}
function criaCardCarrinho(nome,imagem,valor,id)
{
    const ul = document.querySelector('.vitrine-compras')
    const li = document.createElement("li")
    li.classList.add("card-compras")
    li.id = id
    li.insertAdjacentHTML("afterbegin", 
    `
    <div class="compras-box"><img src="${imagem}" class="compras-img" alt="${nome}"></div>
    <div class="compras-info">
        <h2>${nome}</h2>
        <p id = "valor">R$${valor}</p>
        <button class="remove">Remover</button>
    </div>
    `)
    ul.appendChild(li)
    verificaItens()

}
function verificaCarrinho()
{
    const carrinhoDeCompras = document.querySelector('.vitrine-compras')
    if(carrinhoDeCompras.childElementCount == 0)
    {
        const div = document.createElement("div")
        div.classList.add("on")
        div.insertAdjacentHTML("afterbegin",
        `
            <h2 class="on-h2">
            Carrinho vazio
            </h2>
            <p class="on-p">
                Adicione itens
            </p>
        `)
        carrinhoDeCompras.appendChild(div)
    }
    else
    {
        const div = document.querySelector(".on")
        if(div)
        {
            div.remove()
        }   
    }
}
function addCardNoCarrinho()
{
    document.addEventListener("click",function(e)
    {
        if(e.target.classList.contains("add"))
        {
            verificaCarrinho()
           const card = e.target.closest("li")
           data.forEach((el,index)=>
           {
              if(index == card.id)
              {
                 criaCardCarrinho(el.nameItem,el.img,el.value,index)
              }
           })
           ContaProdutos()
           somaPrecoProdutos()
           verificaCarrinho()
           verificaItens()
        }
    })
}
function RemoveCardCarrinho()
{
    document.addEventListener("click",function(el)
    {
        if(el.target.classList.contains("remove"))
        {
            el.target.closest("li").remove()
            ContaProdutos()
            somaPrecoProdutos()
            verificaCarrinho()
            verificaItens()
        }
    })
    
}
function verificaItens()
{
    const allResult = document.querySelector(".allresult")
    const section = document.createElement("section")
    const vitrine = document.querySelector(".vitrine-compras")
    const vitrineLi = vitrine.querySelectorAll("li")
    const divOn = document.querySelector(".on")
    section.classList.add("resultado")

    section.insertAdjacentHTML("afterbegin",
    `
        <div class="quantidade">
            <p>Quantidade : </p>
            <p>0</p>
        </div>
        <div class="total">
            <p>Total :</p>
            <p>R$00</p>
        </div>
    `)
    allResult.appendChild(section)
    const sectionTrue = document.querySelector(".resultado")
    const sectionAll = document.querySelectorAll(".resultado")
    if(divOn)
    {
        sectionTrue.remove()
    }
    else
    {
        if(sectionAll.length > 1)
        {
           allResult.lastChild.remove()
        }
    }
    if(divOn && sectionAll)
    {
        sectionAll.forEach((e)=>
        {
            e.remove()
        })
    }
    
}

function ContaProdutos()
{
    const vitrineProdutos = document.querySelector(".vitrine-compras")
    const li = vitrineProdutos.querySelectorAll("li")
    const total = document.querySelector('.quantidade')
    const quantidade = total.querySelectorAll("p")[1]
    quantidade.innerText = `${li.length}`
}
function somaPrecoProdutos()
{
    const preco = document.querySelectorAll("#valor")
    const total = document.querySelector(".total")
    const totalResultado = total.querySelectorAll("p")[1]
    let precoFormatado = ``
    let arrayPrecos = []
    if(preco)
    {
        preco.forEach((el)=>
        {
            let precoFormatado = el.innerText.replace("R$","")
            precoFormatado = parseFloat(precoFormatado)
            arrayPrecos.push(precoFormatado)
        })
    }
    if(arrayPrecos.length > 0)
    {
        arrayPrecos = arrayPrecos.reduce((prev,next)=> prev + next)
        totalResultado.innerText = `R$${arrayPrecos}`
    }
    else
    {
        totalResultado.innerText = "R$00" 
    }
}
function pesquisaCard()
{
    const btnPesquisa = document.querySelector(".pesquisar")
    btnPesquisa.addEventListener("click",(e)=>
    {
        let newItemArray = []
        const card = document.querySelectorAll('.card')
        const nome = document.querySelectorAll(".nome")
        const pesquisa = document.querySelector("#pesquisa")
        newItemArray = data.filter((e)=>
        {

            if(e.nameItem.toLowerCase().match(pesquisa.value.toLowerCase()))
            {
                return e
            }
        })
        nome.forEach((e1)=>
        {
            newItemArray.forEach((e2)=>
            {
                if(e1.textContent.toLowerCase() != e2.nameItem.toLowerCase())
                {
                    e1.closest(".card").classList.add("some")
                }
                if(e1.textContent.toLowerCase() == e2.nameItem.toLowerCase() && e1.closest(".card").classList.contains("some") )
                {
                    e1.closest(".card").classList.remove("some")
                }
            })
            
        })
        if( pesquisa.value == "" && card.length == data.length)
        {
            card.forEach((e)=>
            {
                e.classList.remove("some")
            })

        }
    })
}
pesquisaCard()
addCardNoCarrinho()
verificaCarrinho()
RemoveCardCarrinho()