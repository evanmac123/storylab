import 'whatwg-fetch'
import config from 'config'
import cache from 'cache'
import create from 'dom-create-element'
import slug from './slug'
import model from './model'
import Mustache from 'mustache'

export default (req, view, options, done) => {
  
  const id = slug(req, options)
  const cn = id.replace('/', '-')
  const page = create({ selector: 'div', id: `page-${cn}`, styles: `page page-${cn}` })
  const store = model(req, id)

  view.appendChild(page)

  if (!cache[id] || !options.cache) {

    fetch(`${config.BASE}templates/${store.template}.mst`)
      .then(blob => blob.text())
      .then(tmpl => {
        const rendered = Mustache.render(tmpl, store.data)
        page.innerHTML = rendered
        if (options.cache) cache[id] = rendered
        done()
      })

  } else {

    window.requestAnimationFrame(_ => {
      page.innerHTML = cache[id]
      done()
    })
  }

  return page
}
