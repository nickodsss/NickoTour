const { comparePassword } = require('../helpers/bcrypt')
const { createToken } = require('../helpers/jwt')
const { User } = require('../models/index')
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
const midtransClient = require('midtrans-client');

class Controller {
    static async register(request, response, next) {
        try {
            const { username, email, password } = request.body

            const created = await User.create({
                username,
                email,
                password
            })
            response.status(201).json(
                created
            )

        }
        catch (err) {
            next(err)
        }
    }

    static async login(request, response, next) {
        try {
            const { email, password } = request.body

            if (!email || !password) {
                throw { name: 'Invalid' }
            }

            const user = await User.findOne({
                where: {
                    email
                }
            })

            if (!user) {
                throw { name: 'Invalid' }
            }

            const isValidPassword = comparePassword(password, user.password)
            if (!isValidPassword) {
                throw { name: 'Invalid' }
            }

            const token = createToken({
                id: user.id,
                username: user.username,
                email: user.email
            })

            response.status(200).json({
                access_token: token,
                username: user.username
            })

        } catch (err) {
            next(err)
        }
    }

    static async googleSignIn(request, response, next) {
        try {
            const ticket = await client.verifyIdToken({
                idToken: request.headers.google_token,
                audience: process.env.GOOGLE_CLIENT_ID
            });
            const payload = ticket.getPayload();

            const [user, isCreated] = await User.findOrCreate({
                where: {
                    email: payload.email
                },
                defaults: {
                    username: payload.name,
                    password: "dummy",
                    isSubscribed: false
                },
                hooks: false
            })


            const access_token = createToken({
                id: user.id,
                username: user.username,
                email: user.email,
            })
            response.status(200).json({
                access_token,
                username: user.username
            })
        } catch (err) {
            next(err)
        }
    }

    static async subscription(request, response, next) {
        try {
            await User.update(
                {
                    isSubscribed: true
                },
                {
                    where: {
                        id: request.additionalData.userId
                    }
                })
            response.status(200).json({
                message: `User with id ${request.additionalData.userId} now is subscribed`
            })
        } catch (err) {
            next(err)
        }
    }

    static async midtransToken(request, response, next) {
        try {
            const findUser = await User.findByPk(request.additionalData.userId)
            if (findUser.isSubscribed) {
                throw { name: 'Already Subscribed' }
            }
            let snap = new midtransClient.Snap({
                // Set to true if you want Production Environment (accept real transaction).
                isProduction: false,
                serverKey: process.env.MIDTRANS_SERVER_KEY
            });
            let parameter = {
                "transaction_details": {
                    "order_id": "TRANSACTION_" + Math.floor(10000000 + Math.random() * 80000000),
                    "gross_amount": 20000
                },
                "credit_card": {
                    "secure": true
                },
                "customer_details": {
                    "username": findUser.username,
                    "email": findUser.email
                }
            };
            const midtransToken = await snap.createTransaction(parameter)
            response.status(201).json(midtransToken)
        } catch (err) {
            next(err)
        }
    }

    static async fetchUserId(request, response, next) {
        try {
            const result = await User.findByPk(request.additionalData.userId)
            response.status(200).json(result)
        } catch (err) {
            next(err)
        }
    }
}

module.exports = Controller