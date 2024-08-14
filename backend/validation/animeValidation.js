//if the request body does not contain a name and description, or if the body's name or description have no length, respond with an error

const checkName =  (req, res, next) => {
    const { name } = req.body;

    if(!name) {
        res.status(400).json({error: "Anime must have a name"})
    } else {
        next()
    }
};

const checkNameLength = (req, res, next) => {
    const { name } = req.body;

    if(name.length == 0) {
        res.status(400).json({error: "Anime name must have at least one character"})
    } else {
        next()
    }
};

const checkDescription = (req, res, next) => {
    const { description } = req.body;

    if(!description) {
        res.status(400).json({error: "Anime must have a description"})
    } else {
        next()
    }
};

const checkDescriptionLength = (req, res, next) => {
    const { description } = req.body;

    if(description.length == 0) {
        res.status(400).json({error: "Anime description must have at least one character"})
    } else {
        next()
    }
};

module.exports = { checkName, checkNameLength , checkDescription, checkDescriptionLength }