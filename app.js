const externalMenuIcon = document.querySelector('[data-js="externalIcon"]')
const internalMenuIcon = document.querySelector('[data-js="internalIcon"]')
const menuMobile = document.querySelector('[data-js="menuMobile"]')
const backgroundMenu = document.querySelector('[data-js="darkenBackground"]')
const ulContainer = [...document.querySelector('[data-js="ulContainer"]').children]

const seeMoreButton = document.querySelector('[data-js="seeMoreButton"]')



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


const button = document.querySelector('.icon')
const containerItem = document.querySelector('.back')

const internalHightLiContainer = () => {
    const lis = [...document.querySelector('.back').children]
    const internalSizeLi = lis[0].offsetHeight
    const totalAmountLis = lis.length
    const heightLiContainer = totalAmountLis * internalSizeLi

    return heightLiContainer
}

const createAnimation = (inicialSize, finalSize) => {

    const keyFrame = [
        { height: `${inicialSize}px` },
        { height: `${finalSize}px` },
    ]

    const configAnimation = {
        duration: 200,
        fill: 'forwards'
    }

    containerItem.animate(keyFrame, configAnimation)
}

const addRotateToButtom = () => {
    button.classList.add('rotateIcon')
}
const removeRotateToButtom = () => {
    button.classList.remove('rotateIcon')
}

const addEventsOnDropDown = () => {

    if (button.classList.contains('rotateIcon')) {
        removeRotateToButtom()
        createAnimation(0, internalHightLiContainer())

    } else {

        createAnimation(internalHightLiContainer(), 0)
        addRotateToButtom()
    }
}

const hideNonSelectedItem = (e) => {
    const projectList = [...document.querySelector('[data-js="projectsList"]').children]

    projectList.forEach(project => {

        if(e.target.textContent === 'Todos') {
            project.style.display = 'block'
            return
        }

        if(project.dataset.js !== e.target.textContent) {
            project.style.display = 'none'
            return
        }
            project.style.display = 'block'
    })
}

const closeDropAndRotateIcon = () => {
    createAnimation(internalHightLiContainer(), 0)
    addRotateToButtom()
}

const showNameSelectedItem = (e) => {
    const container = document.querySelector(".textContainer")
    const internalTextLi = e.target.textContent
    container.textContent = internalTextLi

    hideNonSelectedItem(e)

    closeDropAndRotateIcon()   
}

const showHidenProjects = () => {
    const projectList = document.querySelector('[data-js="projectsList"]')
    const seeMoreButton = document.querySelector('[data-js="seeMoreButton"]')
  
    projectList.classList.toggle('showHideProjects')

    if(seeMoreButton.textContent === 'Ver mais') {
        seeMoreButton.innerHTML = 'Ver menos'
        return
    }
        seeMoreButton.innerHTML = 'Ver mais'
   
}

button.addEventListener('click', addEventsOnDropDown)
containerItem.addEventListener('click', (e) => showNameSelectedItem(e))
externalMenuIcon.addEventListener('click', openMenu)
internalMenuIcon.addEventListener('click', closeMenu)
backgroundMenu.addEventListener('click', closeMenu)
seeMoreButton.addEventListener('click', showHidenProjects)



closeMenuOnClickItem()
getGitHubDatas()
// showDGitDatasOnScreen()
animateSkills()