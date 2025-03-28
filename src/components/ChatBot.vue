<template>
  <div class="chatbot-container">
    <button
      class="chat-button"
      @click="toggleChat"
    >
      💬
    </button>
  
    <div
      v-if="isChatOpen"
      class="chat-frame"
    >
      <div class="chat-header">
        <span>🤖 Chatbot</span>
        <button
          class="close-btn"
          @click="toggleChat"
        >
          ×
        </button>
      </div>
      <iframe
        ref="chatFrame"
        src="http://localhost:3001"
        class="chat-iframe"
      />
    </div>
  </div>
</template>
  
  <script>
  export default {
    data() {
      return {
        isChatOpen: false,
        frameUrl: import.meta.env.VITE_FRAME_URL
      };
    },
    methods: {
      toggleChat() {
        this.isChatOpen = !this.isChatOpen;
      },
    },
  };
  </script>
  
  <style scoped>
  .chatbot-container {
    position: fixed;
    bottom: 20px;
    right: 20px;
    z-index: 1000;
  }
  
  .chat-button {
    width: 60px;
    height: 60px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 50%;
    font-size: 24px;
    cursor: pointer;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
    transition: background 0.3s ease;
  }
  .chat-button:hover {
    background-color: #0056b3;
  }
  
  .chat-frame {
    position: fixed;
    bottom: 90px;
    right: 20px;
    width: 350px;
    height: 500px;
    background: white;
    border-radius: 10px;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
    overflow: hidden;
    display: flex;
    flex-direction: column;
  }
  
  .chat-header {
    background: #007bff;
    color: white;
    padding: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-weight: bold;
  }
  
  .close-btn {
    background: none;
    border: none;
    color: white;
    font-size: 20px;
    cursor: pointer;
  }
  
  .chat-iframe {
    flex: 1;
    width: 100%;
    height: 100%;
    border: none;
  }
  </style>