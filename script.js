// Navigation functionality
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }));

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Initialize performance chart
    initializePerformanceChart();

    // Initialize demo functionality
    initializeDemo();
});

// Performance Chart
function initializePerformanceChart() {
    const ctx = document.getElementById('performanceChart').getContext('2d');
    
    const chart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Logistic Regression', 'RNN (LSTM)', 'BERT'],
            datasets: [
                {
                    label: 'Accuracy',
                    data: [78.45, 72.30, 68.90],
                    backgroundColor: '#3b82f6',
                    borderColor: '#2563eb',
                    borderWidth: 1,
                    borderRadius: 4,
                    borderSkipped: false,
                },
                {
                    label: 'Precision',
                    data: [79.20, 73.85, 70.25],
                    backgroundColor: '#10b981',
                    borderColor: '#059669',
                    borderWidth: 1,
                    borderRadius: 4,
                    borderSkipped: false,
                },
                {
                    label: 'Recall',
                    data: [78.45, 72.30, 68.90],
                    backgroundColor: '#f59e0b',
                    borderColor: '#d97706',
                    borderWidth: 1,
                    borderRadius: 4,
                    borderSkipped: false,
                },
                {
                    label: 'F1-Score',
                    data: [76.80, 71.20, 67.45],
                    backgroundColor: '#8b5cf6',
                    borderColor: '#7c3aed',
                    borderWidth: 1,
                    borderRadius: 4,
                    borderSkipped: false,
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            aspectRatio: 2,
            plugins: {
                legend: {
                    position: 'top',
                    labels: {
                        usePointStyle: true,
                        padding: 20,
                        font: {
                            size: 14,
                            family: 'Inter'
                        }
                    }
                },
                tooltip: {
                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                    titleColor: 'white',
                    bodyColor: 'white',
                    borderColor: 'rgba(255, 255, 255, 0.1)',
                    borderWidth: 1,
                    cornerRadius: 8,
                    displayColors: true,
                    callbacks: {
                        label: function(context) {
                            return context.dataset.label + ': ' + context.parsed.y + '%';
                        }
                    }
                }
            },
            scales: {
                x: {
                    grid: {
                        display: false
                    },
                    ticks: {
                        font: {
                            size: 12,
                            family: 'Inter'
                        },
                        color: '#64748b'
                    }
                },
                y: {
                    beginAtZero: true,
                    max: 100,
                    grid: {
                        color: 'rgba(0, 0, 0, 0.05)',
                        drawBorder: false
                    },
                    ticks: {
                        font: {
                            size: 12,
                            family: 'Inter'
                        },
                        color: '#64748b',
                        callback: function(value) {
                            return value + '%';
                        }
                    }
                }
            },
            animation: {
                duration: 2000,
                easing: 'easeInOutQuart'
            }
        }
    });
}

// Demo functionality
function initializeDemo() {
    const analyzeBtn = document.getElementById('analyzeBtn');
    const claimInput = document.getElementById('claimInput');
    const resultsContainer = document.getElementById('resultsContainer');

    analyzeBtn.addEventListener('click', function() {
        const claim = claimInput.value.trim();
        
        if (!claim) {
            showError('Please enter a financial claim to analyze.');
            return;
        }

        if (claim.length < 10) {
            showError('Please enter a more detailed claim (at least 10 characters).');
            return;
        }

        analyzeClaim(claim);
    });

    // Allow Enter key to trigger analysis
    claimInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter' && e.ctrlKey) {
            analyzeBtn.click();
        }
    });
}

function analyzeClaim(claim) {
    const analyzeBtn = document.getElementById('analyzeBtn');
    const resultsContainer = document.getElementById('resultsContainer');

    // Show loading state
    analyzeBtn.innerHTML = '<span class="loading"></span> Analyzing...';
    analyzeBtn.disabled = true;

    // Simulate analysis delay
    setTimeout(() => {
        const results = performMockAnalysis(claim);
        displayResults(results);
        
        // Reset button
        analyzeBtn.innerHTML = '<i class="fas fa-search"></i> Analyze Claim';
        analyzeBtn.disabled = false;
    }, 2000);
}

