import framework from 'framework'
import config from 'config'
import select from 'dom-select'
import classes from 'dom-classes'
import { on, off } from 'dom-event'
import biggie from '@utils/biggie'

class App {

  constructor(opt = {}) {
    this.state = { open: false, animating: false }
    this.ui = config.ui

    this.onMenuClick = this.onMenuClick.bind(this)
    this.onLinkClick = this.onLinkClick.bind(this)
    // for requestAnimationFrame
    this.closeMenu = this.closeMenu.bind(this)

    this.init()
  }

  init() {
    this.addEvents()

    framework.init()
  }

  addEvents() {
    biggie.bind.add(this.ui.link)

    on(this.ui.menu, 'click', this.onMenuClick)
    this.ui.link.forEach(link => on(link, 'click', this.onLinkClick))
  }

  onMenuClick() {
    this.state.open === false ? this.openMenu() : this.closeMenu()
  }

  onLinkClick() {
    if (this.state.open === false) return

    window.requestAnimationFrame(this.closeMenu)
  }

  openMenu() {
    if (this.state.animating === true) return
    this.state.animating = true
    this.state.open = true

    const tl = new TimelineMax({ paused: true, onComplete: _ => {
      this.state.animating = false
    }})

    classes.add(config.body, 'menu-open')

    tl.staggerTo(this.ui.pane, 0.8, { transform: 'none' }, 0.1, 'in')
    tl.staggerTo(this.ui.inner, 0.8, { transform: 'none' }, 0.1, 'in')
    tl.staggerTo(this.ui.image, 0.8, { transform: 'none' }, 0.1, 'in')
    tl.staggerFromTo(this.ui.content, 0.9, {
      y: -25,
      autoAlpha: 0
    }, {
      y: 0,
      autoAlpha: 1
    }, 0.1, 'in')
    tl.restart()
  }

  closeMenu() {
    if (this.state.animating === true) return
    this.state.animating = true
    this.state.open = false

    const tl = new TimelineMax({ paused: true, onComplete: _ => {
      this.state.animating = false
    }})
    
    classes.remove(config.body, 'menu-open')

    tl.staggerFromTo(this.ui.content, 0.8, {
      y: 0,
      autoAlpha: 1,
      ease: Expo.easeInOut
    }, {
      y: 25,
      autoAlpha: 0,
      ease: Expo.easeInOut
    }, -0.1, 'out')
    tl.staggerTo(this.ui.pane, 0.7, { y: '100%', ease: Expo.easeInOut, clearProps: 'y' }, 0.1, 'out')
    tl.staggerTo(this.ui.inner, 0.7, { y: '-100%', ease: Expo.easeInOut, clearProps: 'y' }, 0.1, 'out')
    tl.staggerTo(this.ui.image, 0.7, { y: '-100%', ease: Expo.easeInOut, clearProps: 'y' }, 0.1, 'out')
    tl.restart()
  }
}

module.exports = App
