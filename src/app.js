var butter = require('buttercms')('9538730599ce4cebcc6f2f73b87b90601e331ece');
var express = require('express');

var app = express()

app.set('view engine', 'ejs');
app.use(express.static('public'))
// Route
app.get('/', async function(req, res) {
  try{
  const page = await  butter.page.retrieve("*", "home-page").then(res => res.data.data);
  const menuItems = await butter.content.retrieve(['menu']).then(res=>res.data.data);
  const { testimonial } = await butter.content.retrieve(['testimonial']).then(res=>res.data.data);
  res.render('home', {
     menuItems: menuItems.menu[0],
      homepage: page.fields,
      testimonial,
  });
}catch(e){
  console.log(e)
}
});

app.listen(4000, ()=>{
    console.log('server running')
})
