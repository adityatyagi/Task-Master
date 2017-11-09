// This is the model for Users
import bcrypt from "bcrypt";

module.exports = (sequelize, DataType) => {
    const Users = sequelize.define("Users", {
        id: {
            type: DataType.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataType.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        password: {
            type: DataType.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        email: {
            type: DataType.STRING,
            unique: true, // repeated emails won't be allowed
            allowNull: false,
            validate: {
                notEmpty: true
            }
        }
    }, {
        // hooks are functions which gets executed before and after the db operations
        // here, the password gets encrypted before the user is created, i.e before the password is saved
        hooks: {
            beforeCreate: user => {
                //console.log(user);
                //console.log(user.password);
                const salt = bcrypt.genSaltSync();
                user.password = bcrypt.hashSync(user.password, salt);

            }
        },
    });

    // class methods

    Users.associate = function(models) {
        //console.log("I am in users - associate");
        Users.hasMany(models.Tasks);
    };

    Users.isPassword = function(encodedPassword, password) {
        return bcrypt.compareSync(password, encodedPassword);
    };

    return Users;
};