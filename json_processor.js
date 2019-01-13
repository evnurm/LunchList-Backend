/**
 *  THIS FILE PROVIDES UTILITIES FOR CREATING A UNIFIED JSON REPRESENTATION FOR A RESTAURANT.
 */


// Creates a restaurant based on the given JSON string.
function createRestaurant(company, json, callback) {
  const jsonObject = JSON.parse(json);
  
  if (company == "FAZER") {
    parseFazerJSON(jsonObject);
  } else if (company == "SODEXO") {
    parseSodexoJSON(jsonObject, callback);
  }

}

// Processes JSON in the Fazer format.
function parseFazerJSON(obj) {
  console.log(obj);
}

// Processes JSON in the Sodexo format.
function parseSodexoJSON(obj, callback) {
  const result = {};
  result.title = obj.meta.ref_title;
  
  const menus = obj.menus;
  // console.log(menus);
  for (day in menus) {
    const alternatives = menus[day];
    result[day] = [];
    alternatives.forEach(alternative => result[day].push(alternative.title_fi));
  }
  callback(result);
}

module.exports = {
  createRestaurant
};