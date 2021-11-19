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
    _self.questionType = ['1: Rating', '2: Text Feedbacks', '3: Multiple Choice'];

    _self.listQuestionType = function(){
        console.log('Types of Questions listed below:')
        for(let i = 0; i < this.questionType.length; i++){
            console.log(this.questionType[i]);
        }
    }

    _self.addQuestion = function(questionText, questionType, questionStyle){

    }

    return _self;
}