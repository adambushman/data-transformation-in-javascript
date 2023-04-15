// Reading in data

d3.csv("../Data/mtcars.csv", 

    // Casting fields to appropriate types

    (raw) => {
        return {
            model: raw.model, 
            cyl: raw.cyl, 
            carb: raw.carb, 
            hp: parseInt(raw.hp),
            mpg: parseInt(raw.mpg)
        }
    }, 

    (data) => {

        // From array of objects to Arquero table
        
        let aq_tabl = aq.from(data);

        console.log(aq_tabl);

        // From Arquero table to array of objects

        let obj_data = aq_tabl.objects();

        console.log(obj_data);

        // Basic group by

        let aq_gb = aq_tabl
            .groupby('cyl')
            .rollup({
                mean_mpg: d => op.mean(d.mpg)
            })
            .orderby('cyl');

        console.log(aq_gb);
        
        // Group by with two variables

        

        // Adding a new column


        
    }
)