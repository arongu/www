import {
    uiBackspaceButtonSetTextHidden,
    uiDisplaySet,
    uiInit,
    uiIndicateKeyPress,
    uiSignButtonSetTextHidden,
    uiToggleArithmeticButton,
    uiToggleArithmeticReset,
    // elements for listening
    buttonReset, buttonBackSpace, buttonModulo, buttonDivision,
    button7, button8, button9, buttonMultiply,
    button4, button5, button6, buttonSubtract,
    button1, button2, button3, buttonAdd,
    button0, buttonDot, buttonSign, buttonEquals, uiIndicateKeyPressClear

} from "./view.js";

// key constants
const NUMPAD_KEYS   = [ ".", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9" ];
const OPERATOR_KEYS = ["%", "/", "*", "-", "+", "=", "Enter" ];
const CONTROL_KEYS  = ["Escape", "Backspace", "s", "S"];

const isKeyNumpad   = (key) => NUMPAD_KEYS.includes(key);
const isKeyOperator = (key) => OPERATOR_KEYS.includes(key);
const isKeyControl  = (key) => CONTROL_KEYS.includes(key);

// "selectors"
const SIGNAL_NUMBER     = 'n';
const SIGNAL_ARITHMETIC = 'a';
const SIGNAL_EDIT       = 'e';

let keysToButtons;
// calculation related variables
let edit_enabled,
    inputString,
    number_left,
    number_right,
    operator,
    operator_delim,
    LAST_PROCESSED_TYPE;

const reset = () => {
    edit_enabled   = false;
    inputString    = "0";
    number_left    = null;
    number_right   = null;
    operator       = null;
    operator_delim = null;
    LAST_PROCESSED_TYPE = null;
    console.log('reset');
}

const enableNumberEditing = () => {
    edit_enabled = true;
    uiBackspaceButtonSetTextHidden(false);
    uiSignButtonSetTextHidden(false);
}

const disableNumberEditing = () => {
    edit_enabled = false;
    uiBackspaceButtonSetTextHidden(true);
    uiSignButtonSetTextHidden(true);
}

const resetCalculator = () => {
    reset();
    uiDisplaySet(inputString);
    uiToggleArithmeticReset();
    enableNumberEditing();
}

const compute = (op, left, right) => {
    const a = Number(left);
    const b = Number(right);

    switch ( op ) {
        case "+" : return a + b;
        case "-" : return a - b;
        case "*" : return a * b;
        case "/" : return a / b;
        case "%" : return a % b;
        default : return NaN;
    }
}

const appendToInputString = (charcter) => {
    if ( Number.isSafeInteger(inputString) ) return;
    if ( charcter === "." && inputString.includes(charcter)) return;

    if ( inputString === "0" ) {
        if ( charcter === "." ) {
            inputString += charcter;

        } else if ( charcter !== "0" ) {
            inputString = charcter;
        }

    } else {
        inputString += charcter;
    }
}

const controller = (type, key) => {
    switch (type) {
        case SIGNAL_NUMBER : {
            // clean/reset the input string if there was an operator to abel to receive new numbers as they get typed (operators are delimiters)
            if ( LAST_PROCESSED_TYPE === SIGNAL_ARITHMETIC ) {
                // when new number gets typed and the last valid operator was =, it means it got solved
                // starting a new session
                if ( operator === "=" || operator === "Enter") {
                    resetCalculator();

                } else {
                    // can edit
                    enableNumberEditing();
                    inputString = "0"; // reset input string
                    uiToggleArithmeticReset(); // clear toggle
                    uiDisplaySet(inputString); // display 0
                }
            }

            appendToInputString(key);
            uiDisplaySet(inputString);
            LAST_PROCESSED_TYPE = type;

        } break;

        case SIGNAL_ARITHMETIC : {
            // right after an arithmetic operation the number and operator
            // have been already stored, no need to do that again
            disableNumberEditing();
            if ( LAST_PROCESSED_TYPE === SIGNAL_ARITHMETIC ) {
                operator = key;
                console.log(number_left, operator, "?");
                break;
            }

            if ( number_left === null ) { // this state when calculator is clear, occurs once each session
                number_left = Number(inputString);
                operator    = key;
                LAST_PROCESSED_TYPE = type;
                console.log(number_left, operator, "?");
                break;
            }

            if ( number_right === null) {
                number_right   = Number(inputString);
                operator_delim = key;
                LAST_PROCESSED_TYPE = type;
                console.log(number_left, operator, number_right, operator_delim);
            }

            // if both sides and operator are set, solve the equation,
            // make the result to the new left side, and remove the right side
            // then shift the last 'delimiter' operator to be the new operator
            if ( number_left !== null && number_right !== null ) {
                number_left  = compute(operator, number_left, number_right);
                number_right = null;
                operator = operator_delim;
                LAST_PROCESSED_TYPE = type;
                inputString = String(number_left);
                uiDisplaySet(inputString);
                console.log(number_left, operator, "?");
            }

        } break;

        case SIGNAL_EDIT : {
            if ( key === "Escape" ) resetCalculator();
            if ( key === "Backspace" && LAST_PROCESSED_TYPE === SIGNAL_NUMBER || LAST_PROCESSED_TYPE === SIGNAL_EDIT ) {
                inputString = inputString.length > 1 ? inputString = inputString.slice(0, -1) : "0";
                LAST_PROCESSED_TYPE = type;
                uiDisplaySet(inputString);
            }

            if ( key === "s" || key === "S" ) {
                if ( edit_enabled ) {
                    if ( inputString === "0" ) return;
                    else if ( inputString.startsWith("-") ) inputString = inputString.substring(1);
                    else inputString = "-" + inputString;

                    uiDisplaySet(inputString);
                }
            }

        } break;
    }
}

// ui control
const toggleOperatorButtonPress = (key) => {
    switch ( key ) {
        case "%" : uiToggleArithmeticButton(buttonModulo); break;
        case "/" : uiToggleArithmeticButton(buttonDivision); break;
        case "*" : uiToggleArithmeticButton(buttonMultiply); break;
        case "-" : uiToggleArithmeticButton(buttonSubtract); break;
        case "+" : uiToggleArithmeticButton(buttonAdd); break;
        case "=" : case "Enter" : uiToggleArithmeticButton(buttonEquals); break;
    }
}

const indicateKeypress = (key) => uiIndicateKeyPress(keysToButtons.get(key));

const clearKeyPressIndication = (key) => { if ( keysToButtons.has(key) ) uiIndicateKeyPressClear(keysToButtons.get(key)) };

const keyBoardInputHandler = (keyDownEvent) => {
    const key = keyDownEvent.key;
    if ( key === "/") keyDownEvent.preventDefault();

    if ( isKeyNumpad(key) ) {
        indicateKeypress(key);
        controller(SIGNAL_NUMBER, key);

    } else if ( isKeyOperator(key) ) {
        toggleOperatorButtonPress(key);
        if ( key === "Enter") controller(SIGNAL_ARITHMETIC, "="); // for the logs
        else controller(SIGNAL_ARITHMETIC, key);

    } else if ( isKeyControl(key) ) {
        indicateKeypress(key);
        controller(SIGNAL_EDIT, key);
    }
}

const setup = () => {
    // row 1
    buttonReset.addEventListener("click", () => controller(SIGNAL_EDIT, "Escape"));
    buttonBackSpace.addEventListener("click", () => controller(SIGNAL_EDIT, "Backspace"));
    buttonModulo.addEventListener("click", () => {
        uiToggleArithmeticButton(buttonModulo);
        controller(SIGNAL_ARITHMETIC, "%");
    });

    buttonDivision.addEventListener("click", () => {
        uiToggleArithmeticButton(buttonDivision);
        controller(SIGNAL_ARITHMETIC,"/");
    });
    // row 2
    button7.addEventListener("click", () => controller(SIGNAL_NUMBER,"7"));
    button8.addEventListener("click", () => controller(SIGNAL_NUMBER,"8"));
    button9.addEventListener("click", () => controller(SIGNAL_NUMBER,"9"));

    buttonMultiply.addEventListener("click", () => {
        uiToggleArithmeticButton(buttonMultiply);
        controller(SIGNAL_ARITHMETIC,"*");
    });

    // row 3
    button4.addEventListener("click", () => controller(SIGNAL_NUMBER,"4"));
    button5.addEventListener("click", () => controller(SIGNAL_NUMBER,"5"));
    button6.addEventListener("click", () => controller(SIGNAL_NUMBER,"6"));
    buttonSubtract.addEventListener("click", () => {
        uiToggleArithmeticButton(buttonSubtract);
        controller(SIGNAL_ARITHMETIC,"-");
    });

    // row 4
    button1.addEventListener("click", () => controller(SIGNAL_NUMBER,"1"));
    button2.addEventListener("click", () => controller(SIGNAL_NUMBER,"2"));
    button3.addEventListener("click", () => controller(SIGNAL_NUMBER,"3"));
    buttonAdd.addEventListener("click", () => {
        uiToggleArithmeticButton(buttonAdd);
        controller(SIGNAL_ARITHMETIC,"+")
    });

    // row 5
    button0.addEventListener("click", () => controller(SIGNAL_NUMBER,"0"));
    buttonDot.addEventListener("click", () => controller(SIGNAL_NUMBER,"."));
    buttonEquals.addEventListener("click", () => {
        uiToggleArithmeticButton(buttonEquals);
        controller(SIGNAL_ARITHMETIC,"=")
    });
    buttonSign.addEventListener("click", () => controller(SIGNAL_EDIT, "s"));

    // keystrokes
    document.addEventListener("keydown", keyDownEvent => keyBoardInputHandler(keyDownEvent) );
    document.addEventListener("keyup", keyUpEvent => clearKeyPressIndication(keyUpEvent.key))

    // map for key press indication
    keysToButtons = new Map();
    keysToButtons.set("0", button0);
    keysToButtons.set("1", button1);
    keysToButtons.set("2", button2);
    keysToButtons.set("3", button3);
    keysToButtons.set("4", button4);
    keysToButtons.set("5", button5);
    keysToButtons.set("6", button6);
    keysToButtons.set("7", button7);
    keysToButtons.set("8", button8);
    keysToButtons.set("9", button9);
    keysToButtons.set(".", buttonDot);
    keysToButtons.set("s", buttonSign);
    keysToButtons.set("S", buttonSign);
    keysToButtons.set("Backspace", buttonBackSpace);
    keysToButtons.set("Escape", buttonReset)
}

uiInit();
setup();
reset();
console.log("Shortcuts: ESC - reset, Backspace - backspace, S/s - change sign of the number.")