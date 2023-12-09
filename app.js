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

    amountProject.style.textShadow = "0px 0px 5px #00e5ff"
    mainText.textContent = dadosGit.bio
    // amountProject.textContent = dadosGit.public_repos 
    
    addAnimationcount(amountProject , dadosGit.public_repos )
}


const addAnimationcount = (numContainer, amountProjects) => {
    const timer = setInterval(() => {
        numContainer.style.color = '#00e5ff'
        const value = ++numContainer.textContent
       
       if(value === amountProjects) {
           clearInterval(timer)
           numContainer.style.textShadow = ""
           return
       }
    }, 70)
}

const addLightElements = () => {

}

externalMenuIcon.addEventListener('click', openMenu)
internalMenuIcon.addEventListener('click', closeMenu)
backgroundMenu.addEventListener('click', closeMenu)




closeMenuOnClickItem()
getGitHubDatas()
showDGitDatasOnScreen()