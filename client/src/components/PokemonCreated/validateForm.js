export default function validate (input){
    let errors = {};
    const urlOK = /(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|jpeg|gif|png|svg)/gi;
     

     //Name
    if(!input.name){
        errors.name = 'Name is required.';
    } else if (!/^[a-zA-Zñáéíóúü]*$/.test(input.name)){
        //Valido el input con expresion regular
        errors.name = 'The name must not contain numbers or special characters'
    }else if(input.name.length > 20){errors.name= 'The name must not exceed 20 characters'}

     //Image

    if (!urlOK.test(input.image)) {
        errors.image = "You must add a valid url";
    }

     //Life
    if (input.life < 1 || input.life > 100) {
     errors.life = 'The value of life cannot be less than 1 or greater than 100.';
    } 
          //Defense

    if (input.defense < 1 || input.defense > 300) {
        errors.defense = 'Defense cannot be less than 1 or greater than 300.';
    }
    

     //Speed

    if (input.speed < 1 || input.speed > 100) {
        errors.speed = "The speed cannot be less than 1 or greater than 100.";
    }

     //Height

    if (input.height < 1 || input.height > 50) {
        errors.height = 'The value cannot be less than 1 or greater than 50.'
    }

     //Weight

    if (input.weight < 0 || input.weight > 1000) {
        errors.weight = 'The value cannot be less than 1 or greater than 1000.'
    }
     
      //Type
    if (!input.types) {
        errors.types = 'You must select at least one Type.'
    } else if (input.types.length >2) {
        errors.types = 'Only two types are supported'
    }
    
    return errors;

};