function performMockAnalysis(claim) {
    // Enhanced mock analysis function with more sophisticated patterns
    const words = claim.toLowerCase();
    const claimLength = claim.split(' ').length;
    
    // Financial keywords and patterns
    const financialKeywords = ['bitcoin', 'crypto', 'cryptocurrency', 'stock', 'market', 'price', 'trading', 'investment', 'portfolio', 'dollar', 'euro', 'currency', 'bank', 'fed', 'interest', 'rate', 'inflation', 'recession', 'bull', 'bear', 'ipo', 'merger', 'acquisition'];
    const predictionWords = ['will', 'going to', 'predict', 'forecast', 'expect', 'likely', 'probably', 'might', 'could', 'should'];
    const factualWords = ['is', 'was', 'are', 'were', 'has', 'have', 'had', 'announced', 'reported', 'confirmed', 'stated'];
    const uncertaintyWords = ['maybe', 'perhaps', 'possibly', 'uncertain', 'unclear', 'unknown', 'rumor', 'alleged', 'claimed'];
    
    // Calculate base confidence and prediction based on patterns
    let baseConfidence = 45;
    let basePrediction = 'NEI';
    
    // Check for financial content
    const hasFinancialContent = financialKeywords.some(keyword => words.includes(keyword));
    
    if (hasFinancialContent) {
        baseConfidence += 20;
        
        // Analyze prediction vs factual patterns
        const hasPredictionWords = predictionWords.some(word => words.includes(word));
        const hasFactualWords = factualWords.some(word => words.includes(word));
        const hasUncertaintyWords = uncertaintyWords.some(word => words.includes(word));
        
        if (hasUncertaintyWords) {
            basePrediction = 'NEI';
            baseConfidence += 15;
        } else if (hasPredictionWords) {
            basePrediction = 'False'; // Predictions are often false/misleading
            baseConfidence += 20;
        } else if (hasFactualWords) {
            basePrediction = 'True'; // Factual statements more likely true
            baseConfidence += 25;
        }
        
        // Adjust based on claim length (longer claims often more detailed)
        if (claimLength > 15) {
            baseConfidence += 10;
        }
        
        // Check for specific financial patterns
        if (words.includes('guarantee') || words.includes('promise') || words.includes('certain')) {
            basePrediction = 'False';
            baseConfidence += 15;
        }
        
        if (words.includes('according to') || words.includes('source') || words.includes('reported by')) {
            basePrediction = 'True';
            baseConfidence += 10;
        }
    }
    
    // Generate realistic model-specific results
    const logisticRegression = {
        model: 'Logistic Regression',
        prediction: basePrediction,
        confidence: Math.min(baseConfidence + Math.random() * 8 - 4, 95),
        accuracy: '78.45%',
        reasoning: generateReasoning(basePrediction, 'tfidf')
    };

    const rnn = {
        model: 'RNN (LSTM)',
        prediction: adjustPrediction(basePrediction, 0.2), // 20% chance of different prediction
        confidence: Math.min(baseConfidence + Math.random() * 12 - 6, 95),
        accuracy: '72.30%',
        reasoning: generateReasoning(adjustPrediction(basePrediction, 0.2), 'sequential')
    };

    const bert = {
        model: 'BERT',
        prediction: adjustPrediction(basePrediction, 0.4), // 40% chance of different prediction
        confidence: Math.min(baseConfidence + Math.random() * 15 - 8, 95),
        accuracy: '68.90%',
        reasoning: generateReasoning(adjustPrediction(basePrediction, 0.4), 'contextual')
    };

    return [logisticRegression, rnn, bert];
}

function adjustPrediction(basePrediction, changeProbability) {
    if (Math.random() < changeProbability) {
        const options = ['True', 'False', 'NEI'].filter(p => p !== basePrediction);
        return options[Math.floor(Math.random() * options.length)];
    }
    return basePrediction;
}

function generateReasoning(prediction, modelType) {
    const reasoningMap = {
        'True': {
            'tfidf': 'Strong TF-IDF features indicate factual language patterns',
            'sequential': 'Sequential analysis shows consistent factual markers',
            'contextual': 'Contextual understanding suggests verifiable claim'
        },
        'False': {
            'tfidf': 'TF-IDF features match known misinformation patterns',
            'sequential': 'Sequence analysis reveals misleading language structure',
            'contextual': 'Context suggests unverifiable or false claim'
        },
        'NEI': {
            'tfidf': 'Insufficient TF-IDF features for confident classification',
            'sequential': 'Sequential patterns show ambiguous language',
            'contextual': 'Context lacks sufficient information for verification'
        }
    };
    
    return reasoningMap[prediction][modelType];
}

function displayResults(results) {
    const resultsContainer = document.getElementById('resultsContainer');
    
    let html = '<div class="results-summary">';
    
    // Sort results by confidence (highest first)
    results.sort((a, b) => b.confidence - a.confidence);
    
    results.forEach((result, index) => {
        const labelClass = result.prediction.toLowerCase();
        const confidenceColor = result.confidence > 70 ? '#10b981' : result.confidence > 50 ? '#f59e0b' : '#ef4444';
        const rankIcon = index === 0 ? '🥇' : index === 1 ? '🥈' : '🥉';
        
        html += `
            <div class="result-item ${index === 0 ? 'best-result' : ''}">
                <div class="result-header">
                    <div class="result-rank">
                        <span class="rank-icon">${rankIcon}</span>
                        <span class="result-label ${labelClass}">${result.prediction}</span>
                    </div>
                    <span class="result-confidence" style="color: ${confidenceColor}">
                        ${result.confidence.toFixed(1)}% confidence
                    </span>
                </div>
                <div class="result-model">
                    <strong>${result.model}</strong> (${result.accuracy} accuracy)
                </div>
                <div class="result-reasoning">
                    <i class="fas fa-lightbulb"></i>
                    <span>${result.reasoning}</span>
                </div>
            </div>
        `;
    });
    
    // Add summary
    const bestResult = results[0];
    html += `
        <div class="analysis-summary">
            <h4><i class="fas fa-chart-bar"></i> Analysis Summary</h4>
            <p>The <strong>${bestResult.model}</strong> model shows the highest confidence (${bestResult.confidence.toFixed(1)}%) in classifying this claim as <strong>${bestResult.prediction}</strong>.</p>
            <div class="confidence-distribution">
                ${results.map(r => `<span class="confidence-bar" style="width: ${r.confidence}%; background: ${r.confidence > 70 ? '#10b981' : r.confidence > 50 ? '#f59e0b' : '#ef4444'}"></span>`).join('')}
            </div>
        </div>
    `;
    
    html += '</div>';
    
    resultsContainer.innerHTML = html;
    
    // Add animation
    resultsContainer.style.opacity = '0';
    resultsContainer.style.transform = 'translateY(20px)';
    
    setTimeout(() => {
        resultsContainer.style.transition = 'all 0.5s ease';
        resultsContainer.style.opacity = '1';
        resultsContainer.style.transform = 'translateY(0)';
    }, 100);
}

