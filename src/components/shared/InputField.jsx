import PropTypes from "prop-types";

const InputField = ({ label, type = "text", id, value, onChange }) => (
  <div>
    <label htmlFor={id}>{label}</label>
    <input type={type} id={id} value={value} onChange={onChange} />
  </div>
);

InputField.propTypes = {
  label: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default InputField;
