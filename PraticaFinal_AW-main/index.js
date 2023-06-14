const apiKey = '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'


function fazerPergunta(){
    var mensagem = document.getElementById('mensagem-input')
    if(!mensagem.value)
    {
        mensagem.style.border = '1px solid red'
        return;
    }
    mensagem.style.border = 'none'

    var status = document.getElementById('status')
    var btnEnviar = document.getElementById('btn-enviar')

    status.style.display = 'block'
    status.innerHTML = 'Gerando resposta...'
    btnEnviar.disabled = true
    btnEnviar.style.cursor = 'not-allowed'
    mensagem.disabled = true

    fetch("https://api.openai.com/v1/completions",{
        method: 'POST',
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
            model: "text-davinci-003",
            prompt: mensagem.value,
            max_tokens: 200,
            temperature: 0
        })
    })
    .then((response) => response.json())
    .then((response) => {
        let r = response.choices[0]['text']
        status.style.display = 'none'
        mostrarHistorico(mensagem.value,r)
    })
    .catch((e) => {
        console.log(`Error -> ${e}`)
        status.innerHTML = 'Erro, tente novamente mais tarde...'
    })
    .finally(() => {
        btnEnviar.disabled = false
        btnEnviar.style.cursor = 'pointer'
        mensagem.disabled = false
        mensagem.value = ''
    })
}

function mostrarHistorico(mensagem,response){
    var historyBox = document.getElementById('history')

    // My mensagem
    var boxMyMensagem = document.createElement('div')
    boxMyMensagem.className = 'box-my-mensagem'

    var myMensagem = document.createElement('p')
    myMensagem.className = 'my-mensagem'
    myMensagem.innerHTML = mensagem

    boxMyMensagem.appendChild(myMensagem)

    historyBox.appendChild(boxMyMensagem)

    // Response mensagem
    var boxResponseMensagem = document.createElement('div')
    boxResponseMensagem.className = 'box-response-mensagem'

    var chatResponse = document.createElement('p')
    chatResponse.className = 'response-mensagem'
    chatResponse.innerHTML = response

    boxResponseMensagem.appendChild(chatResponse)

    historyBox.appendChild(boxResponseMensagem)

    // Levar scroll para o final
    historyBox.scrollTop = historyBox.scrollHeight
}