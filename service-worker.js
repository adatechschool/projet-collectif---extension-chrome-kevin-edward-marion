 const getData = async (url) => {
    console.log(url);
    const response = await fetch(url);
  
    if (response.status != 200) {
        throw new Error("Cannot fetch the data.");
    };
  
    const data = await response.json();
    return data;
  }
  
  getData("../gouvernement.json")
    .then(data => {
      console.log(data)
    })
    .catch(error => {
        console.error(error);
 

    })