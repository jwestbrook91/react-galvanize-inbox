export default function createMessage(newMessage) {
  return fetch(`https://api.airtable.com/v0/appB41kaH02fQouxt/Table%201`, {
    method: 'POST',
    headers: {
      Authorization: 'Bearer key7xuxEaJfKu00Al',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      fields: {
        subject: newMessage.subject,
        read: newMessage.read,
        starred: newMessage.starred,
        labels: newMessage.labels.join(','),
        body: newMessage.body
      }
    })
  })
    .then(response => response.json())
    .then(record => {
      return {
        id: record.id
      };
    });
}
