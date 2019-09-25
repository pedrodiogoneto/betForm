const prepareSelectData = (data) => {
    if(!data) return
    return data.map(match => { 
        return {value: match.name, label: match.name }
    })
}

module.exports = prepareSelectData