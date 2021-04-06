const Koa=require('koa');
const app=new Koa();
const path=require('path')
const Rouder=require('koa-router');
const static=require('koa-static');



app.use(static('../dist'))












app.listen(5510,()=>{
    console.log(5510);
    
})