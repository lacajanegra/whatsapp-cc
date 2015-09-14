var pg = require('pg');
var conString = "postgres://localhost/fipres_development";

function Recommender () {
}

Recommender.prototype.recomend = function (user, executive) {
    users = getFilteredUsers({"user": user, "executive": executive});

}


Recommender.prototype.getFilteredUsers = function (data) {
    // Filter comparison data
    // Filters:
    // Sacar usuarios con capacidad de endeudamiento parecida
    // threshold = x
    // SELECT * FROM users JOINS customers ON persons_id WHERE users.max_debt_capacity > (data.user.capacity - threshold) && users.max_debt_capacity < (data.user.capacity + threshold) AND customers.executive_id = data.executive.id;
    return [];
}
