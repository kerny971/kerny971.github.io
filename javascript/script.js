const listing = document.querySelector('#listing');
var cars = [];
var obs = true;
const nbrCars = document.querySelector('#nbr-result > span');
const header = document.querySelector('header');


function returnCarDetail (car) {
    return `
        <div class="car-detail">
            <h3>${car.name}</h3>
            <p>
                ${car.description}</br>
                ${car.price} € - ${car.Agence}
            </p>
            <a href="#" class="btn btn-success">Réserver et Payer</a>
        </div>
    `
}


const observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
        if (obs) {
            fetch('./cars-2.json').then(res => res.json()).then((json) => {
                obs = false;
                cars = [...cars, ...json]
                nbrCars.innerHTML = cars.length
                for (const [index, car] of json.entries()) {
                    listing.innerHTML += `
                    <article>
                        <div class="car-carousel">
                            <div id="carouselExample2Controls${index}" class="carousel slide" data-bs-ride="carousel">
                                <div class="carousel-inner">
                                    ${car.images.map((img, ix) => {
                                        if (ix === 0) {
                                            return `<div class='carousel-item active'><img src='${img}' class='d-block w-100' alt='véhicule ${ix+1} ${car.name}'></div>`
                                        }
                                        return `<div class='carousel-item'><img src='${img}' class='d-block w-100' alt='véhicule ${ix+1} ${car.name}'></div>`
                                    }).join('')}
                                </div>
                                <button class="carousel-control-prev" type="button" data-bs-target="#carouselExample2Controls${index}" data-bs-slide="prev">
                                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                                    <span class="visually-hidden">Previous</span>
                                </button>
                                <button class="carousel-control-next" type="button" data-bs-target="#carouselExample2Controls${index}" data-bs-slide="next">
                                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                                    <span class="visually-hidden">Next</span>
                                </button>
                            </div>
                        </div>
                        ${returnCarDetail(car)}
                    </article>
                `
                }
            })
        }
    }
})


function getCar () {
    fetch('./cars.json').then((res) => res.json()).then((json) => {
        for (const [index, car] of json.entries()) {
            cars.push(car);
        }
        for (const [i, c] of cars.entries()) {
            listing.innerHTML += `
                <article>
                    <div class="car-carousel">
                        <div id="carouselExampleControls${i}" class="carousel slide" data-bs-ride="carousel">
                            <div class="carousel-inner">
                                ${c.images.map((ige, idx) => {
                                    if (idx === 0) {
                                        return `<div class='carousel-item active'><img src='${ige}' class='d-block w-100' alt='véhicule ${idx+1} ${c.name}'></div>`
                                    }
                                    return `<div class='carousel-item'><img src='${ige}' class='d-block w-100' alt='véhicule ${idx+1} ${c.name}'></div>`
                                }).join('')}
                            </div>
                            <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls${i}" data-bs-slide="prev">
                                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                                <span class="visually-hidden">Previous</span>
                            </button>
                            <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleControls${i}" data-bs-slide="next">
                                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                                <span class="visually-hidden">Next</span>
                            </button>
                        </div>
                    </div>
                    ${returnCarDetail(c)}
                </article>
            `
        }

        nbrCars.innerHTML = cars.length;
        const carss = document.querySelectorAll('article');
        const lastCar = carss[carss.length - 1];
        observer.observe(lastCar)
    })
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}


function changeBackground () {

    const urlCars = [
        'https://images.caradisiac.com/images/5/5/8/2/195582/S0-peugeot-est-le-constructeur-prefere-des-francais-en-toute-subjectivite-711529.jpg',
        'https://www.turbo.fr/sites/default/files/2022-03/Mercedes-AMG-G-63-Edition-55-00005.jpg',
        'https://images.frandroid.com/wp-content/uploads/2022/06/ferrari-296-gtb-scaled.jpeg',
        'https://www.largus.fr/images/2023-04/Tesla-Model-3-grande-autonomie-propulsion-noire-1_14.jpg'
    ];

    setInterval(() => {
        header.style.backgroundImage = `url("${urlCars[getRandomInt(4)]}")`;
    }, 5000)
}

window.addEventListener('load', () => {
    getCar()
})

document.querySelector('#toggle-menu')?.addEventListener('click', () => {
    var menu = document.querySelector('#menu');
    if (menu.style.display === "block") {
        menu.style.display = "none";
    } else {
        menu.style.display = "block";
    }
})

changeBackground()