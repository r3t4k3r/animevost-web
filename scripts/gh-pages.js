var ghpages = require('gh-pages');

ghpages.publish(
    'public', // path to public directory
    {
        branch: 'gh-pages',
        silent: true,
        repo: 'https://github.com/r3t4k3r/animevost-web.git', // Update to point to your repository  
        user: {
            name: 'r3t4k3r', // update to use your name
            email: 'av.19@list.ru' // Update to use your email
        }
    },
    () => {
        console.log('Deploy Complete!')
    }
)