const { Tour } = require('../models/index')
const { Op } = require('sequelize')
const { getPagination } = require('../helpers/pagination')
const axios = require('axios')


class Controller {
    static async fetchTourLists(request, response, next) {
        try {
            const where = {}
            const { title } = request.query

            if (title) {
                where.title = { [Op.iLike]: `%${title}%` }
            }

            const page = request.query.page ? parseInt(request.query.page) : 1
            const perPage = request.query.perPage ? parseInt(request.query.perPage) : 9

            if (page <= 0 || perPage <= 0) {
                throw { name: 'Minimum page is 1' }
            }

            const { count, rows } = await Tour.findAndCountAll(
                {
                    where,
                    offset: (page - 1) * perPage,
                    limit: perPage,
                    distinct: true,
                    order: [["id", "ASC"]]
                }
            )

            const result = getPagination({
                data: rows,
                count,
                page,
                perPage
            })

            if (count <= 0) {
                throw { name: 'Tour Not found' }
            }

            response.status(200).json(result)
        } catch (err) {
            next(err)
        }
    }

    static async fetchTourDetail(request, response, next) {
        try {
            const { id } = request.params
            const result = await Tour.findOne({
                where: {
                    id
                }
            })
            if (!result) {
                throw { name: 'ErrorData' }
            }
            const { data } = await axios({
                method: 'POST',
                url: `https://api.qr-code-generator.com/v1/create?access-token=${process.env.TOKEN_QR}`,
                data: {
                    "frame_name": "no-frame",
                    "qr_code_text": `${result.linkNews}`,
                    "image_format": "SVG",
                    "qr_code_logo": "scan-me-square",
                    "background_color": "#ffffff",
                    "foreground_color": "#fa6e79",
                    "marker_right_inner_color": "#2d7cda",
                    "marker_right_outer_color": "#00bfff",
                    "marker_left_template": "version13",
                    "marker_right_template": "version13",
                    "marker_bottom_template": "version13"
                }
            })
            result.dataValues.qr = data
            response.status(200).json(result)
        } catch (err) {
            next(err)
        }
    }

    static async currency(req, res, next) {
        try {
            const options = {
                method: 'GET',
                url: 'https://tripadvisor16.p.rapidapi.com/api/v1/getCurrency',
                headers: {
                    'X-RapidAPI-Key': 'eb7c58a0f6mshc8784db5f4c6299p1b7a8bjsn0179ff6dd994',
                    'X-RapidAPI-Host': 'tripadvisor16.p.rapidapi.com'
                }
            };
            const response = await axios.request(options);
            const result = response.data.data.majorCurrencies
            res.status(200).json(result)
        } catch (err) {
            next(err)
        }
    }
}

module.exports = Controller