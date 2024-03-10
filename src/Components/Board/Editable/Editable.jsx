import { useState } from 'react';
import { X } from 'react-feather';
import './Edtable.css';

function Editable(props) {
  const [showEdit, setShowEdit] = useState(false);
  const [inputValue, setInputValue] = useState(props.text || '');

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (props.onSubmit) props.onSubmit(inputValue);
    setShowEdit(false);
  };

  return (
    <div className="editable">
      {showEdit ? (
        <form
          className={`editable_edit ${props.editClass || ''}`}
          onSubmit={handleSubmit}
        >
          <input
            autoFocus
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            placeholder={props.placeholder || 'Enter Item'}
          />
          <div className="editable_edit_footer">
            <button type="submit">{props.buttonText || 'Add'}</button>
            <X className='svg' onClick={() => setShowEdit(false)} />
          </div>
        </form>
      ) : (
        <p
          className={`editable_display ${props.displayClass || ''}`}
          onClick={() => setShowEdit(true)}
        >
          {props.text || 'Add item'}
        </p>
      )}
    </div>
  );
}

export default Editable;
