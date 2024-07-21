import Model from "./Model.js";


interface UserModel {
    id: number;
    username: string;
    first_name: string;
    last_name: string;
}

class User extends Model<UserModel> {
    private hasManyRelation: Model<any>[];

    constructor(table: string) {
        super(table);
        this.hasManyRelation = [];
    }

    hasMany() {
        
    }

}



interface PostModel {
    id: number;
    title: string;
    user_id: number;
}

class Post extends Model<PostModel> {
    // private hasManyRelation: Model<any>[];

    constructor(table: string) {
        super(table);
        // this.hasManyRelation = [];
    }
}


const user = new User("users");
const post = new Post("pots");

// user.hasMany<Post>()

// user.findAll({
//     where: {username:'okhiar'},
//     include: {
//         model: Post
//     }
// })