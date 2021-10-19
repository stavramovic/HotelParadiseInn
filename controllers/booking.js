const User = require('../models/user')

const room = (req,res) => {
    const { email, booking } = req.user
    if(booking == '') {
        if(`${req.body.room}`=='roomBooking_1') {
                User.updateOne(
                    { "email": email },
                    {
                        $set: { "booking": {
                                    "name": "Twin room",
                                    "price": "100€",
                                    "img": "/img/twin-rooms.jpg",
                                    "description": [
                                        "18 sqm",
                                        "Private bathroom",
                                        "Complimentary bar with snacks",
                                        "Bose Soundtouch Speakers",
                                        "Flatscreen Smart TVs",
                                        "Complimentary high speed internet",
                                        "Optional breakfast arrangements"
                                    ]
                                }
                        },
                    },
                    function(err, res) {
                        if (err) throw err;
                    }
                )        
        }   
        else if(`${req.body.room}`=='roomBooking_2') {
                User.updateOne(
                    { "email": email },
                    {
                        $set: { "booking": {
                                    "name": "Double room",
                                    "price": "100€",
                                    "img": "/img/double-rooms.jpg",
                                    "description": [
                                        "16 sqm",
                                        "Private bathroom",
                                        "Complimentary bar with snacks",
                                        "Bose Soundtouch Speakers",
                                        "Flatscreen Smart TVs",
                                        "Complimentary high speed internet",
                                        "Optional breakfast arrangements"
                                    ]
                                }
                        },
                    },
                    function(err, res) {
                        if (err) throw err;
                    }
                )  
            }
            else if(`${req.body.room}`=='roomBooking_3') {
                    User.updateOne(
                        { "email": email },
                        {
                            $set: { "booking": {
                                        "name": "Suites",
                                        "price": "200€",
                                        "img": "/img/suites.jpeg",
                                        "description": [
                                            "30-45 sqm",
                                            "Private bathroom",
                                            "Complimentary bar with snacks",
                                            "Bose Soundtouch Speakers",
                                            "Flatscreen Smart TVs",
                                            "Complimentary high speed internet",
                                            "Optional breakfast arrangements",
                                            "Living area with fold out couch and fold out chair (can sleep up to 3 people)",
                                            "Kitchenette equipped with sink, cooktop, dishes and utensils"
                                        ]
                                    }
                            },
                        },
                        function(err, res) {
                            if (err) throw err;
                        }
                    ) 
                }
    }   else console.log('you already booked a room')
    res.redirect('/login/user/bookings') 
}

const bookingDate = (req, res) => {
    const { email } = req.user
    const { start_date, end_date } = req.body
    User.updateOne(
        { "email": email},
        {
            $set: { 
                start_date,
                end_date 
            },
        },
        function(err, res) {
            if (err) throw err;
        }
    )
    res.redirect('/login/user/bookings') 
}
    

module.exports = {    
    room,
    bookingDate,
}