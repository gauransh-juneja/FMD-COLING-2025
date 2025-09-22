# Financial Misinformation Detection - Website

A modern, interactive website showcasing the Financial Misinformation Detection (FMD) capstone project. This website compares three AI models (Logistic Regression, RNN/LSTM, and BERT) for detecting misinformation in financial claims.

## 🌟 Features

- **Interactive Model Comparison**: Visual comparison of three AI models with detailed performance metrics
- **Advanced Demo**: Sophisticated text analysis with model-specific reasoning and confidence scores
- **Detailed Analysis**: Comprehensive performance tables with training time, inference speed, and model size
- **Technical Specifications**: Complete implementation details and methodology
- **Enhanced Visualizations**: Interactive charts with F1-score metrics and model insights
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- **Modern UI/UX**: Beautiful gradient design with smooth animations and micro-interactions
- **Model Insights**: Detailed analysis of why each model performed as it did

## 🚀 Deployment on Netlify

### Quick Deploy

1. **Fork or clone this repository**
2. **Connect to Netlify**:
   - Go to [Netlify](https://netlify.com)
   - Click "New site from Git"
   - Connect your GitHub/GitLab account
   - Select this repository
3. **Deploy**: Netlify will automatically deploy your site!

### Manual Deploy

1. **Build the site** (if needed):
   ```bash
   # No build process required - static files only
   ```

2. **Deploy to Netlify**:
   ```bash
   # Install Netlify CLI
   npm install -g netlify-cli
   
   # Deploy
   netlify deploy --prod --dir .
   ```

## 📁 Project Structure

```
├── index.html          # Main HTML file
├── styles.css          # CSS styles and animations
├── script.js           # JavaScript functionality
├── netlify.toml        # Netlify configuration
├── _redirects          # Netlify redirects
├── README.md           # This file
└── FMD_PROJECT/        # Original project files
    ├── DATASET/
    └── FMD-COLING2025.ipynb
```

## 🎯 Model Performance

| Model | Accuracy | Precision | Recall | F1-Score | Best For |
|-------|----------|-----------|--------|----------|----------|
| Logistic Regression | 78.45% | 79.20% | 78.45% | 76.80% | **Best Overall Performance** |
| RNN (LSTM) | 72.30% | 73.85% | 72.30% | 71.20% | Sequence patterns |
| BERT | 68.90% | 70.25% | 68.90% | 67.45% | Context understanding |

### 🔍 Key Insights

- **Logistic Regression** achieved excellent performance (78.45% accuracy), demonstrating the effectiveness of TF-IDF features for financial misinformation detection
- **RNN** showed strong performance (72.30% accuracy) with good sequential pattern recognition capabilities
- **BERT** achieved good performance (68.90% accuracy) with potential for further improvement through enhanced fine-tuning

## 🛠️ Technologies Used

- **HTML5**: Semantic markup
- **CSS3**: Modern styling with CSS Grid and Flexbox
- **JavaScript (ES6+)**: Interactive functionality
- **Chart.js**: Performance visualization
- **Font Awesome**: Icons
- **Google Fonts**: Typography (Inter font family)

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)


## 📊 Dataset Information

- **Source**: COLING25-FMD dataset from Hugging Face
- **Size**: 1,953 financial claims
- **Classes**: True (717), False (892), NEI (344)
- **Preprocessing**: Text cleaning, tokenization, lemmatization

## 🎨 Design Features

- **Gradient Backgrounds**: Modern gradient designs
- **Smooth Animations**: CSS transitions and keyframe animations
- **Interactive Elements**: Hover effects and micro-interactions
- **Typography**: Clean, readable Inter font family
- **Color Scheme**: Professional blue and orange palette

## 📈 Performance

- **Lightweight**: Minimal dependencies
- **Fast Loading**: Optimized images and CSS
- **SEO Friendly**: Semantic HTML structure
- **Accessible**: ARIA labels and keyboard navigation

## 🔒 Security

- **Content Security Policy**: Configured in netlify.toml
- **Security Headers**: XSS protection, content type options
- **Safe External Resources**: Only trusted CDNs

## 📝 License

This project is part of a capstone project for Financial Misinformation Detection. 

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📞 Support

For questions about the FMD project or website deployment, please refer to the original project documentation in the `FMD_PROJECT` folder.

---

**Deployed on Netlify** • **Built with ❤️ for AI Research**