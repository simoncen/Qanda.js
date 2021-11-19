'use strict';
 console.log('This is the code the user may use.')

const mySurveyTitle = qandatitle('#title');

mySurveyTitle.listStyles();

mySurveyTitle.addTitle('Engineering Midterm Survey', 1);

const questions = qandaQuestion('#body');

questions.listQuestionTypes();
questions.listQuestionStyles();