require("dotenv").config()

const isTrue = (value) => ["true",1,true].includes(value)
const isFalse = (value) => ["false",0,false].includes(value)

const getDetailedAddress = async(lat,lng)=>{
    const result_of_addressAPI = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${process.env.GOOGLE_MAP_API_KEY}`)
    const address = await result_of_addressAPI.json()
    return {
        complitedAddress:address.results[0].formatted_address,
        address :  `${address.results[0].address_components[1].long_name} ${address.results[0].address_components[0].long_name}`,
        city: address.results[0].address_components[3].long_name,
        country: address.results[0].address_components[6].long_name,
        district:address.results[0].address_components[7].long_name,
    }
}

const removeItemsFromATarget = (target={},properties=[])=>{
    for(const item of properties){
        delete target[item]
    }
    return target
}

module.exports={
    isTrue,
    isFalse,
    getDetailedAddress,
    removeItemsFromATarget
}
