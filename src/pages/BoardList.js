import { useEffect, useState } from "react";
import { getBoards } from "../api/BoardApi";
import { useNavigate } from "react-router-dom";
import "./Board.css";

function BoardList() {
  const [boards, setBoards] = useState([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);
  const [keyword, setKeyword] = useState("");
  const size = 10;

  const navigate = useNavigate();

  useEffect(() => {
    loadBoards();
  }, []);

  const loadBoards = async (pageNumber = 0, searchKeyword = "") => {
    const data = await getBoards(pageNumber, searchKeyword);

    setBoards(data.content);
    setTotalPages(data.totalPages);
    setTotalElements(data.totalElements);
    setPage(data.number);
  };

  return (
    <div className="board-container">
      <div className="board-header">
        <h2>게시판 샘플</h2>
      </div>
      <br />

      <div className="search-bar">
        <input
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          placeholder="검색어"
        />
        <button onClick={() => loadBoards(0, keyword)}>검색</button>
      </div>

      <div className="write-area">
        <button className="write-btn" onClick={() => navigate("/create")}>
          글쓰기
        </button>
      </div>

      <table className="board-table">
        <thead>
          <th>번호</th>
          <th>제목</th>
          <th>작성자</th>
          <th>작성일</th>
        </thead>
        <tbody>
          {boards.length === 0 ? (
            <tr>
              <td colSpan="4">게시글이 존재하지 않습니다.</td>
            </tr>
          ) : (
            boards.map((board, index) => (
              <tr key={board.boardId}>
                <td>{totalElements - (page * size + index)}</td>
                <td
                  className="title-cell"
                  onClick={() => navigate(`/${board.boardId}`)}
                >
                  {board.title}
                </td>
                <td>{board.writer}</td>
                <td>
                  {board.createdAt ? board.createdAt.substring(0, 10) : ""}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      <div className="pagination">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            className={page === i ? "active-page" : ""}
            onClick={() => loadBoards(i, keyword)}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
}

export default BoardList;
