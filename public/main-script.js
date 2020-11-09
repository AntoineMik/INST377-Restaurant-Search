

const rawdata = [];

// Get data from server into our array as a json
async function getDatafromserver()
{

        fetch('/api', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
        })
          .then((fromServer) => fromServer.json())
          .then((jsonFromServer) => rawdata.push(...jsonFromServer))
          .then(console.log(rawdata))
          .catch((err) => {
            console.log(err);
          });
}

getDatafromserver()

// Find matched from the raw data based on the search
function findMatches(search, rawdata)
{
    // look throught the entire file regarless of case sensitivity
    return rawdata.filter(
        restaurant =>
        {
            const regex = new RegExp(search, 'gi');
            return restaurant.name.match(regex)

        }
    );
}

// display restaurants when available
function displayResult()
{
    let htmlList = ``;
    if(this.value.length > 0)
    {
        const matchArray = findMatches(this.value, rawdata);
        htmlList = matchArray.map(
            restaurant =>
            {
                return `
                    <li class="list">
                        <h4 class="name">${restaurant.name}</h4>
                        <address>
                            <span class="id">${restaurant.address_line_1} <br>
                                ${restaurant.city} <br> ${restaurant.state} <br> ${restaurant.zip}</span>
                        </address>
                        <p class="inspection">${restaurant.category}</p>
                        <p class="inspection">${restaurant.inspection_results}</p>
                    </li>
            
                `;
            }
        ).join("");
    }

    results.innerHTML = htmlList;

}

const searching = document.querySelector(".searchbox");
const results = document.querySelector(".results");

searching.addEventListener("change", displayResult);
searching.addEventListener("keyup", displayResult);

