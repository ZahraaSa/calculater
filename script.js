
let display = document.getElementById("display");
const myButton = document.querySelector(".buttons");
let stack=[];
let oper=[];
let curnum="";
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
let b=0;
function calculate() {
    if (currentNum !== "") {
        stack.push(currentNum);
        currentNum = "";
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
             stack.pop();
             if (stack.length===0)
             display.textContent ="0";
            else
             display.textContent =stack.at(-1);
        }
        else {
            if (display.textContent === "0" || display.textContent === "Erorr") {
                display.textContent = value;
                }

            else if (value==='+'||value==="-"||value==="*"||value==="/"||value==="^"||value==="mod") {
              if  (precedence[oper.at(-1)]<precedence.value){oper.push(value);display.textContent+= value;}

                else {  display.textContent+= value;
                    
                    while (precedence[oper.at(-1)]>=precedence[value]){
                        let op = oper.pop();
                        let val2 = stack.pop();
                        let val1 = stack.pop();
                        let result = applyOp(val1, val2, op);
                        stack.push(result);
                    
                }}}

           else{
            display.textContent+= value;
            curnum+=value;

        }}
});