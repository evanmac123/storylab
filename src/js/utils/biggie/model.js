export default (req, id) => {
  
  const path = id.split('/')
  const model = {}

  if ( path.length === 3 ) {
  
    model['template'] = path.pop()
    model['data'] = window._data.persona[req.params.id]
  
  } else if ( path.length === 4 ) {
  
    const locations = window._data.persona[req.params.id].map.location
  
    model['template'] = 'location'
    model['data'] = [...locations.filter(location => location.slug === req.params.location)][0]

  
  } else if ( path.length === 6 ) {
    
    const location = window._data.persona[req.params.id].map.location.filter(location => location.slug === req.params.location)[0]
    const hotspot = location.hotspot.filter(hotspot => hotspot.slug === req.params.hotspot)[0]
    
    model['template'] = 'hotspot'
    model['data'] = hotspot
    
  } else if ( path.length < 3 ) {
  
    model['template'] = req.params.id ? 'persona' : id
    model['data'] = req.params.id ? window._data.persona[req.params.id] : window._data
  }


  return model
}
