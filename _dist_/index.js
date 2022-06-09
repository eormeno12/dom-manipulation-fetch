/**
 * This file is just a silly example to show everything working in the browser.
 * When you're ready to start on your site, clear the file. Happy hacking!
 **/

const baseURL = 'https://platzi-avo.vercel.app';
const API = baseURL + '/api/avo';
const appNode = document.querySelector('#app');

// Intl
// 1 - format dates
// 2 - format currencies
const formatPrice = (price) => {
    const newPrice = new window.Intl.NumberFormat('en-EN', {
        style: 'currency',
        currency: 'USD'
    }).format(price)

    return newPrice;
} 

// Web API
// Conectarnos al servidor
// Procesar la respuesta y convertirla en JSON
// JSON -> DATA -> Renderizar en el browser 

window
    .fetch(API)
    .then(response => response.json())
    .then(responseJSON => {
        const allItems = [];

        responseJSON.data.forEach(item => {
            // Crear imagen
            const img = document.createElement('img');
            img.src = baseURL + item.image;
            img.className = "h-16 w-16 md:h-24 md:w-24 rounded-full mx-auto md:mx-0 md:mr-6"

            // Crear titulo
            const title = document.createElement('h2');
            title.textContent = item.name;
            title.className = 'text-2xl text-blue-600'

            // Crear precio
            const price = document.createElement('div');
            price.textContent = formatPrice(item.price);
            price.className = 'text-xl text-gray-600';

            //Wrap price & title
            const priceAndTitle = document.createElement('div')
            priceAndTitle.className = 'text-center md:text-left'
            priceAndTitle.append(title, price)

            //Wrap Img and priceAndTitle
            const card = document.createElement('div')
            card.className = "md:flex m-12 bg-white shadow-md rounded-lg p-6 hover:bg-gray-100"
            card.append(img, priceAndTitle)

            allItems.push(card);
        });

        appNode.append(...allItems);
    })
