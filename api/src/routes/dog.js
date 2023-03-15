const {Router} = require('express')
const {Dog, Temperament} = require('../db')
const router = Router()


// ------> POST /dog <-------
router.post('/', async(req, res)=>{
    const {
        name,
        weightMax,
        weightMin,
        heightMax,
        heightMin,
        lifeSpanMax,
        lifeSpanMin,
        image,
        temperament,
    } = req.body

    //creamos una nueva raza de perros
    const newDog = await Dog.create({
        name,
        weightMax,
        weightMin,
        heightMax,
        heightMin,
        lifeSpanMax,
        lifeSpanMin,
        image,
    })    

    //creamos el tipo de temperamento
    const dogTemp = await Temperament.findAll({
        where: {
            name: temperament
        }
    })

    //viculamos el temperamento con la raza
    newDog.addTemperament(dogTemp)

    res.status(200).send("dog created successfully")
})

module.exports = router