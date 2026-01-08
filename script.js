
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
    const target = event.target;
    if (target.tagName != 'BUTTON') return;
    const value = target.textContent;

    if (value === '=') {
        try {
            let result = calculate();
            display.textContent = result;
            stack = [result]; // النتيجة جاهزة للعملية التالية
            curnum = "";
            b = 1; // علامة أننا انتهينا من عملية
        } catch {
            display.textContent = "Error";
        }
    } 
    else if (value === "c") {
        display.textContent = "0";
        stack = []; oper = []; curnum = ""; b = 0; isoper = 0;
    }
    else if (value === "<-") {
        let currentText = display.textContent;
        if (currentText === "0") return;

        // تحديث الشاشة
        if (currentText.length > 1) {
            display.textContent = currentText.slice(0, -1);
        } else {
            display.textContent = "0";
        }

        // تحديث المنطق
        if (isoper) {
            oper.pop();
            isoper = 0;
            // بعد حذف العملية، نحتاج لاستعادة الرقم الأخير من الـ stack ليكون هو الـ curnum الحالي
            if (stack.length > 0) {
                curnum = stack.pop().toString();
            }
        } else {
            if (curnum.length > 0) {
                curnum = curnum.slice(0, -1);
            } else if (stack.length > 0) {
                // إذا كان الـ curnum فارغاً، نسحب من الـ stack
                curnum = stack.pop().toString();
                curnum = curnum.slice(0, -1);
            }
        }
    }
    else if (precedence[value]) { 
        if (b === 1) b = 0; // إذا ضغطت عملية بعد يساوي، أكمل الحساب على النتيجة

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
        isoper = 1;
        oper.push(value);
        display.textContent += value;
    }
    else { // ضغط رقم
        if (display.textContent === "0" || display.textContent === "Error" || b === 1) {
            display.textContent = value;
            if (b === 1) { stack = []; b = 0; } // تصفير الستاك لبدء عملية جديدة تماماً
        } else {
            display.textContent += value;
        }
        curnum += value;
        isoper = 0;
    }
});