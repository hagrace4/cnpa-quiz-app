// Quiz logic and state management
class Quiz {
    constructor() {
        this.questions = [];
        this.currentQuestionIndex = 0;
        this.answers = [];
        this.score = 0;
    }

    async loadQuestions() {
        try {
            const response = await fetch('/data/questions.json');
            const data = await response.json();
            this.questions = data.questions;
            return this.questions;
        } catch (error) {
            console.error('Error loading questions:', error);
            throw error;
        }
    }

    shuffleQuestions() {
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
