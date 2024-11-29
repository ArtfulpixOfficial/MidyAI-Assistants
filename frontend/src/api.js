const getAssistantsList = async function () {
  const list = await (
    await fetch(`${process.env.REACT_APP_BASE_URL}/api/assistants`)
  ).json();
  return list;
};

const startNewChat = async function (id) {
  const conversationData = await (
    await fetch(`${process.env.REACT_APP_BASE_URL}/api/newchat`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ assistantId: id }),
    })
  ).json();
  return conversationData;
};

const getConversationData = async function (threadId, content, assistantId) {
  const data = await (
    await fetch(`${process.env.REACT_APP_BASE_URL}/api/newMessage`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        threadId,
        content,
        assistantId,
      }),
    })
  ).json();
  return data;
};
export { getAssistantsList, startNewChat, getConversationData };
