const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const newQuoteBtn = document.getElementById("new-quote");
const loader = document.getElementById("loader");

const loading = function () {
  loader.hidden = false;
  quoteContainer.hidden = true;
};

const complete = function () {
  loader.hidden = true;
  quoteContainer.hidden = false;
};

const newQuote = function (data) {
  loading();
  const quote = data[Math.floor(Math.random() * data.length)];

  if (!quote.author) {
    authorText.textContent = "unknown";
  } else {
    authorText.textContent = quote.author;
  }

  if (quote.text.lenght > 120) {
    quoteText.classList.add("long-quote");
  } else {
    quoteText.classList.remove("long-quote");
  }

  quoteText.textContent = quote.text;
  complete();
};

const getQuotes = async function () {
  loading();
  const apiUrl = "https://type.fit/api/quotes";
  try {
    const res = await fetch(apiUrl);
    let data = await res.json();

    newQuote(data);
  } catch (err) {
    console.error(err);
  }
};

const tweetQuote = function () {
  const twitterUrl = `http://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;

  console.log(twitterUrl);
  window.open(twitterUrl, "_blank");
};
getQuotes();
newQuoteBtn.addEventListener("click", getQuotes);
twitterBtn.addEventListener("click", tweetQuote);

// tweetQuote();

///
