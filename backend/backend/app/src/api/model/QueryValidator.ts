import { ConditionType, ModelFieldsArray, NestedCondition, QueryCondition } from "./model.types.js";


export class QueryValidator<ModelSchema> {


    private isOperator(key: string): boolean {
        return (key === 'OR' || key === 'AND');
    }

    /*
        const cond :QueryCondition<UserModel> = {
            OR: [
                {
                    OR: [
                        {
                            id: [1, 2, 3],
                            username: ['oussama', 'khiar']
                        }
                    ],
                    id: [12, 13, 14]
                },
                {
                    OR: [{id: [1, 2, 3]}]
                }
            ]
        }
    */
    private checkOperatorConditions(conditions: ConditionType<ModelSchema>) {
        let conditions_count = 0;

        console.log(conditions);

        for (const fields of conditions) {
            for (const [field, values] of Object.entries(fields)) {
                if (field === 'OR' || field == 'AND') {
                    conditions_count += 1;
                    continue ;
                }
                conditions_count += values.length;
            }
        }

        console.log(conditions_count)
        return (conditions_count >= 2);
    }

    // checkSubObjects(wherePart: QueryCondition<ModelSchema>) {

    // }

    private validateSubConditions(operatorPart: ConditionType<ModelSchema>) {
        for (const condition of operatorPart) {

            if ('OR' in condition || 'AND' in condition) {
                const subCondition = (condition['OR'] || condition['AND'])!;
                this.validateSubConditions(subCondition);
            }
        }

        if (!this.checkOperatorConditions(operatorPart))
            throw new Error("cannot have an operator with less than two condition")
    }

    validateQueryCondition(wherePart: QueryCondition<ModelSchema>) {
        if ('OR' in wherePart && 'AND' in wherePart)
            throw new Error('Cannot have both OR and AND at the same level');// ! remove this redunant condition, 
        // console.log(wherePart)
        for (const key in wherePart) {
            if (this.isOperator(key) && ('OR' in wherePart || 'AND' in wherePart)) {
                // console.log("one operator")
                const subCondition = (wherePart['OR'] || wherePart['AND'])!;
                this.validateSubConditions(subCondition);
            }
        }

        return (true);
    }

}