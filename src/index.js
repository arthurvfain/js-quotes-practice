document.addEventListener('DOMContentLoaded',getQuotes)
let quoteZone = document.querySelector('#quote-list')
let newQuoteForm = document.querySelector('#new-quote-form')
newQuoteForm.addEventListener('submit', submitQuote)
function getQuotes()
{
    fetch('http://localhost:3000/quotes?_embed=likes').then(resp=>resp.json()).then(addQuotesToDOM)
}

function addQuotesToDOM(quoteArray)
{
    quoteZone.innerHTML =''
    quoteArray.forEach(makeQuote)
}

function makeQuote(quoteObject)
{
    //console.log(quoteObject.likes)
    let likeCount = 0
    let quotePiece = document.createElement('li')
    let quoteText = document.createElement('h3')
    let quoteAuthor = document.createElement('h5')
    let quoteLikes = document.createElement('h6')
    let likeButton = document.createElement('button')
    let deleteButton = document.createElement('button')
    
    
    quoteText.textContent = quoteObject.quote
    quoteAuthor.textContent = quoteObject.author
    quoteLikes.textContent = `${likeCount} likes`
    likeButton.textContent = `like`
    likeButton.classList.add('btn')
    likeButton.addEventListener('click', likeQuote)
    likeButton.dataset.id = quoteObject.id
    deleteButton.textContent = 'delete'
    deleteButton.classList.add('btn')
    deleteButton.addEventListener('click', deleteQuote)
    deleteButton.dataset.id = quoteObject.id
    
    quotePiece.appendChild(quoteText)
    quotePiece.appendChild(quoteAuthor)
    quotePiece.appendChild(quoteLikes)
    quotePiece.appendChild(likeButton)
    quotePiece.appendChild(deleteButton)
    
    quoteZone.appendChild(quotePiece) 
}

function submitQuote(e)
{
    e.preventDefault()
    let newQuote =
    {
        quote: `${e.target.quote.value}`,
        author: `${e.target.author.value}`
    }
    //console.log(newQuote)
    fetch('http://localhost:3000/quotes',
    {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'accept': 'application/json'
        },
        body: JSON.stringify(newQuote)
    })
    .then(resp=>resp.json()).then(data=>makeQuote(data))
}

function likeQuote(e)
{
    let idInt = parseInt(e.target.dataset.id, 10)
}

function deleteQuote(e)
{
    let idInt = parseInt(e.target.dataset.id, 10)
    fetch(`http://localhost:3000/quotes/${idInt}`,
    {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'accept': 'application/json'
        }
    })
    .then(getQuotes())    
}