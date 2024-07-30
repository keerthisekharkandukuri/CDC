
const express=require("express");
const bodyParser=require("body-parser");
const mongoose=require("mongoose");
const http=require("http");
const cors=require("cors");

const multer=require("multer");
const path = require('path');


const app=express();
const server=http.createServer(app);
app.use(cors());
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use("/files", express.static("files"));
app.use('/backend/files', express.static(path.join(__dirname, 'backend', 'files')));



  
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./files");
    },
    filename: function (req, file, cb) {
        const rollno = req.body.rollno; // Assuming roll number is sent in the request body
        const uniqueSuffix = Date.now();
        const originalname = file.originalname.replace(/\s/g, ''); // Remove white spaces from original filename
        const filename = `${rollno}_${originalname}`; // Construct filename
        cb(null, filename);
    },
});

 
  
  
  

async function main(){
    try{
        await mongoose.connect("mongodb://127.0.0.1:27017/cdcDB");
        console.log("connected to mongodb server");
           
        const studentDetailsSchema={
            Name:String,
            Email:String,
            Password:String,
            RegNo:Number,
            Branch:String
            
        }

        const studentSchema={
            Branch:String,
            Data:[{
                Year:Number,
                Students:[{Name:String,
                        Email:String,
                        RegNo:Number,
                        RollNo:Number,
                        FeeReceipts:{'1_1':String,'1_2':String,'2_1':String,'2_2':String,'3_1':String,'3_2':String,'4_1':String,'4_2':String}
                       }]
                    
            }]
        }

        const facultySchema={
            Name:String,
            Email:String,
            Password:String
        }
        const internship={
            CName:String,
            job:String,
            descr:String,
            eligibility:String,
            Salary:Number,
            Perks:String


        }
        const job={
            CName:String,
            job:String,
            type:String,
            descr:String,
            eligibility:String,
            Salary:Number,
            Perks:String


        }

        const reviewSchema={
            Name:String,
            reviewOn:String,
            Company:String,
            Review:String,
            LinkedIn:String

        }

        const mdSchema={
        Subject:String,
       
         Students:[{rollNo: Number,
          regNo: Number,
          email:String,
          branch: String,
          year: Number,
          cgpa: Number}]
        }
       
          
          
        const Jobs=mongoose.model("Jobs",job);
        const Student=mongoose.model("Student",studentSchema);
        const Faculty=mongoose.model("Faculty",facultySchema);
        const Review=mongoose.model("Review",reviewSchema);
        const StudentDetails=mongoose.model("Detail",studentDetailsSchema);
        const Md=mongoose.model("md",mdSchema);

        async function checkStudent(res,email,password){
            const isStudentExists=await StudentDetails.findOne({Email:email,Password:password});
            if(isStudentExists){
                res.send("exists");
            }else{
                res.send("Your credentials are not found");
            }
        }

        app.post("/checkStudent",(req,res)=>{
            const email=req.body.Email;
            const password=req.body.Password;
            checkStudent(res,email,password);
        })

        async function checkFaculty(res,email,password){
            const isFacultyExists=await Faculty.findOne({Email:email,Password:password});
            if(isFacultyExists){
                res.send("exists");
            }else{
                res.send("Your credentials are not found");
            }
        }

        app.post("/MD",async (req,res)=>{
            console.log(req.body.form);
            const form=req.body.form;
            const isCourseExists=await Md.findOne({Subject:form.course});
            console.log(isCourseExists);
            if(isCourseExists){
                const newStudent={
                    rollNo: form.rollNo,
                    regNo: form.regNo,
                    email:form.email,
                    branch: form.branch,
                    year: form.year,
                    cgpa: form.cgpa
                }
                const addStudent = await Md.findOneAndUpdate({ Subject: form.course}, { $push: { "Students": newStudent } }, { new: true });
                if(addStudent){
                    res.send("application sent");
                }else{
                    res.send("Oops!!Apply again");
                }
            }else{
                const newMd=new Md({
                    Subject:form.course,
      
         Students:[{rollNo: form.rollNo,
          regNo: form.regNo,
          email:form.email,
          branch: form.branch,
          year: form.year,
          cgpa: form.cgpa}]
                });
                newMd.save();
                res.send("course Application Sent");

            }

        });

        app.post("/getMd",async (req,res)=>{
            console.log(req.body);
            isCourseExists=await Md.findOne({Subject:req.body.Course});
            console.log(isCourseExists);
            if(isCourseExists){
                res.send(isCourseExists.Students);
            }else{
                res.send("No Students Applied");
            }
        })

        app.post("/checkFaculty",(req,res)=>{
            const email=req.body.Email;
            const password=req.body.Password;
            checkFaculty(res,email,password);
        })
        

        async function Register(res, name, rollno, regno, email, branch, year, sem, title, filename) {
            console.log("dxcv00");
            console.log(branch);
            const isBranchexists = await Student.findOne({ Branch: branch });
            console.log(isBranchexists);
            if (isBranchexists) {
                for (const obj of isBranchexists.Data) {
                    if (obj.Year == year) {
                        for (const student of obj.Students) {
                           
                            if (student.RollNo === rollno) {
                                console.log(rollno);
                               
                                const semester = sem;
                                if (student.FeeReceipts[semester] == "") {
                                    console.log("hii");
                                    student.FeeReceipts[semester] = title;
                                    res.send("Student registered");
                                }
                                else if (student.FeeReceipts[semester] != "") {
                                   
                                    res.send("Student already registered");
                                }
                            }
                        }
                        const newStudent = {
                            Name: name,
                            Email: email,
                           
                            RegNo: regno,
                            RollNo: rollno,
                            FeeReceipts: {
                                [sem]: title
                            }
                        };
                        const addStudent = await Student.findOneAndUpdate({ Branch: branch, "Data.Year": year }, { $push: { "Data.$.Students": newStudent } }, { new: true });
                        console.log(addStudent);
                        if (addStudent) {
                            return res.send("Student details added");
                        } else {
                            return res.send("not added");
                        }
        
                    }
                }
        
                const newYear = {
                    Year: year,
                    Students: [{
                        Name: name,
                        Email: email,
                        
                        RegNo: regno,
                        RollNo: rollno,
                        FeeReceipts: {
                            [sem]: title
                        }
                    }],
        
        
                };
                const update = await Student.findOneAndUpdate({ Branch: branch }, { $push: { Data: newYear } }, { new: true });
                console.log(update);
                res.send(`${year}done`);
        
            }
            else {
                const newBranch = new Student({
                    Branch: branch,
                    Data: [{
                        Year: year,
                        Students: [{
                            Name: name,
                            Email: email,
                            
                            RegNo: regno,
                            RollNo: rollno,
                            FeeReceipts: {
                                [sem]: title
                            }
                        }],
        
        
                    }]
                })
                console.log(newBranch);
                await newBranch.save();
                res.send(branch + "Added Successfully");
            }
        }
        



        const upload = multer({ storage: storage });
       
        app.post("/registration",upload.single("file"),(req,res)=>{
            console.log(req.file);
            console.log("helloooo");
           const title = req.file.filename;
           const filename = req.file.filename;
            console.log(req.body);
            console.log(req.body.sem);
            const name=req.body.firstName;
            const rollno=req.body.roll;
            const regno=req.body.regNo;
            const email=req.body.email;
          
            const branch=req.body.branch;
            const year=req.body.year;
            const sem=req.body.sem;
            Register(res,name,rollno,regno,email,branch,year,sem,title,filename);
        })

        async function  getRegData(res,branch,year){
             const isbranchexists=await Student.findOne({Branch:branch});
             console.log(isbranchexists);
             if(isbranchexists){

                for(const obj of isbranchexists.Data){
                    if(obj.Year==year){
                        return res.send(obj.Students);
                        
                    }
                }
                return res.send("no year found");
                
             }else{
                res.send("no branch found");
             }


        }

        app.post("/getRegData",(req,res)=>{
            console.log("hii");
            const branch=req.body.branch;
            const year=req.body.year;
            console.log(branch);
            console.log(year);
            getRegData(res,branch,year);
        })

        app.post("/Receipt",(req,res)=>{
            const file=req.body.sem;
            console.log(file);
            res.redirect(`/Files/${file}`);
        })

        app.get("/job-details", async (req, res) => {
            try {
             
              const jobDetails = await Jobs.find();
              res.status(200).json(jobDetails);
            } catch (error) {
              console.error('Error fetching job details:', error);
              res.status(500).json({ error: 'Internal Server Error' });
            }
          });
            app.post("/job", async (req,res) =>{
                  const jobData = req.body;
                  console.log('Received job data:', jobData);
                  const newJob = new Jobs(jobData);
                 await newJob.save();
                 res.send("Added successfully");
                })

            app.post("/deleteJob",async (req,res)=>{
                 console.log(req.body);
                const isJobExists=await Jobs.findOne({CName:req.body.Company,job:req.body.Job});
                console.log(isJobExists);
                if(isJobExists){
                    const del=await Jobs.deleteOne({CName:req.body.Company,job:req.body.Job});
                    console.log(del);
                    if(del){
                        console.log("deleted");
                        res.send("deleted");
                    }
                }
            })
            
            app.post("/Reviews",async (req,res)=>{
                 console.log(req.body);
                 const Name=req.body.Name;
                 const type=req.body.Select;
                 const review=req.body.Review;
                 const profile=req.body.Profile;
                 try{
                 const newReview=new Review({
                    Name:Name,
                    reviewOn:type,
                    Company:req.body.Company,
                    Review:review,
                    LinkedIn:profile
                 })
                 await newReview.save();
                 res.send("done review added!!");
                }catch(err){
                    console.log(err);
                }
            })

            app.get("/DisplayReviews",async (req,res)=>{
                const reviews=await Review.find();
                res.status(200).json(reviews);
            })


    }catch(err){
        console.log(err);
    }
}

