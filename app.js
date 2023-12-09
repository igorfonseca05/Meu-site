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


const getGitHubDatas = () =>
    fetch('https://api.github.com/users/igorfonseca05')
        .then(res => res.json())
        .catch(console.log)


const showDGitDatasOnScreen = async () => {
    const amountProject =  document.querySelector('[data-js="reposNum"]')
    const mainText = document.querySelector('[data-js="aboutMePragraph"]')
    const dadosGit = await getGitHubDatas()
    
    mainText.textContent = dadosGit.bio
    // amountProject.textContent = dadosGit.public_repos 
    
    addAnimationcount(amountProject , dadosGit.public_repos )
}

const addAnimationcount = (numContainer, amountProjects) => {
    const timer = setInterval(() => {
       const value = ++numContainer.textContent
       
       if(value === amountProjects) {
           clearInterval(timer)
           return
       }
    }, 70)
}



const addHoverOnButton = () => {
    const buttons = document.querySelectorAll('[data-js="hoverable"]')

   console.log(buttons[0].style)

   buttons.forEach(button => {
    button.addEventListener('touchstart', () => {
        button.style.backgroundColor = 'rgb(0, 229, 255)';
        button.style.boxShadow = '0px 0px 3px 1px rgb(0, 229, 255)'
    })
})
}

addHoverOnButton()

externalMenuIcon.addEventListener('click', openMenu)
internalMenuIcon.addEventListener('click', closeMenu)
backgroundMenu.addEventListener('click', closeMenu)




closeMenuOnClickItem()
getGitHubDatas()
showDGitDatasOnScreen()