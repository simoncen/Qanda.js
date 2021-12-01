# js-library-cenjinli

## Link to the webpage of Qanda.js
https://qandajs.herokuapp.com/

## Getting Started
### Setting up
Users need to include the script for both jQuery and Qanda.js before their own script in the head tag of the html file.
```
<head>
    <script defer src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
    <script defer type="text/javascript" src='qanda.js'></script>
    <script defer type="text/javascript" src='yourCode.js'></script>
</head>
```
### Code Snipet
Code snipet for some basic functionality you can write in your own javascript files.
```
//1.
const questions = new qandaQuestion();
//2.
questions.addQuestion('Are you satisfy with your scores?', 1, 1); 
//3.
questions.addUserResponse(1);

//4.
questions.addQuestion('Which year are you in?', 3, 4);
//5.
questions.removeOptionArr();
questions.removeOptionArr();
//6.
questions.addUserResponse(2);
//7.
questions.firstMultipleChoice(2, 'first year')
questions.secondMultipleChoice(2, 'second year');
questions.thirdMultipleChoice(2, 'third year')
```
1: Create the qandaQuestion object.

2: Set the first question with the input text, specific type of question, and specific styling.

3: Set the response for the users regarding the first question.

4: Set the second question with the input text, specific type of question, and specific styling.

5: Remove two multiple choice options for this response.

6: Set the response for the users regarding the second question.

7: Set each of the options in the multiple choice reponse with the input text regarding the second question.
## Link to the Documentation
https://qandajs.herokuapp.com/page3.html
