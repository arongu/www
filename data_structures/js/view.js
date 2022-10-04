// view
export {
    uiInit,
    uiExplanationSetText,
    uiExplanationClear,
    uiExplanationSetHidden,
    uiScoreSet,
    uiQuestionSet,

    uiResponseSetReady,
    uiResponseSetCorrect,
    uiResponseSetIncorrect,

    uiAnswerMarkCorrect,
    uiAnswerMarkIncorrect,
    uiAnswerMarkClearAll,

    uiButtonEnable,
    uiButtonDisable,

    td_cell_a,
    td_cell_b,
    td_cell_c,
    td_cell_d,

    button_next_question,
    button_prev_question,
    button_retake,
    button_explain,
    button_new_quiz
}
/* class names for coloring of ui elements by switching styles. */
const class_name_td_default   = "default";
const class_name_td_correct   = "correct";
const class_name_td_incorrect = "incorrect";

const class_name_div_response_default   = "div_response";
const class_name_div_response_correct   = "div_response_correct";
const class_name_div_response_incorrect = "div_response_incorrect";

let // main sections
    header,
    div_explain,
    div_main,
    div_response,
    div_quiz,
    div_score,

    // table
    th,
    td_cell_a,
    td_cell_b,
    td_cell_c,
    td_cell_d,

    // buttons
    button_explain,
    button_next_question,
    button_prev_question,
    button_retake,
    button_new_quiz;

const uiInit = () => {
    // sections
    header       = document.querySelector('header');
    div_main     = document.querySelector('.main');
    div_explain  = document.querySelector('.div_explain');
    div_quiz     = document.querySelector('.div_quiz');
    div_response = document.querySelector('.div_response');
    div_score    = document.querySelector('.div_score');

    // buttons
    button_explain       = document.querySelector('#button_explain');
    button_next_question = document.querySelector('#button_next_question');
    button_prev_question = document.querySelector('#button_prev_question');
    button_retake        = document.querySelector('#button_retake');
    button_new_quiz      = document.querySelector('#button_new_quiz');

    // table data_structures header
    th         = document.createElement('th');
    th.id      = 'table_header';
    th.colSpan = 2;

    // table data_structures columns
    td_cell_a = document.createElement('td');
    td_cell_b = document.createElement('td');
    td_cell_c = document.createElement('td');
    td_cell_d = document.createElement('td');
    // set class names
    td_cell_a.className = class_name_td_default;
    td_cell_b.className = class_name_td_default;
    td_cell_c.className = class_name_td_default;
    td_cell_d.className = class_name_td_default;
    // ids
    td_cell_a.id = 'td_cell_a';
    td_cell_b.id = 'td_cell_b';
    td_cell_c.id = 'td_cell_c';
    td_cell_d.id = 'td_cell_d';
    // rows
    const table_quiz_row_1 = document.createElement('tr');
    const table_quiz_row_2 = document.createElement('tr');
    // columns to rows
    table_quiz_row_1.appendChild(td_cell_a);
    table_quiz_row_1.appendChild(td_cell_b);
    table_quiz_row_2.appendChild(td_cell_c);
    table_quiz_row_2.appendChild(td_cell_d);
    // table data_structures
    const table_quiz     = document.createElement('table');
    table_quiz.className = 'table_quiz';
    table_quiz.appendChild(th);
    table_quiz.appendChild(table_quiz_row_1);
    table_quiz.appendChild(table_quiz_row_2);
    // add to main
    div_quiz.appendChild(table_quiz);
}

const uiAnswerSetClassName = (number, classname) => {
    switch (number) {
        case 0 : td_cell_a.className = classname; break;
        case 1 : td_cell_b.className = classname; break;
        case 2 : td_cell_c.className = classname; break;
        case 3 : td_cell_d.className = classname; break;
    }
}

const uiAnswerMarkCorrect   = (number) => uiAnswerSetClassName(number, class_name_td_correct);
const uiAnswerMarkIncorrect = (number) => uiAnswerSetClassName(number, class_name_td_incorrect);
const uiAnswerMarkClearAll = () => {
    td_cell_a.className = class_name_td_default;
    td_cell_b.className = class_name_td_default;
    td_cell_c.className = class_name_td_default;
    td_cell_d.className = class_name_td_default;
}

const uiButtonDisable = (button) => button.disabled = true;
const uiButtonEnable = (button) => button.disabled = null;

const uiResponseSetCorrect = () => {
    div_response.className   = "div_response_correct";
    div_response.textContent = "That is correct!";
}

const uiResponseSetIncorrect = (solution) => {
    div_response.className   = "div_response_incorrect";
    div_response.textContent = "Incorrect! The solution is: " + solution;
}

const uiResponseSetReady = () => {
    div_response.className   = "div_response";
    div_response.textContent = "Choose your answer!";
}

const uiScoreSet = (correct, all) => {
    const ratio   = + correct + ' of ' + all;
    const percent = Math.floor((correct / all) * 100);

    if ( all > 0 && correct > 0 ) div_score.textContent = 'Score: ' + percent + '% | ' + ratio + ' |';
    else div_score.textContent = 'Score: 0% | ' + ratio + ' |';
}

const uiExplanationSetHidden = (value) => {
    if ( value === true ) div_explain.style.display = "none";
    else div_explain.removeAttribute("style");
}

const uiExplanationSetText = (message) => div_explain.textContent = message;

const uiExplanationClear = () => div_explain.textContent = "";

const uiQuestionSet = (number, question) => {
    const fourAnswers = question.getFourAnswers();

    // quiz_answers 0,1,2,3 mapped to columns a,b,c,d
    th.textContent = number + '. ' + question.getQuestion();
    td_cell_a.textContent = fourAnswers[0];
    td_cell_b.textContent = fourAnswers[1];
    td_cell_c.textContent = fourAnswers[2];
    td_cell_d.textContent = fourAnswers[3];
}
