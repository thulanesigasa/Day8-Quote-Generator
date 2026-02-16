const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const copyBtn = document.getElementById('copy');
const loader = document.getElementById('loader');

// Show Loading
function showLoadingSpinner() {
    loader.hidden = false;
    loader.style.display = 'flex'; // Flex is needed for the bars
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

const localQuotes = [
    {
        text: "The Holy Spirit is the greatest reality in the world.",
        author: "Kathryn Kuhlman"
    },
    {
        text: "I am not moved by what I see. I am not moved by what I feel. I am moved only by what I believe.",
        author: "Smith Wigglesworth"
    },
    {
        text: "If your faith says yes, God cannot say no.",
        author: "Benson Idahosa"
    },
    {
        text: "God has given us two hands, one to receive with and the other to give with.",
        author: "Billy Graham"
    },
    {
        text: "Your dream is your ticket to your future.",
        author: "Uma Ukpai"
    },
    {
        text: "Success is impacting the world with the investment of your personality.",
        author: "Chris Oyakhilome"
    },
    {
        text: "Money is a servant, not a master.",
        author: "Uebert Angel"
    },
    {
        text: "Grace is not the license to sin but the power to overcome it.",
        author: "Shepherd Bushiri"
    },
    {
        text: "Intimacy with God is the womb that births destiny.",
        author: "Michael Orokpo"
    },
    {
        text: "Faith is the currency of the Kingdom.",
        author: "Benson Idahosa"
    },
    {
        text: "Great faith is the product of great fights. Great testimonies are the results of great tests.",
        author: "Smith Wigglesworth"
    },
    {
        text: "There is no limit to what God can do in your life.",
        author: "Kathryn Kuhlman"
    },
    {
        text: "When you work, you work. But when you pray, God works.",
        author: "Billy Graham"
    },
    {
        text: "You can change your world by changing your words.",
        author: "Chris Oyakhilome"
    },
    {
        text: "The anointing you respect is the anointing you attract.",
        author: "Mike Murdock"
    },
    {
        text: "Your mindset determines your outcome.",
        author: "Uebert Angel"
    },
    {
        text: "The secret of men are in their stories.",
        author: "Michael Orokpo"
    }
];

// Get Quote from Local Array
function getQuote() {
    showLoadingSpinner();

    // Simulate network delay for effect (optional, or just remove loading instantly)
    setTimeout(() => {
        // Pick a random quote from localQuotes array
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
    }, 500); // 500ms delay for smooth transition
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
newQuoteBtn.addEventListener('click', getQuote);
twitterBtn.addEventListener('click', tweetQuote);
copyBtn.addEventListener('click', copyToClipboard);

// On Load
getQuote();
