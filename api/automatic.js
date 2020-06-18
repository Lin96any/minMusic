const automatic = require.context(
'.',
false,
/.js$/
)

let modules ={}

automatic.keys().forEach(key=>{
	if(key==='./automatic.js')return 
	Object.assign(modules,automatic(key))
})

export default modules
