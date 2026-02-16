const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const copyBtn = document.getElementById('copy');
const loader = document.getElementById('loader');

// Global Array to store quotes
let localQuotes = [];

// Show Loading
function showLoadingSpinner() {
    loader.hidden = false;
    loader.style.display = 'block'; // Block is needed for the 3D dots container
    quoteContainer.hidden = true;
}

// Hide Loading
function removeLoadingSpinner() {
    if (!loader.hidden) {
        quoteContainer.hidden = false;
        loader.hidden = true;
        loader.style.display = 'none';
    }
}

// Fetch Quotes from JSON file
async function loadQuotes() {
    showLoadingSpinner();
    try {
        const response = await fetch('quotes.json');
        localQuotes = await response.json();
        newQuote();
    } catch (error) {
        console.error("Failed to load quotes:", error);
        // Fallback
        localQuotes = [{ text: "Faith is the substance of things hoped for.", author: "Hebrews 11:1" }];
        newQuote();
    }
}

// Get Random Quote
function newQuote() {
    showLoadingSpinner();

    // Artificial Delay to show the loading animation (e.g., 1000ms = 1 second)
    setTimeout(() => {
        // Pick a random quote
        const randomQuote = localQuotes[Math.floor(Math.random() * localQuotes.length)];

        // Check format
        if (!randomQuote.author) {
            authorText.innerText = 'Unknown';
        } else {
            authorText.innerText = randomQuote.author;
        }

        if (randomQuote.text.length > 120) {
            quoteText.classList.add('long-quote');
        } else {
            quoteText.classList.remove('long-quote');
        }

        quoteText.innerText = randomQuote.text;
        removeLoadingSpinner();
    }, 800); // Adjustable delay
}

// Tweet Quote
function tweetQuote() {
    const quote = quoteText.innerText;
    const author = authorText.innerText;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
    window.open(twitterUrl, '_blank');
}

// Copy to Clipboard
function copyToClipboard() {
    const quote = quoteText.innerText;
    const author = authorText.innerText;
    const textToCopy = `"${quote}" - ${author}`;

    navigator.clipboard.writeText(textToCopy).then(() => {
        // Visual feedback
        const originalIcon = copyBtn.innerHTML;
        copyBtn.innerHTML = '<i class="fas fa-check"></i>';
        copyBtn.style.background = '#2ecc71';

        setTimeout(() => {
            copyBtn.innerHTML = originalIcon;
            copyBtn.style.background = ''; // Revert to CSS hover logic
        }, 1500);
    }).catch(err => {
        console.error('Failed to copy: ', err);
    });
}

// Event Listeners
newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote);
copyBtn.addEventListener('click', copyToClipboard);

// On Load
loadQuotes();
