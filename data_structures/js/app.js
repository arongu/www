// controller
import { dataMakeArray } from "./questions.js"

import {
    uiInit,
    uiAnswerMarkCorrect,
    uiAnswerMarkIncorrect,
    uiAnswerMarkClearAll,
    uiButtonDisable,
    uiButtonEnable,
    uiResponseSetCorrect,
    uiResponseSetReady,
    uiResponseSetIncorrect,
    uiScoreSet,
    uiExplanationClear,
    uiExplanationSetText,
    uiExplanationSetHidden,
    uiQuestionSet,

    // exposed ui components for event wiring
    td_cell_a,
    td_cell_b,
    td_cell_c,
    td_cell_d,
    button_next_question,
    button_prev_question,
    button_retake,
    button_explain,
    button_new_quiz

} from './view.js'

let questions,
    questionId,
    answers,
    correctAnswers;


// model, data
const init = () => {
    answers        = new Map();
    correctAnswers = 0;
    questions      = dataMakeArray(20);
    questionId     = 0;

    for ( let q of questions ) q.shuffleAnswers();
}

const retakeQuiz = () => {
    answers.clear();
    correctAnswers = 0;
    questionId = 0;
    loadQuestion();
}

const newQuiz = () => {
    init();
    loadQuestion();
}

// control
const autoEnableDisableButtonNext = () => {
    if ( questionId === questions.length - 1 ) uiButtonDisable(button_next_question);
    else if ( ! answers.has(questionId) ) uiButtonDisable(button_next_question);
    else uiButtonEnable(button_next_question);
}

const autoEnableDisableButtonPrev = () => {
    if ( questionId === 0 ) uiButtonDisable(button_prev_question);
    else uiButtonEnable(button_prev_question);
}

const autoEnableDisableButtonSolution = (question) => {
    const desc = question.getSolutionDescription();
    if ( desc === undefined || desc === null || desc === '' ) uiButtonDisable(button_explain);
    else uiButtonEnable(button_explain);
}

const updateUi = (question, answer, status) => {
    uiExplanationClear();
    uiQuestionSet(questionId + 1, question);
    uiScoreSet(correctAnswers, questions.length);
    autoEnableDisableButtonNext();
    autoEnableDisableButtonPrev();
    uiExplanationSetHidden(true);

    switch (status) {
        case "failed" : {
            uiAnswerMarkClearAll();
            uiAnswerMarkIncorrect(answer);
            uiAnswerMarkCorrect(question.getSolutionPos());
            uiResponseSetIncorrect(question.getSolution());
            autoEnableDisableButtonSolution(question);

        } break;

        case "passed" : {
            uiAnswerMarkClearAll();
            uiAnswerMarkCorrect(answer);
            uiResponseSetCorrect();
            autoEnableDisableButtonSolution(question);

        } break;

        case "ready" : {
            uiAnswerMarkClearAll();
            uiButtonDisable(button_explain);
            uiResponseSetReady();
        } break;
    }
}

const showExplanation = () => {
    uiExplanationSetText(questions[questionId].getSolutionDescription());
    uiExplanationSetHidden(false);
}

const loadQuestion = () => {
    const question = questions[questionId];

    if ( answers.has(questionId) ) {
        const answer    = answers.get(questionId);
        const isCorrect = question.isCorrect(answer);

        if ( isCorrect ) updateUi(question, answer, 'passed');
        else updateUi(question, answer, 'failed');

    } else {
        updateUi(question, null, 'ready');
    }
}

const nextQuestion = () => {
    if ( ! answers.has(questionId) || questionId === questions.length - 1 ) return;

    questionId++;
    loadQuestion(questionId);
}

const prevQuestion = () => {
    if ( questionId <= 0 ) return;

    questionId--;
    loadQuestion(questionId);
}

const answerQuestion = (answer) => {
    if ( answers.has(questionId) ) return; // return, if question has been solved

    answers.set(questionId, answer);
    const question = questions[questionId];
    let status;

    if ( question.isCorrect(answer) ) {
        status = 'passed';
        correctAnswers++;
    } else {
        status = 'failed';
    }

    updateUi(question, answer, status);
}

// ui + key wiring
const keyActions = (keyDownEvent) => {
    switch (keyDownEvent.key) {
        case "1" : answerQuestion(0); break;
        case "2" : answerQuestion(1); break;
        case "3" : answerQuestion(2); break;
        case "4" : answerQuestion(3); break;

        // left, right
        case "ArrowLeft" : prevQuestion(); break;
        case "ArrowRight" : nextQuestion(); break;

        // r, s
        case "n" : case "N" : newQuiz(); break;
        case "r" : case "R" : retakeQuiz(); break;
        case "s" : case "S" : if ( answers.has(questionId) ) showExplanation();
    }
}

const addListeners = () => {
    document.addEventListener('keydown', keyDownEvent => keyActions(keyDownEvent) );

    td_cell_a.addEventListener('click', () => answerQuestion(0) );
    td_cell_b.addEventListener('click', () => answerQuestion(1) );
    td_cell_c.addEventListener('click', () => answerQuestion(2) );
    td_cell_d.addEventListener('click', () => answerQuestion(3) );

    button_next_question.addEventListener('click', () => nextQuestion() );
    button_prev_question.addEventListener('click', () => prevQuestion() );
    button_retake.addEventListener('click', () => retakeQuiz() );
    button_explain.addEventListener('click', () => showExplanation() );
    button_new_quiz.addEventListener('click', () => newQuiz() );
}

uiInit();
addListeners();
init();
loadQuestion();
