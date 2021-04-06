const Rouder=require('koa-router');
const rouder=new Rouder();

rouder.get('/list',(ctx)=>{
  ctx.body=123
})

module.exports=rouder