const { Cart, Tour } = require('../models/index')

class Controller {
    static async listCart(request, response, next) {
        try {
            const result = await Cart.findAll({
                include: Tour,
                where: {
                    UserId: request.additionalData.userId
                }
            })
            response.status(200).json(
                result
            )
        } catch (err) {
            next(err)
        }
    }

    static async addCart(request, response, next) {
        try {
            const { id } = request.params
            const result = await Cart.findOrCreate({
                where: {
                    TourId: id,
                    UserId: request.additionalData.userId,
                },
                defaults: {
                    UserId: request.additionalData.userId,
                    TourId: id,
                    totalPerson: 1
                }
            })
            if (!result) {
                throw { name: 'Cart Not Found' }
            }
            response.status(200).json(result)
        } catch (err) {
            next(err)
        }
    }

    static async editPersonCart(request, response, next) {
        try {
            const { id } = request.params
            const { totalPerson } = request.body
            const editPerson = await Cart.update({
                totalPerson: totalPerson
            }, {
                where: {
                    TourId: id,
                    UserId: request.additionalData.userId
                }
            })
            if (!editPerson[0]) {
                throw { name: 'ErrorEdit' }
            }

            response.status(200).json({
                message: ` Data with id ${id} has changed its total person to ${totalPerson} `
            })
        } catch (err) {
            next(err)
        }
    }

    static async deleteCart(request, response, next) {
        try {
            const { id } = request.params
            const result = await Cart.destroy({
                where: {
                    TourId: id,
                    UserId: request.additionalData.userId
                }
            })

            if (!result) {
                throw { name: 'ErrorDelete' }
            }

            response.status(200).json({
                message: `Success to delete`
            })
        } catch (err) {
            next(err)
        }
    }
}

module.exports = Controller