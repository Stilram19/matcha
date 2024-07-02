import QueryValidator from "./QueryValidator.js";


const queryValidator = new QueryValidator(['id', 'username', 'age', 'gender', 'name', 'last_name']);

// ? ===== Valid tests =====

console.log("********Valid TESTS:");
try {
    console.log("test1: ");
    queryValidator.validateSelectOptions({
        where: {
            username: 'okhiar',
        }
    })
    console.log("test1: valid options");
} catch (e) {
    console.log((e as Error).message);
}

try {
    console.log("test2: ");
    queryValidator.validateSelectOptions({
        where: {
            OR: {
                username: 'okhiar',
                age: 20,
            }
        }
    })
    console.log("valid options");
} catch (e) {
    console.log((e as Error).message);
}

try {
    console.log("test3: ");
    queryValidator.validateSelectOptions({
        where: {
            OR: {
                username: 'okhiar',
                AND: {
                    age: 20,
                    gender: "male",
                }
            }
        }
    })
    console.log("valid options");
} catch (e) {
    console.log((e as Error).message);
}

try {
    console.log("test4: ");
    queryValidator.validateSelectOptions({
        where: {
            AND: {
                username: 'okhiar',
                OR: {
                    age: 20,
                    gender: "male",
                }
            }
        }
    })
    console.log("valid options");
} catch (e) {
    console.log((e as Error).message);
}

try {
    console.log("test5: ");
    queryValidator.validateSelectOptions({
        where: {
            AND: {
                username: 'okhiar',
                OR: {
                    age: 20,
                    gender: "male",
                    AND: {
                        name: "oussama",
                        last_name: "khiar",
                    }
                }
            }
        },
        orderBy: {
            name: 'ASC',
            age: 'DESC',
        }
    })
    console.log("valid options");
} catch (e) {
    console.log((e as Error).message);
}

try {
    console.log("test6: ");
    queryValidator.validateSelectOptions({
        where: {
            OR: {
                id: [1, 2, 3],
            }
        }
    })
    console.log("valid options");
} catch (e) {
    console.log((e as Error).message);
}


try {
    console.log("test5: ");
    queryValidator.validateSelectOptions({
        where: {
            OR: {
                id: [1, 2, 3],
                AND: {
                    username: ['oussama', 'khiar'],
                },
            }
        }
    })
    console.log("valid options");
} catch (e) {
    console.log((e as Error).message);
}


// ! Invalid TEST
console.log("***********Invalid TESTS: ")

try {
    console.log("test1: ");
    queryValidator.validateSelectOptions({
        where: {
            name: "oussama",
            AND: {
                username: 'okhiar',
                OR: {
                    age: 20,
                    gender: "male",
                }
            }
        }
    })
    console.log("valid options");
} catch (e) {
    console.log((e as Error).message);
}

try {
    console.log("test2: ");
    queryValidator.validateSelectOptions({
        where: {
            AND: {
                username: 'okhiar',
                OR: {
                    age: 20,
                    gender: "male",
                },
                AND: {
                    name: 'oussama',
                    last_name: 'khiar',
                }
            }
        }
    })
    console.log("valid options");
} catch (e) {
    console.log((e as Error).message);
}

try {
    console.log("test3: ");
    queryValidator.validateSelectOptions({
        where: {
            AND: {
                username: 'okhiar',
                OR: {
                    blah: 20,
                    gender: "male",
                },
            }
        }
    })
    console.log("valid options");
} catch (e) {
    console.log((e as Error).message);
}

try {
    console.log("test4: ");
    queryValidator.validateSelectOptions({
        where: {
            AND: {
                username: 'okhiar',
                OR: {
                    age: 20,
                    gender: "male",
                },
            }
        },
        orderBy: {
            blah: 'ASC',
        }
    })
    console.log("valid options");
} catch (e) {
    console.log((e as Error).message);
}


try {
    console.log("test5: ");
    queryValidator.validateSelectOptions({
        where: {
            OR: {
                id: [1, 2, 3],
                AND: {
                    username: ['oussama'],
                }
            }
        }
    })
    console.log("valid options");
} catch (e) {
    console.log((e as Error).message);
}


try {
    console.log("test5: ");
    queryValidator.validateSelectOptions({
        where: {
            OR: {
                AND: {
                    username: ['oussama', 'khiar'],
                },
            }
        }
    })
    console.log("valid options");
} catch (e) {
    console.log((e as Error).message);
}
