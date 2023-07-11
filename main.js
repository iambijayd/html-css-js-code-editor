
const DOMElement = {
    htmlInputBox: document.querySelector(`[data-id="html"]`),
    cssInputBox: document.querySelector("[data-input='css']"),
    jsInputBox: document.querySelector("[data-input='js']"),
};
const highlightSyntax = (content, lang) => {
    // console.log(content);
    if (content[content.length - 1] == '\n') {
        content += " ";
    }
    let codeElement = null;
    if (lang === 'html') {
        codeElement = document.querySelector("#highlight-content-html");
    } else if (lang === 'css') {
        codeElement = document.querySelector("#highlight-content-css");
    } else {
        codeElement = document.querySelector("#highlight-content-js");
    }
    codeElement.innerHTML = content.replace(new RegExp("&", "g"), "&").replace(new RegExp("<", "g"), "&lt;");
    Prism.highlightElement(codeElement);
}
const syncScroll = (element, lang) => {

    let result_element = null;

    //select the pre tag according to language
    if (lang == 'html') {
        result_element = document.querySelector(".pre-html");
    } else if (lang == 'css') {
        result_element = document.querySelector(".pre-css");
    } else {
        result_element = document.querySelector(".pre-js");
    }

    //scroll Pre tag as textArea scrolls
    result_element.scrollTop = element.scrollTop;
    result_element.scrollLeft = element.scrollLeft;
}
const checkTab = (element, event) => {

    let text = element.value;
    if (event.key == "Tab") {
        event.preventDefault();
        let before_tab = text.slice(0, element.selectionStart); // text before tab
        console.log(before_tab);
        let after_tab = text.slice(element.selectionEnd, text.length); // text after tab
        if(after_tab == ""){
            after_tab = "";
        }
        console.log(after_tab);
        text = before_tab + "\t" + after_tab; // add tab char
        let cursorPos = element.selectionEnd + 1;
        element.selectionStart = cursorPos;
        element.selectionEnd = cursorPos;
        // text += '\t';
        console.log(text);
        if (element == DOMElement.htmlInputBox) {
            console.log("in check tab");
            DOMElement.htmlInputBox.value = text;
            highlightSyntax(text, "html");
        }
    }



}
const renderContent = (content, updatedInputBox) => {
    if (updatedInputBox == 0)
        document.querySelector("iframe").contentDocument.body.innerHTML = content;
    else if (updatedInputBox == 1) {
        document.querySelector("iframe").contentDocument.head.innerHTML = `<style> ${content} </style>`
    } else if (updatedInputBox == 2) {
        try {
            document.querySelector("iframe").contentWindow.eval(content);
        } catch (err) {
            console.log(err);
        }
    }
}
function handleEvents() {
    window.addEventListener("DOMContentLoaded", (e) => {
        DOMElement.htmlInputBox.value = "";
        DOMElement.cssInputBox.value = "";
        DOMElement.jsInputBox.value = "";
    });
    let tid;
    document.querySelector("#editor-container").addEventListener("keyup", (e) => {

        clearTimeout(tid);
        if (e.target === DOMElement.htmlInputBox) {
            tid = setTimeout(() => {
                renderContent(DOMElement.htmlInputBox.value, 0);

            }, 200);

        } else if (e.target === DOMElement.cssInputBox) {
            tid = setTimeout(() => {
                renderContent(DOMElement.cssInputBox.value, 1);

            }, 200);
        } else if (e.target === DOMElement.jsInputBox) {
            tid = setTimeout(() => {
                renderContent(DOMElement.jsInputBox.value, 2);
            }, 200)
        }
        // if (e.key == 'Tab') {

        // }





        // tid = setTimeout(()=>{
        //     if(e.target === DOMElement.htmlInputBox){
        //         renderContent(DOMElement.htmlInputBox.value,0);

        //     }else if(e.target === DOMElement.cssInputBox){
        //         renderContent(DOMElement.cssInputBox.value,1);
        //     }else if(e.target === inputBoxes[2]){
        //         renderContent(DOMElement.jsInputBox.value,2);
        //     }
        // },200)

    })
}
handleEvents();
