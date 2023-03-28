const express= require("express")
const mongoose = require("mongoose")
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
const PORT=4000;

const { Schema } = mongoose;
const formSchema = new Schema({
  fname: String, 
  lname: String,
  phone: String,
   email: String,
   gender:String,
 
 
});

const Form = mongoose.model('form', formSchema);

const dbConnection = async()=>{
try {
	
	  await mongoose.connect('mongodb://127.0.0.1:27017/FormData');
	  console.log('DB connected Successfully');
	} catch (error) {
	  console.log(error.message);
}
}
dbConnection();

app.get('/',function(req, res){
	res.sendFile(__dirname + "/test.html");
	
});


app.post('/',function(req, res) {
     const newForm = new Form({
		 fname: req.body.fname,
		 lname: req.body.lname,
		 
		 
		 phone: req.body.phone,
		 email: req.body.email,
		 gender: req.body.gender
	 });
	 newForm.save();
	 
	 console.log("Successfully Saved")
	 res.send("Saved in database")
     res.redirect('/');	
});

app.listen(PORT, (req,res)=>{
	console.log(`Server is listening at http://localhost:${PORT}`);
	
})