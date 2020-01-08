const db = require("../data/dbConfig");

const find = () => {
    return db("schemes").select();
};

const findById = (id) => {
    return db("schemes").where({id}).first();
};

const findSteps = (id) => {
    return db("schemes").join("steps", "steps.scheme_id", "schemes.id").where("steps.scheme_id", id).select("schemes.id", "schemes.scheme_name", "steps.step_number", "steps.instructions").orderBy("steps.step_number");
};

const addScheme = (scheme) => {
    return db("schemes").insert(scheme);
};

const update = async (changes, id) => {
    let newScheme = await db("schemes").where({id}).update(changes);

    return db("schemes").where({ id: newScheme[0]}).first();
};

const remove = async (id) => {
    let scheme = await db("schemes").where({id}).first();
    let deletedScheme = await db("schemes").where({id}).del();

    if (deletedScheme) {
        return scheme;
    } else {
        return null;
    };
};

module.exports = {
    find,
    findById,
    findSteps,
    addScheme,
    update,
    remove
}