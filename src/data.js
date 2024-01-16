export const CITY = [
    {
        name: "mumbai-ct",
        area: [{ name: "andheri-near-by" }, { name: "bandra-near-by" }],
    },
    {
        name: "ahmadabad-ct",
        area: [{ name: "shivranjani-near-by" }, { name: "paldi-near-by" }],
    },
];

export const CATEGORY = [
    {
        name: "ac-service-slp",
        subCategory: [{ name: "ac-gas-filling-ssp" }, { name: "ac-cleaning-ssp" }],
    },
    { name: "plumbing-provider-slp", subCategory: [{ name: "tap-repair-ssp" }] },
];

export const displayPOP = (val = "") => {
    if (val?.includes("-ct")) {
        //Area
        return "Slug type : City";
    } else if (val?.includes("-slp")) {
        //service listing page
        return "Slug type : service";
    } else if (val?.includes("-ssp")) {
        //sub-service listing page
        return "Slug type : sub service";
    } else if (val?.includes("-near-by")) {
        // Area
        return "Slug type : area";
    }
};

export const masterJSON = {
    city: [{
        _id: "asd",
        name: "mumbai",
        image: "url",
        area: [
            {
                _id: "assad",
                name: "bandra",
            },
            {
                _id: "assad",
                name: "borivali",
            },
        ],
        faq: [
            { _id: "asdasd", question: "Are you sure? ", answer: "Yes" },
            { _id: "asdasd", question: "Are you sure? ", answer: "Yes" },
        ],
        category: [
            {
                _id: "asdsad",
                name: "ac-service",
                subCategory: [
                    {
                        _id: "asdsad",
                        name: "ac-gas-filling",
                    },
                ],
            },
            {
                _id: "asdsad",
                name: "plumbing",
                subCategory: [
                    {
                        _id: "asdsad",
                        name: "tap-repair",
                    },
                ],
            },
        ],
    }],
    topCities: [{
        _id: "asd",
        name: "mumbai",
        image: "url"
    }],
    mostBookedServices: [{
        _id: "aasd",
        name: "ac-service",
        image: "url",
        avgRating: 3.5,
        startingPrice: 400
    }],

}


export const serviceJSON = [
    {
        _id: "asdsad",
        name: "ac-service",
        image: "url",
        subCategory: [
            {
                _id: "asdsad",
                name: "ac-gas-filling",
                image: "url",
            },
        ],
    },
    {
        _id: "asdsad",
        name: "plumbing",
        image: "url",
        subCategory: [
            {
                _id: "asdsad",
                name: "tap-repair",
                image: "url",
            },
        ],
    },
]

export const metaJSON = {
    topCities: [{
        _id: "asd",
        name: "mumbai",
        image: "url"
    }],
    mostBookedServices: [{
        _id: "aasd",
        name: "ac-service",
        image: "url",
        avgRating: 3.5,
        startingPrice: 400
    }],
    testimonials: [{
        _id: "asd",
        name: "asd",
        designation: "CEO",
        description: "askdhbaskd",
        image: "url",
    }],
    commonFAQ: [{
        _id: "asd",
        question: "are you sure",
        answer: "yes",
    }]
}

export const cityBasedJSON = {
    _id: "asd",
    name: "mumbai",
    image: "url",
    area: [{
        _id: "assad",
        name: "bandra",
        areaLevelServices: [{
            _id: "asdsad",
            name: "ac-service",
            image: "url",
            subCategory: [
                {
                    _id: "asdsad",
                    name: "ac-gas-filling",
                    image: "url",
                },
            ],
        }]
    }, {
        _id: "assad",
        name: "borivali",
        areaLevelServices: [{
            _id: "asdsad",
            name: "ac-service",
            image: "url",
            subCategory: [
                {
                    _id: "asdsad",
                    name: "ac-gas-filling",
                    image: "url",
                },
            ],
        }]
    }],
    cityLevelServices: [{
        _id: "asdsad",
        name: "ac-service",
        image: "url",
        subCategory: [
            {
                _id: "asdsad",
                name: "ac-gas-filling",
                image: "url",
            },
        ],
    }]
}