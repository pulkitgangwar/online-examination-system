const addQuestionBtn = document.querySelector(".question__add-button");
const editQuizQuestionsContainer = document.querySelector(
  ".edit-quiz__questions"
);
const deleteQuizBtn = document.querySelector(".edit-quiz__delete-button");
const quizForm = document.querySelector(".edit-quiz");

const checkNoOfQuestions = () => {
  return [...document.querySelectorAll(".quiz-questions__container")].length;
};
const removedQuestions = [];

const getQuestionHtml = (question) => {
  const isCorrectAnswer = (index) => question.correctAnswer === index;
  console.log(question.id);
  const html = `
    <div class="field is-vertical">
          <label class="label" for="quiz-questions__question-input">Question</label>
          <div class="field-body">
            <div class="field">
              <p class="control">
                <input
                  name="question"
                  class="input quiz-questions__question"
                  id="quiz-questions__question-input"
                  type="text"
                  placeholder="Enter question"
                  required
                  value=${question.question}
                />
              </p>
            </div>
          </div>
        </div>

        <div class="columns">
        <div class="column">
        <div class="field is-vertical">
          <label class="label" for="quiz-questions__option-one-input">Option 1</label>
          <div class="field-body">
            <div class="field">
              <p class="control">
                <input
                  name="option"
                  class="input quiz-questions__option"
                  id="quiz-questions__option-one-input"
                  type="text"
                  placeholder="Enter option"
                  required
                  value=${question.options[0]}
                />
              </p>
            </div>
          </div>
        </div>
        </div>

        
        <div class="column">
        <div class="field is-vertical">
          <label class="label" for="quiz-questions__option-two-input">Option 2</label>
          <div class="field-body">
            <div class="field">
              <p class="control">
                <input
                  name="option"
                  class="input quiz-questions__option"
                  id="quiz-questions__option-two-input"
                  type="text"
                  placeholder="Enter option"
                  required
                  value=${question.options[1]}
                />
              </p>
            </div>
          </div>
        </div>
        </div>


        <div class="column">
        <div class="field is-vertical">
          <label class="label" for="quiz-questions__option-three-input">Option 3</label>
          <div class="field-body">
            <div class="field">
              <p class="control">
                <input
                  name="option"
                  class="input quiz-questions__option"
                  id="quiz-questions__option-three-input"
                  type="text"
                  placeholder="Enter option"
                  required
                  value=${question.options[2]}
                />
              </p>
            </div>
          </div>
        </div>
        </div>



        <div class="column">
        <div class="field is-vertical">
          <label class="label" for="quiz-questions__option-four-input">Option 4</label>
          <div class="field-body">
            <div class="field">
              <p class="control">
                <input
                  name="option"
                  class="input quiz-questions__option"
                  id="quiz-questions__option-four-input"
                  type="text"
                  placeholder="Enter option"
                  required
                  value=${question.options[3]}
                />
              </p>
            </div>
          </div>
        </div>
        </div>
        

        </div>


        <div class="field is-vertical mb-6">
            <label class="label" for="quiz-questions__correct-answer-input">Correct Answer</label>
            <div class="select" style="width:100%">
              <select required name="option-correct" class="quiz-questions__correct-answer" style="width:100%">
                <option value="0" selected=${isCorrectAnswer(0)}>1</option>
                <option value="1" selected=${isCorrectAnswer(1)}>2</option>
                <option value="2" selected=${isCorrectAnswer(2)}>3</option>
                <option value="3" selected=${isCorrectAnswer(3)}>4</option>
              </select>
            </div>
          </div>

  
    
   
`;

  return html;
};

const buttonHtml = (id) => `
      <button
      class="button is-danger is-block is-medium"
      type="button"
      onclick="removeQuestion('${id}')" id='${id}'>Remove</button>

      <hr />
  `;

