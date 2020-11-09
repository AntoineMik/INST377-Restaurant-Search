

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

function displayResult()
{
    const matchArray = findMatches(this.value, rawdata);
    const htmlList = matchArray.map(
        restaurant =>
        {
            return `
                <li>
                    <h5 class="name">${restaurant.name}</h5>
                    <span class="id">${restaurant.city}, ${restaurant.state}, ${restaurant.zip}</span>
                    <p class="inspection">${restaurant.inspection_results}</p>
                </li>
            
            `;
        }
    ).join("");

    results.innerHTML = htmlList;

}

const searching = document.querySelector(".searchbox");
const results = document.querySelector(".results");

searching.addEventListener("change", displayResult);
searching.addEventListener("keyup", displayResult);

