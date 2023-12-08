const externalMenuIcon = document.querySelector('[data-js="externalIcon"]')
const internalMenuIcon = document.querySelector('[data-js="internalIcon"]')
const menuMobile = document.querySelector('[data-js="menuMobile"]')
const backgroundMenu = document.querySelector('[data-js="darkenBackground"]')
const ulContainer = [...document.querySelector('[data-js="ulContainer"]').children]


const openMenu = () => {
    backgroundMenu.style.display = 'block'
    menuMobile.classList.remove('closeMenu')
    menuMobile.classList.add('openMenu')
}

const closeMenu = () => {
    backgroundMenu.style.display = 'none'
    menuMobile.classList.remove('openMenu')
    menuMobile.classList.add('closeMenu')
}



const closeMenuOnClickItem = () => {
    ulContainer.forEach(li => {
        li.addEventListener('click', closeMenu)
    })
}

closeMenuOnClickItem()

externalMenuIcon.addEventListener('click', openMenu)
internalMenuIcon.addEventListener('click', closeMenu)
backgroundMenu.addEventListener('click', closeMenu)


const teste =  () => {
    fetch('https://api.github.com/users/igorfonseca05')
         .then(async(res) => {
            const obj = await res.json()
            console.log(obj.public_repos)
         })
         .catch(console.log)
}

teste()