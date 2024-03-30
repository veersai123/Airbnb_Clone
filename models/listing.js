const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const listingSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: String,
    image: {
        url: String,
        filename: String,
    },
    
    price: Number,
    location: String,
    country: String,
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: "Review",
        },
    ],
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    geometry: {
        type: {
            type: String,
            enum: ['Point'],
            required: true,
        },
        coordinates: {
            type: [Number],
            required: true,
            default: [],
        },
    },
});

listingSchema.post("findOneAndDelete", async (listing) => {
    if (listing) {
    await Review.deleteMany({_id : {$in: listing.reviews}});
    }
});
// listingSchema.statics.parseCoordinatesString = function(coordinatesString) {
//     return coordinatesString.split(',').map(coord => parseFloat(coord.trim()));
// };

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;
