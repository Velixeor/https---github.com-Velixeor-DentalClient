import React, { useState } from "react";
import "../../styles/CommentsSection.css";
import { useTeethContext } from "../../context/TeethContext";

export function CommentsSection() {
  const { state, dispatch } = useTeethContext();
  const [input, setInput] = useState(state.comments.join("\n")); // Загружаем сохранённые комментарии в textarea

  const handleBlur = () => {
    if (input.trim() !== "") {
      dispatch({ type: "ADD_COMMENT", comment: input });
    }
  };

  return (
    <div className="comments-section">
      <h3>Комментарии</h3>
      <textarea
        className="comment-input"
        placeholder="Комментарий..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onBlur={handleBlur} // Сохраняет текст при потере фокуса
      ></textarea>
    </div>
  );
}
