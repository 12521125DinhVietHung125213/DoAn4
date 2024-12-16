import React, { useState, useEffect } from "react";
import "./AIchat.css";

const ChatAIApp = () => {
  const [chats, setChats] = useState(() => {
    const savedChats = localStorage.getItem("ai-saved-chats");
    return savedChats ? JSON.parse(savedChats) : [];
  });
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("ai-themeColor") || "dark_mode";
  });
  const [userMessage, setUserMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(true); // Trạng thái hiển thị danh sách gợi ý

  const API_KEY = "AIzaSyCVqQlTN7ylrRha-gzAdggRmsSPpyNfm0A";
  const API_URL = `https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=${API_KEY}`;

  useEffect(() => {
    localStorage.setItem("ai-saved-chats", JSON.stringify(chats));
  }, [chats]);

  useEffect(() => {
    localStorage.setItem("ai-themeColor", theme);
    document.body.classList.toggle("light_mode", theme === "light_mode");
  }, [theme]);
  
    const handleSendMessage = async (message) => {
      if (!message.trim() || isLoading) return;
  
      setChats((prevChats) => [
        ...prevChats,
        { text: message, type: "outgoing" },
      ]);
      setUserMessage("");
      setIsLoading(true);
  
      try {
        const response = await fetch(API_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [
              {
                role: "user",
                parts: [{ text: message }],
              },
            ],
          }),
        });
  
        const data = await response.json();
        const aiMessage =
          removeAsterisks(data?.candidates[0]?.content?.parts[0]?.text) || "Lỗi phản hồi từ AI.";
        setChats((prevChats) => [
          ...prevChats,
          { text: aiMessage, type: "incoming" },
        ]);
      } catch (error) {
        setChats((prevChats) => [
          ...prevChats,
          { text: "Không thể phản hồi, vui lòng thử lại.", type: "incoming" },
        ]);
      } finally {
        setIsLoading(false);
      }
    };  
  

  const handleSuggestionClick = (text) => {
    setUserMessage(text);
    handleSendMessage(text);
    setShowSuggestions(false); // Ẩn danh sách gợi ý
  };

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "dark_mode" ? "light_mode" : "dark_mode"));
  };

  const deleteAllChats = () => {
    if (window.confirm("Bạn có chắc chắn muốn xóa toàn bộ lịch sử chat?")) {
      setShowSuggestions(true);
      setChats([]);
      localStorage.removeItem("ai-saved-chats");
    }
  };

  function removeAsterisks(text) {
    return text.replace(/\*/g, "").trim(); // Loại bỏ dấu * và cắt khoảng trắng thừa
  }
  
  return (
    <div id="ai-chat">
      <div className="ai-all">
        {/* AI Suggestion List */}
        {showSuggestions && ( // Hiển thị gợi ý nếu `showSuggestions` là true
          <ul className="ai-suggestion-list">
            {[
              "Nếu tôi bị ho cần điều trị như thế nào để tình hình sức khỏe được cải thiện tốt hơn?",
              "Nếu tôi bị sổ mũi thì phải xử lý như thế nào?",
              "Bạn có thể tư vấn giúp tôi kế hoạch giảm cân?",
              "Tư vấn thói quen sinh hoạt lành mạnh giúp sức khỏe trở nên tốt hơn.",
            ].map((suggestion, index) => (
              <li
                key={index}
                className="ai-suggestion"
                onClick={() => handleSuggestionClick(suggestion)}
              >
                <h4 className="ai-text">{suggestion}</h4>
                <span className="ai-icon material-symbols-rounded">draw</span>
              </li>
            ))}
          </ul>
        )}

        {/* AI Chat List */}
        <div className="ai-chat-list">
          <div className="ai-chat-grid">
            {chats.map((chat, index) => (
              <div
                key={index}
                className={`ai-message ${chat.type === "outgoing" ? "outgoing" : "incoming"}`}
              >
                <div className="ai-message-content">
                  <img
                    className="ai-avatar"
                    src={
                      chat.type === "outgoing"
                        ? "https://img.icons8.com/?size=100&id=ScJCfhkd77yD&format=png&color=000000"
                        : "https://img.icons8.com/?size=100&id=kTuxVYRKeKEY&format=png&color=000000"
                    }
                    alt={chat.type === "outgoing" ? "User avatar" : "AI avatar"}
                  />
                  <p className="ai-text">{chat.text}</p>
                </div>
                {chat.type === "incoming" && (
                  <span
                    onClick={() => navigator.clipboard.writeText(chat.text)}
                    className="ai-icon material-symbols-rounded"
                  >
                    content_copy
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* AI Typing Area */}
        <div className="ai-typing-area">
          <form
            className="ai-typing-form"
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage(userMessage);
            }}
          >
            <div className="ai-input-wrapper">
              <input
                type="text"
                placeholder="Nhập câu hỏi của bạn tại đây..."
                className="ai-typing-input"
                value={userMessage}
                onChange={(e) => setUserMessage(e.target.value)}
                required
              />
              <button
                type="submit"
                id="send-ai-message-button"
                className="ai-icon material-symbols-rounded"
              >
                send
              </button>
            </div>
            <div className="ai-action-buttons">
              <span
                id="theme-ai-toggle-button"
                className="ai-icon material-symbols-rounded"
                onClick={toggleTheme}
              >
                {theme}
              </span>
              <span
                id="delete-ai-chat-button"
                className="ai-icon material-symbols-rounded"
                onClick={deleteAllChats}
              >
                delete
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChatAIApp;
