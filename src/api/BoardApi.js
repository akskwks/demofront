const BASE_URL = "http://localhost:8080/api/boards";

// 게시판 목록
export const getBoards = async (page = 0, keyword = "") => {
  let url = `http://localhost:8080/api/boards?page=${page}&size=10`;

  if (keyword) {
    url += `&keyword=${keyword}`;
  }

  const response = await fetch(url);
  return response.json();
};

// 게시글 추가
export const createBoard = async (data) => {
  const response = await fetch(BASE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return response.json();
};

// 게시글 상세 보기
export const getBoardDetail = async (boardId) => {
  const response = await fetch(`http://localhost:8080/api/boards/${boardId}`);
  return response.json();
};

// 게시글 수정
export const updateBoard = async (boardId, data) => {
  const response = await fetch(`http://localhost:8080/api/boards/${boardId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return response.json();
};

// 게시글 삭제
export const deleteBoard = async (boardId) => {
  await fetch(`http://localhost:8080/api/boards/${boardId}`, {
    method: "DELETE",
  });
};

// 댓글 UI
export const getComments = async (boardId) => {
  const res = await fetch(`http://localhost:8080/api/comments/${boardId}`);
  return res.json();
};

export const createComment = async (boardId, data) => {
  await fetch(`http://localhost:8080/api/comments/${boardId}`, {
    method: "POST",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify(data),
  });
};
