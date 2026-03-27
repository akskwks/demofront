import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  getBoardDetail,
  deleteBoard,
  getComments,
  createComment,
} from "../api/BoardApi";
import "./Board.css";

function BoardDetail() {
  const { boardId } = useParams();
  const navigate = useNavigate();
  const [board, setBoard] = useState(null);
  const [comments, setComments] = useState([]);
  const [commentForm, setCommentForm] = useState({
    content: "",
    writer: "",
  });

  useEffect(() => {
    loadBoard();
    loadComments();
  }, []);

  const loadBoard = async () => {
    const data = await getBoardDetail(boardId);
    setBoard(data);
  };

  const loadComments = async () => {
    const data = await getComments(boardId);
    setComments(data);
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    await createComment(boardId, commentForm);
    setCommentForm({ content: "", writer: " " });
    loadComments();
  };

  const handleDelete = async () => {
    if (window.confirm("삭제하시겠습니까?")) {
      await deleteBoard(boardId);
      navigate("/");
    }
  };

  if (!board) return <div>로딩중...</div>;

  return (
    <div className="board-container">
      <div className="detail-card">
        <h2>{board.title}</h2>
        <div className="detail-meta">
          <span>작성자 : {board.writer}</span>
          <span>작성일 : {board.createdAt.substring(0, 10)}</span>
          <span>조회수 : {board.viewCount}</span>
        </div>
        <hr />
        <p className="datail-content">{board.content}</p>

        <div className="detail-buttons">
          <button className="list-btn" onClick={() => navigate("/")}>
            목록
          </button>
          <button onClick={() => navigate(`/edit/${boardId}`)}>수정</button>
          <button className="delete-btn" onClick={handleDelete}>
            삭제
          </button>
        </div>

        <hr />

        <h3>댓글</h3>

        <form onSubmit={handleCommentSubmit}>
          <input
            placeholder="작성자"
            value={commentForm.writer}
            onChange={(e) =>
              setCommentForm({ ...commentForm, writer: e.target.value })
            }
          />
          <input
            placeholder="댓글 내용"
            value={commentForm.content}
            onChange={(e) =>
              setCommentForm({ ...commentForm, content: e.target.value })
            }
          />
          <button type="submit">등록</button>
        </form>

        <table>
          <tbody>
            {comments.length === 0 ? (
              <tr>
                <td colSpan="4">댓글이 존재하지 않습니다.</td>
              </tr>
            ) : (
              comments.map((c) => (
                <tr key={c.commentId}>
                  <td> {c.writer} </td>
                  <td> {c.content} </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default BoardDetail;
