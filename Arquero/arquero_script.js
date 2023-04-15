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

        let aq_ga = aq_tabl
            .groupby(['cyl', 'carb'])
            .rollup({
                min_hp: d => op.min(d.hp), 
                max_hp: d=> op.max(d.hp)
            });
        
        console.log(aq_ga);

        // Adding a new column

        aq_expanded = aq_tabl
            .derive({ hp_log: d => op.log10(d.hp)})
            .select(['model', 'hp', 'hp_log']);

        console.log(aq_expanded);
        
        // Filtering

        aq_filt = aq_tabl
            .filter(d => d.hp > 200)
            .reify()
            .select('model');
        
        console.log(aq_filt);
    }
)