const searchInput=document.getElementById("searchInput");
const sortMarketCap=document.getElementById("sortMarketCap");
const sortPercentageChange=document.getElementById("sortPercentageChange");
const cryptoTable = document.getElementById('cryptoTable');
let cryptodata=[]

function fetchData(){
    const apiurl="https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false"
    return fetch(apiurl)
    .then(res=>res.json())
}

// Fetch data using async/await
async function fetchDataAsync() {
    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
      renderTable(data);
    } catch (error) {
      console.error(error);
    }
  }


function renderTable(data) {
    const tbody = cryptoTable.querySelector("tbody");
    tbody.innerHTML = "";
  
    data.forEach(coin => {
      const row = document.createElement("tr");
      row.className="border-bottom"
      row.innerHTML = `
      <td><img id="images" src="${coin.image}" alt="${coin.name}"></td>
        <td>${coin.name}</td>
        <td>${coin.symbol.toUpperCase()}</td>
        <td>$${coin.current_price}</td>
        <td>$${coin.total_volume}</td>
        <td id="color">${Math.floor(coin.price_change_percentage_24h).toFixed(2)}%</td>
        <td>mkt cap: $${coin.market_cap}</td>
      `;
      tbody.appendChild(row);
    });
  }

  sortMarketCap.addEventListener('click', ()=>{
    const sortedData = [...cryptodata].sort((a, b) => b.market_cap - a.market_cap);
    renderTable(sortedData);
  });
 
searchInput.addEventListener("input",()=>{
    const searchValue = searchInput.value.toLowerCase();
      const filteredData = cryptodata.filter(item => item.name.toLowerCase().includes(searchValue) || item.symbol.toLowerCase().includes(searchValue));
      renderTable(filteredData);
})

sortPercentageChange.addEventListener('click', ()=>{
    const sortedData = [...cryptodata].sort((a, b) => b.price_change_percentage_24h - a.price_change_percentage_24h);
    renderTable(sortedData);
  });

  fetchData()
  .then(data=>{
    cryptodata=data
    renderTable(cryptodata)
  })