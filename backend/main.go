package main

import (
	"fmt"

	"github.com/iris-contrib/middleware/cors"
	"github.com/kataras/iris"
	"gopkg.in/mgo.v2"
	"gopkg.in/mgo.v2/bson"
	"github.com/kataras/iris/middleware/logger"
)

type Car struct {
	Id   bson.ObjectId `json:"id" bson:"_id,omitempty"`
	Name string        `json:"name" bson:"name"`
	Type string        `json:"type" bson:"type"`
}

func main() {
	session, err := mgo.Dial("localhost")
	if err != nil {
		panic(err)
	}
	defer session.Close()
	session.SetMode(mgo.Monotonic, true)
	c := session.DB("car-db").C("car")

	app := iris.New()
	app.WrapRouter(cors.WrapNext(cors.Options{
		AllowedOrigins:   []string{"*"},
		AllowCredentials: true,
	}))

	crs := cors.New(cors.Options{
		AllowedOrigins:   []string{"*"}, // allows everything, use that to change the hosts.
		AllowCredentials: true,
		AllowedMethods:   []string{"GET", "POST", "PUT", "HEAD", "DELETE", "OPTIONS"},
	})

	app.Use(crs)
	app.Use(logger.New())
	app.Get("/cars", func(ctx iris.Context) {
		result := []Car{}
		err := c.Find(nil).All(&result)
		if err != nil {
			fmt.Println("database -find error")
		}
		ctx.JSON(result)
	})
	app.Get("/car/{id:string}", func(ctx iris.Context) {
		result := []Car{}
		idd := ctx.Params().Get("id")
		err := c.FindId(bson.ObjectIdHex(idd)).All(&result)
		if err != nil {
			fmt.Println("database -find error")
		}
		ctx.JSON(result)
	})

	app.Post("/addCar", func(ctx iris.Context) {
		var new Car
		ctx.ReadJSON(&new)
		ctx.JSON(iris.Map{"message": new})
		err := c.Insert(new)
		if err != nil {

			panic(err)
		}
		ctx.JSON(iris.Map{"message": "New car Created"})
	})

	app.Put("/updateOne", func(ctx iris.Context) {
		var new Car
		ctx.ReadJSON(&new)
		// var target Car
		// c.FindId(new.Id).One(&target)
		// selectedCar := bson.M{"_id": bson.ObjectIdHex(idd)}
		change := bson.M{"$set": bson.M{"name": new.Name, "type": new.Type}}
		err = c.UpdateId(new.Id, change)
		ctx.JSON(iris.Map{"message": "car Updated"})
	})

	app.Delete("/remove/{id:string}", func(ctx iris.Context) {
		idd := ctx.Params().Get("id")
		err = c.RemoveId(bson.ObjectIdHex(idd))
		if err != nil {
			panic(err)
		}
		ctx.JSON(iris.Map{"message": "car deleted id:"})
	})


	app.Run(iris.Addr(":8080"))
	}
