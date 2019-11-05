"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const body_parser_1 = __importDefault(require("body-parser"));
const express_1 = __importDefault(require("express"));
const mongodb_1 = __importStar(require("mongodb"));
const request_promise_1 = __importDefault(require("request-promise"));
const app = express_1.default();
const port = 3000; // default port to listen
// define a route handler for the default home page
app.get("/", (req, res) => {
    res.send("Hello world!");
});
// start the Express server
app.listen(port, () => {
    // tslint:disable-next-line:no-console
    console.log(`server started at http://localhost:${port}`);
});
// allow CORS requests
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "PUT, DELETE, POST, GET, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Headers, Authorization");
    if (req.method === "OPTIONS") {
        return res.status(200).end();
    }
    next();
});
const dbUrl = "mongodb://localhost:27017";
const weatherAPI = "http://api.openweathermap.org/data/2.5/forecast?lat=";
const weatherAPI2 = "&APPID=e31c978cccc3b5e1056633fb5fdbdf47";
// Database Name
const dbName = "customers";
// Create a new MongoClient
const client = new mongodb_1.default.MongoClient(dbUrl, { useUnifiedTopology: true, useNewUrlParser: true });
// parse application/json
app.use(body_parser_1.default.json());
// Use connect method to connect to the Server
client.connect((connErr) => {
    // tslint:disable-next-line:no-console
    console.log("Connected successfully to mongodb");
    const db = client.db(dbName);
    const custCollection = db.collection("customers");
    app.get("/getCustomers", (req, res) => {
        const pageNo = req.query && req.query.pageNo ? req.query.pageNo : null;
        const resultsPerPage = req.query && req.query.perPage ? req.query.perPage : null;
        const queryOptions = {
            limit: parseInt(resultsPerPage, 10),
            skip: (pageNo - 1) * resultsPerPage
        };
        custCollection.find({}, queryOptions).toArray().then((data) => {
            res.json(data);
        }).catch((error) => {
            if (error) {
                return res.json({ status: 500, message: error.message });
            }
        });
    });
    app.get("/getCustomerById/:customer_id", (req, res) => {
        const id = {
            _id: new mongodb_1.ObjectID(req.params.customer_id)
        };
        custCollection.findOne(id, (findError, customer) => {
            if (findError) {
                return res.json({ status: 500, message: findError.message });
            }
            res.json(customer);
        });
    });
    app.delete("/deleteCustomerById/:customer_id", (req, res) => {
        const id = {
            _id: new mongodb_1.ObjectID(req.params.customer_id)
        };
        custCollection.findOneAndDelete(id).then(() => {
            res.json({ status: 200, message: "Successfully deleted" });
        })
            .catch((delError) => {
            res.json({ status: 500, message: delError.message });
        });
    });
    app.put("/updateCustomerById/:customer_id", (req, res) => {
        const id = {
            _id: new mongodb_1.ObjectID(req.params.customer_id)
        };
        // tslint:disable-next-line:no-console
        console.log(req.body.customer);
        custCollection.findOneAndUpdate(id, { $set: { "Location": req.body.customer.Location, "Name": req.body.customer.Name,
                "Number of Employees": req.body.customer["Number of Employees"],
                "Person of Contact": req.body.customer["Person of Contact"],
                "Telephone Number": req.body.customer["Telephone Number"]
            } }, (updateError) => {
            if (updateError) {
                return res.json({ status: 500, message: updateError.message });
            }
            res.json({ status: 200, message: "Successfully updated" });
        });
    });
    app.post("/addCustomer", (req, res) => {
        // tslint:disable-next-line:no-console
        console.log(req.body.customer);
        custCollection.insertOne(req.body.customer, (insertError) => {
            if (insertError) {
                return res.json({ status: 500, message: insertError.message });
            }
            res.json({ status: 200, message: "Successfully inserted" });
        });
    });
    app.get("/forecast-rain", (req, res) => {
        const custCursor = custCollection.find({});
        forecastRain(custCursor, ((err, data) => {
            if (err) {
                return res.json({ status: 500, message: err.message });
            }
            res.json(data);
        }));
    });
    app.get("/getTop4Customers", (req, res) => {
        const custCursor = custCollection.find().sort({ "Number of Employees": -1 }).limit(4);
        const others = [];
        forecastRain(custCursor, ((err, data) => {
            if (err) {
                return res.json({ status: 500, message: err.message });
            }
            const rain = data.map((a) => a._id.toString());
            custCursor.toArray((toArrayErr, docs) => {
                if (toArrayErr) {
                    return res.json({ status: 500, message: toArrayErr.message });
                }
                docs.map((doc) => {
                    if (rain.indexOf(doc._id.toString()) === -1) {
                        others.push(doc);
                    }
                });
                res.json({ rain: data, others });
            });
        }));
    });
    client.close();
});
function forecastRain(cursor, callback) {
    const urls = [];
    const customers = [];
    const rainForcastedFor = [];
    const indices = [];
    cursor.forEach((doc) => {
        const latlon = doc.LatLong.split(",");
        urls.push(weatherAPI + latlon[0] + "&lon=" + latlon[1].trim() + weatherAPI2);
        customers.push(doc);
    }).then(() => {
        // map the array of urls to an array of promises
        const promisesArray = urls.map((url) => {
            return request_promise_1.default(url);
        });
        // once all promises are fulfilled, return array of data as json response
        Promise.all(promisesArray).then((responseArray) => {
            responseArray.map((resObj, index) => {
                resObj = JSON.parse(resObj);
                resObj.list.map((weatherData) => {
                    if (weatherData.weather[0].id >= 200 && weatherData.weather[0].id <= 531) {
                        // tslint:disable-next-line:no-console
                        console.log(urls[index]);
                        if (!customers[index].forecast) {
                            customers[index].forecast = [];
                        }
                        customers[index].forecast.push({ dt: weatherData.dt_txt,
                            timestamp: weatherData.dt,
                            weather: weatherData.weather[0] });
                        if (indices.indexOf(index) === -1) {
                            indices.push(index);
                        }
                    }
                });
            });
            indices.map((i) => {
                rainForcastedFor.push(customers[i]);
            });
            callback(null, rainForcastedFor);
        }).catch((err) => {
            // tslint:disable-next-line:no-console
            console.error(err);
            callback(err, null);
        });
    }).catch((err) => {
        // tslint:disable-next-line:no-console
        console.error(err);
        callback(err, null);
    });
}
//# sourceMappingURL=app.js.map