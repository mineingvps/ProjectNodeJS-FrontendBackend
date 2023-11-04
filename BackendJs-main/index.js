require("dotenv").config();
const express = require("express");
const sqlite3 = require("sqlite3");
const app = express();

const db = new sqlite3.Database("./Database/Searchschool.sqlite");

app.use(express.json());


db.run(`CREATE TABLE IF NOT EXISTS school (school_id INTEGER PRIMARY KEY,
				name TEXT , number INTRGER  )`);

db.run(`CREATE TABLE IF NOT EXISTS province (province_id INTEGER PRIMARY KEY,
  province_name TEXT)`);



db.run(`CREATE TABLE IF NOT EXISTS school_province (id INTEGER PRIMARY KEY,
school_id INTEGER NOT NULL,province_id INTEGER NOT NULL ,
FOREIGN KEY(school_id) REFERENCES school(school_id) , 
FOREIGN KEY(province_id) REFERENCES province(province_id))`);



// ดึงข้อมูล
// ดูข้อมูลทั้งหมด
app.get("/school", (req, res) => {
  db.all("SELECT * FROM school ",(err, row) => {
    if (err) {
      res.status(500).send(err);
    } else {
      if (!row) {
        res.status(404).send("School not found");
      } else {
        res.json(row);
      }
    }
  });
});

// ดูข้อมูลด้วย id
app.get("/school/:id", (req, res) => {
  db.get("SELECT * FROM school WHERE school_id = ? ", req.params.id, (err, row) => {
    if (err) {
      res.status(500).send(err);
    } else {
      if (!row) {
        res.status(404).send("School not found");
      } else {
        res.json(row);
      }
    }
  });
});


//ส่วนนี้บอสทำต่อให้จนเสร็จละ คือการเพิ่มข้อมูล
app.post("/school", (req, res) => {
  const school = req.body;
  db.run(
    "INSERT INTO school (number,name) VALUES (?,?)",
    school.number,school.name,
    (err) => {
      if (err) {
        res.status(500).send(err);
      } else {
        
        school.id = this.lastID;
        res.send(school);
        res.status(200);
      }
    }
  );
});



//ส่วนแก้ไข
app.put("/school/:id", (req, res) => {
  console.log(req.params.id);
  const school = req.body;
  db.run(
    "UPDATE school SET number = ? , name = ? WHERE school_id = ? ",
    school.number,
    school.name,
    req.params.id,
    (err) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.send(school);
      }
    }
  );
});


//ลบไปทำเอาเอง
app.delete("/school/:id", (req, res) => {
  db.run("DELETE FROM school WHERE school_id = ?", req.params.id, (err) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.send({});
    }
  });
});



// province

app.get("/province", (req, res) => {
  db.all("SELECT * FROM province ",(err, row) => {
    if (err) {
      res.status(500).send(err);
    } else {
      if (!row) {
        res.status(404).send("province not found");
      } else {
        res.json(row);
      }
    }
  });
});

// ดูข้อมูลด้วย id
app.get("/province/:id", (req, res) => {
  db.get("SELECT * FROM province WHERE province_id = ? ", req.params.id, (err, row) => {
    if (err) {
      res.status(500).send(err);
    } else {
      if (!row) {
        res.status(404).send("province not found");
      } else {
        res.json(row);
      }
    }
  });
});



//เพิ่มข้อมูล
app.post("/province", (req, res) => {
  const province = req.body;
  db.run(
    "INSERT INTO province (province_name) VALUES (?)",
    province.province_name,
    (err) => {
      if (err) {
        res.status(500).send(err);
      } else {
        
        province.id = this.lastID;
        res.send(province);
        res.status(200);
      }
    }
  );
});


//ส่วนแก้ไข
app.put("/province/:id", (req, res) => {
  console.log(req.params.id);
  const province = req.body;
  db.run(
    "UPDATE province SET province_name = ?  WHERE province_id = ? ",
    province.province_name,
    req.params.id,
    (err) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.send(province);
      }
    }
  );
});


//ลบไปทำเอาเอง
app.delete("/province/:id", (req, res) => {
  db.run("DELETE FROM province WHERE province_id = ?", req.params.id, (err) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.send({});
    }
  });
});



// school_province

app.get("/school_province", (req, res) => {
  db.all("SELECT * FROM school_province ",(err, row) => {
    if (err) {
      res.status(500).send(err);
    } else {
      if (!row) {
        res.status(404).send("school_province not found");
      } else {
        res.json(row);
      }
    }
  });
});

// ดูข้อมูลด้วย id
app.get("/school_province/:id", (req, res) => {
  console.log("gettttttt")
  db.get("SELECT * FROM school_province WHERE id = ? ", req.params.id, (err, row) => {
    
    if (err) {
      res.status(500).send(err);
    } else {
      if (!row) {
        res.status(404).send("school_province not found");
      } else {
        console.log(row)
        res.json(row);
      }
    }
  });
});



//เพิ่มข้อมูล
app.post("/school_province", (req, res) => {
  const school_province = req.body;
  db.run(
    "INSERT INTO school_province (school_id , province_id) VALUES (?, ?)",
    school_province.school_id,
    school_province.province_id,
    (err) => {
      if (err) {
        res.status(500).send(err);
      } else {
        
        school_province.id = this.lastID;
        res.send(school_province);
        res.status(200);
      }
    }
  );
});


//ส่วนแก้ไข
app.put("/school_province/:id", (req, res) => {
  console.log(req.params.id);
  const school_province = req.body;
  db.run(
    "UPDATE school_province SET school_id = ?, province_id = ?  WHERE id = ? ",
    school_province.school_id,
    school_province.province_id,
    req.params.id,
    (err) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.send(school_province);
      }
    }
  );
});


//ลบไปทำเอาเอง
app.delete("/school_province/:id", (req, res) => {
  db.run("DELETE FROM school_province WHERE id = ?", req.params.id, (err) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.send({});
    }
  });
});


const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}`));