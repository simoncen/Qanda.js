"use strict";

console.log('SCRIPT: Creating and loading qanda library');

/* 
Wrap the code that creates your library in an Immediately-Invoked function expression (IIFE).
This allows you to do any setup necessary in this function scope and then only put on the
the global scope the variables needed for developers to access.  Prevents pollution of the 
global scope and conflicts with variables from other libraries, and gives some control over functionality access.
*/

// We use parameters to create *local* variables in the function, which are faster to lookup than globals, for performance.
// We can also name them something else - like `global` for the window object.
(function(global, document, $) {
    // this function is currently only in the scope of the anonymous function at the moment.
    function qandatitle(){
        this.titles = [];
        this.styleArrNum = ['1: pink', '2: lightblue', '3: lightgreen', '4: lightgreen'];
        this.styleArr = ['font-weight: bold; font-style: italic; color: pink; text-shadow: 2px 2px #FF0000', 
                    'font-weight: bold; font-style: italic; color: lightgray; text-shadow: 2px 2px #FF0000',
                    'font-weight: bold; font-style: italic; color: lightblue; text-shadow: 2px 2px #FF0000',
                    'font-weight: bold; font-style: italic; color: lightgreen; text-shadow: 2px 2px #FF0000']
    }

    /* Private properties and functions */
	// unless we attach these to the global window object, they cannot be accessed directly.
	// they will only be in the closure of this function, and can be accessed only the places we use them
    let _totalNumberOfTitlesEverCreated = 0;
    function _incrementTotalTitles(){
        _totalNumberOfTitlesEverCreated++;
    }
    /* End of private properties/functions */

    qandatitle.prototype = {

        listStyles: function() {
            console.log('Styling for the survey listed below:')
            for(let i = 0; i < this.styleArrNum.length; i++){
                console.log(this.styleArrNum[i]);
            }
        },

        addTitle: function(surveyTitle, styleNum) {
            if(styleNum > this.styleArr.length){
                console.log('Please select again');
                return;
            }
            const sTitle = document.createElement('h1');
            const sTitleText = document.createTextNode(surveyTitle);
            sTitle.style = this.styleArr[styleNum - 1];
            sTitle.appendChild(sTitleText);
            const body = $('#exampleTitle');
            //const body = document.querySelector('#body');
            body.append(sTitle);

            this.titles.push(sTitle);
            _incrementTotalTitles(); // calling the private function
        },

        getTotalTitles: function() {
            return _totalNumberOfTitlesEverCreated;
        }
    }

    // After setup:
    // Add the CircleGenerator to the window object if it doesn't already exist.
    global.qandatitle = global.qandatitle || qandatitle

})(window, window.document, $); // pass the global window object and jquery to the anonymous function. They will now be locally scoped inside of the function.