const addAllStoredQuestions = () => {
  questions.forEach((question) => {
    const div = document.createElement("div");
    div.classList.add(
      ...[
        "quiz-questions__container",
        `quiz-questions__container--${question.id}`,
      ]
    );

    div.id = question.id;
    console.log("allallstoredQuestions", question.id);

    div.innerHTML = `${getQuestionHtml(question)}${buttonHtml(question.id)}`;
    editQuizQuestionsContainer.appendChild(div);
  });
};

addQuestionBtn.addEventListener("click", (e) => {
  e.preventDefault();
  const clientQuestionId = window.crypto.randomUUID();
  const div = document.createElement("div");
  div.classList.add(
    ...[
      "quiz-questions__container",
      `quiz-questions__container--${clientQuestionId}`,
    ]
  );
  div.id = clientQuestionId;
  div.innerHTML = `${getQuestionHtml({
    id: clientQuestionId,
    question: "",
    options: ["", "pulkit", "", ""],
    correctAnswer: 0,
  })}${buttonHtml(clientQuestionId)}`;

  editQuizQuestionsContainer.appendChild(div);
});

function removeQuestion(id) {
  if (checkNoOfQuestions() <= 1) {
    return;
  }

  const container = document.querySelector(`.quiz-questions__container--${id}`);

  container.remove();
}

const getAllQuizDetails = () => {
  const title = quizForm.querySelector(".edit-quiz__title").value;
  const description = quizForm.querySelector(".edit-quiz__description").value;
  const startingDate = quizForm.querySelector(
    ".edit-quiz__starting-date"
  ).value;
  const endingDate = quizForm.querySelector(".edit-quiz__ending-date").value;
  const timeLimit = quizForm.querySelector(".edit-quiz__time-limit").value;
  const semester = quizForm.querySelector(".edit-quiz__semester").value;
  const negativeMarksPerQuestion = quizForm.querySelector(
    ".edit-quiz__negative-marks-per-question"
  ).value;
  const marksPerQuestion = quizForm.querySelector(
    ".edit-quiz__marks-per-question"
  ).value;
  const subject = quizForm.querySelector(".edit-quiz__subject").value;
  const questionContainer = [
    ...document.querySelectorAll(".quiz-questions__container"),
  ];

  const questions = questionContainer.map((questionDiv) => {
    const question = questionDiv.querySelector(
      ".quiz-questions__question"
    ).value;
    const options = [
      ...questionDiv.querySelectorAll(".quiz-questions__option"),
    ];
    const correctAnswerIndex = parseInt(
      questionDiv.querySelector(".quiz-questions__correct-answer").value
    );
    const correctAnswer = options[correctAnswerIndex].value;

    return {
      id: window.crypto.randomUUID(),
      question,
      options: options.map((option) => option.value),
      correctAnswer,
      correctAnswerIndex,
    };
  });

  const quiz = {
    id: quizForm.id,
    title,
    description,
    questions,
    subject,
    negativeMarksPerQuestion: parseFloat(negativeMarksPerQuestion),
    marksPerQuestion: parseFloat(marksPerQuestion),
    startingDate,
    endingDate,
    timeLimit: parseFloat(timeLimit),
    semester: parseInt(semester),
  };

  return quiz;
};

addAllStoredQuestions();

quizForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const quizDetails = getAllQuizDetails();

  // console.log(quizDetails);
  const response = await fetch("/quiz/edit/callback", {
    method: "POST",
    body: JSON.stringify(quizDetails),
    headers: {
      "content-type": "application/json",
    },
  });

  if (response) {
    window.location.href = response.url;
  }
});

deleteQuizBtn.addEventListener("click", async (e) => {
  e.preventDefault();
  const willDelete = await swal({
    title: `Are you
  sure?`,
    text: `Once deleted, you will not be able to recover this exam`,
    icon: `warning`,
    buttons: true,
    dangerMode: true,
  });

  if (!willDelete) {
    return;
  }

  const response = await fetch(`/quiz/delete/${quizForm.id}`, {
    method: "DELETE",
  });

  if (response) {
    window.location.href = response.url;
  }
});
