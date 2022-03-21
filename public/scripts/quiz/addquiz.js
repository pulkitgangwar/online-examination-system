const addButton = document.querySelector(".question__add-button");
const questionContainer = document.querySelector(".quiz-questions");
const quizForm = document.querySelector(".add-quiz");
addButton.addEventListener("click", (e) => {
  e.preventDefault();
  let id = 1;
  const div = document.createElement("div");
  div.setAttribute("class", "quiz-questions__container");
  div.id = `quiz-questions__container--${id}`;

  div.innerHTML = `
      <input
        type="text"
        placeholder="enter a question"
        name="question"
        class="quiz-questions__question"
        required
      />
      <input
        type="text"
        placeholder="enter subject"
        name="option"
        class="quiz-questions__subject"
        required
      />
      <input
        type="text"
        placeholder="option 1"
        name="option"
        class="quiz-questions__option"
        required
      />

      <input
        type="text"
        placeholder="option 2"
        name="option"
        class="quiz-questions__option"
        required
      />
      <input
        type="text"
        placeholder="option 3"
        name="option"
        class="quiz-questions__option"
        required
      />
      <input
        type="text"
        placeholder="option 4"
        name="option"
        class="quiz-questions__option"
        required
      />
      <select required name="option-correct"
      placeholder="correct option"
      class="quiz-questions__correct-answer">
        <option label="a">a</option>
        <option label="b">b</option>
        <option label="c">c</option>
        <option label="d">d</option>
      </select>
      
      <button onclick="removeQuestion(${id})" type="button">remove</button>
  `;

  questionContainer.appendChild(div);
  id++;
});
const removeQuestion = (id) => {
  const container = document.getElementById(`quiz-questions__container--${id}`);
  container.remove();
};

quizForm.addEventListener("submit", (e) => {
  e.preventDefault();
  console.log("handlesubmit");

  const title = quizForm.querySelector(".add-quiz__title").value;
  const description = quizForm.querySelector(".add-quiz__description").value;
  const date = quizForm.querySelector(".add-quiz__date").value;
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
    const correctAnswer = questionDiv.querySelector(
      ".quiz-questions__correct-answer"
    ).value;
    const subject = questionDiv.querySelector(".quiz-questions__subject").value;

    return {
      question,
      options: {
        a: options[0].value,
        b: options[1].value,
        c: options[2].value,
        d: options[3].value,
      },
      correctAnswer,
      subject,
    };
  });

  const quiz = {
    title,
    description,
    questions,
    date,
  };

  fetch(`http://localhost:3000/quiz/add/callback`, {
    method: "post",
    body: JSON.stringify(quiz),
    headers: {
      "content-type": "Application/json",
    },
  });
});
