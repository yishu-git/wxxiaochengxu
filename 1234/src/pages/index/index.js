import './index.scss'
import {getdata} from '../../assest/server/server'
ss()
console.log(1)
async function ss(){
  let data=  await getdata()
  console.log(data)
}