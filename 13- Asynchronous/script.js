'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

const renderCountry = function (data, className = '') {
  const html = `
        <article class="country ${className}">
        <img class="country__img" src="${data.flags.png}" />
        <div class="country__data">
        <h3 class="country__name">${data.name}</h3>
        <h4 class="country__region">${data.region}</h4>
        <p class="country__row"><span>👫</span>${(
          +data.population / 1000000
        ).toFixed(1)}M people</p>
            <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
            <p class="country__row"><span>💰
            </span>${data.currencies[0].name}</p>
            </div>
            </article>
            `;

  countriesContainer.insertAdjacentHTML('beforeend', html);
  countriesContainer.style.opacity = 1;
};

const renderError = function (msg) {
  countriesContainer.insertAdjacentText('beforeend', msg);
  countriesContainer.style.opacity = 1;
};

const getJSON = function (url, errorMsg = 'Something went wrong') {
  return fetch(url).then(response => {
    if (!response.ok) throw new Error(`${errorMsg} ${response.status}`);

    return response.json();
  });
};

///////////////////////////////////////
/*
const getCountryData = function (country) {
  // Old School way of doing AJAX in JS
  const request = new XMLHttpRequest();
  request.open(
    'GET',
    `https://countries-api-836d.onrender.com/countries/name/${country}`
  );
  request.send();

  request.addEventListener('load', function () {
    const [data] = JSON.parse(this.responseText);
    console.log(data);

    const html = `
        <article class="country">
        <img class="country__img" src="${data.flags.png}" />
        <div class="country__data">
        <h3 class="country__name">${data.name}</h3>
        <h4 class="country__region">${data.region}</h4>
        <p class="country__row"><span>👫</span>${(
          +data.population / 1000000
        ).toFixed(1)} people</p>
            <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
            <p class="country__row"><span>💰
            </span>${data.currencies[0].name}</p>
            </div>
            </article>
            `;

    countriesContainer.insertAdjacentHTML('beforeend', html);
    countriesContainer.style.opacity = 1;
  });
};

getCountryData('portugal');
getCountryData('usa');
getCountryData('turkey');
getCountryData('germany');
*/

/*
const getCountryAndNeighbour = function (country) {
  // Ajax Call country 1
  const request = new XMLHttpRequest();
  request.open(
    'GET',
    `https://countries-api-836d.onrender.com/countries/name/${country}`
  );
  request.send();

  request.addEventListener('load', function () {
    const [data] = JSON.parse(this.responseText);
    console.log(data);

    // Render country 1
    renderCountry(data);

    // Get neighbour country (2)
    const neighbour = data.borders?.[0];

    if (!neighbour) return;

    // Ajax Call country 2
    const request2 = new XMLHttpRequest();
    request2.open(
      'GET',
      `https://countries-api-836d.onrender.com/countries/alpha/${neighbour}`
    );
    request2.send();

    request2.addEventListener('load', function () {
      const data2 = JSON.parse(this.responseText);
      console.log(data2);

      renderCountry(data2, 'neighbour');
    });
  });
};

// getCountryAndNeighbour('portugal');
getCountryAndNeighbour('USA');

setTimeout(() => {
  console.log('1 sec passed');
  setTimeout(() => {
    console.log('2 sec passed');
    setTimeout(() => {
      console.log('3 sec passed');
      setTimeout(() => {
        console.log('4 sec passed');
      }, 1000);
    }, 1000);
  }, 1000);
}, 1000);
*/

///////////////////////// PROMISES

/////// How we used to do it

// const request = new XMLHttpRequest();
// request.open(
//   'GET',
//   `https://countries-api-836d.onrender.com/countries/name/${country}`
// );
// request.send();

///////// Modern way
// const request = fetch(
//   'https://countries-api-836d.onrender.com/countries/name/portugal'
// );
// console.log(request);

// const getCountryData = function (country) {
//   fetch(`https://countries-api-836d.onrender.com/countries/name/${country}`)
//     .then(function (response) {
//       console.log(response);
//       return response.json();
//     })
//     .then(function (data) {
//       console.log(data);
//       renderCountry(data[0]);
//     });
// };