main().catch(console.error);

server.listen(4500,()=>{
    console.log('Server running on port 4500');
})




































// const express=require("express");
// const bodyParser=require("body-parser");
// const mongoose=require("mongoose");
// const http=require("http");
// const cors=require("cors");


// const app=express();
// const server=http.createServer(app);
// app.use(cors());
// app.use(bodyParser.urlencoded({extended:true}));
// app.use(bodyParser.json());

// async function main(){
//     try{
//         await mongoose.connect("mongodb://127.0.0.1:27017/cdcDB");
//         console.log("connected to mongodb server");
           
//         // const studentSchema={
//         //     Name:String,
//         //     Email:String,
//         //     Password:String,
//         //     RegNo:Number,
//         //     Branch:String
            
//         // }

//         const studentSchema={
//             Branch:String,
//             Data:[{
//                 Year:Number,
//                 Students:[{Name:String,
//                         Email:String,
//                         Password:String,
//                         RegNo:Number,
//                         RollNo:Number}]
                    
//             }]
//         }

//         const facultySchema={
//             Name:String,
//             Email:String,
//             Password:String
//         }
//         const internship={
//             CName:String,
//             job:String,
//             descr:String,
//             eligibility:String,
//             Salary:Number,
//             Perks:String


//         }
//         const job={
//             CName:String,
//             job:String,
//             type:String,
//             descr:String,
//             eligibility:String,
//             Salary:Number,
//             Perks:String


