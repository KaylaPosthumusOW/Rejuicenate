// Primary Filled Button
import Button from "react-bootstrap/Button";
import '../styles/buttons.css'

function SecondaryBtn(props) {
  return (
    <Button
      onClick={props.onClick}
      className="secondaryBtn"
      type={props.type}
    >
      {props.label}
    </Button>
  );
}

export default SecondaryBtn;
