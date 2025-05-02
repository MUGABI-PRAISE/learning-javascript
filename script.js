// Write a function simulateRequest(success) that:

//     Resolves if success is true.

//     Rejects if success is false.

const simulateRequest = (success) => {
  const myPromise = new Promise((resolve, reject) => {
    if(success){
      resolve('success is true');
    }else{
      reject('success is false');
    }
  });

  myPromise
    .then((result) => console.log(result))
    .catch((result) => console.log(result));

}

simulateRequest(true);
// console.log(simulateRequest1);
