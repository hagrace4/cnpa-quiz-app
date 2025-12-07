// Main application logic
class App {
    constructor() {
        this.screens = {
            home: document.getElementById('home-screen'),
            quiz: document.getElementById('quiz-screen'),
            results: document.getElementById('results-screen')
        };
        
        this.elements = {
            startBtn: document.getElementById('start-quiz-btn'),
            continueBtn: document.getElementById('continue-quiz-btn'),
            submitBtn: document.getElementById('submit-answer-btn'),
            nextBtn: document.getElementById('next-question-btn'),
            quitBtn: document.getElementById('quit-quiz-btn'),
            restartBtn: document.getElementById('restart-quiz-btn'),
            homeBtn: document.getElementById('home-btn'),
            
            questionNumber: document.getElementById('question-number'),
            questionDifficulty: document.getElementById('question-difficulty'),
            questionText: document.getElementById('question-text'),
            optionsContainer: document.getElementById('options-container'),
            explanation: document.getElementById('explanation'),
            explanationText: document.getElementById('explanation-text'),
            progressFill: document.getElementById('progress-fill'),
            
            totalQuestions: document.getElementById('total-questions'),
            completedCount: document.getElementById('completed-count'),
            finalScore: document.getElementById('final-score'),
            finalPercentage: document.getElementById('final-percentage')
        };
        
        this.selectedOption = null;
        this.init();
    }

    async init() {
        try {
            console.log('Initializing app...');
            await quizDB.init();
            console.log('Database initialized');
            
            await quiz.loadQuestions();
            console.log('Questions loaded:', quiz.allQuestions.length);
            
            // Display total available questions in the bank
            this.elements.totalQuestions.textContent = quiz.getTotalQuestionsAvailable();
            
            // Check for saved progress
            const hasProgress = await quiz.loadState();
            if (hasProgress) {
                this.elements.continueBtn.style.display = 'inline-block';
                this.elements.completedCount.textContent = quiz.currentQuestionIndex;
            }
            
            this.attachEventListeners();
            console.log('App initialized successfully');
        } catch (error) {
            console.error('Initialization error:', error);
            alert('Failed to load quiz data. Please refresh the page.');
        }
    }

    attachEventListeners() {
        this.elements.startBtn.addEventListener('click', () => this.startNewQuiz());
        this.elements.continueBtn.addEventListener('click', () => this.continueQuiz());
        this.elements.submitBtn.addEventListener('click', () => this.submitAnswer());
        this.elements.nextBtn.addEventListener('click', () => this.nextQuestion());
        this.elements.quitBtn.addEventListener('click', () => this.quitQuiz());
        this.elements.restartBtn.addEventListener('click', () => this.startNewQuiz());
        this.elements.homeBtn.addEventListener('click', () => this.showScreen('home'));
    }

    showScreen(screenName) {
        Object.values(this.screens).forEach(screen => screen.classList.remove('active'));
        this.screens[screenName].classList.add('active');
    }

    async startNewQuiz() {
        try {
            console.log('Starting new quiz...');
            console.log('All questions available:', quiz.allQuestions.length);
            
            quiz.reset();
            console.log('Quiz reset complete');
            
            quiz.selectRandomQuestions();  // Select random 50 questions from the bank
            console.log('Selected questions:', quiz.questions.length);
            
            if (quiz.questions.length === 0) {
                console.error('No questions selected!');
                alert('No questions available. Please check the question database.');
                return;
            }
            
            await quizDB.clearProgress();
            this.elements.continueBtn.style.display = 'none';
            this.showScreen('quiz');
            console.log('Displaying first question...');
            this.displayQuestion();
        } catch (error) {
            console.error('Error starting quiz:', error);
            alert('Failed to start quiz. Error: ' + error.message);
        }
    }

    continueQuiz() {
        this.showScreen('quiz');
        this.displayQuestion();
    }

    displayQuestion() {
        const question = quiz.getCurrentQuestion();
        
        if (!question) {
            console.error('No question available at index:', quiz.currentQuestionIndex);
            alert('Error loading question. Please restart the quiz.');
            this.showScreen('home');
            return;
        }
        
        const progress = quiz.getProgress();
        
        // Update progress
        this.elements.progressFill.style.width = `${progress.percentage}%`;
        this.elements.questionNumber.textContent = `Question ${progress.current} of ${progress.total}`;
        
        // Update difficulty badge
        this.elements.questionDifficulty.textContent = question.difficulty.charAt(0).toUpperCase() + question.difficulty.slice(1);
        this.elements.questionDifficulty.className = `badge ${question.difficulty}`;
        
        // Update question text
        this.elements.questionText.textContent = question.question_text;
        
        // Display options
        this.elements.optionsContainer.innerHTML = '';
        question.options.forEach(option => {
            const optionEl = document.createElement('div');
            optionEl.className = 'option';
            optionEl.textContent = `${option.id}. ${option.text}`;
            optionEl.dataset.optionId = option.id;
            
            optionEl.addEventListener('click', () => this.selectOption(optionEl, option.id));
            
            this.elements.optionsContainer.appendChild(optionEl);
        });
        
        // Reset state
        this.selectedOption = null;
        this.elements.submitBtn.disabled = true;
        this.elements.submitBtn.style.display = 'inline-block';
        this.elements.nextBtn.style.display = 'none';
        this.elements.explanation.style.display = 'none';
    }

    selectOption(optionEl, optionId) {
        // Remove previous selection
        document.querySelectorAll('.option').forEach(el => el.classList.remove('selected'));
        
        // Add selection
        optionEl.classList.add('selected');
        this.selectedOption = optionId;
        this.elements.submitBtn.disabled = false;
    }

    async submitAnswer() {
        if (!this.selectedOption) return;
        
        const isCorrect = quiz.submitAnswer(this.selectedOption);
        const question = quiz.getCurrentQuestion();
        
        // Disable all options
        document.querySelectorAll('.option').forEach(el => {
            el.classList.add('disabled');
            el.style.pointerEvents = 'none';
            
            const optionId = el.dataset.optionId;
            if (question.correct_option_ids.includes(optionId)) {
                el.classList.add('correct');
            } else if (optionId === this.selectedOption && !isCorrect) {
                el.classList.add('incorrect');
            }
        });
        
        // Show explanation
        this.elements.explanationText.textContent = question.explanation;
        this.elements.explanation.style.display = 'block';
        
        // Update buttons
        this.elements.submitBtn.style.display = 'none';
        this.elements.nextBtn.style.display = 'inline-block';
        this.elements.nextBtn.textContent = quiz.isLastQuestion() ? 'View Results' : 'Next Question';
        
        // Save progress
        await quiz.saveState();
    }

    async nextQuestion() {
        const hasMore = quiz.nextQuestion();
        
        if (hasMore) {
            this.displayQuestion();
        } else {
            await this.showResults();
        }
    }

    async quitQuiz() {
        if (confirm('Are you sure you want to quit? Your progress will be saved.')) {
            await quiz.saveState();
            this.showScreen('home');
        }
    }

    async showResults() {
        const results = quiz.getResults();
        
        this.elements.finalScore.textContent = `${results.score}/${results.total}`;
        this.elements.finalPercentage.textContent = `${results.percentage}%`;
        
        await quizDB.clearProgress();
        this.showScreen('results');
    }
}

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new App();
});
