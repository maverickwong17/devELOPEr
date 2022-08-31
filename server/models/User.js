const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

var validateEmail = function (email) {
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
        password: {
            type: String,
            required: true,
            minlength: 8
        },
        firstName: {
            type: String
        },
        lastName: {
            type: String
        },
        age: {
            type: Number
        },
        city: {
            type: String
        },
        job: {
            type: String
        },
        gender: {
            type: String
        },
        connections: [
            {
                type: Schema.Types.ObjectId,
                reference: 'User'
            }
        ],
        interests: [
            {
                type: String
            }
        ],
        github: {},
        linkedin: {}
    },
    {
        toJSON: {
            virtuals: true,
        },
        id: true
    }
)

userSchema.virtual('connectionCount').get(function () {
    return this.connections.length;
});

userSchema.pre('save', async function (next) {
    if (this.isNew || this.isModified('password')) {
        const saltRounds = 10;
        this.password = await bcrypt.hash(this.password, saltRounds);
    }
    next();
});

userSchema.methods.isCorrectPassword = async function (password) {
    return bcrypt.compare(password, this.password);
};

const User = model('User', userSchema);

module.exports = User;