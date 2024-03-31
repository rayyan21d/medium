import { Hono } from "hono"
import userHandler from "./user"
import blogHandler from "./blog"

const apiv1 = new Hono()

apiv1.post("/", (c)=>{
    console.log("Insider")
    return c.json({message: "Hello World"})
})

apiv1.route("/user", userHandler)

apiv1.route("/blog", blogHandler)


export default apiv1