/**
 *  THIS FILE PROVIDES UTILITIES FOR CREATING A UNIFIED JSON REPRESENTATION FOR A RESTAURANT.
 */


// Creates a restaurant based on the given JSON string.
function createRestaurant(company, json, callback) {
  const jsonObject = JSON.parse(json);
  
  if (company === "FAZER" || company === "AMICA") {
    parseFazerJSON(jsonObject, callback);
  } else if (company === "SODEXO") {
    parseSodexoJSON(jsonObject, callback);
  }

}

// Processes JSON in the Fazer format.
function parseFazerJSON(obj) {
  const result = {};
  result.title = obj["RestaurantName"];
  const menusForDays = obj["MenusForDays"];
  
  const days = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"];
  let idx = 0;
  
  menusForDays.forEach(dayMenu => {
    const setMenus = dayMenu["SetMenus"];
    
    result[days[idx]] = [];
    
    setMenus.forEach(option => {
      
      let str = ""; // holds the component string.
      option["Components"].forEach(component => {
        str += component.toString() + "\n";
      });
      result[days[idx]].push(str);
    });
    idx++;
  });
  return result;
}

// Processes JSON in the Sodexo format.
function parseSodexoJSON(obj) {
  const result = {};
  result.title = obj.meta.ref_title;
  
  const menus = obj.menus;
  
  for (day in menus) {
    const alternatives = menus[day];
    result[day] = [];
    alternatives.forEach(alternative => result[day].push(alternative.title_fi));
  }
  
  // Adds empty arrays for the weekend.
  result["saturday"] = [];
  result["sunday"] = [];
  
  return result;
}

module.exports = {
  createRestaurant,
  parseFazerJSON,
  parseSodexoJSON
};