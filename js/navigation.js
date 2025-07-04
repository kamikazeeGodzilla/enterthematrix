// Navigation Module
class Navigation {
    constructor() {
        this.currentSection = 'about-me';
        this.breadcrumbPath = [];
        this.init();
    }

    init() {
        this.setupMenuToggle();
        this.setupNavigation();
        this.updateBreadcrumb();
    }

    setupMenuToggle() {
        const menuButton = document.querySelector('.menu-button');
        const sidebar = document.querySelector('.sidebar');
        const overlay = document.querySelector('.overlay');

        if (menuButton) {
            menuButton.addEventListener('click', () => {
                sidebar.classList.toggle('active');
                overlay.classList.toggle('active');
            });
        }

        if (overlay) {
            overlay.addEventListener('click', () => {
                sidebar.classList.remove('active');
                overlay.classList.remove('active');
            });
        }
    }

    setupNavigation() {
        document.querySelectorAll('.nav-item').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const sectionId = link.getAttribute('data-section');
                this.navigateToSection(sectionId);
                
                // Close mobile menu
                if (window.innerWidth <= 768) {
                    document.querySelector('.sidebar').classList.remove('active');
                    document.querySelector('.overlay').classList.remove('active');
                }
            });
        });
    }

    navigateToSection(sectionId) {
        this.currentSection = sectionId;
        this.breadcrumbPath = [sectionId];
        this.updateBreadcrumb();
        this.updateActiveNav();
        this.loadContent(sectionId);
    }

    updateActiveNav() {
        document.querySelectorAll('.nav-item').forEach(item => {
            item.classList.remove('text-green-600', 'bg-green-50');
            item.classList.add('text-gray-700');
        });
        
        const activeNav = document.querySelector(`[data-section="${this.currentSection}"]`);
        if (activeNav) {
            activeNav.classList.remove('text-gray-700');
            activeNav.classList.add('text-green-600', 'bg-green-50');
        }
    }

    async loadContent(sectionId) {
        const contentArea = document.getElementById('content-area');
        
        if (sectionId === 'game') {
            await this.loadGameContent();
        } else {
            await this.loadStaticContent(sectionId);
        }
    }

    async loadStaticContent(sectionId) {
        const contentArea = document.getElementById('content-area');
        console.log('Loading static content for section:', sectionId);
        try {
            const response = await fetch(`pages/${sectionId}.html`);
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            const html = await response.text();
            console.log('Static content HTML loaded:', html.substring(0, 100) + '...');
            contentArea.innerHTML = html;
            console.log('Content area innerHTML set');
            
            // Update active navigation item
            this.updateActiveNav();
            
            // Add to breadcrumb
            this.addToBreadcrumb(sectionId);
        } catch (error) {
            console.error('Error loading content:', error);
            contentArea.innerHTML = '<div class="text-red-600">Error loading content</div>';
        }
    }

    async loadGameContent() {
        const contentArea = document.getElementById('content-area');
        console.log('Loading game content...');
        try {
            const response = await fetch('pages/game/landing.html');
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            const html = await response.text();
            console.log('Game HTML loaded:', html.substring(0, 100) + '...');
            contentArea.innerHTML = html;
            console.log('Game content area innerHTML set');
            
            // Setup game logic - ensure GameManager is available
            if (typeof GameManager !== 'undefined') {
                console.log('GameManager found, initializing...');
                GameManager.init();
                // Setup landing page events
                GameManager.instance.setupEnterMatrixLink();
            } else {
                console.error('GameManager not found');
            }
            
            // Update active navigation item
            this.updateActiveNav();
            
            // Add to breadcrumb
            this.addToBreadcrumb('game');
        } catch (error) {
            console.error('Error loading game:', error);
            contentArea.innerHTML = '<div class="text-red-600">Error loading game content</div>';
        }
    }

    updateBreadcrumb() {
        const breadcrumb = document.getElementById('breadcrumb');
        if (!breadcrumb) return;

        if (this.breadcrumbPath.length === 0) {
            breadcrumb.classList.add('hidden');
            return;
        }

        breadcrumb.classList.remove('hidden');
        breadcrumb.innerHTML = this.breadcrumbPath.map((item, index) => {
            const isLast = index === this.breadcrumbPath.length - 1;
            const separator = isLast ? '' : ' > ';
            return `<span class="breadcrumb-item ${isLast ? 'current' : ''}" data-index="${index}">${item}</span>${separator}`;
        }).join('');

        // Add click handlers
        breadcrumb.querySelectorAll('.breadcrumb-item').forEach(item => {
            item.addEventListener('click', () => {
                const index = parseInt(item.getAttribute('data-index'));
                this.navigateToBreadcrumb(index);
            });
        });
    }

    navigateToBreadcrumb(index) {
        this.breadcrumbPath = this.breadcrumbPath.slice(0, index + 1);
        this.updateBreadcrumb();
        
        if (index === 0) {
            this.navigateToSection(this.breadcrumbPath[0]);
        } else if (this.breadcrumbPath[0] === 'game') {
            // Handle game navigation
            if (index === 1) {
                GameManager.instance.loadLevel('pills');
            } else if (index === 2) {
                // Stay on current pill page
                // The breadcrumb will be updated correctly
            }
        }
    }

    addToBreadcrumb(item) {
        this.breadcrumbPath.push(item);
        this.updateBreadcrumb();
    }
}

// Initialize navigation
const navigation = new Navigation(); 