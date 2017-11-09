// THESE MODELS PERFORM AS TABLES IN THE DATABASE AND AS RESOURCES FOR THE API
// The application has two models: Users and Tasks
// The reltionship => Users 1:N Tasks

// the function sequelize.define("Tasks") is responsible for creating or changing a table
// This happens only when the Sequelize syncs with the application during boot time
// classMethods: is the attribute that allows the static functions to be associated with the model
// associate(models): allows model's relationships


// (sequelize, DataTypes) is the method that is used to loading and define the models
module.exports = (sequelize, DataType) => {
    const Tasks = sequelize.define("Tasks", {
        id: {
            type: DataType.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        title: {
            type: DataType.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        done: {
            type: DataType.BOOLEAN,
            allowNull: false,
            defaultValue: false
        }
    });

    Tasks.associate = function(models) {
        //console.log("I am in tasks - associate");
        Tasks.belongsTo(models.Users);
    };

    return Tasks;
};