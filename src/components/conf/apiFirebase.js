import axios from 'axios'

let url;

if (process.env.NODE_ENV === 'development')
    url = 'https://mailbox-93221.firebaseio.com/'
else 
    url = 'https://mailbox-prod-27d50.firebaseio.com/'

const apiFirebase = axios.create({
    baseURL: url
})

export default {
    fbSaveUsers: (users) => apiFirebase.put('users.json', users),
    fbFetchUsers: () => apiFirebase.get('users.json').then(response => response.data.filter(d => d)),

    fbSaveMails: (mails) => apiFirebase.put('mails.json', mails),
    fbFetchMails: () => apiFirebase.get('mails.json').then(response => response.data)
}