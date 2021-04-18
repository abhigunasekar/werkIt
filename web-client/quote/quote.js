const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
// const authorText = document.getElementById('author');
// const twitterBtn = document.getElementById('twitter');
// const newQuoteBin = document.getElementById('new-quote');
const loader = document.getElementById('loader');

// Show Loading
function showLoadingSpinner() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

// Hide Loading
function removeLoadingSpinner() {
    if (!loader.hidden) {
        quoteContainer.hidden = false;
        loader.hidden = true;
    }
}

// Get Quotes from API
async function getQuote() {
    showLoadingSpinner();
    const proxyUrl = 'https://desolate-inlet-19096.herokuapp.com/'
    const apiUrl = 'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';
    try {
        const response = await fetch(proxyUrl + apiUrl);
        const data = await response.json();
        // If Author is blank, add 'Unknown'
        // if (data.quoteAuthor === '') {
        //     authorText.innerText = 'Unknown';
        // } else {
        //     authorText.innerText = data.quoteAuthor;
        // }
        // Reduce font size for long quotes
        if (data.quoteText.length > 120) {
            quoteText.classList.add('long-quote');
        } else {
            quoteText.classList.remove('long-quote');
        }
        quoteText.innerText = data.quoteText;
        // Stop loader and show quote
        removeLoadingSpinner();
    } catch (error) {
        // console.log(error);
        getQuote();
    }
}

// //  Tweet Quote
// function tweetQuote() {
//     const quote = quoteText.innerText;
//     const author = authorText.innerText;
//     const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
//     window.open(twitterUrl, '_blank');
// }

// // Event Listener
// newQuoteBin.addEventListener('click', getQuote);
// twitterBtn.addEventListener('click', tweetQuote);

// On Load
getQuote();
//loading();

let count = 1;

setInterval(() => {
    count++
    if (count > 5) location.replace('../dashboard/dashboard.html')
}, 1000)