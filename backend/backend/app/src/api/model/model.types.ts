export type ModelFieldsArray<T> = {
    [P in keyof T]?: T[P][];
}

export type ModelFields<T> = {
    [P in keyof T]?: T[P];
}


export interface NestedCondition<T> {
    OR?: (ModelFieldsArray<T> | NestedCondition<T>)[];
    AND?: (ModelFieldsArray<T> | NestedCondition<T>)[]; 
}

export type ConditionType<T> = (NestedCondition<T> | ModelFieldsArray<T>)[]

export type QueryCondition<T> = ModelFields<T> | NestedCondition<T>;

export type OrderByType<T> = {
    [P in keyof T]?: 'ASC' | 'DESC';
}

export type AttributesType<T> = (keyof T)[];

export interface FindOptions<T> {
    where?: QueryCondition<T>;
    limit?: number;
    orderBy?: OrderByType<T>;
    attributes?: AttributesType<T>;
}
