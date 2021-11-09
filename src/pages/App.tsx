import React, { Fragment } from "react";
import AppBar from "src/components/AppBar/AppBar";
import Button from "src/components/Button/Button";
import Checkbox from "src/components/Checkbox/Checkbox";
import Dropdown from "src/components/Dropdown/Dropdown";
import Radio from "src/components/Radio/Radio";
import TextArea from "src/components/TextArea/TextArea";
import TextField from "src/components/TextField/TextField";
import "../styles/app.scss";

function App() {
  return (
    <Fragment>
      <AppBar>
        <div className="container flex align-center h-full">dsafsdfdsa</div>
      </AppBar>
      <div className="container mt-4">
        <Button className="mx-4" variant="outlined">
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
        <Dropdown style={{ marginBottom: "2rem" }} options={options} fullwidth>
          Select an option
        </Dropdown>
        <TextArea label="Paragraph" fullwidth rows={8} />
      </div>
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
