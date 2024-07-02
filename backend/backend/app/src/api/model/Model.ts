import { FieldValues, QueryCondition, QueryOptions } from "./model.types.js";
import QueryBuilder from "./QueryBuilder.js";
import QueryValidator from "./QueryValidator.js";







// ! this implement does not provide a way to query with operator on the same field (id = '12' OR id = '22')
// ! bad design always leads to less general porpuse API


class Model {
    private table : string;
    private attributes: string[];
    private queryValidator: QueryValidator;
    private queryBuilder: QueryBuilder;

    constructor(table: string, attributes: string[]) {
        this.table = table;
        this.attributes = attributes;
        this.queryValidator = new QueryValidator(attributes);
        this.queryBuilder = new QueryBuilder(table, attributes);
    }


    async create(data: FieldValues) {
        try {
            this.queryValidator.validateModelData(data)
        } catch (e) {
            console.log((e as Error).message);
            return (false);
        }

        console.log(this.queryBuilder.create(data));
        // ? Execute here
    }

    async select(options: QueryOptions = {}) {
        try {
            this.queryValidator.validateSelectOptions(options);
        } catch (e) {
            console.log((e as Error).message);
            return (false);
        }

        console.log(this.queryBuilder.select(options));
    }

    async update(data: FieldValues, where: QueryCondition) {
        try {
            this.queryValidator.validateQueryConditions(where);
            this.queryValidator.validateModelData(data);
        } catch (e) {
            console.log((e as Error).message);
            return (false);
        }

        console.log(this.queryBuilder.update(data, where));
    }

    

}



// try {
//     const validation = model.validateQueryConditions({
//         username: 'khiar',
//         OR: {
//             username: 'okhiar',
//             AND: {
//                 age: 18,
//                 gender: 'male',
//             }
//         }
//     })

//     console.log(`the Query condition is ${validation ? "validate" : "not valide"}`);
// } catch(e: any) {
//     console.log((e as Error)?.message);
// }


export default Model;