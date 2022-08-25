const { Schema, model } = require('mongoose');

var validateEmail = function(email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};

const userSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            required: true,
            trimmed: true
        },
        email: {
            type: String,
            unique: true,
            required: true,
            trimmed: true,
            validate: [validateEmail, 'Please enter a valid email address'],
            match: [
                /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email address'
            ],
        },
        password:{},
        firstName:{},
        lastName:{},
        age:{},
        city:{},
        job:{},
        gender:{},
        connections: [
            {
                type: Schema.Types.ObjectId,
                reference: 'User'
            }
        ],
        interests:{},
        github:{},
        linkedin:{}
    },
    {
        toJSON: {
            virtuals: true,
        },
        id: true
    }
)

const User = model('User', userSchema);

userSchema.virtual('connectionCount').get(function () {
    return this.connections.length;
});

module.exports = User;