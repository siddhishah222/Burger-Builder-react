export const updateObject=(oldObject, updatedProperties)=>{
    return{
      ...oldObject,
      ...updatedProperties
    }  //return a new jS object, distribute the properties of old object and updatedProperties, and use that updateObject in reducers to make code lean
};