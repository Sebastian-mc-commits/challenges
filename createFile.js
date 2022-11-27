const file = require("fs");

const person = [{
    name: "sebas",
    secondName: "machado",
    salary_per_month: 10000000000
}]
const person2 = {
    name: "sebas2",
    secondName: "cano",
    salary_per_month: 10000000000
}
if (!(file.existsSync("new_file.json")) ) {
    file.writeFileSync("new_file.json",
        JSON.stringify(person), "utf-8");
}
file.appendFileSync("new_file.json", JSON.stringify(person2));
console.log(file.readFileSync("new_file.json", "utf-8"));