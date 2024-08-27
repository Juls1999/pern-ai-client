import React, { useState, useRef, useEffect } from "react";
import styles from "./ChatBox.module.css";
import { FaThumbsUp, FaThumbsDown } from "react-icons/fa";
import { v4 as uuidv4 } from "uuid";
import { createFeedback, sendPrompt } from "../api/api_config_dev";

const ChatBox = () => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const messagesEndRef = useRef(null);

  // Function to send feedback data to the server
  const sendFeedbackToServer = async (prompt, response, feedback_type) => {
    try {
      const result = await fetch(`${createFeedback.url}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt,
          response,
          feedback_type,
        }),
      });

      if (!result.ok) {
        const errorText = await result.text(); // Read the error response body
        throw new Error(
          `Network response was not ok: ${result.status} ${errorText}`
        );
      }

      //console.log("Feedback sent successfully");
    } catch (error) {
      console.error("Error sending feedback:", error);
    }
  };

  const handleSendMessage = async () => {
    if (inputValue.trim()) {
      const newUserMessage = { text: inputValue, type: "user", id: uuidv4() };
      setMessages([...messages, newUserMessage]);
      setInputValue("");

      try {
        const response = await fetch(`${sendPrompt.url}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userMessage: inputValue }),
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        setMessages((prevMessages) => [
          ...prevMessages,
          {
            text: data.aiMessage,
            type: "bot",
            id: uuidv4(),
            feedback: null,
            userMessageId: newUserMessage.id,
          },
        ]);
      } catch (error) {
        console.error("Error:", error);
        setMessages((prevMessages) => [
          ...prevMessages,
          {
            text: "There was an error with the request. Please try again.",
            type: "bot",
            id: uuidv4(),
            feedback: null,
            userMessageId: newUserMessage.id,
          },
        ]);
      }
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleFeedback = async (messageId, feedbackType) => {
    const message = messages.find((msg) => msg.id === messageId);

    if (message && message.type === "bot") {
      // Find the user message corresponding to this bot message
      const userMessage =
        messages.find((msg) => msg.id === message.userMessageId)?.text || "";
      const aiMessage = message.text;

      // Update the message with the feedback
      setMessages((prevMessages) =>
        prevMessages.map((msg) =>
          msg.id === messageId ? { ...msg, feedback: feedbackType } : msg
        )
      );

      // Send feedback to the server if it's thumbs down
      if (feedbackType === "down") {
        await sendFeedbackToServer(userMessage, aiMessage, feedbackType);
      }
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="d-flex flex-column h-100 justify-content-center align-items-center">
      <div className={`${styles.chatBox}`}>
        <div className={`${styles.messages}`}>
          {messages.map((message) => (
            <div
              key={message.id}
              className={`${styles.message} ${
                message.type === "user"
                  ? styles.userMessage
                  : styles.responseMessage
              }`}
            >
              {message.text}
              {message.type === "bot" && (
                <div className={styles.feedbackButtons}>
                  <button
                    className={`${styles.feedbackButton} ${
                      message.feedback === "up" ? styles.thumbsUpActive : ""
                    }`}
                    onClick={() => handleFeedback(message.id, "up")}
                  >
                    <FaThumbsUp />
                  </button>
                  <button
                    className={`${styles.feedbackButton} ${
                      message.feedback === "down" ? styles.thumbsDownActive : ""
                    }`}
                    onClick={() => handleFeedback(message.id, "down")}
                  >
                    <FaThumbsDown />
                  </button>
                </div>
              )}
            </div>
          ))}

          <div ref={messagesEndRef} />
        </div>
        <div className={`${styles.inputContainer}`}>
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type a message..."
          />
          <button type="button" onClick={handleSendMessage}>
            Send
          </button>
        </div>
      </div>
      <p className="text-danger text-center">
        Chatbot can make mistakes. Check important info.
      </p>
    </div>
  );
};

export default ChatBox;
