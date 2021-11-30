'use strict';
 console.log('This is the code the user may use.')

 // title of the survey
const mySurveyTitle = new qandatitle();

mySurveyTitle.listStyles();

mySurveyTitle.addTitle('Engineering Midterm Survey', 1);

// body of the survey
const questions = new qandaQuestion();

questions.listQuestionTypes();
questions.listQuestionStyles();


// question 1: 
questions.addQuestion('Are you satisfy with your scores?', 1, 1); // questionText, questionTypeNum, questionStyleNum
// create the reponse for the first question, which is in the form of square rating bar
questions.addUserResponse(1);



// question 2:
questions.addQuestion('How would you rate the difficulties of your exams?', 2, 2);
// create the the response for the second question, which is in the form of text box
questions.addUserResponse(2);



// question 3:
questions.addQuestion('Which type of exam would you prefer?', 3, 3);
// create the reponse for the third question, which is in the form of mulitple choice
questions.addUserResponse(3);
questions.firstMultipleChoice(3, 'Multiple Choice Exam');
questions.secondMultipleChoice(3, 'Calculation type Exam');
questions.thirdMultipleChoice(3, 'Case Study type Exam');
questions.forthMultipleChoice(3, 'Hybrid Exam');
questions.fifthMultipleChoice(3, 'Choose not to answer')



// question 4:
questions.addQuestion('Which type of exam would you prefer?', 3, 4);
// create the reponse for the forth question, which is in the form of mulitple choice
questions.removeOptionArr();
questions.removeOptionArr();
questions.addUserResponse(4);
questions.firstMultipleChoice(4, 'first year')
questions.secondMultipleChoice(4, 'second year');
questions.thirdMultipleChoice(4, 'third year')



// question 5:
questions.addQuestion('How would you rate the workload for your courses so far?', 1, 2)
// reate the reponse for the fifth question, which is in the form of square rating bar
questions.addUserResponse(5);


// question 6:
questions.addQuestion('How would you rate the workload for your courses so far?', 1, 2)
// reate the reponse for the sixth question, which is in the form of square rating bar
questions.addUserResponse(6);
// delete the sixth, which is the last question
questions.deleteQuestion();

console.log(`Total number of questions: ${questions.getTotalQuestion()}`);

// question 6 again:
questions.addQuestion('How would you rate for your work ethics?', 4, 3)
// reate the reponse for the sixth question, which is in the form of square rating bar
questions.addUserResponse(6);

// you can change the color by accessing the public variables from the library
// questions.styleArr[0] = "color: red"

// question 7: 
questions.addQuestion('Which set of classes do you prefer?', 3, 4);
// create the reponse for the forth question, which is in the form of mulitple choice
questions.addOptionArr();
questions.addUserResponse(7);
questions.firstMultipleChoice(7, 'In person');
questions.secondMultipleChoice(7, 'Online');
questions.thirdMultipleChoice(7, 'Hybrid');
questions.forthMultipleChoice(7, 'Prefer not to say');



// create submission button
const button = new qandasubmit();

button.listStyles();
button.addButton('Submit', 1);

console.log(`Total number of buttons created: ${button.getTotalSubmissionButtons()}`);





