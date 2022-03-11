const {generateForMongooseJS, createClass, createAttribute, register} = require('meta-generate-files');

const cl = createClass("Boss");
let attr = createAttribute("name");
attr.setUnique(true);
attr.setDescription("Name for Dungeon");
attr.setMandatory(true, 'Please');
attr.setType(String);

cl.setAttribute(attr);

attr = createAttribute("location_id");
attr.setType(String);
cl.setAttribute(attr);

attr = createAttribute("image_url");
attr.setType(String);
attr.setDefaultValue("\'Manda\'");
cl.setAttribute(attr);

// console.log(cl);

register(cl);

generateForMongooseJS("");