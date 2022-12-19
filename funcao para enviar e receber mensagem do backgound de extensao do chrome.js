/*
CLAUDIO S.S. - 19-12-2022

A ideia principal da funcao abaixo é conseguir fazer o background.js de uma extensao do chrome enviara e receber mensagem afim de fazer
paginas de varios seguimentos conversarem entre si.

tendo em mente que a estrutura base de uma extensão do chrome é:

manifest.json
background.js
content.js
index.js

*/


//esset trecho vai no index.js 
//esse codigo abaixo envia uma mensagem para o background
function enviar_para_background_js(mensagem_para_o_background) {

    //envia mensagem para o background.js
    //chrome.runtime.sendMessage(chave+valor_a_ser_salvo);
    chrome.runtime.sendMessage(mensagem_para_o_background, function (response) {
        console.log("\r\n\r\n\r\nia_kwl.js diz: recebemos do background a seguinte resposta: '" + response + "'\r\n\r\n\r\n")
    });
}


//o trecho a seguir fica no background.js

//ele aguarda uma mensagem e da alerta no console do que ele recebeu de mensagem
  chrome.runtime.onMessage.addListener(function (response, sender, sendResponse) {
    console.log(`o codigo recebido foi "${response}"`);
    var codigo = `console.log('\r\n\r\n\r\n background recebeu o codigo a mensgaem: '); console.log(${response});`

    //enviando mensagem para todas as abas
    chrome.tabs.executeScript(null, {
      //diz para a funcão qual codigo vamos executar na pagina
      code: codigo
    })
    
    
    
    codigo___ = `
  
    console.log('verdadeiro ou falso ativado no background')
    
    `;
    
    //fim do codigo para adicionar
    if(response.includes("verdadeiro_ou_falso")){
    
      //enviando mensagem para todas as abas
    chrome.tabs.executeScript(null,{
      //diz para a funcão qual codigo vamos executar na pagina
      code:    codigo___
    })
      
    }
  
  












    //abrir a pagina opções.html
    if (response.includes('abrir opções')) {
      try {
        chrome.tabs.create({
          'url': "/option.html"
        });
        chrome.tabs.executeScript(null, {
          //diz para a funcão qual codigo vamos executar na pagina
          code: 'página opçoes aberta com sucesso'
        })
        console.log('página opçoes aberta com sucesso')
      } catch (error) {
        chrome.tabs.executeScript(null, {
          //diz para a funcão qual codigo vamos executar na pagina
          code: 'erro ao abrir pagina de opções :::' + error
        })
        console.log('erro ao abrir pagina de opções :::' + error)
      }
    }

    //SE RECEBER EXIBIR MOSTRE O TEXTO A SEGUIR
    if (response.includes('ON')) {
      try {
chrome.browserAction.setBadgeText({
        text: "ON"
        })

    //SE RECEBER EXIBIR MOSTRE O TEXTO A SEGUIR
    if (response.includes('OFF')) {
 
chrome.browserAction.setBadgeText({
        text: "OFF"
        })
      

    }

    //=====================================================================
    //nao aterar daqui pra baixo
    //======================================================================
    //envia novamente para a pagina a resposta
    sendResponse(response);

    //envia mensagem no console do proprio background.js que é um conseole oculto
    //chrome.extension.getBackgroundPage().console.log('recebido no background: '+response+'; document.querySelector("#razao_cliente").value = "funlano";');



    //enviando mensagem para todas as abas
    chrome.tabs.executeScript(null, {
      code: "console.log(`\r\n\r\n\r\n background diz: recebido a mensagem: '" + response + "' \r\n\r\n\r\n`)"
    })




  });

