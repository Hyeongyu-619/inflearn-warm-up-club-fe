import React, { useState, useEffect } from "react";
import "./App.css";

interface Book {
  title: string;
  author: string;
}

const App: React.FC = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [books, setBooks] = useState<Book[]>([]);
  const [notification, setNotification] = useState<string | null>(null);
  const [isDeleteNotification, setIsDeleteNotification] = useState(false);

  const handleAddBook = () => {
    if (title && author) {
      const newBook = { title, author };
      setBooks([...books, newBook]);
      setNotification("책이 추가되었습니다.");
      setIsDeleteNotification(false);
      setTitle("");
      setAuthor("");
    }
  };

  const handleDeleteBook = (index: number) => {
    const updatedBooks = books.filter((_, i) => i !== index);
    setBooks(updatedBooks);
    setNotification("책이 삭제되었습니다.");
    setIsDeleteNotification(true);
  };

  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => {
        setNotification(null);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  return (
    <div className="app-container">
      <h1>책 리스트</h1>

      {notification && (
        <div
          className={
            isDeleteNotification ? "notification-delete" : "notification"
          }
        >
          {notification}
        </div>
      )}

      <div className="form">
        <input
          type="text"
          placeholder="책 이름"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="책 저자"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />
        <button onClick={handleAddBook} disabled={!title || !author}>
          제출
        </button>
      </div>

      <table>
        <thead>
          <tr>
            <th>책 이름</th>
            <th>책 저자</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {books.map((book, index) => (
            <tr key={index}>
              <td>{book.title}</td>
              <td>{book.author}</td>
              <td>
                <button onClick={() => handleDeleteBook(index)}>삭제</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default App;
