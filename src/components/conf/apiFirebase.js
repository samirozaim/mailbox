import axios from 'axios'

const apiFirebase = axios.create({
    baseURL: 'https://mailbox-93221.firebaseio.com/'
})

export default {
    fbSaveUsers: (users) => apiFirebase.put('users.json', users),
    fbFetchUsers: () => apiFirebase.get('users.json').then(response => response.data.filter(d => d)),

    fbSaveMails: (mails) => apiFirebase.put('mails.json', mails),
    fbFetchMails: () => apiFirebase.get('mails.json').then(response => response.data)
}