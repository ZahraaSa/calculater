
let display = document.getElementById("display");
const myButton = document.querySelector(".buttons");
let stack=[];
let oper=[];
let curnum="";
let b=0;
let isoper=0;
const precedence = {
    '+': 1,
    '-': 1,
    '*': 2,
    '/': 2,
    'mod': 2,
    '^': 3  
};
function applyOp(v1, v2, op) {
    v1 = parseFloat(v1);
    v2 = parseFloat(v2);
    switch (op) {
        case '+': return v1 + v2;
        case '-': return v1 - v2;
        case '*': return v1 * v2;
        case '/': return v1 / v2;
        case 'mod': return v1 % v2;
        case '^': return Math.pow(v1, v2);
    }
}
function calculate() {

    if (curnum !== "") {
        stack.push(curnum);
        
    }
    while (oper.length > 0) {
        let op = oper.pop();
        let val2 = stack.pop();
        let val1 = stack.pop();
        let result = applyOp(val1, val2, op);
        stack.push(result);
    }
    return stack.pop();
}

myButton.addEventListener("click", function(event) {
  
    const target=event.target;
  
  if (target.tagName != 'BUTTON') 
    return;

    const value = target.textContent;

        if (value === '=') {
            try {
            display.textContent=calculate();
            stack=[display.textContent];
            curnum = "";
            b=1;
            } catch {
                display.textContent = "Erorr";
            }
        } 
       
        else if (value === "c") {
           display.textContent = "0";
           stack=[];
           oper=[];
        }

        else if (value === "<-") {
        let currentText = display.textContent;
         if (currentText.length > 1) {
        display.textContent = currentText.slice(0, -1);
    } else {
        display.textContent = "0";
    }
             if (isoper){
              oper.pop();
              isoper=0;
        }
    else {
        if (curnum.length > 0) {
            curnum = curnum.slice(0, -1);
        } else if (stack.length > 0) {
            curnum = stack.pop().toString();
            curnum = curnum.slice(0, -1);
        }}}
                 
     else if (precedence[value]) { 
      
        if (curnum !== "") {
            stack.push(curnum);
            curnum = "";
        }

        while (oper.length > 0 && precedence[oper.at(-1)] >= precedence[value]) {
            let op = oper.pop();
            let v2 = stack.pop();
            let v1 = stack.pop();
            stack.push(applyOp(v1, v2, op));
        }
        isoper=1;
        oper.push(value);
        display.textContent += value;
    }
    else { 
       
        if (display.textContent === "0" || display.textContent === "Error"||b===1) {
            display.textContent = value;
            b=0;
        } else {
            display.textContent += value;
            isoper=0;
        }
        curnum += value;
    isoper=0;}
});