import Echo from 'laravel-echo';
window.Pusher = require('pusher-js');
window.Echo = new Echo({
    broadcaster: 'pusher',
    key: "5a5e8defeac2c93c6ee7",
    cluster: "eu",
    forceTLS: false
});
