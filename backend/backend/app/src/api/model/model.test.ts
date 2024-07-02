import Model from "./Model.js";


const model = new Model('users', ['id', 'username', 'name', 'last_name', 'age', 'gender']);


console.log("**********SELCET************")
model.select({
    where: {
        OR: {
            name: 'oussama',
            AND: {
                age: 22,
                gender: "male",
                OR: {
                    last_name: "khiar",
                    gender: 'female',
                }
            },
            age: 20,
        }
    },
})


model.select({
    where: {
        OR: {
            name: 'oussama',
            AND: {
                age: 22,
                gender: "male",
                OR: {
                    last_name: "khiar",
                    gender: 'female',
                }
            },
            age: 20,
        },
    },
    limit: 5,
    orderBy: {
        name: 'ASC',
        age: 'DESC'
    }
})


model.select({
    where: {
        AND: {
            username: 'okhiar',
            name: 'oussama',
        }
    },
    limit: 5,
})


model.select({
    where: {
        id: 10,
    },
    limit: 5,
    orderBy: {
        name: 'ASC',
        age: 'DESC'
    }
})

model.select({
    limit: 5,
    orderBy: {
        name: 'ASC',
        age: 'DESC'
    }
})

model.select({
    where: {},
    limit: 5,
    orderBy: {
        name: 'ASC',
        age: 'DESC'
    }
})

model.select();

model.select({
    where: {
        username: "khiar",
    },
    orderBy: {

    }
})

model.select({
    where: {
        usernamee: "khiar",
    },
})


model.select({
    where: {
        username: "khiar",
    },
    orderBy: {
        nameee: 'ASC',
    }
})

model.select({
    where: {
        id: [1, 2]
    },
    orderBy: {
        nameee: 'ASC',
    }
})

console.log("*********CREATE*************")
model.create({
    username: 'okhiar',
    name: 'oussama',
    gender: 'male',
    age: 22
})

model.create({
    username: 'okhiar',
    name: 'oussama',
    gender: 'male',
    first_name: 'chichi'
})

// ? Empty object, error in this case
model.create({

});

console.log("***********UPDATE**********");
model.update({}, {})

model.update({
    username: 'okhiar'
}, {});

model.update({
    username: 'okhiar',
    last_name: 'khiar',
    name: 'oussama',
}, {});

model.update({
    username: 'okhiar',
    last_name: 'khiar',
    name: 'oussama',
}, {
    OR: {
        id: 20,
        name: 'oussama',
    }
});

// type TypeArray<T> = T[];

// const arr: TypeArray = [1, 2, 3]