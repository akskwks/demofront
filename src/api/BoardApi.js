const BASE_URL = "http://35.226.206.30:8080/api/boards";

// 게시판 목록
export const getBoards = async (page = 0, keyword = "") => {
  let url = `http://35.226.206.30:8080/api/boards?page=${page}&size=10`;

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
  const response = await fetch(`${BASE_URL}/${boardId}`);
  return response.json();
};

// 게시글 수정
export const updateBoard = async (boardId, data) => {
  const response = await fetch(`${BASE_URL}/${boardId}`, {
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
  await fetch(`${BASE_URL}/${boardId}`, {
    method: "DELETE",
  });
};

// 댓글 UI
export const getComments = async (boardId) => {
<<<<<<< HEAD
  const res = await fetch(
    `http://35.226.206.30:8080/api/boards/${boardId}/comments`,
  );
=======
  const res = await fetch(`http://35.226.206.30:8080/api/comments/${boardId}`);
>>>>>>> cdc244375f8c27e2e0a31a797f78b9e16b7c9ed8
  return res.json();
};

export const createComment = async (boardId, data) => {
<<<<<<< HEAD
  await fetch(`http://35.226.206.30:8080/api/boards/${boardId}/comments`, {
=======
  await fetch(`http://35.226.206.30:8080/api/comments/${boardId}`, {
>>>>>>> cdc244375f8c27e2e0a31a797f78b9e16b7c9ed8
    method: "POST",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify(data),
  });
};
