import React from 'react';

const RequestData = ({matchSelected: { name }, market, pick, odds}) => {
    return (
        <div className="request-data">
            {
                `data={ 
                    matchId: ${name}, 
                    market: ${market}, 
                    pick: ${pick}, 
                    odds: ${odds} 
                }`
            }
        </div>
    )
}

export default RequestData