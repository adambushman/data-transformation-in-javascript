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

        console.log(data);

        // Testing the "Tidy" function

        console.log(Tidy.tidy(data));

        // Basic group by

        console.log(
            Tidy.tidy(
                data, 
                Tidy.groupBy(
                    ["cyl", "carb"], 
                    [Tidy.summarize({avg: mean("mpg")})]
                )
            )
        );
        
        // Group by with two variables

        

        // Adding a new column


        
    }
)