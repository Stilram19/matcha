import { FindOptions, OrderByType, QueryCondition } from "./model.types.js";
import { QueryValidator } from './QueryValidator.js';
import QueryBuilder from './QueryBuilder.js';
import { isEmptyObject } from "../helpers/utils.js";




// ! this implement does not provide a way to query with operator on the same field (id = '12' OR id = '22')


// class Model {
//     private table : string;
//     private attributes: string[];
//     private queryValidator: QueryValidator;
//     private queryBuilder: QueryBuilder;

//     constructor(table: string, attributes: string[]) {
//         this.table = table;
//         this.attributes = attributes;
//         this.queryValidator = new QueryValidator(attributes);
//         this.queryBuilder = new QueryBuilder(table, attributes);
//     }


//     async create(data: FieldValues) {
//         try {
//             this.queryValidator.validateModelData(data)
//         } catch (e) {
//             console.log((e as Error).message);
//             return (false);
//         }

//         console.log(this.queryBuilder.create(data));
//         // ? Execute here
//     }

//     async select(options: QueryOptions = {}) {
//         try {
//             this.queryValidator.validateSelectOptions(options);
//         } catch (e) {
//             console.log((e as Error).message);
//             return (false);
//         }

//         console.log(this.queryBuilder.select(options));
//     }

//     async update(data: FieldValues, where: QueryCondition) {
//         try {
//             this.queryValidator.validateQueryConditions(where);
//             this.queryValidator.validateModelData(data);
//         } catch (e) {
//             console.log((e as Error).message);
//             return (false);
//         }

//         console.log(this.queryBuilder.update(data, where));
//     }

    

// }

/*
    where: {

    }
    
    */
   

// interface UserModel {
//     id: number;
//     username: string;
//     first_name: string;
//     last_name: string;
//     bio: string;
// }



// const orderBy: OrderByType<UserModel> = {
//     id: 'ASC',
//     username: "DESC",
// }


// const cond :QueryCondition<UserModel> = {
//     OR: [
//         {
//             OR: [
//                 {
//                     id: [1, 2, 3],
//                     username: ['oussama', 'khiar']
//                 }
//             ],
//             id: [12, 13, 14]
//         },
//     ]
// }

// const where: QueryCondition<UserModel> = {
//     OR: [
//         {id: [1, 2, 3]},
//     ]
// }

// const where1: QueryCondition<UserModel> = {
//     id: 1,
//     OR: [
//         {AND: [], id: [1]},
//     ]
// }

// const where2: QueryCondition<UserModel> = {
//     id: 1,
//     OR: [
//         {
//             id: [1, 2, 3],
//         },
//         {
//             id: [1, 2, 3]
//         },
//     ],
//     AND: []
// }

// interface IModel {
//     private table: string;
//     find(options: any): void;
//     create(data: any): void;
//     update(data: any, options: any): void;
//     hasMany(model: IModel): void;
// }


class Model<ModelSchema> {
    private queryValidator: QueryValidator<ModelSchema>;
    private queryBuilder: QueryBuilder<ModelSchema>;
    // private hasManyEnds: Set<IModel>;
    private table: string;


    constructor(table: string) {
        this.table = table;
        this.queryValidator = new QueryValidator();
        this.queryBuilder = new QueryBuilder(table);
        // this.hasManyEnds = new Set();
    }


    async create(data: Partial<ModelSchema>) {
        if (!data)
            return ;
        console.log(this.queryBuilder.create(data));
        // ? Execute here
    }


    async find(options: FindOptions<ModelSchema> = {}) {
        try {
            if (options.where)
                this.queryValidator.validateQueryCondition(options.where);
        } catch (e) {
            console.log((e as Error).message);
            return ;
        }
    
        console.log(this.queryBuilder.select(options))
    }


    async update(data: Partial<ModelSchema>, where: QueryCondition<ModelSchema>) {
        if (isEmptyObject(data))
            return ;
        try {
            this.queryValidator.validateQueryCondition(where);
        } catch (e) {
            console.log((e as Error).message);
            return ;
        }
    
    
        console.log(this.queryBuilder.update(data, where));
    }

    // hasMany(model: IModel): void {
    //     this.hasManyEnds.add(model);
    // }
}











/*
    interface UserSchema {
        username: string,
        first_name: string,
    }
    const user = new Model<UserSchema>('users', ['userame', 'id']);

    user.find({
        where: {
            username: "okhiar",
            OR: [
                {
                    username: ['oussama', 'khiar'],
                }
            ]
        }
    });
*/


export default Model;
