export {
    buttonReset, buttonBackSpace, buttonModulo, buttonDivision,
    button7, button8, button9, buttonMultiply,
    button4, button5, button6, buttonSubtract,
    button1, button2, button3, buttonAdd,
    button0, buttonDot, buttonSign, buttonEquals,
    // functions
    uiBackspaceButtonSetTextHidden,
    uiDisplaySet,
    uiInit,
    uiIndicateKeyPress,
    uiIndicateKeyPressClear,
    uiSignButtonSetTextHidden,
    uiToggleArithmeticButton,
    uiToggleArithmeticReset
}

let display,
buttonReset, buttonBackSpace, buttonModulo, buttonDivision,
button7, button8, button9, buttonMultiply,
button4, button5, button6, buttonSubtract,
button1, button2, button3, buttonAdd,
button0, buttonDot, buttonSign, buttonEquals;

//
let button_toggled,
button_toggle_original_class_name;

const uiInit = () => {
    display         = document.getElementById("display")
    buttonReset     = document.getElementById("clear");
    buttonBackSpace = document.getElementById("backspace");
    buttonModulo    = document.getElementById("modulo");
    buttonDivision  = document.getElementById("divide");
    buttonMultiply  = document.getElementById("multiply");
    buttonSubtract  = document.getElementById("subtract");
    buttonAdd       = document.getElementById("add");
    buttonEquals    = document.getElementById("equals");
    // numbers
    button7 = document.getElementById("seven");
    button8 = document.getElementById("eight");
    button9 = document.getElementById("nine");
    button4 = document.getElementById("four");
    button5 = document.getElementById("five");
    button6 = document.getElementById("six");
    button1 = document.getElementById("one");
    button2 = document.getElementById("two");
    button3 = document.getElementById("three");
    button0 = document.getElementById("zero");
    // decimal, sign
    buttonDot  = document.getElementById("decimal");
    buttonSign = document.getElementById("ui_message");
    button_toggled = null;
}

const uiToggleArithmeticButton = (button) => {
    if ( button_toggled !== null ) {
        button_toggled.className = button_toggle_original_class_name;
    }

    button_toggled = button;
    button_toggle_original_class_name = button.className;
    button.className = "button_op_toggled";
}

const uiToggleArithmeticReset = () => {
    if ( button_toggled !== null ) button_toggled.className = button_toggle_original_class_name;
}

const uiBackspaceButtonSetTextHidden = (isHidden) => {
    if ( isHidden === true ) buttonBackSpace.textContent = "";
    else buttonBackSpace.textContent = "⇤";
}

const uiSignButtonSetTextHidden = (isHidden) => {
    if ( isHidden === true ) buttonSign.textContent = "";
    else buttonSign.textContent = "+/-";
}

const uiDisplaySet = (value) => display.textContent = value;

const uiIndicateKeyPressClear = (button) => {
    button.className = "button";
}

const uiIndicateKeyPress = (button) => {
    button.className = "button_pressed";
}
