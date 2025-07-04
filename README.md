# Kolta Lucca - Personal Blog

A modern, professional personal blog built with vanilla HTML, CSS, and JavaScript featuring an interactive Matrix-themed game.

## 🚀 Features

- **Responsive Design** - Works perfectly on desktop, tablet, and mobile
- **Interactive Navigation** - Smooth breadcrumb navigation system
- **Matrix Game** - Interactive game with red/green pill choices
- **Email Collection** - Waiting list signup for the Matrix simulation
- **Professional Structure** - Modular, maintainable code architecture

## 📁 Project Structure

```
Kolta Lucca/
├── index-new.html          # Main entry point (use this)
├── css/
│   └── styles.css         # All custom styles
├── js/
│   ├── navigation.js      # Navigation and routing logic
│   └── game.js           # Game-specific functionality
├── pages/
│   ├── about-me.html     # About me content
│   ├── languages.html    # Programming languages section
│   ├── cs.html          # Computer science section
│   ├── tech-stacks.html # Technology stacks section
│   └── game/
│       ├── landing.html  # Matrix game landing
│       ├── pills.html    # Pill choices page
│       ├── red-pill.html # Red pill result
│       └── green-pill.html # Green pill result
├── assets/
│   └── images/
│       └── enter.png     # Matrix game image
└── README.md
```

## 🛠️ Setup & Installation

1. **Clone or download** the project files
2. **Start a local server** (required for fetch requests):
   ```bash
   python3 -m http.server 8080
   ```
3. **Open in browser**: `http://localhost:8080/index-new.html`

## 🎮 Game Flow

1. **Click "game"** → Shows Matrix card
2. **Click "enter the matrix"** → Shows pill choices
3. **Click "red pill"** → Shows waiting list signup
4. **Click "green pill"** → Shows message + opens YouTube video

## 🔧 Technical Details

### Architecture
- **Modular JavaScript** - Separate modules for navigation and game logic
- **Component-based HTML** - Each page is a separate HTML file
- **CSS Modules** - Organized styles with proper separation of concerns
- **Responsive Design** - Mobile-first approach with Tailwind CSS

### Key Features
- **Breadcrumb Navigation** - Tracks user journey and allows easy navigation back
- **Dynamic Content Loading** - Pages load via fetch API for better performance
- **Local Storage** - Saves email addresses locally
- **Error Handling** - Graceful error handling for failed requests

## 📱 Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge

## 🚀 Deployment

To deploy this blog:

1. **Upload all files** to your web server
2. **Ensure server supports** static file serving
3. **Update image paths** if needed for your server structure
4. **Test all functionality** especially the game flow

## 🔮 Future Enhancements

- [ ] Add more game levels
- [ ] Implement proper email backend
- [ ] Add animations and transitions
- [ ] Create admin panel for content management
- [ ] Add analytics and tracking

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Feel free to submit issues and enhancement requests!

---

**Built with ❤️ by Kolta Lucca** 