/*
    const getJSON = function (url, errorMsg = 'Something went wrong') {
      return fetch(url).then(response => {
    if (!response.ok) throw new Error(`${errorMsg} ${response.status}`);
    
    return response.json();
  });
};

// const getCountryData = function (country) {
  //   fetch(`https://countries-api-836d.onrender.com/countries/name/${country}`)
  //     .then(
//       response => {
//         console.log(response);

//         if (!response.ok)
//           throw new Error(`Country not found ${response.status}`);

//         return response.json();
//       } // fulfilled
//     )
//     .then(data => {
//       renderCountry(data[0]);
//       // const neighbour = data[0].borders?.[0];
//       const neighbour = 'saddsasas';

//       // Country 2
//       return fetch(
//         `https://countries-api-836d.onrender.com/countries/alpha/${neighbour}`
//       );
//     })
//     .then(response => {
//       if (!response.ok) throw new Error(`Country not found ${response.status}`);
//       return response.json();
//     })
//     .then(data => renderCountry(data, 'neighbour'))
//     .catch(err => {
//       // this catch method throws an error if there is any problem in any place at the whole promise chain
//       console.error(`${err} 💥💥💥`);
//       renderError(`Something went wrong 💥💥 ${err.message}. Try Again`);
//     })
//     .finally(() => {
//       // finally method will execute no matter if it is fulfilled or rejected
//       countriesContainer.style.opacity = 1;
//     });
// };

const getCountryData = function (country) {
  getJSON(
    `https://countries-api-836d.onrender.com/countries/name/${country}`,
    'Country not found'
  )
    .then(data => {
      renderCountry(data[0]);
      const neighbour = data[0].borders?.[0];

      if (!neighbour) throw new Error('No neighbour found!');

      // Country 2
      return getJSON(
        `https://countries-api-836d.onrender.com/countries/alpha/${neighbour}`,
        'Country not found'
      );
    })
    .then(data => renderCountry(data, 'neighbour'))
    .catch(err => {
      // this catch method throws an error if there is any problem in any place at the whole promise chain
      console.error(`${err} 💥💥💥`);
      renderError(`Something went wrong 💥💥 ${err.message}. Try Again`);
    })
    .finally(() => {
      // finally method will execute no matter if it is fulfilled or rejected
      countriesContainer.style.opacity = 1;
    });
};

btn.addEventListener('click', function () {
  getCountryData('poland');
});

getCountryData('australia');
*/

/*
/////////////////////////////////////////////////////
// Coding Challenge #1 (Geocode API)

const whereAmI = function (lat, lng) {
  fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`)
    .then(res => {
      return res.json();
    })
    .then(data => {
      if (data.city === 'Throttled! See geocode.xyz/pricing')
        throw new Error(`Problem with geocoding`);
      console.log(data);
      console.log(`You are in ${data.city}, ${data.country}`);

      return fetch(
        `https://countries-api-836d.onrender.com/countries/name/${data.country}`
      );
    })
    .then(res => {
      if (!res.ok) throw new Error(`Country not found ${res.status}`);

      return res.json();
    })
    .then(data => renderCountry(data[0]))
    .catch(err => console.error(`${err.message}`))
    .finally(() => {
      countriesContainer.style.opacity = 1;
    });
};

whereAmI(-33.933, 18.474);
*/

/*
/////////////////////////////////////////
// Event Loop in practice

console.log('Test start');

setTimeout(() => console.log('0 sec timer'), 0);

Promise.resolve('Resolved promise 1').then(res => console.log(res));

Promise.resolve('Resolved promise 2').then(res => {
  for (let i = 0; i < 1000000000; i++) {}
  console.log(res);
});

console.log('Test end');
*/

/*
// Promise constructor takes exactly 1 argument which is called executer function
const lotteryPromise = new Promise(function (resolve, reject) {
  console.log('Lotter draw is happening');

  setTimeout(function () {
    if (Math.random() >= 0.5) {
      resolve('You WIN 💰');
    } else {
      reject(new Error('You lost your money 💥'));
    }
  }, 2000);
});

lotteryPromise.then(res => console.log(res)).catch(err => console.error(err));
*/

/*

// Promisifying setTimeout
const wait = function (seconds) {
  return new Promise(function (resolve) {
    setTimeout(resolve, seconds * 1000);
  });
};

wait(1)
  .then(() => {
    console.log('1 sec passed');
    return wait(1);
  })
  .then(() => {
    console.log('2 sec passed');
    return wait(1);
  })
  .then(() => {
    console.log('3 sec passed');
    return wait(1);
  })
  .then(() => console.log('4 sec passed'));

// setTimeout(() => {
//   console.log('1 sec passed');
//   setTimeout(() => {
//     console.log('2 sec passed');
//     setTimeout(() => {
//       console.log('3 sec passed');
//       setTimeout(() => {
//         console.log('4 sec passed');
//       }, 1000);
//     }, 1000);
//   }, 1000);
// }, 1000);

Promise.resolve('abc').then(x => console.log(x));
Promise.reject(new Error('Problem!')).catch(x => console.error(x));
*/

