'use strict';

console.log('SCRIPT: Creating and loading qanda library');

function qandatitle(selector) {

	const _self = {};
	_self.selector = selector;
	_self.element = document.querySelector(selector); 
    _self.styleArrNum = ['1: pink', '2: lightblue', '3: lightgreen', '4: lightgreen'];
    _self.styleArr = ['font-weight: bold; font-style: italic; color: pink; text-shadow: 2px 2px #FF0000', 
                    'font-weight: bold; font-style: italic; color: lightgray; text-shadow: 2px 2px #FF0000',
                    'font-weight: bold; font-style: italic; color: lightblue; text-shadow: 2px 2px #FF0000',
                    'font-weight: bold; font-style: italic; color: lightgreen; text-shadow: 2px 2px #FF0000']

    _self.listStyles = function() {
        console.log('Styling for the survey listed below:')
        for(let i = 0; i < this.styleArrNum.length; i++){
            console.log(this.styleArrNum[i]);
        }
    }

    _self.addTitle = function(surveyTitle, styleNum) {
        if(styleNum > this.styleArr.length){
            console.log('Please select again');
            return;
        }
        const sTitle = document.createElement('h1');
        const sTitleText = document.createTextNode(surveyTitle);
        sTitle.style = this.styleArr[styleNum - 1];
        sTitle.appendChild(sTitleText);
        _self.element.appendChild(sTitle);
    }

    return _self;
}

function qandaQuestion(selector) {
    const _self = {};
    _self.selector = selector;
    _self.element = document.querySelector(selector);
    _self.questionTypeNum = ['1: Rating', '2: Text Feedbacks', '3: Multiple Choice'];
    _self.questionType = ['Rating', 'textFeedbacks', 'multipleChoice']; // className for different question's div
    _self.questionStyleNum = ['1: purple', '2: darkblue', '3: darkgreen', '4: brown'];
    _self.styleArr = ['color: purple', 'color: darkblue', 'color: darkgreen', 'color: brown'];
    _self.questions = []; // array of string

    _self.listQuestionTypes = function(){
        console.log('Types of Questions listed below:')
        for(let i = 0; i < this.questionTypeNum.length; i++){
            console.log(this.questionTypeNum[i]);
        }
    }

    _self.listQuestionStyles = function(){
        console.log('Styles of Questions listed below:')
        for(let i = 0; i < this.questionStyleNum.length; i++){
            console.log(this.questionStyleNum[i]);
        }
    }

    _self.addQuestion = function(questionText, questionTypeNum, questionStyleNum){ // string, number, number
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
        questionResponse.className = this.questionType[questionTypeNum - 1];

        questionParagraph.appendChild(questionTxt);
        questionSection.appendChild(questionParagraph);
        questionSection.appendChild(questionResponse);
        this.element.appendChild(questionSection);

        this.questions.push(questionText);
        console.log(this.questions);
    }

    _self.deleteQuestion = function(){
        if(this.questions.length <= 0){
            console.log('no more questions left')
            return;
        }
        $(`#q${this.questions.length - 1}`).remove(); // jquery

        this.questions.pop();
        console.log(this.questions);
    }

    _self.addUserResponse = function(questionNumber){ // number
        //const question = $(`#q${questionNumber - 1}`);
        const question = document.querySelector(`#q${questionNumber - 1}`)
        if(question.lastElementChild.classList.contains('Rating')){
            console.log(`Adding rating response for ${questionNumber}...`)
            //adding a rating bar for the question
            this.ratingBar(question);
        }else if(question.lastElementChild.classList.contains('textFeedbacks')){
            console.log(`Adding feedback response for ${questionNumber}...`)
            // adding a text box for the quesiton
            const input = document.createElement('textarea');
            input.setAttribute("rows", "8");
            input.setAttribute("cols", "60");
            input.setAttribute("name", `q${questionNumber - 1}`);
            question.lastElementChild.appendChild(input);
        }else{ // question.lastElementChild.classList.contains('multipleChoice')
            console.log(`Adding multiple choice response for ${questionNumber}...`)
            // adding the fields for selection
            this.optionBox(question);
            this.optionSelection(question);
        }
    }

    _self.optionBox = function(question){
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

        const optionArr = ['A', 'B', 'C', 'D', 'E']

        for(let i = 0; i < 5; i++){
            const optionR = document.createElement('option');
            optionR.setAttribute('value', optionArr[i]);
            const optionRtext = document.createTextNode(optionArr[i]);
            optionR.appendChild(optionRtext);
            select.appendChild(optionR)
        }

        question.lastElementChild.appendChild(select);
    }

    _self.optionSelection = function(question) {
        const optionArr = ['A', 'B', 'C', 'D', 'E'];
        for(let i = 0; i < optionArr.length; i++) {
            const span = document.createElement('span');
            span.id = `s${i}${question.id}`;
            const text = document.createTextNode(` ${optionArr[i]}: `);
            span.appendChild(text);
            question.lastElementChild.appendChild(span);
        }
    }

    _self.firstMultipleChoice = function(questionNumber, optionText){
        const span = document.querySelector(`#s0q${questionNumber - 1}`);
        span.setAttribute('style', 'padding-right: 30px')
        span.innerText = ` A: ${optionText} `
    }

    _self.secondMultipleChoice = function(questionNumber, optionText){
        const span = document.querySelector(`#s1q${questionNumber - 1}`);
        span.setAttribute('style', 'padding-right: 30px')
        span.innerText = ` B: ${optionText} `
    }

    _self.thirdMultipleChoice = function(questionNumber, optionText){
        const span = document.querySelector(`#s2q${questionNumber - 1}`);
        span.setAttribute('style', 'padding-right: 30px')
        span.innerText = ` C: ${optionText} `
    }

    _self.forthMultipleChoice = function(questionNumber, optionText){
        const span = document.querySelector(`#s3q${questionNumber - 1}`);
        span.setAttribute('style', 'padding-right: 30px')
        span.innerText = ` D: ${optionText} `
    }

    _self.fifthMultipleChoice = function(questionNumber, optionText){
        const span = document.querySelector(`#s4q${questionNumber - 1}`);
        span.setAttribute('style', 'padding-right: 30px')
        span.innerText = ` E: ${optionText} `
    }

    _self.ratingBar = function(question){
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

                if(document.querySelector(`#${question.id}box${9}`) !== null){
                    question.lastElementChild.lastElementChild.innerText = `${score}`
                }
            }
            const label = document.createElement('label');
            question.lastElementChild.appendChild(input);
            question.lastElementChild.appendChild(label);
        }
    }

    return _self;
}