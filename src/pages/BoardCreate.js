import { useState } from "react";
import { createBoard } from "../api/BoardApi";
import { useNavigate } from "react-router-dom";
import "./Board.css";

function BoardCreate() {
  const [form, setForm] = useState({
    title: "",
    content: "",
    writer: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createBoard(form);
    navigate("/");
  };

  return (
    <div className="board-container">
      <h2>글쓰기</h2>
      <form className="board-form" onSubmit={handleSubmit}>
        <input
          name="title"
          placeholder="제목"
          onChange={handleChange}
          required
        />
        <input
          name="writer"
          placeholder="작성자"
          onChange={handleChange}
          required
        />
        <textarea
          name="content"
          placeholder="내용을 입력하세요."
          rows="6"
          onChange={handleChange}
          required
        />
        <button type="submit" className="submit-btn">
          등록
        </button>
        <button className="cancel-btn" onClick={() => navigate("/")}>
          취소
        </button>
      </form>
    </div>
  );
}

export default BoardCreate;
