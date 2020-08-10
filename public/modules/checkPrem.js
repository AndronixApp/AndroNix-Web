function getPurchaseObj(email) {
    const axios = require('axios');
    return new Promise(async (resolve, reject) => {
        try {
            let response = await axios.get(`https://us-central1-andronix-techriz.cloudfunctions.net/productLister?email=${email}`)
            resolve(response.data)
        } catch (e) {
            reject({})
        }
    })
}

export default async function isAllowed(email) {
    return new Promise(async (resolve, reject) => {
        try {
            let purchaseObj = await getPurchaseObj(email)
            console.log({purchaseObj})
            if (purchaseObj.size === 0 || purchaseObj.premium === false) {
                reject("User doesn't have a Premium account.")
            } else {
                resolve("User has access to commands.")
            }
        } catch (e) {
            reject("Error in fetching data!")
        }
    })
}

