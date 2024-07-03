// import { FieldValues, QueryCondition, QueryOptions } from "./model.types.js";
import { ConditionType, FindOptions, ModelFieldsArray, NestedCondition, OrderByType, QueryCondition } from './model.types.js';



// class QueryBuilder {
//     private table: string;
//     private attributes: string[];

//     constructor(table: string, attrs: string[]) {
//         this.table = table;
//         this.attributes = attrs;
//     }

//     private isFieldValue(key: string) : boolean {
//         return (key !== 'OR' && key !== 'AND');
//     }

//     private joinNonEmpty(parts: string[]) : string {
//         return parts.filter(element => element.trim().length !== 0).join(" ");
//     }

//     private nonEmptyObject(obj: any) {
//         return (typeof obj === 'object' && Object.keys(obj).length > 0);
//     }



//     whereConditions(whereConditions: QueryCondition, operator: 'OR' | 'AND' | 'NON' = 'NON'): string {
//         const conds: (string | string[])[] = [];


//         for (const [key, value] of Object.entries(whereConditions)) {
//             if (this.isFieldValue(key)) {
//                 // handling array values connect with the suitable operator (OR, AND)
//                 const field_value = `${key} = '${value}'`
//                 if (operator === 'NON')
//                     return field_value;
//                 conds.push(field_value);
//                 continue ;
//             }
//             conds.push([this.whereConditions(value, key as ('OR' | 'AND'))])
//         }

//         // console.log(conds);
//         let query = '';
//         for (let i = 0; i < conds.length; i++) {
//             const cond = Array.isArray(conds[i]) ? `(${conds[i][0]})` : conds[i];

//             query += `${cond}${i < conds.length - 1 ? ` ${operator} ` : ""}`
//         }

//         return (query);
//     }




//     select(options: QueryOptions) {
//         let query = `SELECT * FROM ${this.table}`;
//         let where_part = "", order_part = "", limit_part = "";

//         // if (options.where) {
//         //     query += " WHERE "
//         //     query += this.whereConditions(options.where);
//         // }

//         where_part = (options.where && Object.keys(options.where).length) ? `WHERE ${this.whereConditions(options.where)}` : "";

//         if (options.orderBy && Object.keys(options.orderBy).length) {
//             order_part = 'ORDER BY '
//             const orderByEntries = Object.entries(options.orderBy);
//             const orderByClauses = orderByEntries.map(([field, order]) => `${field} ${order}`)
//             order_part += orderByClauses.join(", ");
//         }

//         limit_part = options.limit ? `LIMIT ${options.limit}` : "";
//         return (this.joinNonEmpty([query, where_part, order_part, limit_part]));
//     }

    

//     create(data: FieldValues) {
//         let query = `INSERT INTO ${this.table} (${Object.keys(data).join(", ")}) VALUES (${Object.values(data).map(field => `'${field}'`).join(", ")})`;
//         return (query);
//     }

//     /*
//         {
//             username: "okhiar",
//             name: "oussama",
//         }
//     */

//     update(data: FieldValues, where: QueryCondition) {
//         let     query = `UPDATE ${this.table}`;
//         let     values_part = "";
//         let     condition_part = "";

//         const   column_values = Object.entries(data).map(([column, value]) => `${column} = '${value}'`)
//         const   joined_values = column_values.join(", ");

//         values_part = `SET ${joined_values}`;
//         condition_part = Object.keys(where).length ? `WHERE ${this.whereConditions(where)}` : "";

//         return (this.joinNonEmpty([query, values_part, condition_part]));
//     }
// }

class QueryBuilder<ModelSchema> {
    private table: string;

    constructor(table: string) {
        this.table = table;
    }

    /*
    {
        username: 'okhiar',
        OR: [
            {
                username: ['okhiar'],
                OR: [{id: [1, 2]}]
            },
            {
                AND: [{id: [2, 3, 45]}]
            }
        ],
    }
     */

    private joinNonEmpty(parts: string[]) : string {
        return parts.filter(element => element.trim().length !== 0).join(" ");
    }

    private connectConditionsWith(conditions: (string | string[])[], operator: 'OR' | 'AND') {
        let query = "";
        for (let i = 0; i < conditions.length; i++) {
            const cond = Array.isArray(conditions[i]) ? `(${conditions[i][0]})` : conditions[i];
            query += `${cond}${i < conditions.length - 1 ? ` ${operator} ` : ""}`
        }
        
        return (query);
    }


    /*
    [
            {
                last_name: ["khiar"],
                age: [19]
            },
            {
                age: [18, 1],
                gender: ['male'],
                AND: [
                    {
                        id: [1]
                        OR: [
                            username: ['okhiar'],
                            age: 18
                        ]
                    }
                ]
            }
    ]
    */
    private nestedConditions(arr_conditions: ConditionType<ModelSchema>, operator: 'OR' | 'AND'): string {
        const   conditions: (string | string[])[] = [];
        // const   values: string[] = [];

        for (const obj of arr_conditions) {
            for (const [key, values] of Object.entries(obj)) {
                if (key !== 'OR' && key !== 'AND') {
                    conditions.push(this.connectConditionsWith(values.map((v: any) => `${key} = '${v}'`), operator));
                    continue ;
                }
                conditions.push([this.nestedConditions(values, key)]);
            }
        }


        return (this.connectConditionsWith(conditions, operator));
    }

    private whereConditions(where: QueryCondition<ModelSchema>): string {
        const conditions: (string | string[])[] = [];
        // const   values: string[] = [];
        for (const [key, value] of Object.entries(where)) {
            if (key !== 'OR' && key !== 'AND') {
                conditions.push(`${key} = '${value}'`);
                // values.push(values);
                continue ;
            }

            conditions.push([this.nestedConditions(value, key)]);
        }

        return this.connectConditionsWith(conditions, 'AND');
    }


    /*
        {
            id: 'ASC',
            username: 'DESC',
        }
    */
    select({where, limit, orderBy, attributes}: FindOptions<ModelSchema>) {
        let query = `SELECT ${!attributes || attributes.length === 0 ? '*' : attributes.join(", ")} FROM ${this.table}`;
        let wherePart = "";
        let limitPart = limit ? `LIMIT ${limit}` : "";
        let orderPart = "";

        if (where)
            wherePart = `WHERE ${this.whereConditions(where)}`;

        if (orderBy) {
            orderPart = 'ORDER BY '
            orderPart += Object.entries(orderBy)
                        .map(([field, order]) => `${field} ${order}`)
                        .join(", ");
        }
    

        return this.joinNonEmpty([query, wherePart, orderPart, limitPart]);
    }
}


export default QueryBuilder;