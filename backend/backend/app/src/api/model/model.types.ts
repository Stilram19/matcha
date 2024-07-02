export type FieldValues = { [key: string]: any };
export type FieldSortOrder = { [key: string]: 'DESC' | 'ASC' };

export interface NestedCondition {
    OR?: NestedCondition | FieldValues;
    AND?: NestedCondition | FieldValues;
}

export type QueryCondition = NestedCondition | FieldValues;

export interface QueryOptions {
    where?: QueryCondition;
    limit?: number;
    orderBy?: FieldSortOrder;
}