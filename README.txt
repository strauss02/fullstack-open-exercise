1. npm init -y
2. npm i express
3. npm i cors
4. npm install --save-dev nodemon
5. create app file: app.js
6. app.js content:
            const path = require("path");
            const express = require("express");
            const cors = require("cors");
            const app = express();

            const shorturlRouter = require("./routers/shorturl");
            const redirectRouter = require("./routers/cybr");
            const userRouter = require("./routers/signUsers");

            app.use(express.json());
            app.use(cors());
            app.use(express.urlencoded({ extended: false }));

            app.use("/api/shorturl/", shorturlRouter);
            app.use("/cybr", redirectRouter);
            app.use("/user", userRouter);
            // app.use("/users", userRouter);

            app.use("/", express.static("dist")); // serve main path as static dir
            app.get("/", function (req, res) {
            // serve main path as static file
            res.sendFile(path.resolve("./dist/index.html"));
            });

            app.listen(process.env.PORT || 3000, () => console.log("Server is running..."));

7. package.json add scripts: "dev": "nodemon app.js", "start": "node app.js",
8.