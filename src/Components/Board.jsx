import { useState } from 'react';
import './Board.css';
import { MoreHorizontal } from 'react-feather';
import Card from './Board/Card/Card';
import Editable from './Board/Editable/Editable';
import Dropdown from './Board/Dropdown/Dropdown';

function Board(props) {
  const [showDropdown, setShowDropdown] = useState(false);

  const initialCards = [
    // Sample cards
    { id: 1, title: 'Sample Card 1', labels: [], date: '', tasks: [] },
    { id: 2, title: 'Sample Card 2', labels: [], date: '', tasks: [] },
  ];

  const [cards, setCards] = useState(initialCards);

  const addCard = (title) => {
    const newCard = {
      id: Date.now(),
      title,
      labels: [],
      date: '',
      tasks: [],
    };
    setCards((prevCards) => [...prevCards, newCard]);
  };

  const removeCard = (cardId) => {
    setCards((prevCards) => prevCards.filter((card) => card.id !== cardId));
  };

  return (
    <div className="board">
      <div className="board_header">
        <p className="board_header_title">
          {props.board?.title}
          <span>{props.board?.cards?.length || 0}</span>
        </p>
        <div
          className="board_header_title_more"
          onClick={() => setShowDropdown(!showDropdown)}
        >
          <MoreHorizontal />
          {showDropdown && (
            <Dropdown class="board_dropdown" onClose={() => setShowDropdown(false)}>
              <p onClick={props.removeBoard}>Delete Board</p>
            </Dropdown>
          )}
        </div>
      </div>
      <div className="board_cards custom-scroll">
        {props.board?.cards?.map((item) => (
          <Card
            key={item.id}
            card={item}
            boardId={props.board.id}
            removeCard={props.removeCard}
            dragEntered={props.dragEntered}
            dragEnded={props.dragEnded}
            updateCard={props.updateCard}
          />
        ))}
        <Editable
          text="+ Add Card"
          placeholder="Enter Card Title"
          displayClass="board_add-card"
          editClass="board_add-card_edit"
          onSubmit={(value) => props.addCard(props.board?.id, value)}
        />
      </div>
    </div>
  );
}

export default Board;