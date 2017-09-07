import config from 'config'
import utils from 'utils'
import classes from 'dom-classes'
import {on, off} from 'dom-event'
import Default from './default'
import Player from '@vimeo/player'

// Kaleidoscope does not support the imports syntax
const Kaleidoscope = require('kaleidoscopejs')

class Location extends Default {

    constructor(opt) {

        super(opt)

        this.slug = 'location'
        this.playing = true

        this.openOverlay = this.openOverlay.bind(this)
        this.closeOverlay = this.closeOverlay.bind(this)
    }

    init(req, done) {

        super.init(req, done)

        this.panoSRC =
          window._data.persona[req.params.id].map.location
          .filter(location => location.slug === req.params.location)[0].pano
    }

    ready(done) {

        super.ready()

        this.addPano()
        this.addEvents()

        done()
    }

    addEvents() {
        on(this.ui.toggle, 'click', this.onClick.bind(this))

        this.ui.clickOverlay.forEach(click => on(click, 'click', this.openOverlay))
        this.ui.close.forEach(click => on(click, 'click', this.closeOverlay))
    }

    removeEvents() {
        off(this.ui.toggle, 'click', this.onClick.bind(this))

        this.ui.clickOverlay.forEach(click => off(click, 'click', this.openOverlay))
        this.ui.close.forEach(click => off(click, 'click', this.closeOverlay))
    }

    openOverlay(evt) {
        const tl = new TimelineMax({paused: true})

        this.target = this.ui[evt.currentTarget.id]

        tl.set(this.target, {display: 'block'})
        tl.to(this.target, 1, {opacity: 1})
        tl.restart()
    }

    closeOverlay() {
        const tl = new TimelineMax({paused: true})

        tl.to(this.target, 1, {opacity: 0})
        tl.set(this.target, {display: 'none'})
        tl.restart()
    }

    addPano() {
        this.viewer = new Kaleidoscope.Video({
          source: this.panoSRC,
          container: this.ui.pano,
          width: config.width,
          height: config.height,
          verticalPanning: false,
          loop: true,
          initialYaw: 20
        })
        this.viewer.render()
    }

    onClick() {
        if (this.playing === true) {
            this.viewer.pause()
            this.playing = false
        } else {
            this.viewer.play()
            this.playing = true
        }
    }

    animateIn(req, done) {

        classes.add(config.body, `is-${this.slug}`)

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
        this.viewer.setSize({height, width})
    }

    destroy(req, done) {

        super.destroy()

        this.viewer.destroy()

        this.removeEvents()

        this.page.parentNode.removeChild(this.page)

        done()
    }
}

module.exports = Location
