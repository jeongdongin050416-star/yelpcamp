const mongoose = require("mongoose");
const Campground = require("../models/campground");
const Review = require("../models/review");
const cities = require('./cities');
const { places, descriptors } = require("./seedHelpers");
const { matchesGlob } = require("path");
mongoose.connect('mongodb://localhost:27017/yelp-camp');

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const seedDB = async () => {
    await Campground.deleteMany({});
    await Review.deleteMany({});
    for (let i = 0; i < 200; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 27 + 13);
        const camp = new Campground({
            author: "69990364e3d54dff2cc66bc0",
            location:
                `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${descriptors[Math.floor(descriptors.length * Math.random())]} ${places[Math.floor(places.length * Math.random())]}`,
            description: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Delectus repellendus nulla quod exercitationem earum alias quos dolore possimus nobis! Ducimus debitis possimus nemo distinctio alias numquam dignissimos, aperiam rem vitae?",
            price,
            geometry:{
                "type":"Point", 
                "coordinates":[
                    cities[random1000].longitude,
                    cities[random1000].latitude]
                },
            images: [
                {
                    url: 'https://res.cloudinary.com/ddzhdzssp/image/upload/v1771748652/YelpCamp/vkwo0ehbmgxpnqjzx15u.jpg',
                    filename: 'YelpCamp/vkwo0ehbmgxpnqjzx15u'
                },
                {
                    url: 'https://res.cloudinary.com/ddzhdzssp/image/upload/v1771748653/YelpCamp/irqufuxbsewaaiylu4et.jpg',
                    filename: 'YelpCamp/irqufuxbsewaaiylu4et'
                }
            ]
        });
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})