const container = document.getElementById("faqContainer");
const searchInput = document.getElementById("searchInput");

// Lijst van vragenbestanden in dezelfde map
const questionFiles = [
    "hoe-maak-ik-een-account.html",
    "waar-vind-ik-mijn-factuur.html",
    "hoe-installeer-ik-de-app.html"
];

// Maak de FAQ-items aan
container.innerHTML = ''; // Verwijder "Even laden..."
questionFiles.forEach(file => {
    const formattedQuestion = file
        .replace(/\.html$/, '')  // Verwijder .html
        .replace(/-/g, ' ')      // Vervang streepjes door spaties
        .replace(/^./, c => c.toUpperCase()) // Eerste letter hoofdletter
        + '?';                   // Voeg vraagteken toe

    const card = document.createElement('a');
    card.href = file; // Verwijzing naar het bestand in dezelfde map
    card.className = 'faq-card';
    card.innerHTML = `
        <div class="faq-question">${formattedQuestion}</div>
    `;
    
    container.appendChild(card);
});

// Zoekfunctie
searchInput.addEventListener('input', () => {
    const searchTerm = searchInput.value.toLowerCase();
    const cards = document.querySelectorAll('.faq-card');
    let hasResults = false;

    cards.forEach(card => {
        const question = card.textContent.toLowerCase();
        if (question.includes(searchTerm)) {
            card.style.display = 'flex';
            hasResults = true;
        } else {
            card.style.display = 'none';
        }
    });

    // Toon bericht als er geen resultaten zijn
    const noResultsMessage = document.querySelector('.no-results');
    if (!hasResults) {
        if (!noResultsMessage) {
            const message = document.createElement('div');
            message.className = 'no-results';
            message.innerHTML = `
                Heb je je vraag niet kunnen vinden? 
                Stuur dan een mailtje naar <a href="https://outlook.live.com/mail/0/deeplink/compose?to=stemclairhhh@gmail.com" target="_blank">stemclairhhh@gmail.com</a>
            `;
            container.appendChild(message);
        }
    } else if (noResultsMessage) {
        noResultsMessage.remove();
    }
});

// Foutafhandeling (optioneel, maar aanbevolen)
window.addEventListener('error', (event) => {
    console.error('Er is een fout opgetreden:', event.error);
    container.innerHTML = '<p>😟 Er is een fout opgetreden bij het laden van de vragen. Probeer het later opnieuw.</p>';
});