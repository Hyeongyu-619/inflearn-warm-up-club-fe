import React, { useState } from "react";
import "./App.css";

interface BudgetItem {
  name: string;
  cost: number;
}

function App() {
  const [items, setItems] = useState<BudgetItem[]>([]);
  const [itemName, setItemName] = useState<string>("");
  const [cost, setCost] = useState<string>("");
  const [totalCost, setTotalCost] = useState<number>(0);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [notification, setNotification] = useState<string>("");
  const [notificationType, setNotificationType] = useState<
    "success" | "error" | ""
  >("");

  const handleSubmit = (): void => {
    if (itemName === "" || cost === "") return;

    let newItems = [...items];
    let updatedTotalCost = totalCost;

    if (editIndex !== null) {
      updatedTotalCost -= items[editIndex].cost;
      newItems[editIndex] = { name: itemName, cost: parseInt(cost) };
      updatedTotalCost += parseInt(cost);
      setNotificationType("success");
      setNotification("항목이 수정되었습니다.");
    } else {
      newItems.push({ name: itemName, cost: parseInt(cost) });
      updatedTotalCost += parseInt(cost);
      setNotificationType("success");
      setNotification("항목이 추가되었습니다.");
    }

    setItems(newItems);
    setTotalCost(updatedTotalCost);
    setItemName("");
    setCost("");
    setEditIndex(null);

    setTimeout(() => {
      setNotification("");
    }, 3000);
  };

  const handleDelete = (index: number): void => {
    const newItems = [...items];
    const deletedItemCost = newItems[index].cost;
    newItems.splice(index, 1);
    setItems(newItems);
    setTotalCost(totalCost - deletedItemCost);
    setNotificationType("error");
    setNotification("항목이 삭제되었습니다.");

    setTimeout(() => {
      setNotification("");
    }, 3000);
  };

  const handleEdit = (index: number): void => {
    setItemName(items[index].name);
    setCost(items[index].cost.toString());
    setEditIndex(index);
  };

  const handleClearAll = (): void => {
    setItems([]);
    setTotalCost(0);
    setNotificationType("error");
    setNotification("모든 항목이 삭제되었습니다.");

    setTimeout(() => {
      setNotification("");
    }, 3000);
  };

  return (
    <div className="app-container">
      <h1>예산 계산기</h1>

      {notification && (
        <div className={`notification ${notificationType}`}>{notification}</div>
      )}

      <div className="input-container">
        <input
          type="text"
          placeholder="지출 항목"
          value={itemName}
          onChange={(e) => setItemName(e.target.value)}
        />
        <input
          type="number"
          placeholder="비용"
          value={cost}
          onChange={(e) => setCost(e.target.value)}
        />
        <button
          className={`submit-btn ${editIndex !== null ? "edit" : ""}`}
          onClick={handleSubmit}
        >
          {editIndex !== null ? "수정" : "제출"}
        </button>
      </div>

      <ul className="item-list">
        {items.map((item, index) => (
          <li key={index}>
            <span>{item.name}</span>
            <span>{item.cost}원</span>
            <div className="button-group">
              <button className="edit-btn" onClick={() => handleEdit(index)}>
                수정
              </button>
              <button
                className="delete-btn"
                onClick={() => handleDelete(index)}
              >
                삭제
              </button>
            </div>
          </li>
        ))}
      </ul>

      <div className="footer">
        <button onClick={handleClearAll}>목록 지우기</button>
        <span>총 지출: {totalCost}원</span>
      </div>
    </div>
  );
}

export default App;
