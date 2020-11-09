

const rawdata = [];

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

