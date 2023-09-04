const errorHandler = async (err, request, response, next) => {
    if (err.name === 'SequelizeValidationError') {
        response.status(400).json(err.errors[0].message)
    } else if (err.name === 'SequelizeUniqueConstraintError') {
        response.status(400).json({
            message: err.errors[0].message
        })
    } else if (err.name === 'Invalid') {
        response.status(401).json({
            message: 'error invalid username or email or password'
        })
    } else if (err.name === 'Minimum page is 1') {
        response.status(400).json({
            message: 'Minimum page is 1'
        })
    } else if (err.name === 'Tour Not Found') {
        response.status(404).json({
            message: 'Tour not found'
        })
    } else if (err.name === 'ErrorData') {
        response.status(404).json({
            message: 'Error not found'
        })
    } else if (err.name === 'NotFound') {
        response.status(404).json({
            message: 'Data not found'
        })
    } else if (err.name === 'JsonWebTokenError') {
        response.status(401).json({
            message: 'Error Authentication'
        })
    } else if (err.name === 'Unauthenticated') {
        response.status(401).json({
            message: 'Error Authentication'
        })
    } else if (err.name === 'Cart Not Found') {
        response.status(404).json({
            message: 'Cart not found'
        })
    } else if (err.name === 'ErrorEdit') {
        response.status(404).json({
            message: 'Error not found'
        })
    } else if (err.name === 'ErrorDelete') {
        response.status(404).json({
            message: 'Error not found'
        })
    } else if (err.name === 'ErrorCart') {
        response.status(404).json({
            message: 'Error not found'
        })
    } else if (err.name === 'Already Subscribed') {
        response.status(400).json({
            message: 'You are already a subscriber'
        })
    } else if (err.name === 'MidtransError') {
        response.status(400).json({
            message: err.ApiResponse.error_messages[0]
        })
    } else {
        response.status(500).json({
            message: 'Internal Server Error'
        })
    }
}

module.exports = { errorHandler }