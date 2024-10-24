// Primary Filled Button
import Button from "react-bootstrap/Button";
import '../styles/buttons.css'

function PrimaryBtn(props) {
  return (
    <Button
      onClick={props.onClick}
      className="primaryBtn"
      type={props.type}
    >
      {props.label}
    </Button>
  );
}

export default PrimaryBtn;
