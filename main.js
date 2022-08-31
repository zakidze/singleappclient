import { allmessagearray as messagedb } from "./messagesdb";
import { socket } from "./socketioconnection";
const connectionStatus = document.getElementById("connectionStatus");
const getConnectionid = document.getElementById("getConnectionid");
const sendmessage = document.getElementById("sendmessage");
const messangingbarid = document.getElementById("messangingbarid");

socket.on("connect", () => {
  connectionStatus.innerHTML = "connected";
  getConnectionid.innerHTML = socket.id;
});

sendmessage.addEventListener("click", () => {
  socket.emit("sendmsgtoserver", messangingbarid.value);
  messangingbarid.value = "";
});

socket.on("sendmsgtoclient", (message) => {
  const clonemsgdb = messagedb;
  clonemsgdb.push(message);
  rendermessage(clonemsgdb);
});

const rendermessage = (newarray) => {
  recivedchatbox.innerHTML = "";

  newarray.forEach((message) => {
    recivedfunctionmessage(message.content, message.sender, message.time);
  });
};

const recivedfunctionmessage = (messageContent, sender, time) => {
  const recivedmessagetemplate = document.getElementById(
    "recivedmessagetemplate"
  );
  const clonsentTextTemplate = recivedmessagetemplate.content.cloneNode(true);
  clonsentTextTemplate.querySelector(".messageContent").textContent =
    messageContent;
  clonsentTextTemplate.querySelector(".timeofmsg").textContent = time;
  clonsentTextTemplate.querySelector(".nameofperson").textContent = sender;
  recivedchatbox.appendChild(clonsentTextTemplate);
};
const sentmessages = (messageContent, sender, time) => {
  const sentmessagetemplate = document.getElementById("sentmessagetemplate");
  const clonsentTextTemplate = sentmessagetemplate.content.cloneNode(true);
  clonsentTextTemplate.querySelector(".messageContent").textContent =
    messageContent;
  clonsentTextTemplate.querySelector(".timeofmsg").textContent = time;
  clonsentTextTemplate.querySelector(".nameofperson").textContent = sender;
  recivedchatbox.appendChild(clonsentTextTemplate);
};
