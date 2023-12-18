const externalMenuIcon = document.querySelector('[data-js="externalIcon"]')
const internalMenuIcon = document.querySelector('[data-js="internalIcon"]')
const menuMobile = document.querySelector('[data-js="menuMobile"]')
const backgroundMenu = document.querySelector('[data-js="darkenBackground"]')
const ulContainer = [...document.querySelector('[data-js="ulContainer"]').children]

const seeMoreButton = document.querySelector('[data-js="seeMoreButton"]')

const selectorBar = document.querySelector('[data-js="SeletorDesktop"]')


const getGitHubDatas = () =>
    fetch('https://api.github.com/users/igorfonseca05/repos')
        .then(res => res.json())
        .catch(console.log)

const promise =  async() => {
    const dados = await getGitHubDatas()
    console.log(dados)
}

// promise()


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

const animateSkills = () => {
    const radius = 47
    const strokeDashoffset = 360;
    const circumference = Math.round(2 * Math.PI * radius)

    const porcentSkills = [80, 60, 60, 75, 70, 80, 85, 80]
    const from = { strokeDasharray: 360 }

    const getCircles = document.querySelectorAll('[data-js="circle"]')
    
    getCircles.forEach((circle, index) => {
        // circle.style.stroke = '#00e5ff'
        // circle.style.textShadow = "0px 0px 15px #00e5ff"
        const porcent = (circumference * `${porcentSkills[index]}`) / 100;
        const showporcent = porcent + strokeDashoffset
        const to = { strokeDasharray: showporcent }

        circle.animate([from, to], {
            duration: 2000,
            fill: "forwards",
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

const hideButtonSeeMore = (projects) => {
    const seeMoreContainer = document.querySelector('[data-js="seeMoreContainer"]')

    const IsLessThan = projects

    if (IsLessThan <= 8) {
        seeMoreContainer.style.display = 'none'
        return 
    }
        seeMoreContainer.style.display = 'block'

}

const hideNonSelectedItem = (e) => {
    const projectList = [...document.querySelector('[data-js="projectsList"]').children]

    let count = 0

    projectList.forEach((project) => {

        if (e.target.textContent === 'Todos') {
            project.style.display = 'block'
            count = 10
            return
        }

        if (project.dataset.js !== e.target.textContent) {
            project.style.display = 'none'
            return
        }
        project.style.display = 'block'
        count++

    })

    hideButtonSeeMore(count)
}

const closeDropDownAfterSelected = () => {
    createAnimation(internalHightLiContainer(), 0)
    addRotateToButtom()
}

const showNameSelectedItem = (e) => {
    const container = document.querySelector(".textContainer")
    const internalTextLi = e.target.textContent
    container.textContent = internalTextLi

    hideNonSelectedItem(e)

    closeDropDownAfterSelected()
}


const changeSeeMoreValue = (button) => {

    if (button.textContent === 'Ver mais') {
        button.innerHTML = 'Ver menos'
        return
    }
    button.innerHTML = 'Ver mais'
}

const showHidenProjects = () => {
    const projectList = document.querySelector('[data-js="projectsList"]')

    projectList.classList.toggle('showHideProjects')

    changeSeeMoreValue(seeMoreButton)

}

button.addEventListener('click', addEventsOnDropDown)
containerItem.addEventListener('click', (e) => showNameSelectedItem(e))
externalMenuIcon.addEventListener('click', openMenu)
internalMenuIcon.addEventListener('click', closeMenu)
backgroundMenu.addEventListener('click', closeMenu)
seeMoreButton.addEventListener('click', showHidenProjects)
selectorBar.addEventListener('click', (e) => showNameSelectedItem(e))



closeMenuOnClickItem()
getGitHubDatas()
// showDGitDatasOnScreen()
animateSkills()