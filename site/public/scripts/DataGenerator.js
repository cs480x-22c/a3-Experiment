/////////////////////////////////////////////////////////////////////////////////
//
// Title:            DataGenerator.js
// Semester:         Spring 2022
//
// Author:           Matthew Aguiar
// CS Login:         mcaguiar
// Lecturer's Name:  Lane Harrison
//
// Description:      This file contains the DataGenerator class capable of
//                   producing random sets of data for use in data visualization
//                   experiments.
//
/////////////////////////////////////////////////////////////////////////////////

class DataGenerator
{
    generate_data(num_points=10, min_val=0, max_val=100)
    {
        //Local Variables
        let data, index_array, random_element1, random_element2;

        //Generate Dataset
        data = Array.from({length: num_points}, (e, index) => {
            return {
                index: index,
                value: this.random_number(min_val, max_val)
            }
        });

        //Pick two Random Data Points
        index_array = Array.from({length: num_points}, (e, index) => index);
        random_element1 = index_array.splice(Math.floor(Math.random() * index_array.length), 1)[0];
        random_element2 = index_array.splice(Math.floor(Math.random() * index_array.length), 1)[0];

        //Return Object with Data
        return {
            points: data,
            sum: Array.from(data, (element) => element.value).reduce((sum, element) => sum + element),
            element1_index: random_element1,
            element2_index: random_element2
        };
    }

    random_number(min, max)
    {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
}
