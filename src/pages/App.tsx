import React, { ChangeEvent, useState } from "react";
import { BrowserRouter, Link } from "react-router-dom";
import converter from "number-to-words";
import AppBar from "src/components/AppBar/AppBar";
import Button from "src/components/Button/Button";
import Checkbox from "src/components/Checkbox/Checkbox";
import Radio from "src/components/Radio/Radio";
import Select from "src/components/Select/Select";
import TextArea from "src/components/TextArea/TextArea";
import TextField from "src/components/TextField/TextField";
import { v4 as uuidv4 } from "uuid";
import "../styles/app.scss";

type Option = {
  label: string;
  value: string | number;
};

type AnswerOption = {
  id: string;
  value: string | number;
};

const App = () => {
  const [formData, setFormData] = useState<any[]>([defaultFormData]);
  const [user, setUser] = useState<string | null>(null);

  console.log(formData, "formData");

  const setFormDataItem = (
    index: number,
    name: string,
    value: string | Option
  ) => {
    const temp = [...formData];
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
        answerType: options[0],
      },
    ]);
  };

  const handleRemoveQuestion = (id: string) => () => {
    setFormData([...formData.filter((data) => data.id !== id)]);
  };

  const setFormDataItemAnswerOption = (
    index: number,
    anwserOptionIndex: number,
    value: string
  ) => {
    const temp = [...formData];

    temp[index].answerOptions[anwserOptionIndex].value = value;
    setFormData(temp);
  };

  const handleChangeAnswerOption =
    (index: number, anwserOptionIndex: number) =>
    ({
      target: { value },
    }: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setFormDataItemAnswerOption(index, anwserOptionIndex, value);
    };

  const handleAddAnswerOption = (index: number) => () => {
    const temp = [...formData];
    temp[index].answerOptions.push({
      id: uuidv4(),
      value: "",
    });
    setFormData(temp);
  };

  const setAnswerOption = (
    index: number,
    name: string,
    value: string | Option
  ) => {
    const temp = [...formData];
    temp[index][name] = value;
    setFormData(temp);
  };

  const handleRemoveAnswerOption = (index: number, id: string) => () => {
    const temp = [...formData];
    const tempAnswerOptions = [
      ...formData[index].answerOptions.filter(
        (data: AnswerOption) => data.id !== id
      ),
    ];

    temp[index].answerOptions = tempAnswerOptions;
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

    console.log(
      temp.map(({ answerType, ...data }) => {
        return data;
      })
    );
    alert("Submitted");
  };

  const handleLogin = async () => {
    setUser("mock@gmail.com");
  };
  const handleLogout = async () => {
    setUser(null);
  };

  return (
    <BrowserRouter>
      <AppBar>
        <div className="header container flex justify-between align-center h-full">
          <Link to="/">
            <img
              src="/assets/icons/logo.svg"
              alt="logo"
              tabIndex={0}
              role="link"
              aria-label="Home"
            />
          </Link>
          <input
            className="header__input"
            type="text"
            defaultValue="New Questionnaire"
            aria-label="Title field"
          />
          <div className="flex align-center">
            {user && <span className="main__user">{user}</span>}
            {user ? (
              <Button
                className="header__button"
                aria-label="logout"
                onClick={handleLogout}
              >
                Logout
              </Button>
            ) : (
              <Button
                className="header__button"
                aria-label="login"
                onClick={handleLogin}
              >
                Login
              </Button>
            )}
          </div>
        </div>
      </AppBar>
      <main className="main container mt-8">
        <form onSubmit={handleSubmit}>
          {formData.map((data, index) => (
            <div className="card mb-8" key={data.id}>
              <TextField
                className="mb-4"
                name="question"
                label="Question"
                placeholder="Lorem ipsum dolor sit amet?"
                aria-label="question"
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
                        name="short_answer"
                        placeholder="Short Answer Text"
                        aria-label="Short Answer"
                        fullwidth
                        onChange={handleChange(index)}
                      />
                    );
                  case 2:
                    return (
                      <TextArea
                        name="long_answer"
                        placeholder="Long Answer Text"
                        fullwidth
                        aria-label="long answer"
                        onChange={handleChange(index)}
                      />
                    );
                  case 3:
                    return (
                      <>
                        {formData[index].answerOptions.map(
                          (
                            answerOption: AnswerOption,
                            anwserOptionIndex: number
                          ) => (
                            <div
                              key={answerOption.id}
                              className="flex items-center mb-4 w-full"
                            >
                              <Radio name="radio-name" />
                              <TextField
                                className="mx-4"
                                placeholder={`${converter.toWordsOrdinal(
                                  anwserOptionIndex + 1
                                )} Option`}
                                fullwidth
                                onChange={handleChangeAnswerOption(
                                  index,
                                  anwserOptionIndex
                                )}
                              />
                              <img
                                className="cursor-pointer"
                                src="/assets/icons/cross.svg"
                                alt="cross"
                                role="button"
                                tabIndex={0}
                                onClick={handleRemoveAnswerOption(
                                  index,
                                  answerOption.id
                                )}
                                onKeyPress={handleRemoveAnswerOption(
                                  index,
                                  answerOption.id
                                )}
                              />
                            </div>
                          )
                        )}
                        <Button
                          className="mb-4"
                          variant="outlined"
                          color="primary"
                          fullwidth
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
                      </>
                    );
                  case 4:
                    return (
                      <>
                        {formData[index].answerOptions.map(
                          (
                            answerOption: AnswerOption,
                            anwserOptionIndex: number
                          ) => (
                            <div
                              key={answerOption.id}
                              className="flex items-center mb-4 w-full"
                            >
                              <Checkbox />
                              <TextField
                                className="mx-4"
                                placeholder={`${converter.toWordsOrdinal(
                                  anwserOptionIndex + 1
                                )} Option`}
                                fullwidth
                                onChange={handleChangeAnswerOption(
                                  index,
                                  anwserOptionIndex
                                )}
                              />
                              <img
                                className="cursor-pointer"
                                src="/assets/icons/cross.svg"
                                alt="cross"
                                role="button"
                                tabIndex={0}
                                onClick={handleRemoveAnswerOption(
                                  index,
                                  answerOption.id
                                )}
                                onKeyPress={handleRemoveAnswerOption(
                                  index,
                                  answerOption.id
                                )}
                              />
                            </div>
                          )
                        )}
                        <Button
                          className="mb-4"
                          variant="outlined"
                          color="primary"
                          fullwidth
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
                      </>
                    );
                  case 5:
                    return (
                      <>
                        {formData[index].answerOptions.map(
                          (
                            answerOption: AnswerOption,
                            anwserOptionIndex: number
                          ) => (
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
                                onChange={handleChangeAnswerOption(
                                  index,
                                  anwserOptionIndex
                                )}
                              />
                              <img
                                className="cursor-pointer"
                                src="/assets/icons/cross.svg"
                                alt="cross"
                                role="button"
                                tabIndex={0}
                                onClick={handleRemoveAnswerOption(
                                  index,
                                  answerOption.id
                                )}
                                onKeyPress={handleRemoveAnswerOption(
                                  index,
                                  answerOption.id
                                )}
                              />
                            </div>
                          )
                        )}
                        <Button
                          className="mb-4"
                          variant="outlined"
                          color="primary"
                          fullwidth
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
                      </>
                    );
                }
              })()}

              <div className="divider mb-6" />
              <div className="flex justify-between align-center">
                <span className="main__counter text-muted">
                  {index + 1} / {formData.length}
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
            disabled={formData.some((data) => !data.question)}
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
            disabled={formData.some((data) => !data.question)}
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
  answerType: options[2],
  answerOptions: [
    {
      id: uuidv4(),
      value: "",
    },
  ],
};

export default App;
