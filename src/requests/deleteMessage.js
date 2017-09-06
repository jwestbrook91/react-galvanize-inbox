export default function deleteMessage(messageId) {
  return fetch(`https://api.airtable.com/v0/appB41kaH02fQouxt/Messages/${messageId}`, {
    method: 'DELETE',
    headers: {
      Authorization: 'Bearer key7xuxEaJfKu00Al',
      'Content-Type': 'application/json'
    }
  })
    .then(response => response.json())
    .then(record => {
      return {
        id: record.id
      };
    });
}
