// Game Management Module
class GameManager {
    constructor() {
        this.currentLevel = 'landing';
        this.levels = {
            'landing': 'pages/game/landing.html',
            'pills': 'pages/game/pills.html',
            'red-pill': 'pages/game/red-pill.html',
            'green-pill': 'pages/game/green-pill.html'
        };
    }

    static init() {
        console.log('GameManager.init() called');
        if (!GameManager.instance) {
            console.log('Creating new GameManager instance');
            GameManager.instance = new GameManager();
        }
        console.log('Setting up event listeners');
        GameManager.instance.setupEventListeners();
    }

    setupEventListeners() {
        console.log('Setting up event listeners');
        // This method is called during initialization
        // Event listeners for specific levels will be set up when those levels are loaded
    }

    setupEnterMatrixLink() {
        console.log('Setting up enter matrix link');
        const enterMatrixLink = document.getElementById('enter-matrix-link');
        console.log('Enter matrix link found:', !!enterMatrixLink);
        if (enterMatrixLink) {
            // Remove any existing event listeners to prevent duplicates
            enterMatrixLink.replaceWith(enterMatrixLink.cloneNode(true));
            const newEnterMatrixLink = document.getElementById('enter-matrix-link');
            
            newEnterMatrixLink.addEventListener('click', () => {
                console.log('Enter matrix link clicked');
                this.loadLevel('pills');
                navigation.addToBreadcrumb('enter the matrix');
            });
        }
    }

    setupPillChoices() {
        console.log('Setting up pill choices');
        const redPill = document.getElementById('red-pill');
        const greenPill = document.getElementById('green-pill');
        
        console.log('Red pill found:', !!redPill);
        console.log('Green pill found:', !!greenPill);

        if (redPill) {
            redPill.addEventListener('click', () => {
                console.log('Red pill clicked');
                this.loadLevel('red-pill');
                navigation.addToBreadcrumb('red pill');
            });
        }

        if (greenPill) {
            greenPill.addEventListener('click', () => {
                console.log('Green pill clicked');
                this.loadLevel('green-pill');
                navigation.addToBreadcrumb('green pill');
            });
        }
    }

    async loadLevel(level) {
        const contentArea = document.getElementById('content-area');
        console.log('Loading level:', level);
        try {
            const response = await fetch(this.levels[level]);
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            const html = await response.text();
            console.log('Level HTML loaded:', html.substring(0, 100) + '...');
            contentArea.innerHTML = html;
            
            this.currentLevel = level;
            console.log('Current level set to:', this.currentLevel);
            this.setupLevelSpecificEvents(level);
        } catch (error) {
            console.error('Error loading game level:', error);
            contentArea.innerHTML = '<div class="text-red-600">Error loading game level</div>';
        }
    }

    setupLevelSpecificEvents(level) {
        console.log('Setting up level specific events for:', level);
        switch (level) {
            case 'landing':
                console.log('Setting up landing page events');
                this.setupEnterMatrixLink();
                break;
            case 'pills':
                console.log('Setting up pill choices');
                this.setupPillChoices();
                break;
            case 'red-pill':
                console.log('Setting up red pill events');
                this.setupRedPillEvents();
                break;
            case 'green-pill':
                console.log('Setting up green pill events');
                this.setupGreenPillEvents();
                break;
        }
    }

    setupRedPillEvents() {
        const waitingListForm = document.getElementById('waiting-list-form');
        const waitingListEmail = document.getElementById('waiting-list-email');
        const waitingListSuccess = document.getElementById('waiting-list-success');

        if (waitingListForm) {
            waitingListForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const email = waitingListEmail.value.trim();
                if (email) {
                    this.saveEmail(email);
                    waitingListForm.reset();
                    waitingListSuccess.classList.remove('hidden');
                }
            });
        }
    }

    setupGreenPillEvents() {
        // Green pill events are handled by the returnToSleep function
    }

    saveEmail(email) {
        let emails = JSON.parse(localStorage.getItem('waitingListEmails') || '[]');
        emails.push({ email, date: new Date().toISOString() });
        localStorage.setItem('waitingListEmails', JSON.stringify(emails));
    }


}

// Global functions for onclick handlers
function navigateBack() {
    // If we're in the pills page, go back to landing
    if (GameManager.instance.currentLevel === 'pills') {
        GameManager.instance.loadLevel('landing');
        navigation.breadcrumbPath = ['game'];
        navigation.updateBreadcrumb();
    } else {
        // For other pages, go back to pills
        GameManager.instance.loadLevel('pills');
        navigation.breadcrumbPath = ['game', 'enter the matrix'];
        navigation.updateBreadcrumb();
    }
}

function returnToSleep() {
    // Open YouTube link in new tab
    window.open('https://youtu.be/aD1xWJlMPlE?si=x3k08ED9DpLE43Zk', '_blank');
    // Navigate back to pill choices
    GameManager.instance.loadLevel('pills');
    // Update breadcrumb to show correct path
    navigation.breadcrumbPath = ['game', 'enter the matrix'];
    navigation.updateBreadcrumb();
} 