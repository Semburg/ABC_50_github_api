const APIURL = 'https://api.github.com/users/'

const main = document.getElementById('main')
const form = document.getElementById('form')
const search = document.getElementById('search')


async function getUser(username) {

    try {

        const { data } = await axios(APIURL + username)

        createUserCard(data)

        // console.log(data)
    } catch (err) {
        if (err.response.status == 404) {
            createErrorCard('No user found')
        }

        //test:
        // console.log('%cERROR CATCHED AND COLORIZED ', "color:red", err)
    }


    // !!  TESTING PROMISES
    // axios(APIURL + username)
    //     .then(res => console.log(res.data))
    //     .catch(err=> console.log(err))
}

function createUserCard(user) {
    const cardHTML = ` 
<div class="card">
    <div>
        <img class="avatar" src="${user.avatar_url}" alt="${user.name}">
    </div>
    <div class="user-info">
        <h2>${user.name}</h2>
        <p>${user.bio}</p>

        <ul>
            <li>${user.followers} <strong>Followers</strong> </li>
            <li>${user.following} <strong>Following</strong> </li>
            <li>${user.public_repos} <strong>Repos</strong> </li>
        </ul>

        <div id="repos">
            <a href="#" class="repo">Repo1</a>
            <a href="#" class="repo">Repo2</a>
            <a href="#" class="repo">Repo3</a>
        </div>
    </div>
</div>
`
    main.innerHTML = cardHTML
}

function createErrorCard(message) {
    const cardHTML = `
    <div class = "card">
        <h1>${message}</h1>
    </div>
    `

    main.innerHTML = cardHTML
}

form.addEventListener('submit', (e) => {
    e.preventDefault()

    const user = search.value
    if (user) {
        getUser(user)
        search.value = ''
    }

})
