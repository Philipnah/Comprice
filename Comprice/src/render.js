const puppeteer = require("puppeteer");

async function scrapeUrl(url){
     const browser = await puppeteer.launch();
     const page = await browser.newPage();

     await page.goto(url);

     const [el] = await page.$x("/html/body/div[1]/div/div[1]/picture/img");
     const src = await el.getProperty("src");
     const imgUrl = await src.jsonValue();

     const [el2] = await page.$x("/html/body/div[1]/div/div[1]/div[2]/div/div/div[1]/div[1]/span[3]/span");
     const txt = await el2.getProperty("textContent");
     const shippingTime = await txt.jsonValue();

     const [el3] = await page.$x("/html/body/div[1]/div/div[1]/div[2]/div/div/div[1]/div[1]/span[7]/span");
     const txt2 = await el3.getProperty("textContent");
     const shippingPrice = await txt2.jsonValue();

     // here we need to show our webscraped stuff

     document.getElementById("img").innerHTML = "<img src=" + imgUrl + " alt='food'>";
     document.getElementById("shipping-time").innerHTML = shippingTime;
     document.getElementById("shipping-price").innerHTML = shippingPrice;

     console.log({imgUrl, shippingTime, shippingPrice})

     browser.close();

}

var url2Scrape = ["https://www.hungry.dk/ballerup/cantinos/", "https://www.hungry.dk/smoerum/rs-sushi-thai/"];

url2Scrape.forEach(element => {
     scrapeUrl(element);
});