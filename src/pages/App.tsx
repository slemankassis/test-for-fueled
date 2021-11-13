import React, { ChangeEvent, useState } from "react";
import { BrowserRouter, Link } from "react-router-dom";
import converter from "number-to-words";
import AppBar from "src/components/AppBar/AppBar";
import Button from "src/components/Button/Button";
import Checkbox from "src/components/Checkbox/Checkbox";
import Radio from "src/components/Radio/Radio";
import RemoveButton from "src/components/RemoveButton/RemoveButton";
import Select from "src/components/Select/Select";
import TextArea from "src/components/TextArea/TextArea";
import TextField from "src/components/TextField/TextField";
import { v4 as uuidv4 } from "uuid";
import "../styles/app.scss";

type Option = {
  label: string;
  value: string | number;
};

type Answer = {
  id: string;
  value: string | number;
  checked?: boolean;
};

type Data = {
  id: string;
  question: string;
  answerType: Option;
  answers: Array<Answer>;
  answer: string;
};

const DEFAULT_TYPE_ANSWER = 0;

const App = () => {
  // TODO: Use useMemo or useCallback for better performance and less qty of re-render
  const [formData, setFormData] = useState<Array<Data>>([defaultFormData]);
  const [user, setUser] = useState<string | null>(null);

  console.log(formData[0], "formData");

  const atLeastOneAnswerOptionIsChecked = () => {
    const answers = Array.from(document.getElementsByName("answer"));

    return answers.reduce((acc, curr: any) => acc || curr.checked, false);
  };

  const isMultiAnswer = (data: Data) =>
    [3, 4, 5].includes(data.answerType.value as number);

  // TODO: Improve this validations using onBlur inside the form and scheme validation lib like https://ajv.js.org/
  const disableAddQuestion =
    formData.length !== 0 &&
    ((formData.some((data) => isMultiAnswer(data as Data)) &&
      !atLeastOneAnswerOptionIsChecked()) ||
      formData.some((data) => !data.question) ||
      formData.some((data) => data.answers.length <= 1) ||
      (formData.some((data) => !isMultiAnswer(data as Data)) &&
        formData.some((data) => !data.question)) ||
      formData.some((data) => !data.answer));

  const disableFinalSubmit = !disableAddQuestion || !formData.length;

  const newAnswer = {
    id: uuidv4(),
    value: "",
    checked: false,
  };

  const setFormDataItem = (
    index: number,
    name: string,
    value: string | Option
  ) => {
    const temp = [...formData] as any;

    if (isMultiAnswer(temp[index])) {
      temp[index].answer = "";
    } else {
      temp[index].answers = [newAnswer];
    }

    temp[index][name] = value;

    setFormData(temp);
  };

  const handleChange =
    (index: number) =>
    ({
      target: { name, value },
    }: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setFormDataItem(index, name, value);
    };

  const handleSelectionChange = (index: number) => (value: any) => {
    setFormDataItem(index, "answerType", value);
  };

  const handleAddQuestion = () => {
    setFormData([
      ...formData,
      {
        id: uuidv4(),
        answerType: options[DEFAULT_TYPE_ANSWER],
        question: "",
        answers: [newAnswer],
        answer: "",
      } as Data,
    ]);
  };

  const handleRemoveQuestion = (id: string) => () => {
    setFormData([...formData.filter((data) => data.id !== id)]);
  };

  const setFormDataItemAnswerOption = (
    index: number,
    anwserOptionIndex: number,
    value: string | boolean
  ) => {
    const temp = [...formData] as any;

    temp[index].answers[anwserOptionIndex][
      `${"boolean" === typeof value ? "checked" : "value"}`
    ] = value;

    setFormData(temp);
  };

  const handleAddAnswerOption = (index: number) => () => {
    const temp = [...formData];

    temp[index].answers.push({
      id: uuidv4(),
      value: "",
      checked: false,
    } as Answer);

    setFormData(temp);
  };

  // const handleSubmitAnswerForm = ({ target: { name, value } }: any) => {
  //   console.log(name, value, 8888);
  // };

  const handleChangeAnswerOption =
    (index: number, anwserOptionIndex: number) =>
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const value = ["checkbox", "radio"].includes(e.currentTarget.type)
        ? (e.currentTarget as HTMLInputElement).checked
        : e.currentTarget.value;

      setFormDataItemAnswerOption(index, anwserOptionIndex, value);
    };

  const updateRadioChecked = (index: number, anwserOptionIndex: number) => {
    const answerOptionChecked = document.querySelector(
      `input[name="answer-radio-${index}-${anwserOptionIndex}"]:checked`
    )?.id;
  };

  const handleRemoveAnswerOption = (index: number, id: string) => () => {
    const temp = [...formData];
    const tempAnswer = [
      ...formData[index].answers.filter((data: Answer) => data.id !== id),
    ];

    temp[index].answers = tempAnswer;
    setFormData(temp);
  };

  const handleMove = (index: number, move: "up" | "down") => () => {
    if (move === "down") {
      const temp = [...formData];
      temp[index] = formData[index + 1];
      temp[index + 1] = formData[index];

      setFormData(temp);
    } else {
      const temp = [...formData];
      temp[index] = formData[index - 1];
      temp[index - 1] = formData[index];

      setFormData(temp);
    }
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();
    const temp = [...formData];

    console.info(
      temp.map(({ answerType, ...data }) => {
        return data;
      })
    );
    alert("Submitted");
  };

  const handleLogin = async () => {
    setUser("tom@fueled.com");
  };

  const handleLogout = async () => {
    setUser(null);
  };

  return (
    <BrowserRouter>
      <AppBar>
        <div className="header__container flex justify-between align-center h-full">
          <Link to="/">
            <img
              src="/assets/icons/logo.svg"
              alt="Go home"
              tabIndex={0}
              aria-label="Home"
            />
          </Link>
          <h1>
            <input
              className="header__input"
              type="text"
              defaultValue="New Questionnaire"
              aria-label="Title field"
              required
            />
          </h1>
          <div className="flex align-center">
            {user && <span className="main__user">{user}</span>}
            {user ? (
              <Button
                className="header__button"
                aria-label="logout"
                onClick={handleLogout}
              >
                Log out
              </Button>
            ) : (
              <Button
                className="header__button"
                aria-label="login"
                onClick={handleLogin}
              >
                Log in
              </Button>
            )}
          </div>
        </div>
      </AppBar>
      <main className="main container mt-8">
        {/* TODO: Make differents forms for each question and each answer of a question
         */}
        {/* <form id="answer-form" onBlur={validateForm} /> */}
        <form id="question-form" onSubmit={handleSubmit}>
          {formData.map((data, index) => (
            <div className="card mb-8" key={data.id}>
              <TextField
                className="mb-4"
                name="question"
                label="Question"
                placeholder="What do you want to ask?"
                aria-label="question"
                autoComplete="off"
                fullwidth
                onChange={handleChange(index)}
              />
              <div className="divider mb-4" />
              <Select
                className="mb-4"
                label="Answer"
                aria-label="select answer type"
                value={data.answerType}
                options={options}
                onChange={handleSelectionChange(index)}
              >
                Select an option
              </Select>

              {(() => {
                switch (data.answerType.value) {
                  default:
                  case 1:
                    return (
                      <TextField
                        className="mb-4"
                        name="answer"
                        placeholder="Short Answer Text"
                        aria-label="Short Answer"
                        fullwidth
                        value={data.answer}
                        onChange={handleChange(index)}
                      />
                    );
                  case 2:
                    return (
                      <TextArea
                        name="answer"
                        placeholder="Long Answer Text"
                        fullwidth
                        aria-label="Long answer"
                        value={data.answer}
                        onChange={handleChange(index)}
                      />
                    );
                  case 3:
                    return (
                      <>
                        {formData[index].answers.map(
                          (answerOption: Answer, anwserOptionIndex: number) => (
                            <div
                              key={answerOption.id}
                              className="flex items-center mb-4 w-full"
                            >
                              <Radio
                                name={`answer-radio-${index}-${anwserOptionIndex}`}
                                onChange={() => {
                                  updateRadioChecked(index, anwserOptionIndex);
                                  handleChangeAnswerOption(
                                    index,
                                    anwserOptionIndex
                                  );
                                }}
                                required
                                aria-label="Mark answer as correct"
                                aria-checked={answerOption.checked}
                                disabled={!answerOption.value}
                                // form="answer-form"
                              />
                              <TextField
                                className="mx-4"
                                placeholder={`${converter.toWordsOrdinal(
                                  anwserOptionIndex + 1
                                )} Option`}
                                fullwidth
                                name={`answer-radio-textfield-${index}-${anwserOptionIndex}`}
                                required
                                aria-label={`Write the ${converter.toWordsOrdinal(
                                  anwserOptionIndex + 1
                                )} Option`}
                                value={answerOption.value}
                                onChange={handleChangeAnswerOption(
                                  index,
                                  anwserOptionIndex
                                )}
                                // form="answer-form"
                              />

                              <RemoveButton
                                handleClick={handleRemoveAnswerOption(
                                  index,
                                  answerOption.id
                                )}
                                handleKeyPress={handleRemoveAnswerOption(
                                  index,
                                  answerOption.id
                                )}
                              />
                            </div>
                          )
                        )}
                      </>
                    );
                  case 4:
                    return (
                      <>
                        {formData[index].answers.map(
                          (answerOption: Answer, anwserOptionIndex: number) => (
                            <div
                              key={answerOption.id}
                              className="flex items-center mb-4 w-full"
                            >
                              <Checkbox
                                name={`answer-checkbox-${index}-${anwserOptionIndex}`}
                                onChange={handleChangeAnswerOption(
                                  index,
                                  anwserOptionIndex
                                )}
                                aria-label="Mark answer as correct"
                                aria-checked={answerOption.checked}
                                required
                                disabled={!answerOption.value}
                              />
                              <TextField
                                className="mx-4"
                                placeholder={`${converter.toWordsOrdinal(
                                  anwserOptionIndex + 1
                                )} Option`}
                                fullwidth
                                name={`answer-checkbox-textfield-${index}-${anwserOptionIndex}`}
                                aria-label={`Write the ${converter.toWordsOrdinal(
                                  anwserOptionIndex + 1
                                )} Option`}
                                required
                                value={answerOption.value}
                                onChange={handleChangeAnswerOption(
                                  index,
                                  anwserOptionIndex
                                )}
                              />

                              <RemoveButton
                                handleClick={handleRemoveAnswerOption(
                                  index,
                                  answerOption.id
                                )}
                                handleKeyPress={handleRemoveAnswerOption(
                                  index,
                                  answerOption.id
                                )}
                              />
                            </div>
                          )
                        )}
                      </>
                    );
                  case 5:
                    return (
                      <>
                        {formData[index].answers.map(
                          (answerOption: Answer, anwserOptionIndex: number) => (
                            <div
                              key={answerOption.id}
                              className="flex align-center mb-4 w-full"
                            >
                              <span className="block text-muted">{`${
                                anwserOptionIndex + 1
                              }. `}</span>

                              <TextField
                                className="mx-4"
                                placeholder={`${converter.toWordsOrdinal(
                                  anwserOptionIndex + 1
                                )} Option`}
                                fullwidth
                                required
                                value={answerOption.value}
                                onChange={handleChangeAnswerOption(
                                  index,
                                  anwserOptionIndex
                                )}
                              />

                              <RemoveButton
                                handleClick={handleRemoveAnswerOption(
                                  index,
                                  answerOption.id
                                )}
                                handleKeyPress={handleRemoveAnswerOption(
                                  index,
                                  answerOption.id
                                )}
                              />
                            </div>
                          )
                        )}
                      </>
                    );
                }
              })()}

              {isMultiAnswer(formData[index]) && (
                <Button
                  className="mb-4"
                  variant="outlined"
                  color="primary"
                  fullwidth
                  disabled={formData[index].answers.some(
                    (answerOption: Answer) => !answerOption.value
                  )}
                  aria-label="Add new option"
                  onKeyPress={handleAddAnswerOption(index)}
                  onClick={handleAddAnswerOption(index)}
                >
                  <img
                    className="mr-2"
                    src="/assets/icons/plus.svg"
                    alt="plus"
                  />
                  <span>Add Option</span>
                </Button>
              )}

              <div className="divider mb-6" />
              <div className="flex justify-between align-center">
                <span className="main__counter text-muted">
                  {index + 1} of {formData.length}
                </span>
                <div className="flex align-center">
                  {index !== 0 && (
                    <img
                      className="main__action-icon"
                      src="/assets/icons/chevron-up.svg"
                      alt="chevron-up"
                      role="button"
                      aria-label="move question up"
                      tabIndex={0}
                      onClick={handleMove(index, "up")}
                      onKeyPress={handleMove(index, "up")}
                    />
                  )}
                  {index !== formData.length - 1 && (
                    <img
                      className="main__action-icon"
                      src="/assets/icons/chevron-down.svg"
                      alt="chevron-down"
                      role="button"
                      aria-label="move question down"
                      tabIndex={0}
                      onClick={handleMove(index, "down")}
                      onKeyPress={handleMove(index, "down")}
                    />
                  )}
                  <img
                    className="main__action-icon"
                    src="/assets/icons/bin.svg"
                    alt="bin"
                    role="button"
                    tabIndex={0}
                    onKeyPress={handleRemoveQuestion(data.id)}
                    onClick={handleRemoveQuestion(data.id)}
                  />
                </div>
              </div>
            </div>
          ))}

          <Button
            className="mb-4"
            variant="outlined"
            color="primary"
            fullwidth
            aria-label="add question"
            disabled={!disableAddQuestion}
            onClick={handleAddQuestion}
            onKeyPress={handleAddQuestion}
          >
            <img className="mr-2" src="/assets/icons/plus.svg" alt="plus" />
            <span>Add Question</span>
          </Button>
          <Button
            className="mb-4"
            variant="contained"
            type="submit"
            aria-label="submit form"
            disabled={disableFinalSubmit}
            fullwidth
          >
            Save & Share
          </Button>
        </form>
      </main>
    </BrowserRouter>
  );
};

const options = [
  {
    label: "Short Answer",
    value: 1,
  },
  {
    label: "Paragraph",
    value: 2,
  },
  {
    label: "Multiple Choice",
    value: 3,
  },
  {
    label: "Checkboxes",
    value: 4,
  },
  {
    label: "List Answer",
    value: 5,
  },
];

const defaultFormData = {
  id: uuidv4(),
  answerType: options[DEFAULT_TYPE_ANSWER],
  question: "",
  answers: [
    {
      id: uuidv4(),
      value: "",
    },
  ],
  answer: "",
};

export default App;
