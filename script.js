
let display = document.getElementById("display");
const myButton = document.querySelector(".buttons");
let stack=[];
myButton.addEventListener("click", function(event) {
  
    const target=event.target;
  
  if (target.tagName === 'BUTTON') {

    const value = target.textContent;
  if (value === '=') {
            try {
            let size =stack.length();
            while(size--)
            {
             
            }
            } catch {
                display.textContent = "Erorr";
            }
        } 
       
        else if (value === "c") {
           display.textContent = "0";
           stack=[];
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
                stack.push(value);
                
            }
            else {
            display.textContent+= value;
            stack.push(value);

        }}}
});