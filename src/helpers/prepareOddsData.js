const prepareOddsData = (oddsData, bookies) => {
    return oddsData.map(oddData => {
        const selectedBookie = bookies.find(bookie => bookie.id === oddData[0].bookieId)
        return { value: `${selectedBookie.name} - ${oddData[0].odd}`, label: `${selectedBookie.name} - ${oddData[0].odd}` }
    })
}

module.exports = prepareOddsData