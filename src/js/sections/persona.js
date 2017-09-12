import config from 'config'
import utils from 'utils'
import classes from 'dom-classes'
import Default from './default'
import {on, off} from 'dom-event'
import framework from 'framework'
import Player from '@vimeo/player'

class Persona extends Default {

    constructor(opt) {

        super(opt)

        this.slug = 'persona'
        this.playing = true
        this.route = null
    }

    init(req, done) {
      this.route = req.params.id

      super.init(req, done)
    }

    ready(done) {

      super.ready()
      this.loadVideo()
      done()
    }

    loadVideo() {

      this.player = new Player(this.ui.player, {
        id: 214612151,
        width: config.width,
        height: config.height,
        portrait: false,
        color: 'f9f9f9'
      })

      this.addEvents()
    }

    addEvents() {
      this.player.ready().then(() => {
        this.iframe = this.ui.player.querySelector('iframe')
        this.player.setVolume(1)
        this.player.play()
				this.player.on('ended', this.nextScreen.bind(this))
      }).catch(() => {})
    }

    removeEvents() {
      this.ui.player.removeChild(this.iframe)
      this.iframe = null
      this.player = null
    }

    nextScreen() {
			framework.go(`/persona/${this.route}/map`)
    }

    animateIn(req, done) {

      classes.add(config.body, `is-${this.slug}`)
      TweenLite.to(this.ui.clickBack, 1.5, { autoAlpha: 1 })
      TweenLite.to(this.ui.clickSkip, 1.5, { autoAlpha: 1 })

      TweenLite.to(this.page, 1, {
        autoAlpha: 1,
        ease: Expo.easeInOut,
        onComplete: done
      })
      }

    animateOut(req, done) {

      classes.remove(config.body, `is-${this.slug}`)

      TweenLite.to(this.page, 0.7, {
        autoAlpha: 0,
        ease: Expo.easeInOut,
        clearProps: 'all',
        onComplete: done
      })
      }

    resize(width, height) {
      const attrs = { width: width, height: height }

      this.iframe && Object.assign(this.iframe, attrs)
    }

    destroy(req, done) {

      super.destroy()

      this.page.parentNode.removeChild(this.page)

      done()
    }
}

module.exports = Persona
