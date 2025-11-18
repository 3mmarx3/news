
    const commentsList = document.getElementById("comments-list");
    const form = document.getElementById("commentForm");

    function loadComments() {
      const stored = localStorage.getItem("comments");
      if (!stored) return;
      const comments = JSON.parse(stored);
      comments.forEach(addCommentToDOM);
    }

    function addCommentToDOM(c) {
      const div = document.createElement("div");
      div.className = "comment";
      div.innerHTML = `
        <div class="avatar" style="background-image:url('${c.avatar}')"></div>
        <div class="comment-content">
          <div class="comment-name">${c.name}</div>
          <div class="comment-text">${c.text}</div>
          <div class="comment-time">${c.time}</div>
        </div>
      `;
      commentsList.appendChild(div);
    }

    function saveComment(data) {
      const stored = localStorage.getItem("comments");
      const comments = stored ? JSON.parse(stored) : [];
      comments.push(data);
      localStorage.setItem("comments", JSON.stringify(comments));
    }

    form.addEventListener("submit", function(e) {
      e.preventDefault();
      const name = document.getElementById("nameInput").value.trim();
      const text = document.getElementById("textInput").value.trim();
      if (!name || !text) return;
      const avatar = `https://api.dicebear.com/7.x/thumbs/svg?seed=${name.replace(/\s+/g,'')}`;
      const time = new Date().toLocaleString();
      const data = { name, text, avatar, time };
      addCommentToDOM(data);
      saveComment(data);
      document.getElementById("nameInput").value = "";
      document.getElementById("textInput").value = "";
    });

    loadComments();
