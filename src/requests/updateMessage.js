export default function updateMessage(messageId, type, labels = [], label) {
  let updatedMessage;
  switch (type) {
    case 'star':
      updatedMessage = { starred: true };
      break;
    case 'unstar':
      updatedMessage = { starred: false };
      break;
    case 'read':
      updatedMessage = { read: true };
      break;
    case 'unread':
      updatedMessage = { read: false };
      break;
    case 'addLabel':
      updatedMessage = { labels: labels + ',' + label };
      break;
    case 'removeLabel':
      updatedMessage = { labels: labels.join(',') };
      break;
    default:
      break;
  }

  return fetch(`https://api.airtable.com/v0/appB41kaH02fQouxt/Table%201/${messageId}`, {
    method: 'PATCH',
    headers: {
      Authorization: 'Bearer key7xuxEaJfKu00Al',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      fields: updatedMessage
    })
  })
    .then(response => response.json())
    .then(record => {
      return {
        id: record.id,
        body: record.fields.body || '',
        subject: record.fields.subject || '',
        read: record.fields.read || '',
        starred: record.fields.starred || '',
        labels: record.fields.length > 1 ? record.fields.labels.join(',') : []
      };
    });
}
