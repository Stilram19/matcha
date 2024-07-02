import { FieldSortOrder, FieldValues, QueryCondition, QueryOptions } from "./model.types.js";


// const opt : QueryOptions = {
//     where: {
//         OR: {
//             name: 'user',
//             AND: {
//                 id: 10,
//                 name: 'sam'
//             }
//         }
//     },
//     limit: 10,
//     orderBy: ['created_at', 'ASC'],
// }



// user.select({
//     where: {
//         OR: {
//             user: 'oussama',
//             AND: {
//                 id: 10,
//                 OR: {
//                     age: 18,
//                     last_name: 'antar',
//                 }
//             }
//         }
//     }
// }) ==> SELCET * FROM user WHERE user = 'oussama' OR (id = 10 AND (age = 18 OR last_name = 'antar'))



class QueryValidator {
    private attrs: string[]; // table attributes

    constructor(table_attrs: string[]) {
        this.attrs = table_attrs;
    }

    private isFieldValue(key: string) {
        return !(key === 'OR' || key === 'AND');
    }

    private validateFieldValue(key: string) {
        if (!this.attrs.includes(key))
            throw new Error('the field doesn\'t exists in the schema definition');
    }

    private checkOperatorValidity(obj: {[key: string]: any}) {
        const obj_keys = Object.keys(obj);
        if (!obj_keys.length || (obj_keys.length === 1 && (!Array.isArray(obj[obj_keys[0]]) || obj[obj_keys[0]].length <= 1)))
            return (false);
        
        
        for (const [key, value] of Object.entries(obj)) {
            if (!Array.isArray(obj[key]))
                continue ;
            if (obj[key].length === 0)
                return (false);

            const elements_type = typeof obj[key][0];
            for (const element of obj[key])
                if (typeof element !== elements_type)
                    return (false);
        }
    
        return (true);
    }


    /*
        {
            OR: {
                user: 'oussama',
                AND: {
                    id: 10,
                    last_name: 'khiar',
                }
            }
        }

        SQL QUERY: user = 'oussama' OR (id = 10 AND last_name = 'khiar' AND (gender = 'male' OR age = 18))
    */
    validateQueryConditions(queryPart: QueryCondition, hasParent: boolean = false) : boolean {
        let hasOperator = false; // does the current level has an operator?
        let hasFieldValue = false;


        for (const key in queryPart) {
            if (this.isFieldValue(key)) {
                this.validateFieldValue(key);
                hasFieldValue = true;
            }

            if ((key === 'OR' || key === 'AND') && queryPart[key]) {
                if (hasOperator)
                    throw new Error("can't have two operators at the same levels");
                hasOperator = true;

                // if (Object.keys(queryPart[key]).length < 2)
                this.validateQueryConditions(queryPart[key], true);
                if (!this.checkOperatorValidity(queryPart[key]))
                    throw new Error("Operators must have at least two conditions");
            }
        }

        if (!hasParent && hasFieldValue && hasOperator)
            throw new Error("Cannot have operators at the same level with field values without a parent condition");

        return (true);
    }


    validateOrderFields(sortOrder: FieldSortOrder) : boolean {
        // console.log(this.attrs);
        for (const field in sortOrder)
            if (!this.attrs.includes(field))
                throw new Error(`Order by '${field}' is not defined in the schema'`)
    
        return (true);
    }

    validateSelectOptions(options: QueryOptions) : boolean {
        if (options.where) this.validateQueryConditions(options.where);
        if (options.orderBy) this.validateOrderFields(options.orderBy);

        return (true);
    }

    /*
        {
            name: 'oussama',
            username: 'okhiar',
            age: 22,
        }
    */

    validateModelData(data: FieldValues): boolean {
        const entries = Object.keys(data);
        const entriesSet = new Set(entries);
    
        // if (entriesSet.size != this.attrs.length)
        //     throw new Error('Invalid data schema');
        if (entries.length === 0) throw new Error("data is empty object");

        for (const field of entriesSet) {
            if (!this.attrs.includes(field))
                throw new Error(`the field ${field} doesn't exist in the schema definition`);
        }
        return (true);
    }
}

export default QueryValidator;