function showError(message) {
    const resultsContainer = document.getElementById('resultsContainer');
    resultsContainer.innerHTML = `
        <div class="error-message" style="color: #ef4444; text-align: center; padding: 2rem;">
            <i class="fas fa-exclamation-triangle" style="font-size: 2rem; margin-bottom: 1rem;"></i>
            <p>${message}</p>
        </div>
    `;
}

// Sample claims for demo
const sampleClaims = [
    "Bitcoin will reach $100,000 by the end of this year.",
    "Tesla stock price increased by 15% last week.",
    "The Federal Reserve announced a 0.25% interest rate hike.",
    "Apple's market cap exceeded $3 trillion in 2023.",
    "Cryptocurrency regulations will be implemented next month."
];

// Add sample claims functionality
function addSampleClaims() {
    const claimInput = document.getElementById('claimInput');
    
    // Add placeholder with sample claim
    claimInput.placeholder = sampleClaims[0];
    
    // Add click to cycle through samples
    let currentSample = 0;
    claimInput.addEventListener('click', function() {
        if (this.value === '') {
            this.value = sampleClaims[currentSample];
            currentSample = (currentSample + 1) % sampleClaims.length;
        }
    });
}

// Initialize sample claims
document.addEventListener('DOMContentLoaded', function() {
    addSampleClaims();
});

// Scroll animations
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements for animation
    document.querySelectorAll('.model-card, .chart-container, .demo-container, .about-content').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease';
        observer.observe(el);
    });
}

// Initialize scroll animations
document.addEventListener('DOMContentLoaded', function() {
    initializeScrollAnimations();
});

// Utility functions for footer links
function showNotebook() {
    alert('Jupyter Notebook: FMD-COLING2025.ipynb\n\nThis notebook contains the complete implementation of the Financial Misinformation Detection project, including data preprocessing, model training, and evaluation.');
}

function showCode() {
    alert('Source Code:\n\n- Python implementation with scikit-learn, TensorFlow, and HuggingFace Transformers\n- Complete preprocessing pipeline\n- Model training and evaluation scripts\n- Performance comparison and visualization');
}

// Navbar scroll effect
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// Add keyboard shortcuts
document.addEventListener('keydown', function(e) {
    // Ctrl/Cmd + Enter to analyze claim
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        const claimInput = document.getElementById('claimInput');
        if (document.activeElement === claimInput) {
            document.getElementById('analyzeBtn').click();
        }
    }
    
    // Escape to clear results
    if (e.key === 'Escape') {
        const resultsContainer = document.getElementById('resultsContainer');
        resultsContainer.innerHTML = `
            <div class="results-placeholder">
                <i class="fas fa-arrow-left"></i>
                <p>Enter a claim and click "Analyze Claim" to see results</p>
            </div>
        `;
    }
});

// Add tooltip functionality
function addTooltips() {
    const tooltipElements = document.querySelectorAll('[data-tooltip]');
    
    tooltipElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            const tooltip = document.createElement('div');
            tooltip.className = 'tooltip';
            tooltip.textContent = this.getAttribute('data-tooltip');
            tooltip.style.cssText = `
                position: absolute;
                background: rgba(0, 0, 0, 0.8);
                color: white;
                padding: 0.5rem;
                border-radius: 0.25rem;
                font-size: 0.875rem;
                z-index: 1000;
                pointer-events: none;
                opacity: 0;
                transition: opacity 0.3s ease;
            `;
            
            document.body.appendChild(tooltip);
            
            const rect = this.getBoundingClientRect();
            tooltip.style.left = rect.left + rect.width / 2 - tooltip.offsetWidth / 2 + 'px';
            tooltip.style.top = rect.top - tooltip.offsetHeight - 5 + 'px';
            
            setTimeout(() => tooltip.style.opacity = '1', 10);
            
            this.addEventListener('mouseleave', function() {
                tooltip.style.opacity = '0';
                setTimeout(() => document.body.removeChild(tooltip), 300);
            });
        });
    });
}

// Initialize tooltips
document.addEventListener('DOMContentLoaded', function() {
    addTooltips();
});