/*
const getPosition = function () {
  return new Promise(function (resolve, reject) {
    // navigator.geolocation.getCurrentPosition(
    //   position => resolve(position),
    //   err => reject(err)
    // );

    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};

getPosition().then(pos => console.log(pos));

const whereAmI = function () {
  getPosition()
    .then(pos => {
      const { latitude: lat, longitude: lng } = pos.coords;

      return fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`);
    })
    .then(res => {
      return res.json();
    })
    .then(data => {
      if (data.city === 'Throttled! See geocode.xyz/pricing')
        throw new Error(`Problem with geocoding`);
      console.log(data);
      console.log(`You are in ${data.city}, ${data.country}`);

      return fetch(
        `https://countries-api-836d.onrender.com/countries/name/${data.country}`
      );
    })
    .then(res => {
      if (!res.ok) throw new Error(`Country not found ${res.status}`);

      return res.json();
    })
    .then(data => renderCountry(data[0]))
    .catch(err => console.error(`${err.message}`))
    .finally(() => {
      countriesContainer.style.opacity = 1;
    });
};

btn.addEventListener('click', whereAmI);
*/

/*
//////////////////////////////////////////////////////////////
/// Coding Challenge #2

const imgContainer = document.querySelector('.images');

const wait = function (seconds) {
  return new Promise(function (resolve) {
    setTimeout(resolve, seconds * 1000);
  });
};

const createImage = function (imgPath) {
  return new Promise(function (resolve, reject) {
    const img = document.createElement('img');
    img.src = imgPath;

    img.addEventListener('load', function () {
      imgContainer.append(img);
      resolve(img);
    });

    img.addEventListener('error', function () {
      reject(new Error('Image not found'));
    });
  });
};

let currentImg;

createImage('img/img-1.jpg')
  .then(img => {
    currentImg = img;
    console.log('Image 1 loaded');
    return wait(2);
  })
  .then(() => {
    currentImg.style.display = 'none';
    return createImage('img/img-2.jpg');
  })
  .then(img => {
    currentImg = img;
    console.log('Image 2 loaded');
    return wait(2);
  })
  .then(() => {
    currentImg.style.display = 'none';
    return createImage('img/img-3.jpg');
  })
  .then(img => {
    currentImg = img;
    console.log('Image 3 loaded');
    return wait(2);
  })
  .then(() => {
    currentImg.style.display = 'none';
  })
  .catch(err => console.error(err));
*/

/*
const getPosition = function () {
  return new Promise(function (resolve, reject) {
    // navigator.geolocation.getCurrentPosition(
    //   position => resolve(position),
    //   err => reject(err)
    // );

    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};

////// async function always returns promise !
////// always use try catch with async function !
const whereAmI = async function (country) {
  try {
    // Geolocation
    const pos = await getPosition();

    const { latitude: lat, longitude: lng } = pos.coords;

    // Reverse geocoding
    const resGeo = await fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`);
    if (!resGeo.ok) throw new Error('Problem getting location data');

    const dataGeo = await resGeo.json();

    // Country data

    // old way
    // fetch(
    //   `https://countries-api-836d.onrender.com/countries/name/${country}`
    // ).then(res => console.log(res));

    // new way
    const res = await fetch(
      `https://countries-api-836d.onrender.com/countries/name/${dataGeo.country}`
    );
    if (!res.ok) throw new Error('Problem getting country');

    const data = await res.json();

    renderCountry(data[0]);

    return `You are in ${dataGeo.city}, ${dataGeo.country}`; // will become the fulfilled value of the promise
  } catch (err) {
    console.error(err);
    renderError(`${err.message}`);

    // Reject promise returned from async function
    throw err;
  }
};

console.log('1: Will get location');

// const city = whereAmI();
// console.log(city);
////// async function always returns promise and the return value is the fulfilled value of the promise.

// whereAmI()
//   .then(city => console.log(`2: ${city}`))
//   .catch(err => console.error(`2: ${err.message}`))
//   .finally(() => console.log('3: Finished getting location'));

(async function () {
  try {
    const city = await whereAmI();
    console.log(city);
  } catch (err) {
    console.error(err.message);
  }

  console.log('3: Finished getting location');
})();
*/

/*
////// Promise combinator: Promise.all()

const get3Countries = async function (c1, c2, c3) {
  try {
    // const [data1] = await getJSON(
    //   `https://countries-api-836d.onrender.com/countries/name/${c1}`
    // );
    // const [data2] = await getJSON(
    //   `https://countries-api-836d.onrender.com/countries/name/${c2}`
    // );
    // const [data3] = await getJSON(
    //   `https://countries-api-836d.onrender.com/countries/name/${c3}`
    // );
    // console.log(data1.capital, data2.capital, data3.capital);

    //// Promise.all() = whenever you have a situation in which you need to do multiple async operations at the same time and operations that don't depend on one another, then you should always run them in parallel using Promise.all()
    const data = await Promise.all([
      getJSON(`https://countries-api-836d.onrender.com/countries/name/${c1}`),
      getJSON(`https://countries-api-836d.onrender.com/countries/name/${c2}`),
      getJSON(`https://countries-api-836d.onrender.com/countries/name/${c3}`),
    ]);

    console.log(data);
    console.log(data.map(d => d[0].capital));
  } catch (err) {
    console.error(err.message);
  }
};

get3Countries('portugal', 'turkey', 'canada');
*/

