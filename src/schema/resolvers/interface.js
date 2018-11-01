const data = [
    {
        "id": "Festival-2",
        "name": "Festival 2",
        "minAgeRestriction": 21,
        "startsAt": "2018-10-05T14:48:00.000Z",
        "performers": [
            "The Singers",
            "The Screamers"
        ]
    },
    {
        "id": "Concert-3",
        "name": "Concert 3",
        "minAgeRestriction": 18,
        "startsAt": "2018-10-07T14:48:00.000Z",
        "performingBand": "The Jumpers"
    },
    {
        "id": "Conference-4",
        "name": "Conference 4",
        "minAgeRestriction": null,
        "startsAt": "2018-10-09T14:48:00.000Z",
        "speakers": [
            "The Storytellers"
        ],
        "workshops": [
            "Writing",
            "Reading"
        ]
    }
]

export default {
    Query: {
        findEventsAtVenue() {
            return data
        }
    },
    Event: {
        __resolveType(obj, context, info) {
            console.log(obj)
            if (obj.performingBand) {
                return 'Concert';
            }

            if (obj.performers) {
                return 'Festival';
            }

            if (obj.speakers || obj.workshops) {
                return 'Conference'
            }

            return null;
        },
    }
}