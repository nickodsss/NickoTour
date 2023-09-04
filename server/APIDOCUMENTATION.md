# User

**1. POST /register**

**2. POST /login**

**3. POST /auth/google-sign-in**

**4. PATCH/subscription**

**5. POST /generate-midtrans-token**

**6. GET /listUser**

## 1. POST /register

- Body: 

{

    "username" : "string",

    "email" : "string", 

    "password" : "string",


}

- Response (201 - Created)

{

    "username" : "string",

    "email" : "string", 


}

- Response (400 - Bad Request)

{

    "message": "Email cannot be empty"

}

OR 

{

    "message": "Email must be unique"

}

OR

{

    "message": "Invalid email format"

}

OR

{

    "message": "Password cannnot be empty"

}

OR

{

    "message": "Username cannnot be empty"

}
- Response (500 - Internal Server Error)

{

    "message": "Internal Server Error"

}
## 2. POST /login

- Body: 

{

     "email" : "string", 

    "password" : "string"

}

- Response (200 - OK): 

{ 

    "access_token": "string",

    "username": "string"
}

- Response (401 - Unauthorized):

{

    "message": "error invalid username or email or password"

}
- Response (500 - Internal Server Error)

{

    "message": "Internal Server Error"

}
## 3. POST /auth/google-sign-in

- Body: 

{
    "username": "string",

     "email" : "string", 

    "password" : "string"

}

- Response (200 - OK): 

{ 

    "access_token": "string",

    "username": "string"
}

- Response (500 - Internal Server Error)

{

    "message": "Internal Server Error"

}
## 4. PATCH /subscription

- Headers: 

{

    "access_token": "string"

}

- Response (200 - OK)

{

    message: `User with id ${userId} now is subscribed`

}


- Response (500 - Internal Server Error)

{

     "message": "Internal Server Error"

}

## 5. POST /generate-midtrans-token

- Headers: 

{

    "access_token": "string"

}

- Response (201 - Created)

{


    "token": "string",
    "redirect_url": "string"


}

- Response (400 - Not Found)

{

     "message": "You are already a subscriber"

}

- Response (500 - Internal Server Error)

{

     "message": "Internal Server Error"

}

## 6. GET /listUser

- Response (200 - OK)

{

    "id": 1,
    "username": "Aaa",
    "email": "a@gmail.com",
    "password": "string",
    "isSubscribed": false,
    "createdAt": "2023-07-05T17:03:53.889Z",
    "updatedAt": "2023-07-05T17:03:53.889Z"

}

- Response (500 - Internal Server Error)

{

     "message": "Internal Server Error"

}

# Tour

**1. GET /tours**
**2. GET /tours/:id**
**3. GET /currency**

## 1. GET /tours

- Response (200 - OK)

