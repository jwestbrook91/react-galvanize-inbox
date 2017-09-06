export default function getMessages() {
  return fetch(`https://api.airtable.com/v0/appB41kaH02fQouxt/Messages`, {
    headers: {
      Authorization: 'Bearer key7xuxEaJfKu00Al'
    }
  })
    .then(response => response.json())
    .then(data =>
      data.records.map(record => ({
        id: record.id,
        body: record.fields.body,
        subject: record.fields.subject,
        read: record.fields.read,
        starred: record.fields.starred,
        labels: record.fields.labels ? record.fields.labels.split(',') : []
      }))
    );
}
