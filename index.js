const url1 = "https://min-api.cryptocompare.com/data/v2/news/?lang=EN&api_key=2a8c411a1a6f180ab3a5a00e0332c1c153f6f8e36e3971d01432409c93cfdc3"

const url2 = "https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD&api_key=2a8c411a12a6f180ab3a5a00e0332c1c153f6f8e36e3971d01432409c93cfdc3"

fetch(url1)
.then((resp) => resp.json())
.then(function(data){
    let currentNews = '';
    quotes = data.Data;
    document.querySelector(".read").onclick = function clickFunc(){
        currentNews = quotes[Math.floor(Math.random() * quotes.length)]
        news_image = currentNews.imageurl
        news_url = "url(" + news_image + ")"
        news_element =  document.querySelector(".currentNews")
        news_element.innerHTML = currentNews.title
        news_div = document.querySelector(".imageContainer")
        news_div.classList.add("newsimage")
        news_div.style.backgroundImage = news_url
        document.querySelector(".link").setAttribute("disabled", false)
        document.querySelector(".link").setAttribute("href", currentNews.url)
        document.querySelector(".link").setAttribute("target", "_blank")
        document.querySelector(".read").innerHTML = "Next"    
        tweet = document.querySelector(".tweet")
        tweet.classList.remove("disabled")
        tweet.setAttribute("href", "https://twitter.com/intent/tweet?text=" + 
                            currentNews.title + ' ' + currentNews.url);
        tweet.setAttribute("target", "_blank")
    }
})
.catch(function(){

})


fetch(url2)
.then((resp) => resp.json())
.then(function(data){
    let coins = data.Data
    for (coin in coins){
        let ticker = coins[coin].CoinInfo.Name
        let price = coins[coin].DISPLAY.USD.PRICE
        let change = coins[coin].DISPLAY.USD.CHANGEPCTDAY
        let profit = change >= 0 
        
        el = document.createElement("LI")
        el.innerHTML = ticker + ": " + price
        el.classList.add("col-3")
        if (profit){
            el.classList.add("text-success")
        }else{
            el.classList.add("text-danger")
        }
        document.querySelector(".coinList").appendChild(el)


        if (coin == 3){
            break
        }

    }
})