{

    "data": [
        {
            "id": 1,
            "title": "Super Sale Korea Nami Island + Mt. Sorak & Ski Experience",
            "category": "Asia",
            "itinerary": "Perjalanan Anda akan mengunjungi Santa Claus Village & Little Venice yang terinspirasi dari Pulau Venice Italia. Kemudian Anda diantar menikmati keindahan Nami Island yang merupakan lokasi shooting “Winter Sonata”. Kemudian Anda diantar menuju ke Mt. Sorak untuk bermalam. Anda juga akan diajak mengunjungi Mt. Sorak National Park dan naik menggunakan cable car (jika cuaca memungkinkan) menuju Gwomgeumsung Fortress serta dapat melihat Grand Bronze Buddha di Shinheungsa Temple. Kemudian Anda Kemudian Anda akan diajak untuk pengalaman di musim dingin bermain salju di Ski Resort. Selanjutnya perjalanan dilanjutkan ke Gyeonggi untuk bermalam disana.",
            "pax": 25,
            "price": "18.000.000",
            "duration": 7,
            "airlines": "Singapore Airlines",
            "imgUrl": "https://www.nationsonline.org/gallery/Korea_South/Gyeongbokgung-GeunJeongJeon.jpg",
            "linkNews": "https://english.visitkorea.or.kr/svc/main/index.do",
            "createdAt": "2023-07-05T17:03:54.063Z",
            "updatedAt": "2023-07-05T17:03:54.063Z"
        },
        {
            "id": 2,
            "title": "Favorite Switzerland + Panoramic Train & Jungfraujoch",
            "category": "Europe",
            "itinerary": "Anda berkesempatan untuk di bawa menuju kota Lucerne dimana Anda akan mengunjungi Lion Monument, Old City dan Chapel Bridge, serta berbelanja jam tangan Swiss yang terkenal. Kemudian, perjalanan Anda akan dilanjutkan menuju Canton Zug, salah satu Canton dari 26 Canton yang ada di Swiss. Setibanya disana, Anda berkesempatan untuk melihat Old Town dari kota Zug yang sudah berdiri dari tahun 1505, dan juga St. Oswald Church yang berada di tengah kota yang juga sudah berdiri dari era yang sama. Siang hari nya, perjalanan dilanjutkan untuk menuju Ibukota Switzerland, Bern untuk bermalam. Anda juga akan diajak untuk menuju Ibukota Switzerland, Bern yang berada di pinggir sungai Aare. Disini Anda akan diajak untuk untuk melihat Nydeggbrucke, Gerechtigkeitgasse dan Zytglogge. Dilanjutkan menuju kota Interlaken, yang terkenal sebagai kota Cantik yang diapit dua danau, Brienzersee & Thunersee. Bermalam di Interlaken/Sekitarnya.",
            "pax": 18,
            "price": "20.000.000",
            "duration": 7,
            "airlines": "Turkish Airlines",
            "imgUrl": "https://cdn.britannica.com/65/162465-050-9CDA9BC9/Alps-Switzerland.jpg",
            "linkNews": "https://www.myswitzerland.com/en-id/",
            "createdAt": "2023-07-05T17:03:54.063Z",
            "updatedAt": "2023-07-05T17:03:54.063Z"
        }
    ],

    "pagination": {
        "totalRecords": 10,
        "totalPerPage": 9,
        "totalPage": 2,
        "currentPage": 1,
        "nextPage": 2,
        "previousPage": null
    }

}

- Response ( 400 - Bad Request )

{

    "message": "Minimum page is 1"

}

- Response ( 404 - Not found)

{

    "message": "Tour not found"

}

- Response ( 500 - Internal Server Error)

{

     "message": "Internal Server Error"

}
## 2. GET /tours:id

- Response (200 - OK)

{

    "id": 2,
    "title": "Favorite Switzerland + Panoramic Train & Jungfraujoch",
    "category": "Europe",
    "itinerary": "Anda berkesempatan untuk di bawa menuju kota Lucerne dimana Anda akan mengunjungi Lion Monument, Old City dan Chapel Bridge, serta berbelanja jam tangan Swiss yang terkenal. Kemudian, perjalanan Anda akan dilanjutkan menuju Canton Zug, salah satu Canton dari 26 Canton yang ada di Swiss. Setibanya disana, Anda berkesempatan untuk melihat Old Town dari kota Zug yang sudah berdiri dari tahun 1505, dan juga St. Oswald Church yang berada di tengah kota yang juga sudah berdiri dari era yang sama. Siang hari nya, perjalanan dilanjutkan untuk menuju Ibukota Switzerland, Bern untuk bermalam. Anda juga akan diajak untuk menuju Ibukota Switzerland, Bern yang berada di pinggir sungai Aare. Disini Anda akan diajak untuk untuk melihat Nydeggbrucke, Gerechtigkeitgasse dan Zytglogge. Dilanjutkan menuju kota Interlaken, yang terkenal sebagai kota Cantik yang diapit dua danau, Brienzersee & Thunersee. Bermalam di Interlaken/Sekitarnya.",
    "pax": 18,
    "price": "20.000.000",
    "duration": 7,
    "airlines": "Turkish Airlines",
    "imgUrl": "https://cdn.britannica.com/65/162465-050-9CDA9BC9/Alps-Switzerland.jpg",
    "linkNews": "https://www.myswitzerland.com/en-id/",
    "createdAt": "2023-07-05T17:03:54.063Z",
    "updatedAt": "2023-07-05T17:03:54.063Z",
    "qr": "text"

}

- Response (404 - Not Found)

{
    
    "message": "Error not found"

}
- Response (500 - Internal Server Error)

{

     "message": "Internal Server Error"

}

## 3. GET /currency

- Response (200 - OK)

[
    
    { name: 'U.S. Dollars', symbol: '$', currencyCode: 'USD' },

    ...
  
  ]

- Response (500 - Internal Server Error)

{

     "message": "Internal Server Error"

}


