import React, { ChangeEvent, Fragment, useState } from "react";
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

const App = () => {
  const [formData, setFormData] = useState<any[]>([defaultFormData]);

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

  return (
    <Fragment>
      <AppBar>
        <div className="header container flex justify-between align-center h-full">
          <img src="/assets/icons/logo.svg" alt="logo" />
          <input
            className="header__input"
            type="text"
            defaultValue="Questions about Latin"
          />
          <Button className="header__button">Login</Button>
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
                fullwidth
                onChange={handleChange(index)}
              />
              <div className="divider mb-4" />
              <Select
                className="mb-4"
                label="Answer"
                value={data.answerType}
                options={options}
                onChange={handleSelectionChange(index)}
              >
                Select an option
              </Select>

              {data.answerType.value === 1 && (
                <TextField
                  className="mb-4"
                  name="short_answer"
                  placeholder="Short answer text"
                  fullwidth
                  onChange={handleChange(index)}
                />
              )}
              {data.answerType.value === 2 && (
                <TextArea
                  name="paragraph"
                  fullwidth
                  onChange={handleChange(index)}
                />
              )}
              {data.answerType.value === 3 && (
                <Fragment>
                  <div className="flex items-center mb-4 w-full">
                    <Radio name="radio-name" />
                    <TextField className="mx-4" fullwidth />
                    <img
                      className="cursor-pointer"
                      src="/assets/icons/cross.svg"
                      alt="cross"
                    />
                  </div>
                  <div className="flex items-center mb-4 w-full">
                    <Radio name="radio-name" />
                    <TextField className="mx-4" fullwidth />
                    <img
                      className="cursor-pointer"
                      src="/assets/icons/cross.svg"
                      alt="cross"
                    />
                  </div>
                  <Button
                    className="mb-4"
                    variant="outlined"
                    color="primary"
                    fullwidth
                  >
                    <img
                      className="mr-2"
                      src="/assets/icons/plus.svg"
                      alt="plus"
                    />
                    <span>Add Option</span>
                  </Button>
                </Fragment>
              )}
              {data.answerType.value === 4 && (
                <Fragment>
                  <div className="flex items-center mb-4 w-full">
                    <Checkbox />
                    <TextField
                      className="mx-4"
                      name="paragraph"
                      placeholder=""
                      fullwidth
                    />
                    <img
                      className="cursor-pointer"
                      src="/assets/icons/cross.svg"
                      alt="cross"
                    />
                  </div>
                  <Button
                    className="mb-4"
                    variant="outlined"
                    color="primary"
                    fullwidth
                  >
                    <img
                      className="mr-2"
                      src="/assets/icons/plus.svg"
                      alt="plus"
                    />
                    <span>Add Option</span>
                  </Button>
                </Fragment>
              )}

              <div className="divider mb-6" />
              <div className="flex justify-between align-center">
                <span className="main__counter text-muted">
                  {index + 1} / {formData.length}
                </span>
                <div className="flex align-center">
                  <img
                    className="main__action-icon"
                    src="/assets/icons/chevron-up.svg"
                    alt="chevron-up"
                  />
                  <img
                    className="main__action-icon"
                    src="/assets/icons/chevron-down.svg"
                    alt="chevron-down"
                  />
                  <img
                    className="main__action-icon"
                    src="/assets/icons/bin.svg"
                    alt="bin"
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
            onClick={handleAddQuestion}
          >
            <img className="mr-2" src="/assets/icons/plus.svg" alt="plus" />
            <span>Add Question</span>
          </Button>
          <Button className="mb-4" variant="contained" type="submit" fullwidth>
            Save & Share
          </Button>
        </form>
      </main>
    </Fragment>
  );
};

const options = [
  {
    label: "Short Answer Text",
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
];

const defaultFormData = {
  id: uuidv4(),
  answerType: options[0],
};

export default App;
