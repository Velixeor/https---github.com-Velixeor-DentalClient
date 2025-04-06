import React, { useState, useEffect } from "react";
import "../../styles/CommentsSection.css";
import { useTeethContext } from "../../context/TeethContext";

export function CommentsSection() {
  const { state, dispatch } = useTeethContext();
  const [input, setInput] = useState(state.comment); 

  useEffect(() => {
    if (state.comment!="") {
      setInput(state.comment);
    }else{
      setInput("");
    }
  }, [state.comment]); 

  const handleBlur = () => {
    if (input.trim() !== "") {
      dispatch({ type: "ADD_COMMENT", comment: input }); // Сохраняем комментарий в контексте при потере фокуса
    }
  };

  return (
    <div className="comments-section">
      <h3>Комментарии</h3>
      <textarea
        className="comment-input"
        placeholder="Комментарий..."
        value={input}  // Значение из состояния
        onChange={(e) => setInput(e.target.value)} // Обновление состояния при изменении текста
        onBlur={handleBlur} // Сохраняет текст при потере фокуса
      ></textarea>
    </div>
  );
}
