// Quiz logic and state management
class Quiz {
    constructor() {
        this.allQuestions = [];  // Full question bank
        this.questions = [];      // Selected questions for current quiz
        this.currentQuestionIndex = 0;
        this.answers = [];
        this.score = 0;
        this.quizSize = 50;      // Number of questions per quiz
    }

    async loadQuestions() {
        try {
            const response = await fetch('/data/questions.json');
            const data = await response.json();
            this.allQuestions = data.questions;
            return this.allQuestions;
        } catch (error) {
            console.error('Error loading questions:', error);
            throw error;
        }
    }

    selectRandomQuestions() {
        // Shuffle all questions
        const shuffled = [...this.allQuestions];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        
        // Select first N questions (or all if less than quizSize)
        const count = Math.min(this.quizSize, shuffled.length);
        this.questions = shuffled.slice(0, count);
        console.log(`Selected ${this.questions.length} questions from ${this.allQuestions.length} available`);
    }

    getTotalQuestionsAvailable() {
        return this.allQuestions.length;
    }

    shuffleQuestions() {
        // This method is kept for compatibility but now just shuffles selected questions
        for (let i = this.questions.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.questions[i], this.questions[j]] = [this.questions[j], this.questions[i]];
        }
    }

    getCurrentQuestion() {
        return this.questions[this.currentQuestionIndex];
    }

    submitAnswer(selectedOptionId) {
        const question = this.getCurrentQuestion();
        const isCorrect = question.correct_option_ids.includes(selectedOptionId);
        
        this.answers.push({
            questionId: question.id,
            selectedOption: selectedOptionId,
            correctOptions: question.correct_option_ids,
            isCorrect: isCorrect
        });

        if (isCorrect) {
            this.score++;
        }

        return isCorrect;
    }

    nextQuestion() {
        this.currentQuestionIndex++;
        return this.currentQuestionIndex < this.questions.length;
    }

    isLastQuestion() {
        return this.currentQuestionIndex === this.questions.length - 1;
    }

    getProgress() {
        return {
            current: this.currentQuestionIndex + 1,
            total: this.questions.length,
            percentage: ((this.currentQuestionIndex + 1) / this.questions.length) * 100
        };
    }

    getResults() {
        return {
            score: this.score,
            total: this.questions.length,
            percentage: Math.round((this.score / this.questions.length) * 100),
            answers: this.answers
        };
    }

    async saveState() {
        const state = {
            questions: this.questions,
            currentQuestionIndex: this.currentQuestionIndex,
            answers: this.answers,
            score: this.score
        };
        await quizDB.saveProgress(state);
    }

    async loadState() {
        const state = await quizDB.getProgress();
        if (state) {
            this.questions = state.questions;
            this.currentQuestionIndex = state.currentQuestionIndex;
            this.answers = state.answers;
            this.score = state.score;
            return true;
        }
        return false;
    }

    reset() {
        this.currentQuestionIndex = 0;
        this.answers = [];
        this.score = 0;
    }
}

// Create global quiz instance
const quiz = new Quiz();
