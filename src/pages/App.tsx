import React, { Fragment } from "react";
import AppBar from "src/components/AppBar/AppBar";
import Button from "src/components/Button/Button";
import Select from "src/components/Select/Select";
import TextField from "src/components/TextField/TextField";
import "../styles/app.scss";

function App() {
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
        <div className="card mb-8">
          <TextField
            className="mb-4"
            label="Question"
            placeholder="Lorem ipsum dolor sit amet?"
            fullwidth
          />
          <div className="divider mb-4" />
          <Select className="mb-4" label="Answer" options={options}>
            Select an option
          </Select>

          <TextField
            className="mb-4"
            placeholder="Short answer text"
            fullwidth
          />
          <div className="divider mb-6" />
          <div className="flex justify-between align-center">
            <span className="main__counter text-muted">2 / 2</span>
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
              />
            </div>
          </div>
          {/* <Button className="mx-4" variant="outlined">
            Hello
          </Button>
          <Button className="mx-4" variant="text">
            + Hello
          </Button>
          <Button variant="outlined" fullwidth>
            <span className="block mr-10px">+</span> Button text
          </Button>
          <TextField placeholder="Placeholder" label="First Name" />
          <Radio label="this is radio" fullwidth value="dskjfajds" />
          <Radio label="this is radio" fullwidth value="dskjfajds" />
          <Radio label="this is radio" fullwidth value="dskjfajds" />
          <Radio label="this is radio" fullwidth value="dskjfajds" />
          <Radio label="this is radio" fullwidth value="dskjfajds" />
          <Checkbox label="this is checkbox" fullwidth value="dskjfajds" />
          <TextArea label="Paragraph" fullwidth rows={8} /> */}
        </div>

        <Button className="mb-4" variant="outlined" color="primary" fullwidth>
          <img className="mr-2" src="/assets/icons/plus.svg" alt="plus" />
          <span>Add Question</span>
        </Button>
        <Button className="mb-4" variant="contained" fullwidth>
          Save & Share
        </Button>
      </main>
    </Fragment>
  );
}

const options = [
  {
    label: "Short Answer Text",
    value: "1",
  },
  {
    label: "Paragraph",
    value: "2",
  },
  {
    label: "Multiple Choice",
    value: "3",
  },
];

export default App;