//         }

//         const reviewSchema={
//             Name:String,
//             reviewOn:String,
//             Company:String,
//             Review:String,
//             LinkedIn:String

//         }
//         const Jobs=mongoose.model("Jobs",job);
//         const Student=mongoose.model("Student",studentSchema);
//         const Faculty=mongoose.model("Faculty",facultySchema);
//         const Review=mongoose.model("Review",reviewSchema);

//         async function checkStudent(res,email,password){
//             const isStudentExists=await Student.findOne({Email:email,Password:password});
//             if(isStudentExists){
//                 res.send("exists");
//             }else{
//                 res.send("Your credentials are not found");
//             }
//         }

//         app.post("/checkStudent",(req,res)=>{
//             const email=req.body.Email;
//             const password=req.body.Password;
//             checkStudent(res,email,password);
//         })

//         async function checkFaculty(res,email,password){
//             const isFacultyExists=await Faculty.findOne({Email:email,Password:password});
//             if(isFacultyExists){
//                 res.send("exists");
//             }else{
//                 res.send("Your credentials are not found");
//             }
//         }

//         app.post("/checkFaculty",(req,res)=>{
//             const email=req.body.Email;
//             const password=req.body.Password;
//             checkFaculty(res,email,password);
//         })

//         async function  Register(res,name,rollno,regno,email,password,branch,year){
//              const isBranchexists=await Student.findOne({Branch:branch});
//              console.log(isBranchexists);
//              if(isBranchexists){
//                 for(const obj of isBranchexists.Data){
//                     if(obj.Year==year){
//                         for(const student of obj.Students){
//                             if(student.RollNo==rollno){
//                                 return res.send("Student exists");
//                             }
//                         }
//                         const newStudent={Name:name,
//                                     Email:email,
//                                     Password:password,
//                                     RegNo:regno,
//                                     RollNo:rollno};
//                             const addStudent=    await Student.findOneAndUpdate({Branch:branch,"Data.Year":year},{$push:{"Data.$.Students":newStudent}},{new:true});
//                                    if(addStudent){
//                                     return res.send("Student details added");
//                                    }else{
//                                     return res.send("not added");
//                                    }

