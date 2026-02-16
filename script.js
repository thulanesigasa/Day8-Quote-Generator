const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const copyBtn = document.getElementById('copy');
const loader = document.getElementById('loader');

// Modal Elements
const openModalBtn = document.getElementById('open-modal');
const modal = document.getElementById('general-modal');
const closeModalSpan = document.querySelector('.close-modal');
const generalsGrid = document.getElementById('generals-grid');
const showAllBtn = document.getElementById('show-all-btn');

// Global Array to store quotes
let localQuotes = [];
let filteredQuotes = [];
let currentFilter = 'All Generals';

// Show Loading
function showLoadingSpinner() {
    loader.hidden = false;
    loader.style.display = 'block';
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

// Fetch Quotes
async function loadQuotes() {
    showLoadingSpinner();
    try {
        const response = await fetch('quotes.json');
        localQuotes = await response.json();
        filteredQuotes = localQuotes;
        populateGeneralsGrid();
        newQuote();
    } catch (error) {
        console.error("Failed to load quotes:", error);
        localQuotes = [{ text: "Faith is the substance of things hoped for.", author: "Hebrews 11:1" }];
        filteredQuotes = localQuotes;
        newQuote();
    }
}

// Modal Logic
openModalBtn.addEventListener('click', () => {
    modal.style.display = "flex";
    setTimeout(() => modal.classList.add('show'), 10); // Fade in
});

closeModalSpan.addEventListener('click', closeModal);
window.addEventListener('click', (e) => {
    if (e.target == modal) closeModal();
});

function closeModal() {
    modal.classList.remove('show');
    setTimeout(() => { modal.style.display = "none"; }, 300);
}

// Populate Grid
function populateGeneralsGrid() {
    const authors = [...new Set(localQuotes.map(quote => quote.author))];

    // Priority Authors
    const priorityAuthors = ["Uebert Angel", "Shepherd Bushiri"];

    authors.sort((a, b) => {
        const isAPriority = priorityAuthors.includes(a);
        const isBPriority = priorityAuthors.includes(b);

        if (isAPriority && isBPriority) {
            return priorityAuthors.indexOf(a) - priorityAuthors.indexOf(b);
        }
        if (isAPriority) return -1;
        if (isBPriority) return 1;

        return a.localeCompare(b);
    });

    generalsGrid.innerHTML = '';

    authors.forEach(author => {
        // Create Card
        const card = document.createElement('div');
        card.classList.add('general-card');

        // Add priority class for styling if needed
        if (priorityAuthors.includes(author)) {
            card.style.borderColor = 'var(--primary-color)';
            card.style.background = 'rgba(255, 152, 0, 0.15)';
        }

        // Count quotes for this author
        const count = localQuotes.filter(q => q.author === author).length;

        card.innerHTML = `
            <h3>${author}</h3>
            <span>${count} Quotes</span>
        `;

        card.addEventListener('click', () => {
            selectGeneral(author);
        });

        generalsGrid.appendChild(card);
    });
}

function selectGeneral(author) {
    currentFilter = author;
    filteredQuotes = localQuotes.filter(q => q.author === author);

    // Update Button Text
    openModalBtn.innerHTML = `<i class="fas fa-user-check"></i> ${author}`;

    closeModal();
    newQuote();
}

showAllBtn.addEventListener('click', () => {
    currentFilter = 'All Generals';
    filteredQuotes = localQuotes;
    openModalBtn.innerHTML = `<i class="fas fa-users"></i> Choose General`;
    closeModal();
    newQuote();
});

// Get Random Quote
function newQuote() {
    showLoadingSpinner();

    setTimeout(() => {
        // Use filtered list or fallback
        const listToUse = filteredQuotes.length > 0 ? filteredQuotes : localQuotes;
        const randomQuote = listToUse[Math.floor(Math.random() * listToUse.length)];

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
    }, 800);
}

// Share Functions
function tweetQuote() {
    const quote = quoteText.innerText;
    const author = authorText.innerText;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
    window.open(twitterUrl, '_blank');
}

function copyToClipboard() {
    const quote = quoteText.innerText;
    const author = authorText.innerText;
    const textToCopy = `"${quote}" - ${author}`;

    navigator.clipboard.writeText(textToCopy).then(() => {
        const originalIcon = copyBtn.innerHTML;
        copyBtn.innerHTML = '<i class="fas fa-check"></i>';
        copyBtn.style.background = '#2ecc71';

        setTimeout(() => {
            copyBtn.innerHTML = originalIcon;
            copyBtn.style.background = '';
        }, 1500);
    }).catch(err => {
        console.error('Failed to copy: ', err);
    });
}

// Event Listeners
newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote);
copyBtn.addEventListener('click', copyToClipboard);

// Init
loadQuotes();
