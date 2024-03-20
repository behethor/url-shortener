const form = document.querySelector('#urlData')
const paragraph = document.getElementById('shortenedUrl')
const copyButton = document.getElementById('copyButton')

const isValidHttpUrl = (string) => {
  try {
    const newUrl = new URL(string)
    return newUrl.protocol === 'http:' || newUrl.protocol === 'https:'
  } catch (err) {
    return false
  }
}

async function sendUrl () {
  const formData = new FormData(form)
  const urlFromData = formData.get('url')

  if (!isValidHttpUrl(urlFromData)) {
    paragraph.innerHTML = 'Invalid url'
    return
  }

  const url = { url: urlFromData }
  const baseUrl = window.location.origin
  const response = await fetch(`${baseUrl}/api/shortener`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(url)
  })
  const data = await response.json()

  if (!data) {
    paragraph.innerHTML = 'Invalid url'
  }
  copyButton.style.display = 'block'
  paragraph.innerHTML = data.shortUrl
}

form.addEventListener('submit', (event) => {
  event.preventDefault()
  sendUrl()
})

copyButton.addEventListener('click', () => {
  const data = paragraph.innerHTML
  navigator.clipboard.writeText(data)
  // eslint-disable-next-line no-undef
  alert('Copied to clipboard')
})
