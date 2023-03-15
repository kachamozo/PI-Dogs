const {Router} = require('express')
const router = Router()
const axios = require('axios')
const {Temperament} = require('../db')


router.get('/', async(req, res)=>{
    const apiUrl = await axios.get('https://api.thedogapi.com/v1/breeds')
    const temp = await apiUrl.data.map((e)=>e.temperament)
    const newTemp = await temp.map(e=>e && e.split(', ')).flat()

    const mySet = new Set(newTemp)
    console.log(newTemp.length);

    for (item of mySet) {
        if(item !== undefined){
            await Temperament.findOrCreate({
                where: {
                    name: item,
                },
            });
        }
    }
    const allTemperament = await Temperament.findAll();
    console.log(allTemperament.length);  
    res.status(200).send(allTemperament)
})

module.exports = router