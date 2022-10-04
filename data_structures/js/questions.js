// model
export {
    dataInitQuestions,
    dataGetQuestion,
    dataMakeArray
}

let questions = null;

class QuestionAndAnswers {
    constructor(question, decoy_answers = [], solution, solution_description) {
        this.question             = question;
        this.decoy_answers        = decoy_answers;
        this.solution             = solution;

        this.solution_pos         = null;
        this.four_answers         = null;
        this.solution_description = solution_description;
    }

    shuffleAnswers() {
        // do nothing if parameters are not set
        if ( this.decoy_answers.length < 3 || this.question === null || this.solution === null ) {
            console.log("Cannot create data_structures! Not enough data!");
            return;
        }

        // pick random decoy answers for the data_structures
        const pickedDecoyAnswers = new Set();
        while (pickedDecoyAnswers.size !== 3) {
            pickedDecoyAnswers.add(Math.floor(Math.random() * 1000) % this.decoy_answers.length);
        }

        const random = new Set();
        while (random.size !== 4) {
            random.add(Math.floor(Math.random() * 1000) % 4);
        }

        let it = pickedDecoyAnswers.values();
        this.solution_pos = null;
        this.four_answers = new Array(4);
        // save the picked answers into the data_structures array and also put the solution in the array at random index
        random.forEach(value => {
            if ( this.solution_pos === null ) {
                // the first random index will be used for the solution
                this.four_answers[value] = this.solution;
                this.solution_pos = value;

            } else {
                // the rest indices will be used for the random answers
                this.four_answers[value] = this.decoy_answers[it.next().value];
            }
        });
    }

    isCorrect (answer) {
        return answer === this.solution_pos;
    }

    getFourAnswers() {
        return this.four_answers;
    }

    getSolution() {
        return this.solution;
    }

    getSolutionDescription() {
        return this.solution_description;
    }

    getSolutionPos() {
        return this.solution_pos;
    }

    getQuestion() {
        return this.question;
    }
}

const dataInitQuestions = () => {
    questions = [];
    questions.push(new QuestionAndAnswers("What is the time complexity of accessing data in arrays?", ["O(n)", "O(log n)", "O(n log(n))", "O(n^2)", "O(n log(n))^n)"], "O(1)", "Arrays are continuous datastructures therefore address of any index can be calculated: addr. = starting address + (index * data size). Calculating the position is independent of the size of the array. The time complexity therefore is constant. That is why the correct answer is O(1)."));
    questions.push(new QuestionAndAnswers("What is the time complexity of accessing data in a linked list?", ["O(1)", "O(log n)", "O(n log(n))", "O(n^2)", "O(n log(n))^n)"], "O(n)", "Linked lists are sequential data structures. Think of it as chains or wagons of a train; linked to each other. Sequential datastructures cannot be accessed randomly, because to get to the n th element, all the element before it has to be visited. Time complexity therefore is linear, because the further you have to travel the more nodes you have to visit. That is why the correct answer is O(n)."));
    questions.push(new QuestionAndAnswers("What kind of data access is used with a linked list?", ["random", "tree", "other"], "sequential", "Linked lists are sequential data structures. Think of it as chains or train wagons linked to each other. Sequential datastructures cannot be accessed randomly."));
    questions.push(new QuestionAndAnswers("What kind of data access is used with an array?", ["sequential", "tree", "other"], "random", "Arrays are continuous datastructures therefore address of any index can be calculated: addr. = starting address + (index * data size). This makes it possible to randomly jump any location in an array, without traversing through its elements. That is why its called 'random' access."));
}

// 'infinite' - randomly get a question from the pool
const dataGetQuestion = () => {
    if ( questions === null ) dataInitQuestions();

    const i  = Math.floor(Math.random() * 10000) % questions.length;
    const question = questions[i];
    question.shuffleAnswers();

    return question;
}

// returns an array with the desired amount of questions
const dataMakeArray = (size) => {
    if ( ! Number.isInteger(size) ) {
        console.log("Size must be given!");
        return;
    }

    if ( questions === null ) dataInitQuestions();

    if ( size <= 0 || questions.length === 0 ) {
        console.log("Error, cannot continue!");
        return;
    }

    if ( size > questions.length ) {
        console.log("Only " + questions.length + " question available !");
        size = questions.length;
    }

    // get size amount of random questions from the pool and return it
    const random = new Set();
    const arr = [];

    while ( random.size !== size ) {
        let i = Math.floor(Math.random() * 10000) % questions.length;
        random.add(i);
    }

    random.forEach(value => { arr.push(questions[value]); });
    return arr;
}
