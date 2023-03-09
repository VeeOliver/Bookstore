async function getJSON(url) {
  let rawData = await fetch(url)
  let data = await rawData.json()
  return data;
}

async function start() {
  let result = await getJSON('./json/books.json');
  console.log(result)
}

start();