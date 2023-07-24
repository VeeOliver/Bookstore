
export async function getJSON(url) {
  //helper function to get json data
  let rawData = await fetch(url)
  let data = await rawData.json()
  return data;
}

