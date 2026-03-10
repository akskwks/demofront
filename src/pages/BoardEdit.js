import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getBoardDetail, updateBoard } from "../api/BoardApi";
import "./Board.css";

function BoardEdit() {
  const { boardId } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    content: "",
    writer: "",
  });

  useEffect(() => {
    loadBoard();
  }, []);

  const loadBoard = async () => {
    const data = await getBoardDetail(boardId);
    setForm({
      title: data.title,
      content: data.content,
      writer: data.writer,
    });
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateBoard(boardId, form);
    navigate(`/${boardId}`);
  };

  return (
    <div className="board-container">
      <h2>게시글 수정</h2>
      <form className="board-form" onSubmit={handleSubmit}>
        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          required
        />
        <input
          name="writer"
          value={form.writer}
          onChange={handleChange}
          required
        />
        <textarea
          name="content"
          rows="6"
          value={form.content}
          onChange={handleChange}
          required
        />
        <button type="submit" className="submit-btn">
          등록
        </button>
        <button className="cancel-btn" onClick={() => navigate(`/`)}>
          취소
        </button>
      </form>
    </div>
  );
}

export default BoardEdit;