(function(global, document, $) {
    // this function is currently only in the scope of the anonymous function at the moment.
    function qandaQuestion(){
        // public variables
        this.qs = [];
        this.questions = [];
        this.questionStyleNum = ['1: purple', '2: darkblue', '3: darkgreen', '4: brown'];
        this.styleArr = ['color: purple', 'color: darkblue', 'color: darkgreen', 'color: brown'];
    }

    /* Private properties and functions */
	// unless we attach these to the global window object, they cannot be accessed directly.
	// they will only be in the closure of this function, and can be accessed only the places we use them
    let _totalNumberOfQuestionsEverCreated = 0;
    let _questionTypeNum = ['1: Rating Short', '2: Text Feedbacks', '3: Multiple Choice', '4: Rating Long'];
    let _questionType = ['RS', 'textFeedbacks', 'multipleChoice', 'RL']; // className for different question's div
    let _optionArr = ['A', 'B', 'C', 'D', 'E'];

    function _incrementTotalQuestions(){
        _totalNumberOfQuestionsEverCreated++;
    }

    function _decrementTotalQuestions(){
        _totalNumberOfQuestionsEverCreated--;
    }

    function _popOptionArr(){
        if(_optionArr.length <= 1){
            console.log('Cannot remove optinos anymore since the array reaches the limit of 1.');
            return;
        }

        console.log(`before optionArr is: ${_optionArr}`)
        _optionArr.pop();
        console.log(`now optionArr is: ${_optionArr}`)
    }

    function _pushOptionArr(){
        if(_optionArr.length > 4){
            console.log('Cannot add in optinos anymore since the array reaches the limit of 5.');
            return;
        }

        console.log(`before optionArr is: ${_optionArr}`)

        if(_optionArr.length == 4){
            _optionArr.push('E');
        }else if(_optionArr.length == 3){
            _optionArr.push('D');
        }else if(_optionArr.length == 2){
            _optionArr.push('C');
        }else if(_optionArr.length == 1){
            _optionArr.push('B');
        }

        console.log(`now optionArr is: ${_optionArr}`)
    }

    function _optionBox(question){
        const select = document.createElement('select');
        select.setAttribute('name', 'multipleChoice');
        select.setAttribute('id', 'multipleChoice');
        select.setAttribute('autocomplete', 'off');
        // no star
        const option1 = document.createElement('option');
        option1.setAttribute('value', '');
        const option1text = document.createTextNode('');
        option1.appendChild(option1text);
        select.appendChild(option1)

        for(let i = 0; i < _optionArr.length; i++){
            const optionR = document.createElement('option');
            optionR.setAttribute('value', _optionArr[i]);
            const optionRtext = document.createTextNode(_optionArr[i]);
            optionR.appendChild(optionRtext);
            select.appendChild(optionR)
        }

        question.lastElementChild.appendChild(select);
    }

    function _optionSelection(question) {
        for(let i = 0; i < _optionArr.length; i++) {
            const span = document.createElement('span');
            span.id = `s${i}${question.id}`;
            const text = document.createTextNode(` ${_optionArr[i]}: `);
            span.appendChild(text);
            question.lastElementChild.appendChild(span);
        }
    }

    function _ratingBarShort(question){
        let score = 0;
        for(let i = 0; i < 5; i++){
            const input = document.createElement('input');
            input.setAttribute('type', 'checkbox')
            input.setAttribute('id', `${question.id}box${i}`)
            input.onclick = function(){
                let count = 0;
                for(let j = 0; j <= i; j++){
                    const prevInput = document.querySelector(`#${question.id}box${j}`);
                    prevInput.checked = true;
                    count++;
                    score = count;
                    for(let k = i + 1; k < 5; k++){
                        if(document.querySelector(`#${question.id}box${k}`) !== null){
                            const futureInput = document.querySelector(`#${question.id}box${k}`);
                            futureInput.checked = false;
                        }
                    }
                }

                if(document.querySelector(`#${question.id}box${5 - 1}`) !== null){
                    question.lastElementChild.lastElementChild.innerText = `${score}`
                }
            }
            const label = document.createElement('label');
            question.lastElementChild.appendChild(input);
            question.lastElementChild.appendChild(label);
        }
    }

    function _ratingBarLong(question){
        let score = 0;
        for(let i = 0; i < 10; i++){
            const input = document.createElement('input');
            input.setAttribute('type', 'checkbox')
            input.setAttribute('id', `${question.id}box${i}`)
            input.onclick = function(){
                let count = 0;
                for(let j = 0; j <= i; j++){
                    const prevInput = document.querySelector(`#${question.id}box${j}`);
                    prevInput.checked = true;
                    count++;
                    score = count;
                    for(let k = i + 1; k < 10; k++){
                        if(document.querySelector(`#${question.id}box${k}`) !== null){
                            const futureInput = document.querySelector(`#${question.id}box${k}`);
                            futureInput.checked = false;
                        }
                    }
                }

                if(document.querySelector(`#${question.id}box${10 - 1}`) !== null){
                    question.lastElementChild.lastElementChild.innerText = `${score}`
                }
            }
            const label = document.createElement('label');
            question.lastElementChild.appendChild(input);
            question.lastElementChild.appendChild(label);
        }
    }
    /* End of private properties/functions */

    qandaQuestion.prototype = {

        listQuestionTypes: function(){
            console.log('Types of Questions listed below:')
            for(let i = 0; i < _questionTypeNum.length; i++){
                console.log(_questionTypeNum[i]);
            }
        },
    
        listQuestionStyles: function(){
            console.log('Styles of Questions listed below:')
            for(let i = 0; i < this.questionStyleNum.length; i++){
                console.log(this.questionStyleNum[i]);
            }
        },
    
        addQuestion: function(questionText, questionTypeNum, questionStyleNum){ // string, number, number
            const body = $('#exampleBody')

            // current questin div's properties
            const questionSection = document.createElement('div');
            questionSection.id = `q${this.questions.length}`;
            // current question's paragraph properties
            const questionParagraph = document.createElement('p');
            questionParagraph.style = this.styleArr[questionStyleNum - 1];
            // current question's text
            const questionTxt = document.createTextNode(`${this.questions.length + 1}: ${questionText}`);
            // current div's response seciton
            const questionResponse = document.createElement('div');
            questionResponse.className = _questionType[questionTypeNum - 1];
    
            questionParagraph.appendChild(questionTxt);
            questionSection.appendChild(questionParagraph);
            questionSection.appendChild(questionResponse);
            body.append(questionSection);
    
            this.questions.push(questionText);
            this.qs.push(questionSection);
            _incrementTotalQuestions();
            console.log(this.questions);
        },
    
        deleteQuestion: function(){
            if(this.questions.length <= 0){
                console.log('no more questions left')
                return;
            }
            $(`#q${this.questions.length - 1}`).remove(); // jquery
    
            this.questions.pop();
            this.qs.pop();
            _decrementTotalQuestions();
            console.log(this.questions);
        },
    
        addUserResponse: function(questionNumber){ // number
            //const question = $(`#q${questionNumber - 1}`);
            const question = document.querySelector(`#q${questionNumber - 1}`)
            if(question.lastElementChild.classList.contains('RS')){
                console.log(`Adding rating short response for ${questionNumber}...`)
                //adding a rating bar for the question
                _ratingBarShort(question);
            }else if(question.lastElementChild.classList.contains('textFeedbacks')){
                console.log(`Adding feedback response for ${questionNumber}...`)
                // adding a text box for the quesiton
                const input = document.createElement('textarea');
                input.setAttribute("rows", "8");
                input.setAttribute("cols", "60");
                input.setAttribute("name", `q${questionNumber - 1}`);
                question.lastElementChild.appendChild(input);
            }else if(question.lastElementChild.classList.contains('multipleChoice')){ // question.lastElementChild.classList.contains('multipleChoice')
                console.log(`Adding multiple choice response for ${questionNumber}...`)
                // adding the fields for selection
                _optionBox(question);
                _optionSelection(question);
            }else{
                console.log(`Adding rating long response for ${questionNumber}...`)
                _ratingBarLong(question);
            }
        },
    
        firstMultipleChoice: function(questionNumber, optionText){
            const span = document.querySelector(`#s0q${questionNumber - 1}`);
            span.setAttribute('style', 'padding-right: 30px')
            span.innerText = ` A: ${optionText} `
        },
    
        secondMultipleChoice: function(questionNumber, optionText){
            const span = document.querySelector(`#s1q${questionNumber - 1}`);
            span.setAttribute('style', 'padding-right: 30px')
            span.innerText = ` B: ${optionText} `
        },
    
        thirdMultipleChoice: function(questionNumber, optionText){
            const span = document.querySelector(`#s2q${questionNumber - 1}`);
            span.setAttribute('style', 'padding-right: 30px')
            span.innerText = ` C: ${optionText} `
        },
    
        forthMultipleChoice: function(questionNumber, optionText){
            const span = document.querySelector(`#s3q${questionNumber - 1}`);
            span.setAttribute('style', 'padding-right: 30px')
            span.innerText = ` D: ${optionText} `
        },
    
        fifthMultipleChoice: function(questionNumber, optionText){
            const span = document.querySelector(`#s4q${questionNumber - 1}`);
            span.setAttribute('style', 'padding-right: 30px')
            span.innerText = ` E: ${optionText} `
        },

        getTotalQuestion: function() {
            return _totalNumberOfQuestionsEverCreated;
        },

        addOptionArr: function() {
            _pushOptionArr();
        },

        removeOptionArr: function() {
            _popOptionArr();
        }
    }

    // After setup:
    // Add the CircleGenerator to the window object if it doesn't already exist.
    global.qandaQuestion = global.qandaQuestion || qandaQuestion;

})(window, window.document, $); // pass the global window object and jquery to the anonymous function. They will now be locally scoped inside of the function.

