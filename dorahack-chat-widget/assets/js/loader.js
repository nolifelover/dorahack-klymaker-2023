(() => {
  const me = document.querySelector(
    'script[data-license][data-name="sb-chat"]'
  );
  const license = me.getAttribute("data-license");

  console.log({ license });

  const toggleChat = () => {
    const container = document.getElementById("sb-chat-container");
    const widget = document.getElementById("sb-chat-widget");
    container.style.display =
      container.style.display === "none" ? "block" : "none";
    widget.style.display =
      container.style.display === "block" ? "none" : "block";
  };

  const appendChatWidget = (address = "") => {
    console.log({ address });
    const iframe = document.getElementById("sb-chat-iframe");
    const widgetUrl = `https://dorahack-catcha-chat.socialbureau.io/widget/chat/${address}`;
    iframe.src = widgetUrl;
  };

  const loadWidget = () => {
    // Open widget button element

    const chatWidget = document.createElement("button");
    chatWidget.id = "sb-chat-widget";
    chatWidget.innerHTML = `
       <svg fill="#ffffff" height="25px" width="25px" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 60 60" xml:space="preserve">
         <path d="M54,2H6C2.748,2,0,4.748,0,8v33c0,3.252,2.748,6,6,6h28.558l9.702,10.673C44.453,57.885,44.724,58,45,58
           c0.121,0,0.243-0.022,0.36-0.067C45.746,57.784,46,57.413,46,57V47h8c3.252,0,6-2.748,6-6V8C60,4.748,57.252,2,54,2z M12,15h15
           c0.553,0,1,0.448,1,1s-0.447,1-1,1H12c-0.553,0-1-0.448-1-1S11.447,15,12,15z M46,33H12c-0.553,0-1-0.448-1-1s0.447-1,1-1h34
           c0.553,0,1,0.448,1,1S46.553,33,46,33z M46,25H12c-0.553,0-1-0.448-1-1s0.447-1,1-1h34c0.553,0,1,0.448,1,1S46.553,25,46,25z"
         />
       </svg>
     `;
    chatWidget.style.position = "absolute";
    chatWidget.style.bottom = "10px";
    chatWidget.style.right = "10px";
    chatWidget.style.width = "60px";
    chatWidget.style.height = "60px";
    chatWidget.style.backgroundColor = "#1F2A37";
    chatWidget.style.border = "none";
    chatWidget.style.borderRadius = "50%";
    chatWidget.style.borderTopRightRadius = "10%";
    chatWidget.style.cursor = "pointer";
    chatWidget.style.outline = "none";
    chatWidget.style.paddingTop = "5px";
    chatWidget.onclick = toggleChat;
    document.body.appendChild(chatWidget);

    // Chat Container element
    const chatContainer = document.createElement("div");
    chatContainer.id = "sb-chat-container";
    chatContainer.style.display = "none";
    chatContainer.style.position = "absolute";
    chatContainer.style.bottom = "35px";
    chatContainer.style.right = "35px";
    chatContainer.style.width = "380px";
    chatContainer.style.backgroundColor = "tranparent";
    chatContainer.style.borderRadius = "10px";

    // Chat content element
    const chatContent = document.createElement("div");
    chatContent.innerHTML = `
      <div>
        <div id="sb-chat-header" style="display: flex; justify-content: flex-end; padding-right: 5px;"></div>
        <div id="sb-chat-feed"></div>
      </div>
    `;

    chatContainer.appendChild(chatContent);
    document.body.appendChild(chatContainer);

    const closeButton = document.createElement("div");
    closeButton.id = "sb-close-widget-btn";
    closeButton.style.display = "flex";
    closeButton.style.justifyContent = "center";
    closeButton.style.alignItems = "center";
    closeButton.style.paddingBottom = "2px";
    closeButton.style.cursor = "pointer";
    closeButton.style.width = "50px";
    closeButton.style.height = "25px";
    closeButton.style.backgroundColor = "rgba(0,0,0,0.5)";
    closeButton.style.borderRadius = "30px";
    closeButton.onclick = toggleChat;
    closeButton.innerHTML = `
      <span style="font-size: 20px; font-weight: 500; color: #ffffff; line-height: 0.8;">&times;</span>
    `;

    const chatHeader = document.getElementById("sb-chat-header");
    chatHeader.appendChild(closeButton);

    const chatFeed = document.getElementById("sb-chat-feed");
    chatFeed.style.backgroundColor = "#FFFFFF";
    chatFeed.style.height = "650px";
    chatFeed.style.marginTop = "5px";
    chatFeed.style.borderRadius = "5px";

    // Chat iframe
    const iframe = document.createElement("iframe");

    iframe.id = "sb-chat-iframe";
    iframe.style.boxSizing = "borderBox";
    iframe.style.width = "100%";
    iframe.style.height = "100%";
    iframe.style.border = 0;
    iframe.style.margin = 0;
    iframe.style.padding = 0;
    iframe.style.borderRadius = "10px";
    chatFeed.appendChild(iframe);

    iframe.addEventListener("load", () => (chatWidget.style.display = "block"));

    appendChatWidget();
  };

  const onClickSbChat = () => {
    var el = document.getElementsByClassName("sb-chat-widget");
    for (var i = 0; i < el.length; i++) {
      el[i].addEventListener("click", function (event) {
        if (this.dataset && this.dataset?.address) {
          console.log(this.dataset.address);
          appendChatWidget(this.dataset.address);
          toggleChat();
        }
      });
    }
  };

  if (document.readyState === "complete") {
    loadWidget();
    onClickSbChat();
  } else {
    document.addEventListener("readystatechange", () => {
      if (document.readyState === "complete") {
        loadWidget();
        onClickSbChat();
      }
    });
  }
})();
