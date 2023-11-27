import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import fetch from "node-fetch";
import morgan from "morgan";

export const CLIENT_ID = "Iv1.1247dc257ee98cdd";
export const CLIENT_SECRET = "fae30dbf5921c6026d967d863d13a673ee476115";

const app = express();

app.use(morgan("combined"));
app.use(cors());
app.use(bodyParser.json());

app.get("/", (_, res) => {
    return res.send("You are loggen successfully. Close this tab.");
});

app.get("/requestApi", async (_, res) => {
    try {
        // TODO: make it later
    } catch (error) {
        return res.json({
            error: (error as Error).message,
        });
    }
});

app.get("/getUserData", async (req, res) => {
    try {
        const response = await fetch("https://api.github.com/user", {
            method: "GET",
            headers: {
                "X-GitHub-Api-Version": "2022-11-28",
                Accept: "application/vnd.github+json",
                Authorization: req.headers["authorization"]!,
            },
        });

        const json = await response.json();
        console.log(json);
        return res.json(json);
    } catch (error) {
        return res.json({
            error: (error as Error).message,
        });
    }
});

app.get("/getAccessToken", async (req, res) => {
    try {
        console.dir(req.query.code);

        const params =
            "?client_id=" +
            CLIENT_ID +
            "&client_secret=" +
            CLIENT_SECRET +
            "&code=" +
            req.query.code;
        const response = await fetch(
            "https://github.com/login/oauth/access_token" + params,
            {
                method: "POST",
                headers: {
                    Accept: "application/json",
                },
            },
        );

        const json = await response.json();

        console.log(json);

        return res.send(json);
    } catch (error) {
        return res.json({
            error: (error as Error).message,
        });
    }
});

app.listen(3000, () => {
    console.log("server is starting on", 3000);
});