//                     }
//                 }
               
//                     const newYear={
//                                 Year:year,
//                                 Students:[{Name:name,
//                                     Email:email,
//                                     Password:password,
//                                     RegNo:regno,
//                                     RollNo:rollno}],
                                
        
//                             };
//                             const update=await Student.findOneAndUpdate({Branch:branch},{$push:{Data:newYear}},{new:true});
//                             console.log(update);
//                             res.send("Done");
                
//              }
//              else{
//                 const newBranch=new Student({
//                     Branch:branch,
//                     Data:[{
//                         Year:year,
//                         Students:[{Name:name,
//                             Email:email,
//                             Password:password,
//                             RegNo:regno,
//                             RollNo:rollno}],
                        

//                     }]
//                 })
//                 await newBranch.save();
//                 return res.send("Added Successfully");
//              }
//         }

//         app.post("/registration",(req,res)=>{
//             const name=req.body.firstName;
//             const rollno=req.body.Roll;
//             const regno=req.body.regNo;
//             const email=req.body.email;
//             const password=req.body.password;
//             const branch=req.body.Branch;
//             const year=req.body.year;
//             Register(res,name,rollno,regno,email,password,branch,year);
//         })

//         async function  getRegData(res,branch,year){
//              const isbranchexists=await Student.findOne({Branch:branch});
//              console.log(isbranchexists);
//              if(isbranchexists){

//                 for(const obj of isbranchexists.Data){
//                     if(obj.Year==year){
//                         return res.send(obj.Students);
                        
//                     }
//                 }
//                 return res.send("no year found");
                
//              }else{
//                 res.send("no branch found");
//              }


//         }

//         app.post("/getRegData",(req,res)=>{
//             console.log("hii");
//             const branch=req.body.branch;
//             const year=req.body.year;
//             console.log(branch);
//             console.log(year);
//             getRegData(res,branch,year);
//         })

//         app.get("/job-details", async (req, res) => {
//             try {
             
//               const jobDetails = await Jobs.find();
//               res.status(200).json(jobDetails);
//             } catch (error) {
//               console.error('Error fetching job details:', error);
//               res.status(500).json({ error: 'Internal Server Error' });
//             }
//           });
//             app.post("/job", async (req,res) =>{
//                   const jobData = req.body;
//                   console.log('Received job data:', jobData);
//                   const newJob = new Jobs(jobData);
//                  await newJob.save();
//                  res.send("Added successfully");
//                 })
            
//             app.post("/Reviews",async (req,res)=>{
//                  const Name=req.body.Name;
//                  const type=req.body.Select;
//                  const review=req.body.Review;
//                  const profile=req.body.Profile;
//                  try{
//                  const newReview=new Review({
//                     Name:Name,
//                     reviewOn:type,
//                     Company:req.body.Company,
//                     Review:review,
//                     LinkedIn:profile
//                  })
//                  await newReview.save();
//                  res.send("done review added!!");
//                 }catch(err){
//                     console.log(err);
//                 }
//             })

//             app.get("/DisplayReviews",async (req,res)=>{
//                 const reviews=await Review.find();
//                 res.status(200).json(reviews);
//             })


//     }catch(err){
//         console.log(err);
//     }
// }

// main().catch(console.error);

// server.listen(4500,()=>{
//     console.log('Server running on port 4500');
// })