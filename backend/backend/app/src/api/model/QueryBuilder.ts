import { FieldValues, QueryCondition, QueryOptions } from "./model.types.js";



class QueryBuilder {
    private table: string;
    private attributes: string[];

    constructor(table: string, attrs: string[]) {
        this.table = table;
        this.attributes = attrs;
    }

    private isFieldValue(key: string) : boolean {
        return (key !== 'OR' && key !== 'AND');
    }

    private joinNonEmpty(parts: string[]) : string {
        return parts.filter(element => element.trim().length !== 0).join(" ");
    }

    private nonEmptyObject(obj: any) {
        return (typeof obj === 'object' && Object.keys(obj).length > 0);
    }



    whereConditions(whereConditions: QueryCondition, operator: 'OR' | 'AND' | 'NON' = 'NON'): string {
        const conds: (string | string[])[] = [];


        for (const [key, value] of Object.entries(whereConditions)) {
            if (this.isFieldValue(key)) {
                const field_value = `${key} = '${value}'`
                if (operator === 'NON')
                    return field_value;
                conds.push(field_value);
                continue ;
            }
            conds.push([this.whereConditions(value, key as ('OR' | 'AND'))])
        }

        // console.log(conds);
        let query = '';
        for (let i = 0; i < conds.length; i++) {
            const cond = Array.isArray(conds[i]) ? `(${conds[i][0]})` : conds[i];

            query += `${cond}${i < conds.length - 1 ? ` ${operator} ` : ""}`
        }

        return (query);
    }




    select(options: QueryOptions) {
        let query = `SELECT * FROM ${this.table}`;
        let where_part = "", order_part = "", limit_part = "";

        // if (options.where) {
        //     query += " WHERE "
        //     query += this.whereConditions(options.where);
        // }

        where_part = (options.where && Object.keys(options.where).length) ? `WHERE ${this.whereConditions(options.where)}` : "";

        if (options.orderBy && Object.keys(options.orderBy).length) {
            order_part = 'ORDER BY '
            const orderByEntries = Object.entries(options.orderBy);
            const orderByClauses = orderByEntries.map(([field, order]) => `${field} ${order}`)
            order_part += orderByClauses.join(", ");
        }

        limit_part = options.limit ? `LIMIT ${options.limit}` : "";
        return (this.joinNonEmpty([query, where_part, order_part, limit_part]));
    }

    

    create(data: FieldValues) {
        let query = `INSERT INTO ${this.table} (${Object.keys(data).join(", ")}) VALUES (${Object.values(data).map(field => `'${field}'`).join(", ")})`;
        return (query);
    }

    /*
        {
            username: "okhiar",
            name: "oussama",
        }
    */

    update(data: FieldValues, where: QueryCondition) {
        let     query = `UPDATE ${this.table}`;
        let     values_part = "";
        let     condition_part = "";

        const   column_values = Object.entries(data).map(([column, value]) => `${column} = '${value}'`)
        const   joined_values = column_values.join(", ");

        values_part = `SET ${joined_values}`;
        condition_part = Object.keys(where).length ? `WHERE ${this.whereConditions(where)}` : "";

        return (this.joinNonEmpty([query, values_part, condition_part]));
    }
}


export default QueryBuilder;