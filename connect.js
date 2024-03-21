import mysql from "mysql2"

var con = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "root",
    database: "fest"
}).promise();


export async function login(username, password) {
    const [result] = await con.query("select * from users where username = ? and password = ?", [username, password]);
    return result
}
export async function getData() {
    const [result] = await con.query("SELECT * FROM questions");
    return  result;
}

export async function sendScore(username,score) {
    try {
        const [result] = await con.query("INSERT INTO scores (username,score) VALUES (?,?)", [username,score]);
        console.log("Score inserted successfully!");
        return result;
    } catch (error) {
        console.error("Error inserting score:", error);
        throw error;
    }
}