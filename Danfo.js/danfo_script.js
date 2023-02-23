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

        // Creating a Danfo dataframe

        df = new dfd.DataFrame(data);
        console.log(df);

        // Basic group by

        df.groupby(["cyl"])
            .col(["mpg"])
            .mean()
            .print();
        
        // Group by with two variables

        df.groupby(["cyl", "carb"])
            .col(["hp"])
            .max()
            .sortValues("carb", {
                ascending: false
            })
            .print();

        // Adding a new column

        df["hp"].print();

        df.addColumn(
            "log_hp", 
            df["hp"].values.map(x => Math.log10(x))
        )
            .loc({columns: ["model", "log_hp"]})
            .print();

        // Writing a data frame to JSON object

        let my_test = dfd.toJSON(
            df.loc({columns: ["model", "hp"]})
        );
        
        console.log(my_test);

    }
)