// We use parameters to create *local* variables in the function, which are faster to lookup than globals, for performance.
// We can also name them something else - like `global` for the window object.
(function(global, document, $) {
    // this function is currently only in the scope of the anonymous function at the moment.
    function qandasubmit(){
        this.submit = [];
        this.styleArrNum = ['1: pink', '2: lightgray', '3: white', '4: lightgreen'];
        this.styleArr = ['font-weight: bold; font-size:20px; color: pink; background-color: darkgreen; border-radius: 5px', 
                    'font-weight: bold; font-size:20px; color: lightgray; background-color: black; border-radius: 5px', 
                    'font-weight: bold; font-size:20px; color: white; background-color: blue; border-radius: 5px',
                    'font-weight: bold; font-size:20px; color: lightgreen; background-color: orange; border-radius: 5px']
    }

    /* Private properties and functions */
	// unless we attach these to the global window object, they cannot be accessed directly.
	// they will only be in the closure of this function, and can be accessed only the places we use them
    let _totalNumberOfSubmitButtonsEverCreated = 0;
    function _incrementTotalSubmitButtons(){
        _totalNumberOfSubmitButtonsEverCreated++;
    }
    /* End of private properties/functions */

    qandasubmit.prototype = {

        listStyles: function() {
            console.log('Styling for the submission button listed below:')
            for(let i = 0; i < this.styleArrNum.length; i++){
                console.log(this.styleArrNum[i]);
            }
        },

        addButton: function(btText, styleNum) {
            if(styleNum > this.styleArr.length){
                console.log('Please select again');
                return;
            }
            
            const body = $('#exampleSubmission');


            const button = document.createElement('button');
            const p = document.createElement('p');
            p.id = "thankyouSubmit";
            p.setAttribute('style', 'color: green; text-weight: bold; font-size: 20px; font-style: italic;');
            
            button.setAttribute('type', 'button');
            button.setAttribute('style', this.styleArr[styleNum - 1]);
           

            const buttonText = document.createTextNode(btText);
            button.appendChild(buttonText);
            
            
            body.append(button);
            body.append(p);
            button.setAttribute('onclick', "document.querySelector('#thankyouSubmit').innerHTML = 'Thank you for your submission!'")

            this.submit.push(button);
            _incrementTotalSubmitButtons() // calling the private function
        },

        getTotalSubmissionButtons: function() {
            return _totalNumberOfSubmitButtonsEverCreated;
        }
    }

    // After setup:
    // Add the CircleGenerator to the window object if it doesn't already exist.
    global.qandasubmit = global.qandasubmit || qandasubmit;

})(window, window.document, $); // pass the global window object and jquery to the anonymous function. They will now be locally scoped inside of the function.
