const {Router} = require('express')
const router = Router()
const axios = require('axios')
const {Dog, Temperament} = require('../db')

// hacemos un pedido para traernos la informacion de la api
const getApiInfo = async ()=>{
    const apiUrl = await axios.get('https://api.thedogapi.com/v1/breeds')
    const apiInfo = await apiUrl.data.map(e=>{
        return{
            id: e.id,
            name: e.name,
            weightMax: e.weight.imperial.split(' - ').length === 2? e.weight.imperial.split(' - ')[1]:e.weight.imperial.split(' - ')[0],
            weightMin: e.weight.imperial.split(' - ').length === 2? (e.weight.imperial.split(' - ')[0] === 'up'? 2:e.weight.imperial.split(' - ')[0]):"1",
            // weightMax: e.weight.imperial.split(' - ')[1],
            // weightMin: e.weight.imperial.split(' - ')[0],
            heightMax: e.height.imperial.split(' - ')[1],
            heightMin: e.height.imperial.split(' - ')[0],
            lifeSpanMax: e.life_span.split(' - ')[1] && e.life_span.split(' - ')[1].split(' ')[0],
            lifeSpanMin: e.life_span.split(' - ')[0] && e.life_span.split(' - ')[0],
            image: e.image.url,
            temperament: e.temperament
        }
    })
    return apiInfo
}

// traemos la informacion de la base de datos
const getDbInfo = async () => {
    return await Dog.findAll({
        include: {
            model: Temperament,
            attributes: ["name"],
            through: {
                attributes: [],
            }, 
        },
    });
};

// aqui unimos las 2 infos
const getDogAll = async () => {
    const apiInfo = await getApiInfo();
    const dbInfo = await getDbInfo();
    const infoTotal = [...apiInfo, ...dbInfo];
    return infoTotal;
};

//Ruta by name
router.get('/', async(req, res)=>{
    const {name} = req.query
    const dogTotal = await getDogAll()

    if(name){
        try {
            const dogByName = dogTotal.filter((e)=>e.name.toLowerCase().includes(name.toLocaleLowerCase()))
            console.log(dogByName.length);
            if(dogByName){
                res.status(200).send(dogByName)
            }else{
                res.status(404).send('Sorry, dog not found')
            }
        } catch (error) {
            console.log(error);
        }
    } else{
        console.log(dogTotal.length);
        res.status(200).send(dogTotal)
    }
})

//Ruta by Id:
router.get('/:idDog', async(req,res)=>{
    const {idDog} = req.params
    if(idDog.includes('-')){
        try {
            const dogDb = await Dog.findOne({
                where:{
                    id: idDog
                },
                include:{
                    model: Temperament,
                    attributes: ["name"],
                    through: {
                        attributes: [],
                    }
                }
            })
            if(dogDb) {
                const dogIdArray=[]
                dogIdArray.push(dogDb)
                res.status(200).send(dogIdArray)
            }
            else res.status(404).send('Sorry, the dog not found in database')
        } catch (error) {
            console.log(error);
        }
    }
    else{
       try {
        const response = await getApiInfo()
        const dogId = response.filter((e)=>e.id===parseInt(idDog))
        return res.status(200).send(dogId)
       } catch (error) {
           console.log(error);
       }
    }
})


module.exports = router