# Cart

**1. GET /cart**

**2. POST /cart/:id**

**3. PATCH /cart/:id**

**4. DELETE /cart/:id**

## 1. GET /cart

- Headers: 

{

    "access_token": "string"

}

- Response (200 - OK)

[

    {
        "UserId": 1,
        "TourId": 5,
        "totalPerson": 1,
        "createdAt": "2023-07-05T17:03:54.081Z",
        "updatedAt": "2023-07-05T17:03:54.081Z",
        "Tour": {
            "id": 5,
            "title": "Super Sale Gold Coast + Tangalooma & Movie World",
            "category": "Australia",
            "itinerary": "Anda akan diantar menuju Gold Coast untuk mengunjungi Paradise Country Farm dimana Anda dapat melihat pencukuran bulu domba dan berbagai macam binatang khas Australia seperti: koala dan kangguru. Setelah itu Anda akan diajak untuk berbelanja di Harbour Town Factory Outlet. Anda akan diajak untuk mengunjungi Movie World yang merupakan studio film terbesar di Australia. Disini dapat dilihat dari dekat teknik pembuatan film dan atraksi-atraksi menarik seperti: Superman Escape, Hollywood Stunt Driver Show 2, Looney Tunes 4D, Green Lantern Coaster, Scooby Doo Spooky Coaster, Road Runner Roller Coaster, dll.",
            "pax": 13,
            "price": "24.500.000",
            "duration": 11,
            "airlines": "Qantas",
            "imgUrl": "https://a.cdn-hotels.com/gdcs/production192/d307/5fe14a1a-edf9-4773-89fe-3455afa9d0dd.jpg?impolicy=fcrop&w=800&h=533&q=medium",
            "linkNews": "https://www.australia.com/id-id",
            "createdAt": "2023-07-05T17:03:54.063Z",
            "updatedAt": "2023-07-05T17:03:54.063Z"
        }
    },
    {
        "UserId": 1,
        "TourId": 7,
        "totalPerson": 1,
        "createdAt": "2023-07-05T17:03:54.081Z",
        "updatedAt": "2023-07-05T17:03:54.081Z",
        "Tour": {
            "id": 7,
            "title": "Favorite West Coast Usa + National Parks & Cabazon Premium Outlets",
            "category": "Amerika",
            "itinerary": "Anda akan diajak menuju Yosemite National Park yang merupakan salah satu taman nasional di Amerika yang terkenal karena tebing granitnya dan air terjunnya. Kemudian menuju Kota Fresno untuk bermalam. Anda akan diajak menuju Bryce Canyon, salah satu taman nasional yang terkenal oleh pilar-pilarnya yang terbentuk dari batu kapur yang berwarna-warni seperti merah, kuning, putih dan lainnya (yang terkenal dengan sebutan “Hoodoos”) dan seakan membentuk suatu amphiteater raksasa.",
            "pax": 15,
            "price": "23.000.000",
            "duration": 9,
            "airlines": "Emirates",
            "imgUrl": "https://cdn.outsideonline.com/wp-content/uploads/2018/11/20/outside-guide-grand-canyon_h.jpg",
            "linkNews": "https://www.visittheusa.com/",
            "createdAt": "2023-07-05T17:03:54.063Z",
            "updatedAt": "2023-07-05T17:03:54.063Z"
        }
    }

]

- Response ( 500 - Internal Server Error)

{

     "message": "Internal Server Error"

}


## 2. POST /cart:id

- Headers: 

{

    "access_token": "string"

}

- Response (201 - Created)

{

    "UserId": "integer",
    "TourId": "integer",
    "totalPerson": 1
}

- Response (404 - Not Found)

{

    "message" : "Error not found"

}

- Response (500 - Internal Server Error)

{

    "message": "Internal Server Error"

}

## 3. PATCH /cart:id

- Response (200 - OK)

{

    "message": ` Data with id ${id} has changed its total person to ${totalPerson} `

}

- Response (404 - Not Found)

{

    "message" : "Error not found"

}

- Response (500 - Internal Server Error)

{

    "message": "Internal Server Error"

}

## 3. DELETE /cart:id

- Response (200 - OK)

{

    "message": ` Success to delete `

}

- Response (404 - Not Found)

{

    "message" : "Error not found"

}

- Response (500 - Internal Server Error)

{

    "message": "Internal Server Error"

}