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

    amountProject.style.textShadow = "0px 0px 8px #00e5ff"
    mainText.textContent = dadosGit.bio
    // amountProject.textContent = dadosGit.public_repos 
    
    addAnimationcard(amountProject , dadosGit.public_repos )
}


const addAnimationcard = (numContainer, amountProjects) => {
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


const animateSkills = () => {
    const radius = 47
    const strokeDashoffset = 360;
    const circumference = Math.round(2* Math.PI * radius)

    const porcentSkills = [80, 60, 60, 75, 70, 80, 85, 80]
    const from = {strokeDasharray: 360}
    
    const getCircles = document.querySelectorAll('[data-js="circle"]')



    getCircles.forEach((circle, index) => {
        // circle.style.stroke = '#00e5ff'
        // circle.style.textShadow = "0px 0px 15px #00e5ff"
        const porcent = (circumference * `${porcentSkills[index]}`) / 100;
        const showporcent = porcent + strokeDashoffset
        const to = {strokeDasharray: showporcent}

        circle.animate([from, to], {
            duration: 2000,
            fill:"forwards",
        })
    })
    


}

animateSkills()

const runPorcentAnimation = () => {

}











externalMenuIcon.addEventListener('click', openMenu)
internalMenuIcon.addEventListener('click', closeMenu)
backgroundMenu.addEventListener('click', closeMenu)




closeMenuOnClickItem()
getGitHubDatas()
// showDGitDatasOnScreen()