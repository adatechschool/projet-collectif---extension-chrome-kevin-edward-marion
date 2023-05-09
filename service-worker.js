let politiciens;

async function fetchData() {
  const response = await fetch("../gouvernement.json");
  const data = await response.json();
  politiciens = data;
}

self.addEventListener('install', event => {
  event.waitUntil(fetchData());
});

self.addEventListener('message', event => {
  if (event.data.type === 'getData') {
    event.source.postMessage({ type: 'data', data: politiciens });
  }
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === 'getData') {
    sendResponse({ message: 'Data received.', data: politiciens });
    
  }
});




// const getData = async (url) => {
//   const response = await fetch(url);

//   if (response.status != 200) {
//       throw new Error("Cannot fetch the data.");
//   };

//   const data = await response.json();
//   return data;
// }

// getData("../gouvernement.json")
//   .then(data => {
    
//     console.log(data)
//   })
//   .catch(error => {
//       console.error(error);
//   });

