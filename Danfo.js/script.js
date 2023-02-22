// Basic reading in of data

let myData;

d3.csv("../Data/mtcars.csv", 
    (raw) => {
        return {
            model: raw.model, 
            cyl: raw.cyl, 
            hp: parseInt(raw.hp),
            mpg: parseInt(raw.mpg)
        }
    }, 

    (data) => {
        df = new dfd.DataFrame(data);
        console.log(df);

        let df_new = df.groupby(["cyl"])
            .col(["mpg"])
            .mean();
        
        df_new.print();
        
        console.log(df_new);
    }
)