/*
// Promise.race : promises will race at each other and the winning one will be returned and it doesn't matter if it is fulfilled or rejected
(async function () {
  // returns one result
  const res = await Promise.race([
    getJSON(`https://countries-api-836d.onrender.com/countries/name/italy`),
    getJSON(`https://countries-api-836d.onrender.com/countries/name/turkey`),
    getJSON(`https://countries-api-836d.onrender.com/countries/name/poland`),
  ]);
  console.log(res[0]);
})();

const timeout = function (sec) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error('request took too long !'));
    }, sec * 1000);
  });
};
Promise.race([
  getJSON(`https://countries-api-836d.onrender.com/countries/name/tanzania`),
  timeout(0.2),
])
  .then(res => console.log(res[0]))
  .catch(err => console.error(err.message));
*/

/*
// Promise.allSettled
Promise.allSettled([
  Promise.resolve('success'),
  Promise.reject('ERROR'),
  Promise.resolve('another success'),
]).then(res => console.log(res));

Promise.all([
  Promise.resolve('success'),
  Promise.reject('ERROR'),
  Promise.resolve('another success'),
])
  .then(res => console.log(res))
  .catch(err => console.error(err));

// Promise.any [ES2021] : ignores the rejected promises and returns first fulfilled promise
Promise.any([
  Promise.reject('ERROR'),
  Promise.resolve('any : success'),
  Promise.resolve('any : another success'),
])
  .then(res => console.log(res))
  .catch(err => console.error(err));
*/

/*
///////////////////////////////////////////////////
/// Coding Challenge #3

const imgContainer = document.querySelector('.images');

const wait = function (seconds) {
  return new Promise(function (resolve) {
    setTimeout(resolve, seconds * 1000);
  });
};

const createImage = function (imgPath) {
  return new Promise(function (resolve, reject) {
    const img = document.createElement('img');
    img.src = imgPath;

    img.addEventListener('load', function () {
      imgContainer.append(img);
      resolve(img);
    });

    img.addEventListener('error', function () {
      reject(new Error('Image not found'));
    });
  });
};

/// PART 1

//let currentImg; // dont need to external variable

const loadNpause = async function () {
  try {
    let img = await createImage('img/img-1.jpg');

    console.log('Image 1 loaded');
    await wait(2);
    img.style.display = 'none';

    img = await createImage('img/img-2.jpg');

    console.log('Image 2 loaded');
    await wait(2);
    img.style.display = 'none';

    img = await createImage('img/img-3.jpg');

    console.log('Image 3 loaded');
    await wait(2);
    img.style.display = 'none';
  } catch (err) {
    console.error(err);
  }
};
// loadNpause();

/// PART 2
const loadAll = async function (imgArr) {
  try {
    const imgs = imgArr.map(async img => await createImage(img));

    const imgsEl = await Promise.all(imgs);

    imgsEl.forEach(img => img.classList.add('parallel'));
  } catch (err) {
    console.error(err);
  }
};

loadAll(['img/img-1.jpg', 'img/img-2.jpg', 'img/img-3.jpg']);
*/

const getPosition = function () {
  return new Promise(function (resolve, reject) {
    // navigator.geolocation.getCurrentPosition(
    //   position => resolve(position),
    //   err => reject(err)
    // );

    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};

const whereAmI = async function (country) {
  try {
    // Geolocation
    const pos = await getPosition();

    const { latitude: lat, longitude: lng } = pos.coords;

    // Reverse geocoding
    const resGeo = await fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`);
    if (!resGeo.ok) throw new Error('Problem getting location data');

    const dataGeo = await resGeo.json();

    // Country data

    // old way
    // fetch(
    //   `https://countries-api-836d.onrender.com/countries/name/${country}`
    // ).then(res => console.log(res));

    // new way
    const res = await fetch(
      `https://countries-api-836d.onrender.com/countries/name/${dataGeo.country}`
    );
    if (!res.ok) throw new Error('Problem getting country');

    const data = await res.json();

    renderCountry(data[0]);

    return `You are in ${dataGeo.city}, ${dataGeo.country}`; // will become the fulfilled value of the promise
  } catch (err) {
    console.error(err);
    renderError(`${err.message}`);

    // Reject promise returned from async function
    throw err;
  }
};

btn.addEventListener('click', whereAmI);
